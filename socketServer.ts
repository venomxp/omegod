import { Server as SocketIOServer, Socket } from 'socket.io';
import { isIPBanned, banIP, normalizeIP, BannedRecord, recordUserReport } from './banManager';

export interface QueuedUser {
  socketId: string;
  socket: Socket;
  tags: string[];
  joinedAt: number;
  partnerInfo: {
    country: string;
    countryCode: string;
    flag: string;
    flagUrl: string;
  };
}

export interface ActiveRoom {
  roomId: string;
  user1: Socket;
  user2: Socket;
  commonInterests: string[];
  partnerInfo?: {
    country: string;
    countryCode: string;
    flag: string;
    flagUrl: string;
  };
}

export interface SimulatedStrangerProfile {
  country: string;
  countryCode: string;
  flag: string;
  flagUrl: string;
  greetings: { ar: string[]; en: string[]; fr: string[] };
  responses: { ar: string[]; en: string[]; fr: string[] };
}

const SIMULATED_STRANGERS: SimulatedStrangerProfile[] = [
  {
    country: 'Morocco',
    countryCode: 'MA',
    flag: '🇲🇦',
    flagUrl: 'https://flagcdn.com/w80/ma.png',
    greetings: {
      ar: ['Salam! Cv 3lik?', 'Salam khoya! Fine?', 'Ahlan cv?', 'Salam cava? Mnin nta?'],
      en: ['Hey! How are you doing?', 'Hello there! From Morocco 🇲🇦', 'Hi! What are you up to?'],
      fr: ['Salut! Ça va bien?', 'Coucou! Tu vas bien?', 'Salut salut! Tu viens d\'où?'],
    },
    responses: {
      ar: [
        'Hamdullah kolshi bikhir wnta?',
        'Ana mn Casa, wnta mnin?',
        'Tbarkellah 3lik!',
        'Hhh wayli bseh!',
        'Had lmaw9i3 nadi wallah, bhal Omegle dyal zman',
        'Ach kadir f hyatek khoya?',
        'Nadi bezzaf! Hhhhh',
        'Fin ghberti!',
        'Lah ihfdik akhi!',
      ],
      en: [
        'I\'m doing great, thanks! How about you?',
        'Nice to meet you! I love meeting people on here.',
        'Haha that\'s cool!',
        'Where are you chatting from?',
        'Yeah, reminds me of the classic Omegle days!',
        'What hobbies do you enjoy the most?',
        'Awesome! Tell me more.',
      ],
      fr: [
        'Ça va super et toi?',
        'Enchanté! C\'est cool de discuter ici.',
        'Haha trop bien!',
        'Tu fais quoi de beau aujourd\'hui?',
        'Ce site est vraiment propre et rapide!',
        'Trop sympa! Tu es de quelle ville?',
      ],
    },
  },
  {
    country: 'France',
    countryCode: 'FR',
    flag: '🇫🇷',
    flagUrl: 'https://flagcdn.com/w80/fr.png',
    greetings: {
      ar: ['Salut! Salam!', 'Bonjour! Tu parles français?', 'Hey! Ça va?'],
      en: ['Hey! How are you?', 'Hi from Paris! 🇫🇷', 'Hello stranger!'],
      fr: ['Salut! Ça va?', 'Hello! Tu vas bien?', 'Coucou de Paris!'],
    },
    responses: {
      ar: [
        'Super! Tu es d\'où?',
        'Haha oui c\'est vrai!',
        'Trop cool! J\'aime beaucoup le Maroc!',
        'Je suis à Paris en ce moment.',
        'Sympa de parler avec toi!',
      ],
      en: [
        'I\'m great, chilling at home in France!',
        'That\'s awesome! Have you ever been to Europe?',
        'Haha so cool, I like this website!',
        'What kind of music do you listen to?',
      ],
      fr: [
        'Ça va super merci! Et toi?',
        'Je suis sur Paris, il fait un peu frais aujourd\'hui haha',
        'Haha trop cool! Tu as quel âge?',
        'Trop sympa ce site, ça change des anciens bugs.',
        'Tu fais quoi dans la vie?',
      ],
    },
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    flag: '🇪🇸',
    flagUrl: 'https://flagcdn.com/w80/es.png',
    greetings: {
      ar: ['Hola! Salam!', 'Buenas! Qué tal?'],
      en: ['Hola! How are you?', 'Hello from Madrid! 🇪🇸'],
      fr: ['Hola! Tu parles espagnol ou français?'],
    },
    responses: {
      ar: [
        'Bien gracias! Tu hablas español?',
        'Haha sí! Muy bien!',
        'Saludos desde España!',
        'Me encanta conocer gente nueva aquí.',
      ],
      en: [
        'Doing great! Just relaxing after work.',
        'Spain is lovely right now. Where are you from?',
        'Haha nice! You seem very friendly.',
      ],
      fr: [
        'Tout va bien ici en Espagne! Et toi?',
        'Super sympa de discuter avec toi!',
        'Haha oui tout à fait!',
      ],
    },
  },
  {
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    flagUrl: 'https://flagcdn.com/w80/us.png',
    greetings: {
      ar: ['Hey! What\'s up?', 'Hello from California! 🇺🇸'],
      en: ['Hey what\'s up!', 'Hi there! How\'s your day going?'],
      fr: ['Hey! How are you doing?'],
    },
    responses: {
      ar: [
        'Cool! I\'ve always wanted to visit your country.',
        'Haha yeah, OmeGod is super fast!',
        'Nice talking to you man!',
      ],
      en: [
        'Pretty good! Just gaming and listening to music.',
        'That sounds awesome. What tags did you pick?',
        'Haha classic Omegle vibe, love this layout.',
        'What time is it over there?',
      ],
      fr: [
        'Haha nice! I only know a little bit of French.',
        'Cool to meet you!',
      ],
    },
  },
  {
    country: 'Algeria',
    countryCode: 'DZ',
    flag: '🇩🇿',
    flagUrl: 'https://flagcdn.com/w80/dz.png',
    greetings: {
      ar: ['Salam khoya! Wesh rak?', 'Salam cv khouti? 🇩🇿', 'Ahlan b khawna!'],
      en: ['Hey bro! How is it going?'],
      fr: ['Salut frérot! Ça va?'],
    },
    responses: {
      ar: [
        'Hamdullah rabi ykhalik!',
        'Khawa khawa dima!',
        'Wesh rak dayer m3a lwaqt?',
        'Hhhh sahbi wallah ghir for!',
        'Marhba bik f kol waqt!',
      ],
      en: ['Hamdullah doing great bro! Where are you from?'],
      fr: ['Ça va tranquille frérot!'],
    },
  },
  {
    country: 'Egypt',
    countryCode: 'EG',
    flag: '🇪🇬',
    flagUrl: 'https://flagcdn.com/w80/eg.png',
    greetings: {
      ar: ['أهلاً يا باشا! عامل إيه؟ 🇪🇬', 'سلام عليكم! إيه الأخبار؟', 'مساء الفل!'],
      en: ['Hey! Greetings from Egypt 🇪🇬'],
      fr: ['Salut! Comment ça va?'],
    },
    responses: {
      ar: [
        'الحمد لله تمام يا فنان، إنت عامل إيه؟',
        'أحسن ناس والله!',
        'منور يا غالي!',
        'ههههه والله موقع تحفة وسريع جداً',
        'ربنا يسعدك ويحفظك يا باشا',
      ],
      en: ['Doing great! Pyramids say hello haha.'],
      fr: ['Bienvenue mon ami!'],
    },
  }
];

