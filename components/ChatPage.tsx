import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
import { io, Socket } from 'socket.io-client';
import type { Message } from '../types';
import { 
  SendIcon, 
  OmeGodLogoIcon, 
  ReportIcon, 
  VolumeUpIcon, 
  VolumeOffIcon, 
  MicrophoneIcon, 
  MicrophoneOffIcon, 
  VideoCameraIcon, 
  VideoOffIcon,
  GlobeIcon,
  CheckmarkIcon
} from './icons/Icons'; 
import ThemeSwitcher from './ThemeSwitcher';
import AgeConsentModal from './AgeConsentModal';
import BannedScreen, { BanDetails } from './BannedScreen';

const PEER_CONNECTION_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun.relay.metered.ca:80" },
    {
      urls: "turn:standard.relay.metered.ca:80",
      username: "ef2f0df010e8bc9fa581da0a",
      credential: "tsx5rMxvzzwKZpHZ",
    },
    {
      urls: "turn:standard.relay.metered.ca:80?transport=tcp",
      username: "ef2f0df010e8bc9fa581da0a",
      credential: "tsx5rMxvzzwKZpHZ",
    },
    {
      urls: "turn:standard.relay.metered.ca:443",
      username: "ef2f0df010e8bc9fa581da0a",
      credential: "tsx5rMxvzzwKZpHZ",
    },
    {
      urls: "turns:standard.relay.metered.ca:443?transport=tcp",
      username: "ef2f0df010e8bc9fa581da0a",
      credential: "tsx5rMxvzzwKZpHZ",
    },
  ],
  iceCandidatePoolSize: 10,
};

// Helper to convert 2-letter ISO country code into flag emoji
function getFlagEmoji(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  try {
    const code = countryCode.toUpperCase();
    return String.fromCodePoint(...[...code].map(c => 127397 + c.charCodeAt(0)));
  } catch {
    return '🌐';
  }
}

// Helper to get localized country name in current language
function getLocalizedCountryName(countryCode: string, lang = 'en'): string {
  if (!countryCode || countryCode.length !== 2) return 'Unknown Country';
  try {
    const dn = new Intl.DisplayNames([lang, 'en'], { type: 'region' });
    return dn.of(countryCode.toUpperCase()) || countryCode;
  } catch {
    return countryCode;
  }
}

interface PartnerInfo {
  country: string;
  countryCode: string;
  flag?: string;
  flagUrl?: string;
}

const ChatPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const strangerVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const roomIdRef = useRef<string | null>(null);
  const iceCandidateQueueRef = useRef<RTCIceCandidateInit[]>([]);
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [chatState, setChatState] = useState<'idle' | 'starting' | 'active'>('idle');
  const chatStateRef = useRef<'idle' | 'starting' | 'active'>('idle');
  useEffect(() => {
    chatStateRef.current = chatState;
  }, [chatState]);

  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isRetryingCamera, setIsRetryingCamera] = useState(false);
  const [dismissPermissionWarning, setDismissPermissionWarning] = useState(false);
  const [isHowToModalOpen, setIsHowToModalOpen] = useState(false);
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [banDetails, setBanDetails] = useState<BanDetails | null>(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isStopConfirm, setIsStopConfirm] = useState(false);
  const stopConfirmTimerRef = useRef<number | null>(null);
  const hasAutoStartedRef = useRef(false);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);
  const [isPartnerMuted, setIsPartnerMuted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isStrangerVideoPlaying, setIsStrangerVideoPlaying] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);
  const simulatedAnimationRef = useRef<number | null>(null);
  const lastSkipTimeRef = useRef<number>(0);

  // Realistic organic online users counter with natural live fluctuations
  const [onlineCount, setOnlineCount] = useState<number>(() => {
    const base = 25840;
    const offset = Math.floor((Math.random() - 0.5) * 600);
    return base + offset;
  });
  const [tickChange, setTickChange] = useState<number | null>(null);

  useEffect(() => {
    let timeoutId: number;

    const scheduleTick = () => {
      // Natural human random interval: 2.5s to 4.8s
      const delay = 2500 + Math.random() * 2300;
      timeoutId = window.setTimeout(() => {
        setOnlineCount(prev => {
          // 53% chance of + users, 47% chance of - users
          const isUp = Math.random() < 0.53;
          // Step varies between 1 and 4 (occasionally 5 or 6)
          const magnitude = Math.random() < 0.85 
            ? Math.floor(Math.random() * 4) + 1 
            : Math.floor(Math.random() * 3) + 4;
          const delta = isUp ? magnitude : -magnitude;

          // Keep within realistic high-traffic bounds (23,000 to 29,500)
          let next = prev + delta;
          if (next < 23200) next = prev + Math.abs(delta);
          if (next > 29400) next = prev - Math.abs(delta);

          setTickChange(delta);
          setTimeout(() => setTickChange(null), 1200);

          return next;
        });

        scheduleTick();
      }, delay);
    };

    scheduleTick();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Enlarged / Main Screen selection: 'stranger' (default) | 'you'
  const [enlargedScreen, setEnlargedScreen] = useState<'stranger' | 'you'>(() => {
    try {
      const stored = window.localStorage.getItem('omegod-enlarged-screen');
      if (stored === 'stranger' || stored === 'you') return stored;
    } catch {}
    return 'stranger';
  });

  const toggleEnlargedScreen = () => {
    setEnlargedScreen(prev => {
      const next = prev === 'stranger' ? 'you' : 'stranger';
      try {
        window.localStorage.setItem('omegod-enlarged-screen', next);
      } catch {}
      return next;
    });
  };

  const handleSelectEnlargedScreen = (choice: 'stranger' | 'you') => {
    setEnlargedScreen(choice);
    try {
      window.localStorage.setItem('omegod-enlarged-screen', choice);
    } catch {}
  };

  // Picture-in-Picture state & dragging (Snapchat / FaceTime style)
  const stageRef = useRef<HTMLDivElement>(null);
  const [pipCoords, setPipCoords] = useState<{ x: number; y: number } | null>(null);
  const [isDraggingPip, setIsDraggingPip] = useState(false);
  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    initLeft: number;
    initTop: number;
    width: number;
    height: number;
    stageWidth: number;
    stageHeight: number;
  } | null>(null);

  const [pipPosition, setPipPosition] = useState<'top-end' | 'bottom-end' | 'top-start' | 'bottom-start'>('top-end');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const togglePipPosition = () => {
    setPipCoords(null);
    setPipPosition(prev => {
      if (prev === 'top-end') return 'bottom-end';
      if (prev === 'bottom-end') return 'bottom-start';
      if (prev === 'bottom-start') return 'top-start';
      return 'top-end';
    });
  };

  const handlePipPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // If clicked on a button inside the PiP header, let the button handle it
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;

    const pipEl = e.currentTarget;
    const pipRect = pipEl.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    const initLeft = pipRect.left - stageRect.left;
    const initTop = pipRect.top - stageRect.top;

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initLeft,
      initTop,
      width: pipRect.width,
      height: pipRect.height,
      stageWidth: stageRect.width,
      stageHeight: stageRect.height,
    };

    try {
      pipEl.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePipPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const { startX, startY, initLeft, initTop, width, height, stageWidth, stageHeight } = dragStartRef.current;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    if (!isDraggingPip && Math.hypot(deltaX, deltaY) > 3) {
      setIsDraggingPip(true);
    }

    const margin = 8;
    const minX = margin;
    const maxX = Math.max(margin, stageWidth - width - margin);
    const minY = margin;
    const maxY = Math.max(margin, stageHeight - height - margin);

    const clampedX = Math.max(minX, Math.min(initLeft + deltaX, maxX));
    const clampedY = Math.max(minY, Math.min(initTop + deltaY, maxY));

    setPipCoords({ x: clampedX, y: clampedY });
  };

  const handlePipPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      dragStartRef.current = null;
      setTimeout(() => setIsDraggingPip(false), 50);
    }
  };

  // Keep PiP constrained within stage bounds when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (!stageRef.current || !pipCoords) return;
      const stageRect = stageRef.current.getBoundingClientRect();
      const margin = 8;
      const approxW = Math.min(208, stageRect.width * 0.35);
      const approxH = approxW * 0.75;
      const maxX = Math.max(margin, stageRect.width - approxW - margin);
      const maxY = Math.max(margin, stageRect.height - approxH - margin);
      setPipCoords(prev => {
        if (!prev) return null;
        return {
          x: Math.max(margin, Math.min(prev.x, maxX)),
          y: Math.max(margin, Math.min(prev.y, maxY)),
        };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pipCoords]);

  // Keep video streams continuously attached when enlarged screen changes
  useEffect(() => {
    if (myVideoRef.current && localStreamRef.current && myVideoRef.current.srcObject !== localStreamRef.current) {
      myVideoRef.current.srcObject = localStreamRef.current;
      myVideoRef.current.play().catch(() => {});
    }
    if (strangerVideoRef.current && remoteStreamRef.current && strangerVideoRef.current.srcObject !== remoteStreamRef.current) {
      strangerVideoRef.current.srcObject = remoteStreamRef.current;
      strangerVideoRef.current.play().catch(() => {});
    }
  }, [enlargedScreen]);

  // Geo / Country State
  const [myCountryInfo, setMyCountryInfo] = useState<PartnerInfo>({
    country: 'Morocco',
    countryCode: 'MA',
    flag: '🇲🇦',
    flagUrl: 'https://flagcdn.com/w80/ma.png',
  });

  // Dynamically localized country names that respect current selected language
  const myCountryName = useMemo(() => {
    return getLocalizedCountryName(myCountryInfo.countryCode, i18n.language) || myCountryInfo.country;
  }, [myCountryInfo, i18n.language]);

  const partnerCountryName = useMemo(() => {
    if (!partnerInfo) return '';
    if (partnerInfo.countryCode) {
      return getLocalizedCountryName(partnerInfo.countryCode, i18n.language) || partnerInfo.country;
    }
    return partnerInfo.country || '';
  }, [partnerInfo, i18n.language]);

  // Tags / Interests State
  const [interests, setInterests] = useState<string[]>(() => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const queryInterests = searchParams.get('interests');
      if (queryInterests) {
        return queryInterests.split(',').map(s => s.trim().toLowerCase().replace(/^#+/, '')).filter(Boolean);
      }
      const stored = window.localStorage.getItem('omegod-interests');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [newTagInput, setNewTagInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [searchDurationSeconds, setSearchDurationSeconds] = useState(0);

  const reportReasons: string[] = useMemo(
    () => t('chat.reportReasons', { returnObjects: true }) as string[],
    [t]
  );

  // Sync interests to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem('omegod-interests', JSON.stringify(interests));
    } catch {}
  }, [interests]);

  // Track search duration to inform the user about broadening the search
  useEffect(() => {
    let interval: number | null = null;
    if (chatState === 'starting') {
      setSearchDurationSeconds(0);
      interval = window.setInterval(() => {
        setSearchDurationSeconds(s => s + 1);
      }, 1000);
    } else {
      setSearchDurationSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [chatState]);

  // Fast Geo-IP Detection for the client's real country
  useEffect(() => {
    let isMounted = true;

    async function detectCountry() {
      // 1. Try our own backend API
      try {
        const res = await fetch('/api/geoip');
        if (res.ok) {
          const data = await res.json();
          if (data.countryCode && data.countryCode.length === 2 && data.countryCode !== 'XX') {
            const code = data.countryCode.toUpperCase();
            const countryName = getLocalizedCountryName(code, i18n.language);
            if (isMounted) {
              setMyCountryInfo({
                countryCode: code,
                country: countryName,
                flag: getFlagEmoji(code),
                flagUrl: `https://flagcdn.com/w80/${code.toLowerCase()}.png`,
              });
              if (socketRef.current && socketRef.current.connected) {
                socketRef.current.emit('update_client_info', { countryCode: code, country: countryName });
              }
            }
            return;
          }
        }
      } catch (err) {
        console.warn('Backend geoip check failed, trying fallback', err);
      }

      // 2. Fallback to free public country.is
      try {
        const res = await fetch('https://api.country.is/');
        if (res.ok) {
          const data = await res.json();
          if (data.country && data.country.length === 2) {
            const code = data.country.toUpperCase();
            const countryName = getLocalizedCountryName(code, i18n.language);
            if (isMounted) {
              setMyCountryInfo({
                countryCode: code,
                country: countryName,
                flag: getFlagEmoji(code),
                flagUrl: `https://flagcdn.com/w80/${code.toLowerCase()}.png`,
              });
              if (socketRef.current && socketRef.current.connected) {
                socketRef.current.emit('update_client_info', { countryCode: code, country: countryName });
              }
            }
            return;
          }
        }
      } catch (err) {
        console.warn('Public geoip check failed', err);
      }
    }

    detectCountry();

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  const connectToStranger = useCallback(() => {
    setChatState('active');
  }, []);

  const cleanupWebRTC = useCallback(() => {
    if (simulatedAnimationRef.current) {
      cancelAnimationFrame(simulatedAnimationRef.current);
      simulatedAnimationRef.current = null;
    }
    setPartnerInfo(null);
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setIsStrangerVideoPlaying(false);
    remoteStreamRef.current = null;
    if (strangerVideoRef.current) {
      const video = strangerVideoRef.current;
      video.onplaying = null;
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      video.srcObject = null;
      video.removeAttribute("src");
      video.load();
    }
    roomIdRef.current = null;
  }, []);

  const stopCamera = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
      if (myVideoRef.current) myVideoRef.current.srcObject = null;
    }
  }, []);

  const startUserCamera = useCallback(async () => {
    setIsRetryingCamera(true);
    setError(null);
    setPermissionDenied(false);
    setIsCameraInitialized(false);
    setIsMuted(false);
    try {
      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            aspectRatio: { ideal: 4 / 3 }
          }, 
          audio: true 
        });
      } catch {
        // Fallback: Try video only (no microphone)
        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: {
              width: { ideal: 640 },
              height: { ideal: 480 },
              aspectRatio: { ideal: 4 / 3 }
            }, 
            audio: false 
          });
        } catch {
          // Fallback: Try audio only
          try {
            stream = await navigator.mediaDevices.getUserMedia({ 
              video: false, 
              audio: true 
            });
          } catch (micErr) {
            throw micErr;
          }
        }
      }

      if (stream) {
        localStreamRef.current = stream;
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
        setDismissPermissionWarning(false);
      }
      setIsCameraInitialized(true);
    } catch (err: any) {
      console.warn("Camera/Mic device access unavailable:", err);
      // Create an animated fallback canvas stream so user can always participate
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, 0, 640, 480);
          ctx.fillStyle = '#f43f5e';
          ctx.font = 'bold 28px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('You (Audio / Chat Mode)', 320, 230);
          ctx.fillStyle = '#94a3b8';
          ctx.font = '16px system-ui, sans-serif';
          ctx.fillText('Webcam inactive', 320, 265);
        }
        const canvasStream = canvas.captureStream(10);
        localStreamRef.current = canvasStream;
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = canvasStream;
        }
      } catch {}

      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setPermissionDenied(true);
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setError(t('chat.errorNoCamera'));
        } else {
          setError(t('chat.errorGeneric', { errorName: err.name }));
        }
      } else {
        setError(t('chat.errorUnknown'));
      }
      // Never block the user from chatting
      setIsCameraInitialized(true);
    } finally {
      setIsRetryingCamera(false);
    }
  }, [t]);

  // Listen to browser permission state changes (e.g. if user enables camera from address bar)
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'camera' as PermissionName }).then((status) => {
        status.onchange = () => {
          if (status.state === 'granted') {
            startUserCamera();
          }
        };
      }).catch(() => {});
    }
  }, [startUserCamera]);

  const createPeerConnection = useCallback((roomId: string): RTCPeerConnection | undefined => {
    if (peerConnectionRef.current) {
      try {
        peerConnectionRef.current.close();
      } catch {}
      peerConnectionRef.current = null;
    }
    iceCandidateQueueRef.current = [];
    roomIdRef.current = roomId; // CRITICAL: maintain current roomId!

    try {
      const pc = new RTCPeerConnection(PEER_CONNECTION_CONFIG);

      pc.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit('ice_candidate', { roomId: roomIdRef.current || roomId, candidate: event.candidate });
        }
      };

      pc.ontrack = (event) => {
        let stream = event.streams && event.streams[0];
        if (!stream) {
          if (!remoteStreamRef.current) {
            remoteStreamRef.current = new MediaStream();
          }
          remoteStreamRef.current.addTrack(event.track);
          stream = remoteStreamRef.current;
        } else {
          remoteStreamRef.current = stream;
        }

        if (strangerVideoRef.current) {
          strangerVideoRef.current.srcObject = stream;
          setIsStrangerVideoPlaying(true);
          const playPromise = strangerVideoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(playError => {
              console.warn("Auto-play notice on remote video:", playError);
            });
          }
        }
      };

      const handlePeerDisconnected = () => {
        if (chatStateRef.current === 'active') {
          findNewPartnerRef.current?.(false);
        }
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'connected') {
          setIsStrangerVideoPlaying(true);
        } else if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
          handlePeerDisconnected();
        } else if (pc.connectionState === 'disconnected') {
          // If connection remains disconnected after brief 1.5s grace period, treat as partner left
          setTimeout(() => {
            if (peerConnectionRef.current && (peerConnectionRef.current.connectionState === 'disconnected' || peerConnectionRef.current.connectionState === 'failed')) {
              handlePeerDisconnected();
            }
          }, 1500);
        }
      };

      pc.oniceconnectionstatechange = () => {
        if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
          setIsStrangerVideoPlaying(true);
        } else if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'closed') {
          handlePeerDisconnected();
        } else if (pc.iceConnectionState === 'disconnected') {
          setTimeout(() => {
            if (peerConnectionRef.current && (peerConnectionRef.current.iceConnectionState === 'disconnected' || peerConnectionRef.current.iceConnectionState === 'failed')) {
              handlePeerDisconnected();
            }
          }, 1500);
        }
      };

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStreamRef.current!);
        });
      }

      peerConnectionRef.current = pc;
      return pc;
    } catch (e) {
      console.error('Failed to create Peer Connection', e);
      setError('Failed to create video connection.');
      return undefined;
    }
  }, []);

  const findNewPartnerRef = useRef<((isUserInitiated: boolean) => void) | null>(null);
  const playMessageNotificationSoundRef = useRef<(() => void) | null>(null);

  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem('omegod-sound-enabled') !== 'false';
    } catch {
      return true;
    }
  });

  const playMessageNotificationSound = useCallback(() => {
    if (!isSoundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const volume = 0.25;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, now);
      masterGain.connect(ctx.destination);

      // Tone 1: Gentle initial marimba/bell tap (C6: 1046.5 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046.5, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.7, now + 0.012);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start(now);
      osc1.stop(now + 0.14);

      // Tone 2: Warm cheerful harmonic chime (G6: 1567.98 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1567.98, now + 0.075);
      gain2.gain.setValueAtTime(0, now + 0.075);
      gain2.gain.linearRampToValueAtTime(1.0, now + 0.09);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now + 0.075);
      osc2.stop(now + 0.45);

      // Tone 3: Sparkling crystal overtone (C7: 2093 Hz)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(2093, now + 0.095);
      gain3.gain.setValueAtTime(0, now + 0.095);
      gain3.gain.linearRampToValueAtTime(0.28, now + 0.11);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
      osc3.connect(gain3);
      gain3.connect(masterGain);
      osc3.start(now + 0.095);
      osc3.stop(now + 0.40);

      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 550);
    } catch (err) {
      console.debug('Notification sound skipped:', err);
    }
  }, [isSoundEnabled]);

  useEffect(() => {
    playMessageNotificationSoundRef.current = playMessageNotificationSound;
  }, [playMessageNotificationSound]);

  const setupSocketListeners = useCallback((socket: Socket) => {
    socket.on('room_found', async ({ 
      roomId, 
      partnerInfo, 
      commonInterests 
    }: { 
      roomId: string; 
      partnerInfo?: PartnerInfo; 
      commonInterests?: string[];
    }) => {
      setPartnerInfo(partnerInfo || null);
      roomIdRef.current = roomId;

      // If simulated partner, create animated 4:3 canvas stream
      if (roomId.startsWith('simulated_') && strangerVideoRef.current) {
        if (simulatedAnimationRef.current) {
          cancelAnimationFrame(simulatedAnimationRef.current);
          simulatedAnimationRef.current = null;
        }
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 640;
          canvas.height = 480;
          const ctx = canvas.getContext('2d');
          let frame = 0;
          const pFlag = partnerInfo?.flag || getFlagEmoji(partnerInfo?.countryCode);
          const getPCountry = () => {
            if (partnerInfo?.countryCode) {
              return getLocalizedCountryName(partnerInfo.countryCode, i18n.language) || partnerInfo.country;
            }
            return partnerInfo?.country || 'Stranger';
          };

          const drawLoop = () => {
            if (!ctx) return;
            frame++;
            const isDark = document.documentElement.classList.contains('dark');

            // Light mode: clean light silver TV screen / Dark mode: deep dark TV screen
            ctx.fillStyle = isDark ? '#090a10' : '#f1f5f9';
            ctx.fillRect(0, 0, 640, 480);

            // Subtle TV scanlines on canvas
            ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.025)';
            for (let y = 0; y < 480; y += 4) {
              ctx.fillRect(0, y, 640, 2);
            }

            // Subtle TV static noise particles
            for (let i = 0; i < 35; i++) {
              const nx = Math.random() * 640;
              const ny = Math.random() * 480;
              ctx.fillStyle = isDark 
                ? (Math.random() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.35)')
                : (Math.random() > 0.5 ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.6)');
              ctx.fillRect(nx, ny, 2 + Math.random() * 3, 1);
            }

            // Subtle circle avatar
            ctx.fillStyle = isDark ? '#161922' : '#ffffff';
            ctx.beginPath();
            ctx.arc(320, 210, 64, 0, Math.PI * 2);
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = isDark ? '#27272a' : '#cbd5e1';
            ctx.stroke();

            // Flag Emoji
            ctx.font = '54px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(pFlag, 320, 210);

            // Country name with high contrast in active language
            ctx.fillStyle = isDark ? '#9ca3af' : '#475569';
            ctx.font = '600 18px system-ui, -apple-system, sans-serif';
            ctx.fillText(getPCountry(), 320, 305);

            simulatedAnimationRef.current = requestAnimationFrame(drawLoop);
          };

          drawLoop();

          const stream = canvas.captureStream(25);
          remoteStreamRef.current = stream;
          strangerVideoRef.current.srcObject = stream;
          strangerVideoRef.current.play().then(() => {
            setIsStrangerVideoPlaying(true);
          }).catch(() => {});
        } catch (e) {
          console.error('Failed to capture canvas stream', e);
        }
      }

      const pc = !roomId.startsWith('simulated_') ? createPeerConnection(roomId) : undefined;

      const newMessagesList: Message[] = [];
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // 1. Tag matching announcement (Omegle style)
      if (commonInterests && commonInterests.length > 0) {
        newMessagesList.push({
          sender: 'system',
          text: t('chat.commonInterestsFound', { tags: commonInterests.map(t => '#' + t).join(', ') }),
          timestamp,
          commonInterests,
          isMatchNotification: true,
        });
      } else if (interests.length > 0) {
        newMessagesList.push({
          sender: 'system',
          text: t('chat.noCommonInterestsFound'),
          timestamp,
        });
      } else {
        newMessagesList.push({
          sender: 'system',
          text: t('chat.randomStrangerConnected'),
          timestamp,
        });
      }

      // 2. Country announcement (discreet, clean)
      if (partnerInfo && partnerInfo.countryCode && partnerInfo.countryCode !== 'XX') {
        const countryCode = partnerInfo.countryCode.toUpperCase();
        const localizedCountry = getLocalizedCountryName(countryCode, i18n.language) || partnerInfo.country;
        const flagEmoji = partnerInfo.flag || getFlagEmoji(countryCode);

        newMessagesList.push({
          sender: 'system',
          text: t('chat.strangerCountry', { country: `${localizedCountry} ${flagEmoji}` }),
          timestamp,
        });
      }

      setMessages(newMessagesList);

      connectToStranger();

      if (!pc) return;

      const ids = roomId.split('#');
      const isCaller = ids[0] === socket.id;

      if (isCaller) {
        try {
          const offer = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          });
          await pc.setLocalDescription(offer);
          socket.emit('offer', { roomId, offer });
        } catch (e) {
          console.error("Error creating offer:", e);
        }
      }
    });

    socket.on('offer', async (offer: RTCSessionDescriptionInit) => {
      let pc = peerConnectionRef.current;
      if (!pc && roomIdRef.current) {
        pc = createPeerConnection(roomIdRef.current);
      }
      if (pc) {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(offer));
          while (iceCandidateQueueRef.current.length > 0) {
            const candidate = iceCandidateQueueRef.current.shift();
            if (candidate && pc.signalingState !== 'closed') {
              try {
                await pc.addIceCandidate(new RTCIceCandidate(candidate));
              } catch (e) {
                console.error("Error adding queued ice candidate from offer handler", e);
              }
            }
          }
          const answer = await pc.createAnswer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          });
          await pc.setLocalDescription(answer);
          socket.emit('answer', { roomId: roomIdRef.current, answer });
        } catch (e) {
          console.error("Error handling offer:", e);
        }
      }
    });

    socket.on('answer', async (answer: RTCSessionDescriptionInit) => {
      const pc = peerConnectionRef.current;
      if (pc) {
        try {
          if (pc.signalingState === 'have-local-offer') {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
          }
          while (iceCandidateQueueRef.current.length > 0) {
            const candidate = iceCandidateQueueRef.current.shift();
            if (candidate && pc.signalingState !== 'closed') {
              try {
                await pc.addIceCandidate(new RTCIceCandidate(candidate));
              } catch (e) {
                console.error("Error adding queued ice candidate from answer handler", e);
              }
            }
          }
        } catch (e) {
          console.error("Error setting remote description for answer:", e);
        }
      }
    });

    socket.on('ice_candidate', async (candidate: RTCIceCandidateInit) => {
      const pc = peerConnectionRef.current;
      if (!pc || !candidate || pc.signalingState === 'closed') return;

      try {
        if (pc.remoteDescription) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
          iceCandidateQueueRef.current.push(candidate);
        }
      } catch (e) {
        console.error('Error adding received ice candidate', e);
      }
    });
    
    const seenMessageIds = new Set<string>();
    let lastMsgText = '';
    let lastMsgTime = 0;

    const handleIncomingMessage = (payload: any) => {
      const msgText = typeof payload === 'string' ? payload : (payload?.text || payload?.message || '');
      const msgId = payload?.id || '';
      if (!msgText) return;

      const now = Date.now();
      if (msgId && seenMessageIds.has(msgId)) return;
      if (msgId) {
        seenMessageIds.add(msgId);
        if (seenMessageIds.size > 200) {
          const first = seenMessageIds.values().next().value;
          if (first) seenMessageIds.delete(first);
        }
      }
      if (lastMsgText === msgText && (now - lastMsgTime) < 500) return;
      lastMsgText = msgText;
      lastMsgTime = now;

      const newMessage: Message = {
        sender: 'stranger',
        text: msgText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMessage]);
      playMessageNotificationSoundRef.current?.();
      setUnreadCount(prev => prev + 1);
    };

    socket.on('text_message', handleIncomingMessage);
    
    socket.on('partner_typing_start', () => setIsPartnerTyping(true));
    socket.on('partner_typing_stop', () => setIsPartnerTyping(false));

    socket.on('partner_left', () => {
      setIsPartnerTyping(false);
      setPartnerInfo(null);
      findNewPartnerRef.current?.(false);
    });

    socket.on('partner_location_updated', (info: PartnerInfo) => {
      if (info && info.countryCode && info.countryCode !== 'XX') {
        setPartnerInfo(info);
        const countryCode = info.countryCode.toUpperCase();
        const localizedCountry = getLocalizedCountryName(countryCode, i18n.language) || info.country;
        const flagUrl = info.flagUrl || `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;

        setMessages(prev => [
          ...prev,
          {
            sender: 'system',
            text: t('chat.strangerCountry', { country: `${localizedCountry} ${getFlagEmoji(countryCode)}` }),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            location: {
              country: localizedCountry,
              countryCode,
              flag: flagUrl,
            }
          }
        ]);
      }
    });

    socket.on('banned', (data: any) => {
      console.warn('[Socket Event] User has been banned:', data);
      setIsBanned(true);
      setBanDetails(data);
      localStorage.setItem('omegod_banned_info', JSON.stringify(data));
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      cleanupWebRTC();
      socket.disconnect();
    });

    socket.on('connect_error', (err) => {
      console.warn('Socket connect error:', err.message);
      setError(`Connection notice: ${err.message}. Retrying...`);
    });

  }, [createPeerConnection, connectToStranger, t, i18n.language, interests]);

  const handleStopAll = useCallback(() => {
    hasAutoStartedRef.current = true;
    cleanupWebRTC();
    if (socketRef.current) {
      try {
        socketRef.current.disconnect();
      } catch {}
      socketRef.current = null;
    }
    setChatState('idle');
    setMessages([]);
    setIsStopConfirm(false);
    if (stopConfirmTimerRef.current) {
      clearTimeout(stopConfirmTimerRef.current);
      stopConfirmTimerRef.current = null;
    }
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('start')) {
        url.searchParams.delete('start');
        window.history.replaceState(null, '', url.pathname + (url.search ? url.search : ''));
      }
    } catch {}
  }, [cleanupWebRTC]);

  const handleStartChat = useCallback(() => {
    const hasAccepted = localStorage.getItem('omegod_age_terms_accepted') === 'true';
    if (!hasAccepted) {
      setIsAgeModalOpen(true);
      return;
    }

    if (socketRef.current && socketRef.current.connected) {
      setChatState('starting');
      setError(null);
      socketRef.current.emit('skip', { interests: interests.join(',') });
      return;
    }
    
    setChatState('starting');
    setError(null);

    // If deployed on Firebase Hosting (*.web.app / *.firebaseapp.com), route WebSocket connections to the Render backend.
    // Otherwise use window.location.origin (for Render, localhost, or AI Studio preview).
    const envSocketUrl = typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env.VITE_SOCKET_SERVER_URL : undefined;
    const serverUrl = 
      envSocketUrl ||
      (window.location.hostname.includes('web.app') || window.location.hostname.includes('firebaseapp.com')
        ? 'https://omegod.onrender.com'
        : window.location.origin);

    const socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      timeout: 30000,
      query: { 
        interests: interests.join(','),
        country: myCountryInfo.country,
        countryCode: myCountryInfo.countryCode,
      }
    });

    socketRef.current = socket;
    setupSocketListeners(socket); 
  }, [setupSocketListeners, interests, myCountryInfo]);

  const findNewPartner = useCallback((isUserInitiated: boolean) => {
    if (chatState === 'idle') {
      handleStartChat();
      return;
    }
    cleanupWebRTC();
    if (isUserInitiated) {
      setMessages([]);
    } else {
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'system', 
          text: t('chat.partnerLeft'), 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    }
    setChatState('starting');
    setIsPartnerTyping(false);
    setError(null);
    setIsPartnerMuted(false);
    
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('skip', { interests: interests.join(',') });
    } else {
      handleStartChat();
    }
  }, [chatState, cleanupWebRTC, handleStartChat, t, interests]);

  useEffect(() => {
    findNewPartnerRef.current = findNewPartner;
  }, [findNewPartner]);

  const handleStopClick = useCallback(() => {
    if (chatState !== 'active') {
      handleStopAll();
      return;
    }

    if (isStopConfirm) {
      if (stopConfirmTimerRef.current) {
        clearTimeout(stopConfirmTimerRef.current);
        stopConfirmTimerRef.current = null;
      }
      handleStopAll();
    } else {
      setIsStopConfirm(true);
      stopConfirmTimerRef.current = window.setTimeout(() => {
        setIsStopConfirm(false);
        stopConfirmTimerRef.current = null;
      }, 3000);
    }
  }, [chatState, isStopConfirm, handleStopAll]);

  const handleToggleMute = useCallback(() => {
    setIsPartnerMuted(prev => !prev);
  }, []);

  const handleToggleMuteSelf = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(prev => !prev);
    }
  }, []);

  const handleFlipCamera = useCallback(async () => {
    const nextFacing = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextFacing);
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(t => t.stop());
    }
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: nextFacing,
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: true
      });
      if (peerConnectionRef.current) {
        const senders = peerConnectionRef.current.getSenders();
        const videoSender = senders.find(s => s.track && s.track.kind === 'video');
        const newVideoTrack = newStream.getVideoTracks()[0];
        if (videoSender && newVideoTrack) {
          videoSender.replaceTrack(newVideoTrack);
        }
      }
      localStreamRef.current = newStream;
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = newStream;
        myVideoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.warn('Failed to switch camera facingMode:', err);
    }
  }, [facingMode]);

  useEffect(() => {
    if (strangerVideoRef.current) {
      strangerVideoRef.current.muted = isPartnerMuted;
    }
  }, [isPartnerMuted]);

  useEffect(() => {
    startUserCamera();
    return () => {
      stopCamera();
      cleanupWebRTC();
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [startUserCamera, stopCamera, cleanupWebRTC]);

  // Clean disconnect when user exits browser, closes tab, or leaves app on mobile
  useEffect(() => {
    const handleExit = () => {
      if (socketRef.current) {
        try {
          socketRef.current.emit('leave');
          socketRef.current.disconnect();
        } catch {}
      }
      cleanupWebRTC();
    };

    window.addEventListener('beforeunload', handleExit);
    window.addEventListener('pagehide', handleExit);
    return () => {
      window.removeEventListener('beforeunload', handleExit);
      window.removeEventListener('pagehide', handleExit);
    };
  }, [cleanupWebRTC]);

  // Auto-start chat ONLY ONCE when landing with start=true
  useEffect(() => {
    if (hasAutoStartedRef.current) return;
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('start') === 'true' && isCameraInitialized && chatState === 'idle') {
      hasAutoStartedRef.current = true;
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('start')) {
          url.searchParams.delete('start');
          window.history.replaceState(null, '', url.pathname + (url.search ? url.search : ''));
        }
      } catch {}
      handleStartChat();
    }
  }, [isCameraInitialized, chatState, location.search, handleStartChat]);
  
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isPartnerTyping]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isReportModalOpen || isHowToModalOpen) return;
      const target = event.target as HTMLElement | null;
      
      const isInput = Boolean(
        target && (
          target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' || 
          target.isContentEditable
        )
      );

      const isSpace = event.code === 'Space' || event.key === ' ' || event.key === 'Spacebar' || event.keyCode === 32;
      const isEscape = event.code === 'Escape' || event.key === 'Escape' || event.keyCode === 27;
      const isEnter = event.code === 'Enter' || event.key === 'Enter' || event.keyCode === 13;

      if (isSpace) {
        // If user is focused inside text input
        if (isInput) {
          const inputVal = (target as HTMLInputElement).value || '';
          // If the user has typed text, let them type normal space between words
          if (inputVal.trim().length > 0) {
            return;
          }
          // If the input is empty or only whitespace, Space means SKIP!
          event.preventDefault();
          (target as HTMLInputElement).value = '';
          setInputText('');
        } else {
          // Prevent browser window from scrolling down
          event.preventDefault();
        }

        // If a button is currently focused, blur it to prevent activating that button
        if (target && target.tagName === 'BUTTON') {
          target.blur();
        }

        // Throttle key repeat so holding Space doesn't spam emits
        const now = Date.now();
        if (now - lastSkipTimeRef.current < 200) return;
        lastSkipTimeRef.current = now;

        // Skip to next stranger, or start if currently idle
        if (chatState === 'idle') {
          handleStartChat();
        } else {
          findNewPartnerRef.current?.(true);
        }
      } else if (isEscape) {
        event.preventDefault();
        if (target && typeof target.blur === 'function') target.blur();
        handleStopAll();
      } else if (isEnter && !isInput && chatState === 'idle') {
        event.preventDefault();
        handleStartChat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chatState, isReportModalOpen, isHowToModalOpen, handleStartChat, handleStopAll]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    if (socketRef.current) {
      const activeRoom = roomIdRef.current;
      const messageId = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newMessage: Message = {
        sender: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, newMessage]);
      socketRef.current.emit('text_message', { roomId: activeRoom, text, id: messageId });
      setInputText('');
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      socketRef.current.emit('typing_stop', { roomId: activeRoom });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (!socketRef.current) return;
    const activeRoom = roomIdRef.current;
    if (!typingTimeoutRef.current) {
      socketRef.current.emit('typing_start', { roomId: activeRoom });
    } else {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = window.setTimeout(() => {
      socketRef.current?.emit('typing_stop', { roomId: activeRoom });
      typingTimeoutRef.current = null;
    }, 1500);
  };
  
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason) return;
    console.log('REPORT: User reported for:', reportReason);
    if (socketRef.current) {
      socketRef.current.emit('report_partner', { reason: reportReason });
    }
    setIsReportModalOpen(false);
    setReportReason('');
    findNewPartnerRef.current?.(true); 
  };

  // Initial check for active ban on page load
  useEffect(() => {
    const stored = localStorage.getItem('omegod_banned_info');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
          setIsBanned(true);
          setBanDetails(parsed);
        } else {
          localStorage.removeItem('omegod_banned_info');
        }
      } catch {}
    }

    fetch('/api/check-ban')
      .then((res) => res.json())
      .then((data) => {
        if (data.banned) {
          setIsBanned(true);
          const details: BanDetails = {
            ip: data.ip,
            reason: data.record?.reason || 'Violation of Community Guidelines',
            expiresAt: data.record?.expiresAt,
          };
          setBanDetails(details);
          localStorage.setItem('omegod_banned_info', JSON.stringify(details));
          if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((t) => t.stop());
          }
          cleanupWebRTC();
          socketRef.current?.disconnect();
        }
      })
      .catch(() => {});
  }, [cleanupWebRTC]);

  // Automated Real-Time AI Camera Stream Moderation (Anti-Nudity & Safety)
  useEffect(() => {
    if (chatState !== 'active' || isBanned) return;

    let isScanning = false;
    const moderationInterval = setInterval(async () => {
      if (isScanning || !myVideoRef.current) return;
      const video = myVideoRef.current;
      if (video.videoWidth === 0 || video.videoHeight === 0 || video.paused || video.ended) return;

      isScanning = true;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 240;
        canvas.height = 180;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, 240, 180);
          const frameBase64 = canvas.toDataURL('image/jpeg', 0.55);

          const res = await fetch('/api/moderate-frame', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ frameBase64 }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.violation && data.banned) {
              console.warn('[Safety Auto-Ban] AI Violation Detected on Camera:', data);
              if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track) => track.stop());
              }
              cleanupWebRTC();
              if (socketRef.current) {
                socketRef.current.disconnect();
              }
              setIsBanned(true);
              setBanDetails(data);
              localStorage.setItem('omegod_banned_info', JSON.stringify(data));
            }
          }
        }
      } catch (err) {
        // Silently continue
      } finally {
        isScanning = false;
      }
    }, 4500);

    return () => clearInterval(moderationInterval);
  }, [chatState, isBanned, cleanupWebRTC]);

  // Tag management handlers
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newTagInput.trim().toLowerCase().replace(/^#+/, '');
    if (clean && !interests.includes(clean)) {
      const updated = [...interests, clean];
      setInterests(updated);
      setNewTagInput('');
      setIsAddingTag(false);
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('update_client_info', { tags: updated });
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updated = interests.filter(t => t !== tagToRemove);
    setInterests(updated);
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('update_client_info', { tags: updated });
    }
  };

  // If user is actively banned, render unclosable BannedScreen
  if (isBanned) {
    return <BannedScreen banDetails={banDetails} />;
  }

  return (
    <div className="relative isolate flex flex-col h-[100dvh] max-h-[100dvh] p-1.5 sm:p-4 gap-2 sm:gap-4 overflow-hidden bg-[#fafafa] dark:bg-[#0c0d12] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Top Header (Original OmeGod Pink Branding, Online Badge, ThemeSwitcher, Report) */}
      <header className="flex flex-shrink-0 justify-between items-center px-1">
        <div className="flex items-center gap-2 sm:gap-3 flex-nowrap min-w-0">
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-800 dark:text-gray-100 border border-gray-300/60 dark:border-white/15 text-xs sm:text-sm font-semibold transition-all shadow-xs"
            title={i18n.language === 'ar' ? 'الرجوع للصفحة الرئيسية' : 'Back to Home'}
          >
            <span className="text-sm font-bold rtl:rotate-180">←</span>
            <span className="hidden sm:inline">{i18n.language === 'ar' ? 'الرئيسية' : 'Home'}</span>
          </Link>

          <Link to="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-2.5 text-brand-dark-text dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-lg p-1">
            <OmeGodLogoIcon className="h-7 w-7 text-pink-500" />
            <span className="text-2xl font-bold tracking-tight font-outfit">OmeGod</span>
          </Link>

          {/* Real-time Organic Online Users Badge in Green */}
          <div 
            className="flex-shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-[13px] font-semibold shadow-sm select-none"
            title={`${onlineCount.toLocaleString()} ${t('chat.onlineUsers')}`}
          >
            {/* Animated Pulsing Green Radar Dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>

            {/* Formatted Online Count */}
            <span className="font-bold tabular-nums tracking-wide text-emerald-600 dark:text-emerald-400">
              {onlineCount.toLocaleString()}
            </span>

            <span className="text-[11px] sm:text-xs text-emerald-600/90 dark:text-emerald-400/90 font-medium">
              {t('chat.onlineUsers')}
            </span>
          </div>
          
          {/* User's Detected Real Country Badge */}
          <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-xs text-gray-700 dark:text-gray-300 flex-shrink-0">
            <span className="text-sm">{myCountryInfo.flag}</span>
            <span className="font-medium text-[11px]">{myCountryName}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Enlarge Screen Selection Control in Header (Desktop only) */}
          <div className="hidden lg:flex items-center bg-gray-100 dark:bg-white/10 rounded-lg p-0.5 border border-gray-200 dark:border-white/15 text-xs shadow-sm">
            <button
              type="button"
              onClick={() => handleSelectEnlargedScreen('stranger')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all font-medium ${
                enlargedScreen === 'stranger'
                  ? 'bg-white dark:bg-pink-600 text-pink-600 dark:text-white shadow-sm font-bold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              title={i18n.language === 'ar' ? 'تكبير شاشة الغريب' : 'Enlarge stranger screen'}
            >
              <span>👤</span>
              <span className="hidden xs:inline">{t('chat.strangerLabel') || 'Stranger'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectEnlargedScreen('you')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all font-medium ${
                enlargedScreen === 'you'
                  ? 'bg-white dark:bg-pink-600 text-pink-600 dark:text-white shadow-sm font-bold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              title={i18n.language === 'ar' ? 'تكبير شاشتي' : 'Enlarge your screen'}
            >
              <span>📷</span>
              <span className="hidden xs:inline">{t('chat.youLabel') || 'You'}</span>
            </button>
          </div>

          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            disabled={chatState !== 'active'}
            className="flex-shrink-0 flex items-center justify-center p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-pink-600 dark:text-pink-400 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('chat.report')}
          >
            <ReportIcon />
            <span className="hidden sm:inline-block ms-2 text-sm">{t('chat.report')}</span>
          </button>
        </div>
      </header>

      {/* Main Content: Video Hero Left/Center, Compact Chat Right */}
      <main className="flex-grow flex flex-col lg:flex-row gap-2 sm:gap-3 min-h-0 overflow-hidden">
        
        {/* Videos Container: Full height tall stage with corner vertical PiP on mobile, Stage + PiP on desktop */}
        <div className="flex-grow min-w-0 flex flex-col items-center justify-between h-full min-h-0 w-full gap-2">
          {/* Main Stage */}
          <div ref={stageRef} className="w-full flex-grow min-h-0 relative rounded-3xl overflow-hidden shadow-2xl bg-zinc-950 border border-slate-200/80 dark:border-white/10 select-none flex items-center justify-center">

            {/* SCREEN 1: STRANGER (Takes full container) */}
            <div
              className="absolute inset-0 w-full h-full z-10 rounded-3xl overflow-hidden bg-zinc-950 flex items-center justify-center"
            >
              {/* Header Badges: Stranger & Country */}
              <div className="absolute top-3.5 sm:top-4 start-3.5 sm:start-4 z-20 flex items-center gap-2 select-none pointer-events-auto">
                {/* Stranger Pill */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white font-medium text-xs sm:text-sm shadow-md border border-white/10">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    isStrangerVideoPlaying 
                      ? 'bg-emerald-400 animate-pulse' 
                      : chatState === 'starting' 
                      ? 'bg-amber-400 animate-ping' 
                      : 'bg-gray-400'
                  }`} />
                  <span className="font-semibold">{t('chat.strangerLabel') || (i18n.language === 'ar' ? 'الغريب' : 'Stranger')}</span>
                </div>

                {/* Country Pill */}
                {partnerCountryName && chatState === 'active' && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/95 text-xs sm:text-sm font-medium shadow-md border border-white/10">
                    {partnerInfo?.countryCode && (
                      <span className="text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded bg-white/20 text-white leading-none">
                        {partnerInfo.countryCode.toUpperCase()}
                      </span>
                    )}
                    <span className="font-semibold">{partnerCountryName}</span>
                  </div>
                )}
              </div>

              {/* Stranger Video (Always connected) */}
              <video 
                ref={strangerVideoRef} 
                autoPlay 
                playsInline 
                onLoadedMetadata={() => {
                  setIsStrangerVideoPlaying(true);
                  strangerVideoRef.current?.play().catch(() => {});
                }}
                onPlay={() => setIsStrangerVideoPlaying(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isStrangerVideoPlaying ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}
              />

              {/* Idle / Stopped State - Beautiful Studio Welcome & Connect Screen */}
              {chatState === 'idle' && (
                <div className="absolute inset-0 z-10 select-none bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0b0f19] dark:from-[#090b10] dark:via-[#0e111a] dark:to-[#07090e] text-white flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
                  {/* Subtle Ambient Cosmic Glow */}
                  <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-pink-500/15 via-rose-500/10 to-indigo-500/15 blur-3xl pointer-events-none" />

                  {enlargedScreen === 'stranger' ? (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-lg mx-auto py-2">
                      
                      {/* Glowing 3D Glass Camera Icon Badge */}
                      <div className="relative mb-5 sm:mb-6">
                        {/* Outer pulsing glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 blur-xl opacity-40 animate-pulse" />
                        
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-pink-500/80 via-rose-500/80 to-orange-500/80 p-0.5 shadow-2xl shadow-pink-500/30">
                          <div className="w-full h-full bg-slate-900/90 backdrop-blur-xl rounded-[22px] flex items-center justify-center relative overflow-hidden">
                            {/* Inner ambient shine */}
                            <div className="absolute -top-6 -left-6 w-14 h-14 bg-white/15 rounded-full blur-md" />
                            <VideoCameraIcon className="w-9 h-9 sm:w-11 sm:h-11 text-pink-400 drop-shadow-md" />
                            <span className="absolute top-2 right-2 text-xs">✨</span>
                          </div>
                        </div>
                      </div>

                      {/* High-contrast Headline & Subtitle */}
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-outfit text-white tracking-tight leading-tight">
                        {i18n.language === 'ar' ? 'جاهز للتواصل مع شخص جديد؟' : 'Ready to Meet Someone New?'}
                      </h2>
                      
                      <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                        {i18n.language === 'ar' 
                          ? 'ابدأ محادثة فيديو مباشرة مع أشخاص حقيقيين من جميع أنحاء العالم بنقرة واحدة.' 
                          : 'Connect instantly via live HD video with verified real strangers from around the world.'}
                      </p>

                      {/* Interactive Primary CTA Button */}
                      <button
                        type="button"
                        onClick={handleStartChat}
                        className="mt-6 inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#ff1361] via-[#f72585] to-[#ff6b35] hover:from-[#ff0055] hover:to-[#ff5520] shadow-xl shadow-pink-500/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all font-outfit"
                      >
                        <span className="text-xl leading-none">▶</span>
                        <span>{i18n.language === 'ar' ? 'ابدأ المحادثة الآن' : 'Start Chatting Now'}</span>
                        <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold bg-white/20 rounded-md border border-white/30 text-white shadow-xs ms-1">
                          Space
                        </kbd>
                      </button>

                      {/* Quality & Trust Badges */}
                      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-md">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{i18n.language === 'ar' ? 'مجهول وآمن 100%' : '100% Anonymous'}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-md">
                          <span>⚡</span>
                          <span>{i18n.language === 'ar' ? 'مطابقة فورية' : 'Instant Match'}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-md">
                          <span>🌍</span>
                          <span>{i18n.language === 'ar' ? '+190 دولة' : '190+ Countries'}</span>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-white">
                      <VideoCameraIcon className="w-6 h-6 text-pink-500 mb-1" />
                      <span className="text-[11px] font-bold text-white">{t('chat.idleTitle') || 'Ready'}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Connected State but Video Loading / Audio only */}
              {chatState === 'active' && !isStrangerVideoPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-900 dark:text-white z-10 text-center px-2 select-none">
                  {enlargedScreen === 'stranger' ? (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-white/10 border border-gray-300/70 dark:border-white/15 shadow-md flex items-center justify-center text-3xl mb-2 backdrop-blur-md">
                        {partnerInfo?.flag || '🌐'}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-1 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>{i18n.language === 'ar' ? 'متصل الآن' : 'Connected'}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{partnerCountryName || 'Stranger'}</span>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-xl mb-0.5">{partnerInfo?.flag || '🌐'}</span>
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{i18n.language === 'ar' ? 'متصل' : 'Connected'}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Starting / Searching State - Exact replica of the reference design */}
              {chatState === 'starting' && (
                <div className="absolute inset-0 z-10 select-none bg-[#f8fafc] dark:bg-[#0e0f15] flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
                  {enlargedScreen === 'stranger' ? (
                    <div className="w-full h-full flex flex-col justify-center items-center relative max-w-xl mx-auto py-1">
                      
                      {/* Center: Large 3D Animated Globe with Orbiting Avatars & Cosmic Radar Rings */}
                      <div className="relative w-full max-w-[580px] h-[310px] sm:h-[360px] md:h-[410px] my-auto flex items-center justify-center">
                        
                        {/* Ambient Glowing Halo */}
                        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-sky-400/15 via-pink-500/10 to-indigo-500/20 blur-3xl pointer-events-none" />

                        {/* Radar Expanding Rings (Sonar Waves) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="absolute w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border border-sky-400/30 dark:border-sky-400/25 animate-ping" style={{ animationDuration: '3.4s' }} />
                          <div className="absolute w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-pink-400/25 dark:border-pink-500/20 animate-ping" style={{ animationDuration: '4.6s', animationDelay: '1.2s' }} />
                          <div className="absolute w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border border-cyan-400/35 dark:border-cyan-400/30 animate-pulse" />
                        </div>

                        {/* Orbit Ring 1: Tilted Clockwise with Glowing Dashes & Node Beads */}
                        <div className="absolute w-[320px] sm:w-[410px] md:w-[470px] h-[130px] sm:h-[165px] md:h-[190px] rounded-[50%] border-2 border-dashed border-sky-400/40 dark:border-sky-400/35 rotate-[-22deg] animate-orbit-ring pointer-events-none">
                          {/* Glowing orbital star beads */}
                          <div className="absolute -top-1.5 left-1/4 w-3 h-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/80 animate-pulse" />
                          <div className="absolute -bottom-1.5 right-1/4 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-md shadow-pink-500/80 animate-pulse" />
                          <div className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400/80" />
                        </div>

                        {/* Orbit Ring 2: Tilted Counter-Clockwise */}
                        <div className="absolute w-[280px] sm:w-[360px] md:w-[410px] h-[115px] sm:h-[145px] md:h-[165px] rounded-[50%] border border-indigo-400/30 dark:border-indigo-400/30 rotate-[28deg] pointer-events-none">
                          <div className="absolute top-1/2 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80 animate-ping" style={{ animationDuration: '3s' }} />
                        </div>

                        {/* Center: 3D Glowing Stylized Earth Globe */}
                        <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-2xl shadow-blue-500/35 dark:shadow-blue-600/50 border border-sky-300/40 dark:border-sky-400/30 flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 200 200" className="w-full h-full rounded-full">
                            <defs>
                              <radialGradient id="globeOceanGrad" cx="35%" cy="35%" r="65%">
                                <stop offset="0%" stopColor="#38bdf8" />
                                <stop offset="40%" stopColor="#2563eb" />
                                <stop offset="85%" stopColor="#1d4ed8" />
                                <stop offset="100%" stopColor="#0f172a" />
                              </radialGradient>
                              <radialGradient id="globeShineGrad" cx="30%" cy="25%" r="55%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.15" />
                                <stop offset="80%" stopColor="#ffffff" stopOpacity="0" />
                              </radialGradient>
                              <radialGradient id="globeAtmosphere" cx="50%" cy="50%" r="50%">
                                <stop offset="72%" stopColor="#000000" stopOpacity="0" />
                                <stop offset="100%" stopColor="#020617" stopOpacity="0.55" />
                              </radialGradient>
                              <clipPath id="globeSphereClip">
                                <circle cx="100" cy="100" r="98" />
                              </clipPath>
                            </defs>

                            {/* Deep Ocean Sphere */}
                            <circle cx="100" cy="100" r="98" fill="url(#globeOceanGrad)" />

                            {/* Coordinate Grid Lines */}
                            <g clipPath="url(#globeSphereClip)" opacity="0.25" stroke="#bae6fd" strokeWidth="1" fill="none">
                              <ellipse cx="100" cy="100" rx="98" ry="32" />
                              <ellipse cx="100" cy="100" rx="98" ry="65" />
                              <ellipse cx="100" cy="100" rx="32" ry="98" />
                              <ellipse cx="100" cy="100" rx="65" ry="98" />
                              <line x1="0" y1="100" x2="200" y2="100" />
                              <line x1="100" y1="0" x2="100" y2="200" />
                            </g>

                            {/* Rotating Continents (Seamless Loop) */}
                            <g clipPath="url(#globeSphereClip)">
                              <g className="animate-globe-spin">
                                {/* Continents Set 1 */}
                                <g fill="#22c55e" opacity="0.95">
                                  {/* Americas */}
                                  <path d="M25,35 Q40,25 50,40 Q60,55 50,75 Q40,85 45,95 Q55,115 50,135 Q42,150 48,165 Q40,175 35,155 Q30,130 35,110 Q28,95 25,75 Z" />
                                  <path d="M12,45 Q22,40 25,55 Q18,65 12,45 Z" />
                                  {/* Europe & Africa */}
                                  <path d="M85,35 Q105,30 115,45 Q110,65 95,70 Q90,80 98,100 Q105,120 95,145 Q85,155 80,135 Q75,105 82,85 Q78,65 85,35 Z" />
                                  {/* Asia & Australia */}
                                  <path d="M120,30 Q160,25 175,55 Q180,85 155,95 Q140,85 130,70 Q115,60 120,30 Z" />
                                  <path d="M150,115 Q175,110 180,135 Q165,155 145,145 Q140,130 150,115 Z" />
                                </g>
                                {/* Continents Set 2 (Shifted 200px for seamless loop) */}
                                <g fill="#22c55e" opacity="0.95" transform="translate(200, 0)">
                                  {/* Americas */}
                                  <path d="M25,35 Q40,25 50,40 Q60,55 50,75 Q40,85 45,95 Q55,115 50,135 Q42,150 48,165 Q40,175 35,155 Q30,130 35,110 Q28,95 25,75 Z" />
                                  <path d="M12,45 Q22,40 25,55 Q18,65 12,45 Z" />
                                  {/* Europe & Africa */}
                                  <path d="M85,35 Q105,30 115,45 Q110,65 95,70 Q90,80 98,100 Q105,120 95,145 Q85,155 80,135 Q75,105 82,85 Q78,65 85,35 Z" />
                                  {/* Asia & Australia */}
                                  <path d="M120,30 Q160,25 175,55 Q180,85 155,95 Q140,85 130,70 Q115,60 120,30 Z" />
                                  <path d="M150,115 Q175,110 180,135 Q165,155 145,145 Q140,130 150,115 Z" />
                                </g>
                              </g>
                            </g>

                            {/* Spherical Rim Shadow & Specular Gloss Highlight */}
                            <circle cx="100" cy="100" r="98" fill="url(#globeAtmosphere)" />
                            <circle cx="100" cy="100" r="98" fill="url(#globeShineGrad)" />
                          </svg>
                        </div>

                        {/* Orbiting Floating User Avatars */}
                        {/* Avatar 1: Top-Left (North America Orbit) */}
                        <div className="absolute top-[4%] left-[6%] sm:left-[10%] animate-avatar-1 z-20">
                          <div className="relative">
                            <img 
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" 
                              alt="Online user" 
                              className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full border-2 border-white dark:border-slate-800 shadow-xl shadow-black/20 object-cover"
                            />
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-sm" />
                          </div>
                        </div>

                        {/* Avatar 2: Top-Right (Europe Orbit) */}
                        <div className="absolute top-[6%] right-[6%] sm:right-[10%] animate-avatar-2 z-20">
                          <div className="relative">
                            <img 
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" 
                              alt="Online user" 
                              className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full border-2 border-white dark:border-slate-800 shadow-xl shadow-black/20 object-cover"
                            />
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-sky-400 border-2 border-white dark:border-slate-900 shadow-sm" />
                          </div>
                        </div>

                        {/* Avatar 3: Bottom-Left (South America Orbit) */}
                        <div className="absolute bottom-[10%] left-[8%] sm:left-[12%] animate-avatar-3 z-20">
                          <div className="relative">
                            <img 
                              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80" 
                              alt="Online user" 
                              className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full border-2 border-white dark:border-slate-800 shadow-xl shadow-black/20 object-cover"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-pink-500 border-2 border-white dark:border-slate-900 shadow-sm" />
                          </div>
                        </div>

                        {/* Avatar 4: Middle-Right (Asia / Middle-East Orbit) */}
                        <div className="absolute top-[44%] right-[4%] sm:right-[7%] animate-avatar-4 z-20">
                          <div className="relative">
                            <img 
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" 
                              alt="Online user" 
                              className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full border-2 border-white dark:border-slate-800 shadow-xl shadow-black/20 object-cover"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-amber-400 border-2 border-white dark:border-slate-900 shadow-sm" />
                          </div>
                        </div>

                        {/* Avatar 5: Bottom-Right (Pacific / Australia Orbit) */}
                        <div className="absolute bottom-[8%] right-[8%] sm:right-[12%] animate-avatar-5 z-20">
                          <div className="relative">
                            <img 
                              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80" 
                              alt="Online user" 
                              className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full border-2 border-white dark:border-slate-800 shadow-xl shadow-black/20 object-cover"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900 shadow-sm" />
                          </div>
                        </div>

                        {/* Floating ambient ping dots */}
                        <div className="absolute top-[28%] left-[28%] w-2 h-2 rounded-full bg-pink-500 shadow-sm animate-ping" style={{ animationDuration: '2.5s' }} />
                        <div className="absolute bottom-[28%] right-[28%] w-2 h-2 rounded-full bg-sky-400 shadow-sm animate-ping" style={{ animationDuration: '3.1s' }} />
                      </div>

                      {/* Text Section with Smooth Wave Indicator */}
                      <div className="text-center my-auto py-2 z-20">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-outfit tracking-tight">
                          {i18n.language === 'ar' ? 'جارٍ البحث عن شخص ما...' : 'Searching for a stranger...'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                          {i18n.language === 'ar' ? 'يتم الاتصال بشخص جديد من جميع أنحاء العالم' : 'Connecting you with someone new from around the world'}
                        </p>

                        {/* 4 Animated Cycling Dots (as in reference designs 3, 4, 6) */}
                        <div className="flex items-center justify-center gap-2 mt-3">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-blue-500/70 animate-pulse" style={{ animationDelay: '200ms' }} />
                          <span className="w-2 h-2 rounded-full bg-blue-500/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                          <span className="w-2 h-2 rounded-full bg-blue-500/20 animate-pulse" style={{ animationDelay: '600ms' }} />
                        </div>

                        {interests.length > 0 && (
                          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                            {interests.map((tag, idx) => (
                              <span key={idx} className="text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/25">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-5 h-5 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin mb-1" />
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{t('chat.searching')}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SCREEN 2: YOU (Top corner vertical PiP on mobile, Large or PiP on desktop) */}
            <div
              onPointerDown={enlargedScreen === 'stranger' ? handlePipPointerDown : undefined}
              onPointerMove={enlargedScreen === 'stranger' ? handlePipPointerMove : undefined}
              onPointerUp={enlargedScreen === 'stranger' ? handlePipPointerUp : undefined}
              onPointerCancel={enlargedScreen === 'stranger' ? handlePipPointerUp : undefined}
              style={
                pipCoords
                  ? { left: `${pipCoords.x}px`, top: `${pipCoords.y}px`, right: 'auto', bottom: 'auto' }
                  : undefined
              }
              className={`
                absolute z-30 w-24 xs:w-28 sm:w-32 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/60 dark:border-white/25 bg-slate-900 flex items-center justify-center touch-none select-none cursor-grab ${
                  isDraggingPip ? 'cursor-grabbing scale-[1.03] shadow-pink-500/35 ring-2 ring-pink-500' : ''
                }
                ${!pipCoords ? (
                  pipPosition === 'top-end' ? 'top-3 end-3 lg:top-12 lg:end-3' :
                  pipPosition === 'bottom-end' ? 'bottom-3 end-3 lg:bottom-3 lg:end-3' :
                  pipPosition === 'bottom-start' ? 'bottom-3 start-3 lg:bottom-3 lg:start-3' :
                  'top-3 start-3 lg:top-12 lg:start-3'
                ) : ''}
                ${enlargedScreen === 'you'
                  ? 'lg:absolute lg:inset-0 lg:w-full lg:h-full lg:z-10 lg:rounded-none lg:border-0 lg:max-h-none lg:aspect-auto'
                  : `lg:absolute lg:z-30 lg:shadow-2xl lg:rounded-2xl lg:overflow-hidden lg:border-2 lg:border-gray-300/70 dark:lg:border-white/30 lg:w-44 lg:aspect-[4/3] lg:max-h-none`
                }
              `}
            >
              {/* Header Bar for You (Desktop full view only) */}
              <div className={`absolute top-0 inset-x-0 z-20 items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-auto ${
                enlargedScreen === 'you' ? 'flex' : 'hidden'
              }`}>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    isCameraInitialized ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'
                  }`} />
                  <span className="font-semibold text-xs sm:text-sm text-white font-outfit tracking-wide drop-shadow-sm truncate">
                    {t('chat.youLabel') || (i18n.language === 'ar' ? 'أنت' : 'You')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-gray-200 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full ms-1 border border-white/20 truncate">
                    <span>{myCountryInfo.flag}</span>
                    <span className="font-medium max-w-[80px] sm:max-w-[140px] truncate">{myCountryName}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  {/* Screen Selector Choice: Stranger or You (Desktop only) */}
                  <div className="hidden lg:flex items-center bg-black/50 backdrop-blur-md rounded-full p-0.5 border border-white/15 text-[11px] shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleSelectEnlargedScreen('stranger')}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-gray-300 hover:text-white transition-all"
                      title={i18n.language === 'ar' ? 'تكبير شاشة الغريب' : 'Enlarge stranger screen'}
                    >
                      <span>👤</span>
                      <span className="hidden sm:inline">{t('chat.strangerLabel') || 'Stranger'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectEnlargedScreen('you')}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-600 text-white font-bold shadow-sm transition-all"
                      title={i18n.language === 'ar' ? 'شاشتي مكبرة' : 'Your screen enlarged'}
                    >
                      <span>📷</span>
                      <span className="hidden sm:inline">{t('chat.youLabel') || 'You'}</span>
                    </button>
                  </div>

                  {/* Swap Button (Desktop only) */}
                  <button
                    type="button"
                    onClick={toggleEnlargedScreen}
                    className="hidden lg:flex p-1 sm:p-1.5 rounded-full bg-black/45 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-sm transition-colors border border-white/15"
                    title={t('chat.swapScreens')}
                    aria-label={t('chat.swapScreens')}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>

                  {/* Mic Mute Button */}
                  {!permissionDenied && !error && isCameraInitialized && (
                    <button
                      type="button"
                      onClick={handleToggleMuteSelf}
                      className={`p-1 sm:p-1.5 rounded-full transition-colors border border-white/15 ${
                        isMuted ? 'bg-red-600 text-white' : 'bg-black/45 hover:bg-black/75 text-white'
                      }`}
                      title={isMuted ? t('chat.unmuteMicrophone') : t('chat.muteMicrophone')}
                      aria-label={isMuted ? t('chat.unmuteMicrophone') : t('chat.muteMicrophone')}
                    >
                      {isMuted ? <MicrophoneOffIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <MicrophoneIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Mini Bar when You is in PiP / Corner mode (Mobile & Desktop) */}
              {enlargedScreen === 'stranger' && (
                <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-1.5 sm:px-2 py-1 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-auto">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      isCameraInitialized ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'
                    }`} />
                    <span className="font-semibold text-[10px] sm:text-xs text-white truncate drop-shadow-sm font-outfit">
                      {t('chat.youLabel') || (i18n.language === 'ar' ? 'أنت' : 'You')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Camera Flip Button (Front / Rear Camera) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlipCamera();
                      }}
                      className="p-1 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                      title={i18n.language === 'ar' ? 'تبديل الكاميرا' : 'Switch camera'}
                      aria-label="Switch camera"
                    >
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>

                    {/* Mute Self Microphone */}
                    {!permissionDenied && !error && isCameraInitialized && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleMuteSelf();
                        }}
                        className={`p-1 rounded-full transition-colors ${
                          isMuted ? 'bg-red-600 text-white' : 'bg-black/50 hover:bg-black/80 text-white'
                        }`}
                        title={isMuted ? t('chat.unmuteMicrophone') : t('chat.muteMicrophone')}
                      >
                        {isMuted ? <MicrophoneOffIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <MicrophoneIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                      </button>
                    )}

                    {/* Corner flip button (Mobile & Desktop) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePipPosition();
                      }}
                      className="p-1 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white transition-colors inline-flex"
                      title={i18n.language === 'ar' ? 'تغيير موضع الشاشة' : 'Flip corner'}
                    >
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Local Video Stream - Mirror / Selfie Mode */}
              <video 
                ref={myVideoRef} 
                autoPlay 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover -scale-x-100" 
                style={{ 
                  transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
                  visibility: (permissionDenied || error) && !dismissPermissionWarning ? 'hidden' : 'visible' 
                }}
              />

              {/* Error/Permission notification if camera blocked */}
              {(permissionDenied || error) && !dismissPermissionWarning && (
                <div className="absolute inset-0 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-5 text-center text-white z-20 animate-fade-in-up overflow-y-auto">
                  {enlargedScreen === 'you' ? (
                    <div className="max-w-md w-full p-4 sm:p-6 rounded-2xl bg-white/10 dark:bg-black/70 backdrop-blur-2xl border border-white/20 shadow-2xl my-auto">
                      {/* Icon */}
                      <div className="relative mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-2.5 text-red-400">
                        <VideoOffIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                        <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">!</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 font-outfit">
                        {permissionDenied ? t('chat.cameraBlockedTitle') : t('chat.error')}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-300 mb-3.5 leading-relaxed">
                        {permissionDenied ? t('chat.cameraBlockedSubtitle') : error}
                      </p>

                      {/* Step-by-Step Fix Pills */}
                      {permissionDenied && (
                        <div className="text-start bg-black/40 rounded-xl p-3 mb-3.5 space-y-2 border border-white/10 text-xs">
                          <div className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-[11px]">1</span>
                            <span className="text-gray-200">{t('chat.unblockStep1')}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-[11px]">2</span>
                            <span className="text-gray-200">{t('chat.unblockStep2')}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-[11px]">3</span>
                            <span className="text-gray-200">{t('chat.unblockStep3')}</span>
                          </div>
                        </div>
                      )}

                      {/* Primary Actions */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => window.location.reload()}
                          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-pink-500/25 transition-all active:scale-95"
                        >
                          <span>🔄</span>
                          <span>{t('chat.reloadPage')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={startUserCamera}
                          disabled={isRetryingCamera}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs sm:text-sm font-semibold border border-white/20 transition-all active:scale-95 disabled:opacity-50"
                        >
                          {isRetryingCamera ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                              <span>{t('chat.checkingPermissions')}</span>
                            </>
                          ) : (
                            <>
                              <span>🔍</span>
                              <span>{t('chat.tryAgain')}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Secondary Options: Continue in Text Mode or View Guide */}
                      <div className="flex items-center justify-center gap-3 pt-2.5 border-t border-white/10 text-xs">
                        <button
                          type="button"
                          onClick={() => setDismissPermissionWarning(true)}
                          className="text-gray-300 hover:text-white underline underline-offset-4 transition-colors font-medium"
                        >
                          💬 {t('chat.continueTextOnly')}
                        </button>
                        <span className="text-gray-600">•</span>
                        <button
                          type="button"
                          onClick={() => setIsHowToModalOpen(true)}
                          className="text-pink-400 hover:text-pink-300 transition-colors font-medium"
                        >
                          ❓ {t('chat.howToUnblock')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* When You is in the small corner PiP */
                    <div className="p-1.5 text-center flex flex-col items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs mb-0.5">
                        🚫
                      </div>
                      <span className="text-[10px] text-red-400 font-bold block leading-tight">
                        {permissionDenied ? 'Camera Blocked' : 'Error'}
                      </span>
                      <span className="text-[9px] text-gray-300 block mb-1">
                        Click 🔒 in URL bar
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => window.location.reload()}
                          className="text-[9px] px-2 py-0.5 bg-pink-600 hover:bg-pink-700 rounded-md text-white font-bold"
                        >
                          Reload
                        </button>
                        <button
                          type="button"
                          onClick={() => setDismissPermissionWarning(true)}
                          className="text-[9px] px-1.5 py-0.5 bg-white/20 hover:bg-white/30 rounded-md text-white font-medium"
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Mobile Action Controls Bar: Start/Stop/Skip + Chat Button with Unread Badge */}
          <div className="flex lg:hidden items-center justify-between gap-2 px-2 py-1.5 bg-white/85 dark:bg-black/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg flex-shrink-0 w-full select-none">
            {/* Start / Stop / Skip Button */}
            {chatState === 'idle' ? (
              <button
                type="button"
                onClick={handleStartChat}
                className="flex-1 font-bold text-white dark:text-black bg-brand-dark-text dark:bg-white rounded-xl h-11 px-4 flex items-center justify-center text-sm shadow-md active:scale-95 transition-all"
              >
                {t('chat.start')}
              </button>
            ) : (
              <div className="flex-1 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => findNewPartner(true)}
                  className="flex-1 font-bold text-white rounded-xl h-11 px-3 flex items-center justify-center gap-1.5 bg-gradient-to-r from-pink-600 to-orange-500 shadow-md shadow-pink-600/25 active:scale-95 text-sm"
                  title={i18n.language === 'ar' ? 'تخطي والبحث عن شخص جديد' : 'Skip to next'}
                >
                  <span>⏭️</span>
                  <span>{i18n.language === 'ar' ? 'تخطي' : 'Skip'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleStopAll}
                  className="h-11 px-3.5 rounded-xl bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-bold text-xs sm:text-sm flex items-center gap-1 active:scale-95 transition-all"
                  title={i18n.language === 'ar' ? 'إيقاف البحث والرجوع' : 'Stop'}
                >
                  <span>✕</span>
                  <span>{t('chat.stop')}</span>
                </button>
              </div>
            )}

            {/* Chat Open Button */}
            <button
              type="button"
              onClick={() => {
                setIsMobileChatOpen(true);
                setUnreadCount(0);
              }}
              className="relative flex items-center justify-center gap-1.5 px-4 h-11 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-800 dark:text-white font-bold text-sm border border-gray-300/60 dark:border-white/15 transition-all active:scale-95 shadow-sm"
            >
              <span className="text-base">💬</span>
              <span>{i18n.language === 'ar' ? 'المحادثة' : 'Chat'}</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -end-1.5 min-w-[20px] h-5 px-1 rounded-full bg-pink-500 text-white font-bold text-[11px] flex items-center justify-center shadow-md animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Audio Mute Button */}
            {!permissionDenied && !error && isCameraInitialized && (
              <button
                type="button"
                onClick={handleToggleMuteSelf}
                className={`h-11 w-11 flex-shrink-0 rounded-xl flex items-center justify-center transition-all ${
                  isMuted 
                    ? 'bg-red-500/20 text-red-500 border border-red-500/30' 
                    : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                }`}
                title={isMuted ? t('chat.unmuteMicrophone') : t('chat.muteMicrophone')}
              >
                {isMuted ? <MicrophoneOffIcon className="w-5 h-5 text-red-500" /> : <MicrophoneIcon className="w-5 h-5 text-emerald-500" />}
              </button>
            )}
          </div>
        </div>

        {/* Text Chat Column: Dedicated card (Desktop only) */}
        <div className="hidden lg:flex lg:w-[360px] xl:w-[400px] flex-shrink-0 flex-col bg-white dark:bg-[#1a1b24] rounded-3xl shadow-xl border border-slate-200/80 dark:border-white/10 min-h-0 overflow-hidden">
          
          {/* Chat Header Bar with Sound Toggle */}
          <div className="flex-shrink-0 px-5 py-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between text-sm select-none">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
              <span>{i18n.language === 'ar' ? 'المحادثة' : 'Chat'}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsSoundEnabled(prev => {
                  const next = !prev;
                  try { window.localStorage.setItem('omegod-sound-enabled', String(next)); } catch {}
                  return next;
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              title={isSoundEnabled ? (i18n.language === 'ar' ? 'صوت الرسائل مفعّل' : 'Sound enabled') : (i18n.language === 'ar' ? 'صوت الرسائل مكتوم' : 'Sound muted')}
            >
              <span className="text-amber-500">🔔</span>
              <span>{isSoundEnabled ? (i18n.language === 'ar' ? 'صوت مفعّل' : 'Sound on') : (i18n.language === 'ar' ? 'مكتوم' : 'Sound off')}</span>
            </button>
          </div>

          {/* Messages Stream */}
          <div ref={messagesContainerRef} className="flex-1 p-4 space-y-3 overflow-y-auto overflow-x-hidden min-h-0">
            {messages.map((msg, index) => {
              
              // System Message Rendering (Omegle Tags & Info)
              if (msg.sender === 'system') {
                return (
                  <div key={index} className="my-1.5 p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 text-xs flex items-center gap-2 font-medium border border-blue-100 dark:border-blue-500/20">
                    <span className="flex-shrink-0 text-sm">ℹ️</span>
                    <span>{msg.text}</span>
                  </div>
                );
              }

              // Chat Messages (User & Stranger)
              const isUser = msg.sender === 'user';
              return (
                <div key={index} className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2.5 max-w-[85%] shadow-xs text-sm ${
                    isUser 
                      ? 'bg-[#ffeef2] dark:bg-pink-500/20 text-[#a01c44] dark:text-pink-100 rounded-2xl rounded-tr-sm animate-message-out' 
                      : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white rounded-2xl rounded-tl-sm animate-message-in'
                  }`}>
                    <span className="break-words">{msg.text}</span>
                    <span className={`text-[11px] ms-3 inline-block select-none ${
                      isUser ? 'text-pink-400 dark:text-pink-300' : 'text-slate-400'
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Partner Typing Bubble */}
            {isPartnerTyping && (
              <div className="flex items-end justify-start">
                <div className="px-4 py-2.5 max-w-md shadow-xs bg-slate-100 dark:bg-white/10 rounded-2xl rounded-tl-sm">
                  <div className="flex items-center gap-1 h-4">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-typing-dot-1"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-typing-dot-2"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-typing-dot-3"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Area: Input + Action Buttons */}
          <div className="flex-shrink-0 p-3.5 border-t border-slate-100 dark:border-white/10 bg-white dark:bg-[#1a1b24] space-y-3">
            {/* Text Input Row */}
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder={t('chat.messagePlaceholder')}
                disabled={chatState !== 'active'}
                className="w-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-2xl px-4 pe-12 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 border border-slate-200/60 dark:border-white/10 transition-all placeholder:text-slate-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || chatState !== 'active'}
                className="absolute end-1.5 w-8 h-8 rounded-xl bg-gradient-to-br from-pink-600 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                title={t('Send')}
              >
                <SendIcon className="w-4 h-4 rtl:-scale-x-100" />
              </button>
            </form>

            {/* Action Buttons Row */}
            <div className="flex items-center justify-between gap-2.5">
              {chatState === 'idle' ? (
                <button
                  type="button"
                  onClick={handleStartChat}
                  className="flex-1 py-3 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:opacity-95 shadow-md shadow-pink-500/25 active:scale-95 transition-all text-base flex items-center justify-center gap-2"
                >
                  <span>▶</span>
                  <span>{t('chat.start')}</span>
                  <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-bold bg-white/20 rounded-md border border-white/30 text-white shadow-xs">
                    Space
                  </kbd>
                </button>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    {/* Skip Button */}
                    <button
                      type="button"
                      onClick={() => findNewPartner(true)}
                      className="py-3 px-5 sm:px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-[#ff1361] via-[#f72585] to-[#ff6b35] hover:opacity-95 shadow-md shadow-pink-500/25 active:scale-95 transition-all text-base flex items-center gap-2"
                      title={i18n.language === 'ar' ? 'تخطي للشخص التالي (زر Space)' : 'Skip to next stranger (Space)'}
                    >
                      <span>⏭️</span>
                      <span>{i18n.language === 'ar' ? 'تخطي' : 'Skip'}</span>
                      <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-bold bg-white/25 rounded-md border border-white/35 text-white shadow-xs">
                        Space
                      </kbd>
                    </button>

                    {/* Stop Button */}
                    <button
                      type="button"
                      onClick={handleStopAll}
                      className="py-3 px-4 sm:px-5 rounded-2xl font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 active:scale-95 transition-all text-base flex items-center gap-1.5"
                      title={i18n.language === 'ar' ? 'إيقاف (Esc)' : 'Stop (Esc)'}
                    >
                      <span>✕</span>
                      <span>{t('chat.stop')}</span>
                      <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400">
                        Esc
                      </kbd>
                    </button>
                  </div>

                  {/* Send Icon Button on Right */}
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || chatState !== 'active'}
                    className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-pink-50 dark:hover:bg-pink-500/20 text-slate-500 hover:text-pink-600 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
                    title="Send message"
                  >
                    <SendIcon className="w-5 h-5 rtl:-scale-x-100" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Chat Bottom Sheet / Modal */}
      {isMobileChatOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm flex flex-col justify-end transition-opacity animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileChatOpen(false);
          }}
        >
          <div className="w-full h-[75vh] max-h-[75vh] bg-white dark:bg-[#121319] rounded-t-3xl shadow-2xl border-t border-gray-200 dark:border-white/10 flex flex-col overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-gray-50/90 dark:bg-black/40">
              <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                <span className="text-lg">💬</span>
                <span>{i18n.language === 'ar' ? 'المحادثة المباشرة' : 'Live Chat'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ms-1" />
              </div>

              <div className="flex items-center gap-2">
                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsSoundEnabled(prev => {
                      const next = !prev;
                      try { window.localStorage.setItem('omegod-sound-enabled', String(next)); } catch {}
                      return next;
                    });
                  }}
                  className="px-2.5 py-1 rounded-full text-xs bg-gray-200/70 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                  title="Toggle sound"
                >
                  {isSoundEnabled ? '🔔' : '🔕'}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileChatOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-sm"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 p-3.5 space-y-2.5 overflow-y-auto overflow-x-hidden min-h-0">
              {messages.map((msg, index) => {
                if (msg.sender === 'system') {
                  if (msg.commonInterests && msg.commonInterests.length > 0) {
                    return (
                      <div key={index} className="my-2 p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/25 text-xs">
                        <div className="text-pink-600 dark:text-pink-400 font-bold mb-1">🎉 {msg.text}</div>
                        <div className="flex flex-wrap gap-1">
                          {msg.commonInterests.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-pink-600 text-white font-bold text-[11px]">#{t}</span>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="text-xs my-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                      <span>ℹ️</span>
                      <span>{msg.text}</span>
                    </div>
                  );
                }

                return (
                  <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3.5 py-2 max-w-[80%] shadow-md text-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-pink-600 to-orange-500 text-white rounded-2xl rounded-br-sm'
                        : 'bg-gray-200 dark:bg-brand-gray text-brand-dark-text dark:text-gray-200 rounded-2xl rounded-bl-sm'
                    }`}>
                      <p className="break-words">{msg.text}</p>
                      <span className="text-[10px] opacity-70 block text-end mt-0.5">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}

              {isPartnerTyping && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="px-3.5 py-2 rounded-2xl rounded-bl-sm bg-gray-200 dark:bg-brand-gray text-gray-400">
                    <div className="flex items-center gap-1 h-4">
                      <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-typing-dot-1" />
                      <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-typing-dot-2" />
                      <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-typing-dot-3" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Input Form */}
            <div className="flex-shrink-0 p-2.5 border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#121319]/95 backdrop-blur-md">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder={t('chat.messagePlaceholder')}
                    disabled={chatState !== 'active'}
                    autoFocus
                    className="w-full bg-gray-100 dark:bg-[#1a1b22] text-brand-dark-text dark:text-white rounded-full px-3.5 pe-11 h-11 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm shadow-inner"
                  />
                  <button
                    type="submit"
                    className="absolute top-1/2 -translate-y-1/2 end-1.5 bg-gradient-to-br from-pink-600 to-orange-500 text-white h-8 w-8 flex items-center justify-center rounded-full disabled:opacity-40 transition-all"
                    disabled={!inputText.trim() || chatState !== 'active'}
                    aria-label="Send"
                  >
                    <SendIcon className="h-4 w-4 rtl:-scale-x-100" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="report-modal-title">
          <div className="bg-white dark:bg-[#181920] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-all animate-fade-in-up">
            <h2 id="report-modal-title" className="text-2xl font-bold text-brand-dark-text dark:text-white mb-4 font-outfit">{t('chat.reportModalTitle')}</h2>
            <p className="text-brand-light-text dark:text-gray-400 mb-6 text-sm">{t('chat.reportModalSubtitle')}</p>
            <form onSubmit={handleReportSubmit}>
              <fieldset className="space-y-3">
                <legend className="sr-only">Report reasons</legend>
                {reportReasons.map(reason => (
                  <label key={reason} htmlFor={reason} className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-black/30 border-2 border-gray-200 dark:border-white/10 hover:border-pink-500 has-[:checked]:border-pink-500 has-[:checked]:bg-pink-500/10 dark:has-[:checked]:bg-pink-900/30 transition-all cursor-pointer">
                    <input
                      type="radio"
                      id={reason}
                      name="report-reason"
                      value={reason}
                      checked={reportReason === reason}
                      onChange={() => setReportReason(reason)}
                      className="h-4 w-4 text-pink-600 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-pink-500"
                    />
                    <span className="ms-3 text-brand-dark-text dark:text-white text-sm font-medium">{reason}</span>
                  </label>
                ))}
              </fieldset>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-brand-dark-text dark:text-white font-semibold text-sm transition-colors"
                >
                  {t('chat.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={!reportReason}
                  className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {t('chat.submitReport')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* How to Unblock Camera Modal */}
      {isHowToModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in-up" role="dialog" aria-modal="true">
          <div className="bg-white dark:bg-[#181920] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-lg text-start">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/10 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-pink-500/20 text-pink-500 text-lg">📷</span>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-outfit">
                  {t('chat.howToUnblock')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsHowToModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <div className="p-3.5 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                  <span className="text-base">🌐</span>
                  <span>Google Chrome / Brave / Edge:</span>
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-gray-600 dark:text-gray-300 ps-1">
                  <li>{i18n.language === 'ar' ? 'انظر إلى شريط العنوان بالأعلى بجانب رابط الموقع.' : 'Look at the address bar at the top next to the website URL.'}</li>
                  <li>{i18n.language === 'ar' ? 'اضغط على أيقونة القفل 🔒 أو أيقونة ضبط الأذونات 🎛️.' : 'Click the padlock 🔒 icon or the site settings 🎛️ icon.'}</li>
                  <li>{i18n.language === 'ar' ? 'قم بتغيير خيار "الكاميرا" و "الميكروفون" إلى "سماح" (Allow).' : 'Switch "Camera" and "Microphone" to "Allow" (or click "Reset permissions").'}</li>
                  <li>{i18n.language === 'ar' ? 'اضغط على زر "إعادة تحميل الصفحة" أدناه.' : 'Click "Reload Page" below.'}</li>
                </ol>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                  <span className="text-base">🍎</span>
                  <span>Safari (iPhone / iPad / Mac):</span>
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-gray-600 dark:text-gray-300 ps-1">
                  <li>{i18n.language === 'ar' ? 'على آيفون: اضغط على أيقونة aA أو القفل في يسار شريط العنوان.' : 'On iPhone: Tap the "aA" or lock icon on the left of the address bar.'}</li>
                  <li>{i18n.language === 'ar' ? 'اختر "إعدادات موقع الويب" (Website Settings).' : 'Select "Website Settings".'}</li>
                  <li>{i18n.language === 'ar' ? 'اضبط الكاميرا والميكروفون على "سماح" (Allow).' : 'Set Camera & Microphone to "Allow".'}</li>
                  <li>{i18n.language === 'ar' ? 'أعد تحديث الصفحة.' : 'Reload the webpage.'}</li>
                </ol>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-4 border-t border-gray-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setIsHowToModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-800 dark:text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                {t('chat.cancel')}
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-500/25 transition-all"
              >
                🔄 {t('chat.reloadPage')}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 18+ and Terms, Privacy Policy & Rules Consent Modal */}
      <AgeConsentModal
        isOpen={isAgeModalOpen}
        onClose={() => setIsAgeModalOpen(false)}
        onConfirm={() => {
          setIsAgeModalOpen(false);
          handleStartChat();
        }}
      />
    </div>
  );
};

export default ChatPage;
