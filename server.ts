import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { attachSocketServer, disconnectAndBanIP } from './socketServer';
import { isIPBanned, normalizeIP } from './banManager';
import { moderateVideoFrame } from './moderationService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Support JSON payloads for frame moderation (up to 10MB)
app.use(express.json({ limit: '10mb' }));

// Attach Socket.IO Matchmaker and Signaling
attachSocketServer(server);

// GeoIP endpoint
app.get('/api/geoip', (req, res) => {
  const cfCountry = req.headers['cf-ipcountry'] as string | undefined;
  const forwarded = req.headers['x-forwarded-for'] as string | undefined;
  const ip = (req.headers['cf-connecting-ip'] as string) || (forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress) || '';
  let countryCode = (cfCountry && cfCountry !== 'XX') ? cfCountry.toUpperCase() : null;
  res.json({ ip, countryCode });
});

// Check if client IP is currently banned
app.get('/api/check-ban', (req, res) => {
  const forwarded = req.headers['x-forwarded-for'] as string | undefined;
  const rawIp = (req.headers['cf-connecting-ip'] as string) || (forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress) || '';
  const ip = normalizeIP(rawIp);
  const banStatus = isIPBanned(ip);

  res.json({
    banned: banStatus.banned,
    ip,
    record: banStatus.record || null,
  });
});

// Real-time AI Video Frame Moderation Endpoint
app.post('/api/moderate-frame', async (req, res) => {
  try {
    const forwarded = req.headers['x-forwarded-for'] as string | undefined;
    const rawIp = (req.headers['cf-connecting-ip'] as string) || (forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress) || '';
    const ip = normalizeIP(rawIp);

    // If IP is already banned, return banned immediately
    const check = isIPBanned(ip);
    if (check.banned) {
      return res.json({
        violation: true,
        banned: true,
        ip,
        reason: check.record?.reason,
        expiresAt: check.record?.expiresAt,
      });
    }

    const { frameBase64 } = req.body || {};
    if (!frameBase64) {
      return res.status(400).json({ error: 'Missing frameBase64' });
    }

    const result = await moderateVideoFrame(frameBase64);

    if (result.violation) {
      console.warn(`[AI Moderation API] 🚨 VIOLATION CONFIRMED FOR IP ${ip}: ${result.reason} (${result.category})`);
      const banRecord = disconnectAndBanIP(ip, `AI Moderation: ${result.reason} (${result.category})`, 1440);

      return res.json({
        violation: true,
        banned: true,
        category: result.category,
        confidence: result.confidence,
        reason: banRecord.reason,
        expiresAt: banRecord.expiresAt,
        ip,
      });
    }

    return res.json({
      violation: false,
      banned: false,
      category: result.category,
      confidence: result.confidence,
    });
  } catch (err: any) {
    console.error('[API /api/moderate-frame] Error:', err);
    return res.status(500).json({ error: 'Moderation processing error' });
  }
});

async function start() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('{*path}', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[OmeGod Server] Running on http://0.0.0.0:${PORT}`);
  });
}

start();