// Convert 2-letter ISO country code to flag emoji
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  try {
    const code = countryCode.toUpperCase();
    return String.fromCodePoint(...[...code].map(c => 127397 + c.charCodeAt(0)));
  } catch {
    return '🌐';
  }
}

// Get localized country name using Intl.DisplayNames
export function getLocalizedCountry(countryCode: string, lang = 'en'): string {
  if (!countryCode || countryCode.length !== 2) return 'International';
  try {
    const dn = new Intl.DisplayNames([lang, 'en'], { type: 'region' });
    return dn.of(countryCode.toUpperCase()) || countryCode;
  } catch {
    return countryCode;
  }
}

// Clean and normalize tags: e.g. "#Gaming", " Anime " -> ["gaming", "anime"]
export function cleanTags(raw: any): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map(t => String(t).trim().toLowerCase().replace(/^#+/, ''))
      .filter(t => t.length > 0 && t.length <= 40);
  }
  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map(t => t.trim().toLowerCase().replace(/^#+/, ''))
      .filter(t => t.length > 0 && t.length <= 40);
  }
  return [];
}

const socketToIP = new Map<string, string>();
const ipToSockets = new Map<string, Set<Socket>>();

export function disconnectAndBanIP(rawIp: string, reason: string, durationMinutes = 1440): BannedRecord {
  const ip = normalizeIP(rawIp);
  const record = banIP(ip, reason, durationMinutes);

  const sockets = ipToSockets.get(ip);
  if (sockets && sockets.size > 0) {
    for (const s of sockets) {
      try {
        s.emit('banned', {
          banned: true,
          ip,
          reason: record.reason,
          expiresAt: record.expiresAt,
        });
        s.disconnect(true);
      } catch (err) {
        console.error('[SocketServer] Error disconnecting banned socket:', err);
      }
    }
    sockets.clear();
  }
  return record;
}

export function attachSocketServer(httpServer: any) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 30000,
    pingInterval: 15000,
  });

  const waitingQueue: QueuedUser[] = [];
  const activeRooms = new Map<string, ActiveRoom>();
  const socketToRoom = new Map<string, string>();

  const TAG_PRIORITY_TIMEOUT_MS = 2500; // 2.5 seconds priority window for matching tags before broadening

  function processQueue() {
    const now = Date.now();

    // First Priority: Match Real Users Together
    if (waitingQueue.length >= 2) {
      for (let i = 0; i < waitingQueue.length; i++) {
        const userA = waitingQueue[i];
        if (!userA || !userA.socket.connected) {
          waitingQueue.splice(i, 1);
          i--;
          continue;
        }

        let bestMatchIdx = -1;
        let highestCommonCount = 0;
        let bestCommonTags: string[] = [];

        // Exact tag overlap first
        if (userA.tags.length > 0) {
          for (let j = 0; j < waitingQueue.length; j++) {
            if (i === j) continue;
            const userB = waitingQueue[j];
            if (!userB || !userB.socket.connected) continue;

            const common = userA.tags.filter(t => userB.tags.includes(t));
            if (common.length > highestCommonCount) {
              highestCommonCount = common.length;
              bestCommonTags = common;
              bestMatchIdx = j;
            }
          }
        }

        // Random fallback between real users if priority timeout reached or no tags
        if (bestMatchIdx === -1) {
          const waitTimeA = now - userA.joinedAt;
          const userAEligible = userA.tags.length === 0 || waitTimeA >= TAG_PRIORITY_TIMEOUT_MS;

          if (userAEligible) {
            for (let j = 0; j < waitingQueue.length; j++) {
              if (i === j) continue;
              const userB = waitingQueue[j];
              if (!userB || !userB.socket.connected) continue;

              const waitTimeB = now - userB.joinedAt;
              const userBEligible = userB.tags.length === 0 || waitTimeB >= TAG_PRIORITY_TIMEOUT_MS;

              if (userBEligible || userA.tags.length === 0) {
                bestMatchIdx = j;
                bestCommonTags = userA.tags.filter(t => userB.tags.includes(t));
                break;
              }
            }
          }
        }

        if (bestMatchIdx !== -1) {
          const userB = waitingQueue[bestMatchIdx];
          const higher = Math.max(i, bestMatchIdx);
          const lower = Math.min(i, bestMatchIdx);
          waitingQueue.splice(higher, 1);
          waitingQueue.splice(lower, 1);

          const roomId = `${userA.socketId}#${userB.socketId}`;
          userA.socket.join(roomId);
          userB.socket.join(roomId);

          activeRooms.set(roomId, {
            roomId,
            user1: userA.socket,
            user2: userB.socket,
            commonInterests: bestCommonTags,
          });

          socketToRoom.set(userA.socketId, roomId);
          socketToRoom.set(userB.socketId, roomId);

          console.log(`[Real Match] ${userA.socketId} (${userA.partnerInfo.countryCode}) with ${userB.socketId} (${userB.partnerInfo.countryCode})`);

          userA.socket.emit('room_found', {
            roomId,
            partnerInfo: userB.partnerInfo,
            commonInterests: bestCommonTags,
          });

          userB.socket.emit('room_found', {
            roomId,
            partnerInfo: userA.partnerInfo,
            commonInterests: bestCommonTags,
          });

          i = -1;
        }
      }
    }
  }

  function leaveRoom(socket: Socket) {
    const roomId = socketToRoom.get(socket.id);
    if (!roomId) return;

    socketToRoom.delete(socket.id);
    const room = activeRooms.get(roomId);
    if (room) {
      activeRooms.delete(roomId);
      try {
        socket.leave(roomId);
      } catch {}

      const partner = room.user1.id === socket.id ? room.user2 : room.user1;
      if (partner && partner.id !== socket.id) {
        socketToRoom.delete(partner.id);
        try {
          partner.leave(roomId);
        } catch {}
        if (partner.connected) {
          partner.emit('partner_left');
        }
      }
    }
  }

  function removeFromQueue(socketId: string) {
    const idx = waitingQueue.findIndex(u => u.socketId === socketId);
    if (idx !== -1) {
      waitingQueue.splice(idx, 1);
    }
  }

  // Periodic queue processor
  const intervalId = setInterval(processQueue, 800);

  io.on('connection', (socket: Socket) => {
    const handshake = socket.handshake;
    const rawIp = 
      (handshake.headers['cf-connecting-ip'] as string) ||
      (handshake.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      socket.handshake.address;
    const clientIP = normalizeIP(rawIp);

    // Instant Ban Check
    const banCheck = isIPBanned(clientIP);
    if (banCheck.banned) {
      console.warn(`[Socket Rejected] Banned IP connection attempted: ${clientIP}`);
      socket.emit('banned', {
        banned: true,
        ip: clientIP,
        reason: banCheck.record?.reason || 'Violation of Community Rules (Nudity / Inappropriate Content)',
        expiresAt: banCheck.record?.expiresAt,
      });
      socket.disconnect(true);
      return;
    }

    // Register active socket for this IP
    socketToIP.set(socket.id, clientIP);
    if (!ipToSockets.has(clientIP)) {
      ipToSockets.set(clientIP, new Set());
    }
    ipToSockets.get(clientIP)!.add(socket);

    const cfCountry = handshake.headers['cf-ipcountry'] as string | undefined;
    let initialCode = (cfCountry && cfCountry !== 'XX') ? cfCountry.toUpperCase() : 'MA';

    const qCode = handshake.query.countryCode as string | undefined;
    const qCountry = handshake.query.country as string | undefined;
    if (qCode && qCode.length === 2) {
      initialCode = qCode.toUpperCase();
    }

    const partnerInfo = {
      country: qCountry || getLocalizedCountry(initialCode, 'ar'),
      countryCode: initialCode,
      flag: getFlagEmoji(initialCode),
      flagUrl: `https://flagcdn.com/w80/${initialCode.toLowerCase()}.png`,
    };

    const tags = cleanTags(handshake.query.interests);

    console.log(`[Socket Connected] ${socket.id} | ${partnerInfo.countryCode} | Tags:`, tags);

    // Enqueue newly connected user
    waitingQueue.push({
      socketId: socket.id,
      socket,
      tags,
      joinedAt: Date.now(),
      partnerInfo,
    });

    processQueue();

    // Client sends updated info
    socket.on('update_client_info', (data: { country?: string; countryCode?: string; tags?: string[] }) => {
      if (data.countryCode && data.countryCode.length === 2) {
        partnerInfo.countryCode = data.countryCode.toUpperCase();
        partnerInfo.country = data.country || getLocalizedCountry(partnerInfo.countryCode, 'ar');
        partnerInfo.flag = getFlagEmoji(partnerInfo.countryCode);
        partnerInfo.flagUrl = `https://flagcdn.com/w80/${partnerInfo.countryCode.toLowerCase()}.png`;
      }
      if (data.tags) {
        const qUser = waitingQueue.find(u => u.socketId === socket.id);
        if (qUser) {
          qUser.tags = cleanTags(data.tags);
          qUser.partnerInfo = partnerInfo;
        }
      }
      const roomId = socketToRoom.get(socket.id);
      if (roomId) {
        socket.to(roomId).emit('partner_location_updated', partnerInfo);
      }
    });

    // Skip to next partner
    socket.on('skip', (data?: { interests?: any }) => {
      leaveRoom(socket);
      removeFromQueue(socket.id);

      const updatedTags = data?.interests ? cleanTags(data.interests) : tags;
      waitingQueue.push({
        socketId: socket.id,
        socket,
        tags: updatedTags,
        joinedAt: Date.now(),
        partnerInfo,
      });

      processQueue();
    });

    // WebRTC Signaling
    socket.on('offer', (data: any) => {
      const targetRoom = data?.roomId || socketToRoom.get(socket.id);
      const offer = data?.offer || data;
      if (targetRoom && offer) {
        socket.to(targetRoom).emit('offer', offer);
      }
    });

    socket.on('answer', (data: any) => {
      const targetRoom = data?.roomId || socketToRoom.get(socket.id);
      const answer = data?.answer || data;
      if (targetRoom && answer) {
        socket.to(targetRoom).emit('answer', answer);
      }
    });

    socket.on('ice_candidate', (data: any) => {
      const targetRoom = data?.roomId || socketToRoom.get(socket.id);
      const candidate = data?.candidate || data;
      if (targetRoom && candidate) {
        socket.to(targetRoom).emit('ice_candidate', candidate);
      }
    });

    // Text Chat & Status (Single emission with unique message id)
    socket.on('text_message', (data: any) => {
      const targetRoom = data?.roomId || socketToRoom.get(socket.id);
      const text = typeof data === 'string' ? data : (data?.text || data?.message || '');
      const id = data?.id || `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      if (targetRoom && text) {
        socket.to(targetRoom).emit('text_message', { text, id });
      }
    });

    socket.on('chat_message', (data: any) => {
      const targetRoom = data?.roomId || socketToRoom.get(socket.id);
      const text = typeof data === 'string' ? data : (data?.text || data?.message || '');
      const id = data?.id || `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      if (targetRoom && text) {
        socket.to(targetRoom).emit('text_message', { text, id });
      }
    });

    socket.on('typing_start', (data: any) => {
      const targetRoom = data?.roomId || socketToRoom.get(socket.id);
      if (targetRoom) {
        socket.to(targetRoom).emit('partner_typing_start');
      }
    });

    socket.on('typing_stop', (data: any) => {
      const targetRoom = data?.roomId || socketToRoom.get(socket.id);
      if (targetRoom) {
        socket.to(targetRoom).emit('partner_typing_stop');
      }
    });

    socket.on('leave', () => {
      removeFromQueue(socket.id);
      leaveRoom(socket);
    });

    socket.on('stop', () => {
      removeFromQueue(socket.id);
      leaveRoom(socket);
    });

    // Report Partner - Fair strike system (prevents malicious/false reports from banning innocent users)
    socket.on('report_partner', (data: { reason?: string }) => {
      const roomId = socketToRoom.get(socket.id);
      if (!roomId) return;
      const room = activeRooms.get(roomId);
      if (!room) return;
      const partnerSocket = room.user1.id === socket.id ? room.user2 : room.user1;
      const partnerIp = socketToIP.get(partnerSocket.id);
      const reporterIp = socketToIP.get(socket.id);

      console.warn(`[Report Received] Reporter: ${reporterIp}, Partner: ${partnerIp}, Reason:`, data?.reason);

      if (reporterIp && partnerIp) {
        // Record report with protection against false accusations
        const result = recordUserReport(reporterIp, partnerIp, data?.reason || 'Inappropriate Behavior');
        if (result.actionTaken && result.record) {
          console.warn(`[Report Consensus Ban] IP ${partnerIp} banned after reaching 3 independent reports.`);
          disconnectAndBanIP(partnerIp, result.record.reason, result.record.durationMinutes);
        }
      }

      leaveRoom(socket);
      removeFromQueue(socket.id);
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`[Socket Disconnected] ${socket.id}`);
      removeFromQueue(socket.id);
      leaveRoom(socket);

      // Clean up IP mappings
      const ip = socketToIP.get(socket.id);
      if (ip) {
        const sockSet = ipToSockets.get(ip);
        if (sockSet) {
          sockSet.delete(socket);
          if (sockSet.size === 0) {
            ipToSockets.delete(ip);
          }
        }
        socketToIP.delete(socket.id);
      }
    });
  });

  return { io, close: () => clearInterval(intervalId) };
}
