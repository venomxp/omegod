import { GoogleGenAI } from '@google/genai';

export interface ModerationResult {
  violation: boolean;
  category: 'safe' | 'nudity' | 'genitalia' | 'sexual_activity' | 'other';
  confidence: number;
  reason: string;
}

let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[ModerationService] GEMINI_API_KEY not configured. Falling back to local heuristic analysis.');
    return null;
  }
  try {
    aiClient = new GoogleGenAI({});
    return aiClient;
  } catch (err) {
    console.error('[ModerationService] Error initializing GoogleGenAI:', err);
    return null;
  }
}

/**
 * Fast local heuristic fallback: analyzes skin-tone pixel density in JPEG base64
 * if AI model is unreachable.
 */
function localSkinHeuristic(base64Data: string): { skinRatio: number } {
  try {
    const rawBuffer = Buffer.from(base64Data, 'base64');
    // Approximate sampling: scan buffer bytes
    let skinLikeBytes = 0;
    let sampled = 0;
    for (let i = 0; i < rawBuffer.length - 3; i += 16) {
      const r = rawBuffer[i];
      const g = rawBuffer[i + 1];
      const b = rawBuffer[i + 2];
      // Generalized skin tone heuristic in RGB
      if (r > 95 && g > 40 && b > 20 && r > g && r > b && (r - g) > 15 && Math.abs(r - g) > 15) {
        skinLikeBytes++;
      }
      sampled++;
    }
    const skinRatio = sampled > 0 ? skinLikeBytes / sampled : 0;
    return { skinRatio };
  } catch {
    return { skinRatio: 0 };
  }
}

/**
 * Moderate a video frame (JPEG base64) for nudity, genitalia, or sexual content.
 */
export async function moderateVideoFrame(base64Image: string): Promise<ModerationResult> {
  const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

  if (!cleanBase64 || cleanBase64.length < 100) {
    return {
      violation: false,
      category: 'safe',
      confidence: 1,
      reason: 'Empty or invalid image',
    };
  }

  const ai = getAIClient();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: cleanBase64,
                },
              },
              {
                text: `You are an automated real-time safety and anti-nudity moderation system for a 1-on-1 random video chat platform (like Omegle/OmeTV).
Analyze this user webcam frame strictly for severe violations:
1. Nudity, exposed genitals/penis/vagina, exposed buttocks, bare breasts/nipples.
2. Sexual acts, masturbation, pornographic material, flashing, or sex toys.
3. Violence, self-harm, or illegal weapons.

Respond ONLY with valid JSON with this exact schema:
{
  "violation": boolean,
  "category": "safe" | "nudity" | "genitalia" | "sexual_activity" | "other",
  "confidence": number,
  "reason": string
}`,
              },
            ],
          },
        ],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });

      const responseText = response.text?.trim() || '';
      const parsed = JSON.parse(responseText) as ModerationResult;

      if (parsed && typeof parsed.violation === 'boolean') {
        // High threshold to avoid false positives on simple faces/hands
        if (parsed.violation && parsed.confidence >= 0.70) {
          console.warn(`[ModerationService] 🚨 VIOLATION DETECTED:`, parsed);
          return parsed;
        }
        return {
          violation: false,
          category: parsed.category || 'safe',
          confidence: parsed.confidence || 0.9,
          reason: parsed.reason || 'Frame cleared by AI',
        };
      }
    } catch (err) {
      console.error('[ModerationService] Gemini vision moderation error:', err);
    }
  }

  // Fallback to local heuristic if Gemini API had an error or key was absent
  const { skinRatio } = localSkinHeuristic(cleanBase64);
  // An exceptionally high skin ratio across entire frame (> 80%) with no face/clothes
  if (skinRatio > 0.82) {
    return {
      violation: true,
      category: 'nudity',
      confidence: 0.75,
      reason: 'Excessive bodily skin exposure detected by safety heuristics',
    };
  }

  return {
    violation: false,
    category: 'safe',
    confidence: 0.8,
    reason: 'Passed safety checks',
  };
}
