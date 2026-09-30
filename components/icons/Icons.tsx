
import React from 'react';
import { 
  ShieldCheck, 
  Video, 
  Globe2, 
  Check, 
  ChevronDown, 
  Send, 
  Flag, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Radio,
  Search,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const OmeGodLogoIcon: React.FC<{className?: string}> = ({className}) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
        </defs>
        <path 
            d="M16 0C10 0 4.67 2.67 2 6.67V25.33C4.67 29.33 10 32 16 32s11.33-2.67 14-6.67V6.67C27.33 2.67 22 0 16 0zm0 28c-3.67 0-6.67-1.33-8.67-3.33V7.33C9.33 5.33 12.33 4 16 4s6.67 1.33 8.67 3.33v17.33C22.67 26.67 19.67 28 16 28z"
            fill="url(#logo-gradient)" 
            fillRule="evenodd" 
        />
    </svg>
);

export const LoadingSpinnerIcon: React.FC<{className?: string}> = ({className}) => (
    <svg 
        viewBox="0 0 32 32" 
        className={`animate-spin ${className}`}
        fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
    >
        <defs>
            <linearGradient id="spinner-gradient-loader" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
        </defs>
        <path 
             d="M16 0C10 0 4.67 2.67 2 6.67V25.33C4.67 29.33 10 32 16 32s11.33-2.67 14-6.67V6.67C27.33 2.67 22 0 16 0zm0 28c-3.67 0-6.67-1.33-8.67-3.33V7.33C9.33 5.33 12.33 4 16 4s6.67 1.33 8.67 3.33v17.33C22.67 26.67 19.67 28 16 28z"
            fill="url(#spinner-gradient-loader)" 
            fillRule="evenodd" 
        />
    </svg>
);

export const CheckIcon: React.FC = () => (
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-600 to-orange-500 flex items-center justify-center flex-shrink-0">
        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
    </div>
);

export const ShieldCheckIcon: React.FC<{className?: string}> = ({className}) => (
    <ShieldCheck className={className || "h-6 w-6"} strokeWidth={2.2} />
);

export const VideoCameraIcon: React.FC<{className?: string}> = ({className}) => (
    <Video className={className || "h-6 w-6"} strokeWidth={2.2} />
);

export const VideoOffIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 3l18 18M9.878 9.878A3 3 0 1014.12 14.12m0 0L21 21M3 8a2 2 0 012-2h3m8 0h1a2 2 0 012 2v8m-4 4H5a2 2 0 01-2-2V8" />
    </svg>
);

export const GlobeIcon: React.FC<{className?: string}> = ({className}) => (
    <Globe2 className={className || "h-6 w-6"} strokeWidth={2.2} />
);

export const RadioIcon: React.FC<{className?: string}> = ({className}) => (
    <Radio className={className || "h-6 w-6"} strokeWidth={2.2} />
);

export const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <Search className={className || "h-6 w-6"} strokeWidth={2.2} />
);

export const HelpCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <HelpCircle className={className || "h-5 w-5"} strokeWidth={2} />
);

export const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <Sparkles className={className || "h-5 w-5"} strokeWidth={2} />
);

export const ChevronDownIcon: React.FC<{className?: string}> = ({className}) => (
    <ChevronDown className={className || "h-6 w-6"} strokeWidth={2} />
);

export const SendIcon: React.FC<{className?: string}> = ({ className }) => (
    <Send className={className || "h-5 w-5"} strokeWidth={2} />
);

export const ReportIcon: React.FC = () => (
    <Flag className="h-5 w-5" strokeWidth={2} />
);

export const VolumeUpIcon: React.FC<{className?: string}> = ({ className }) => (
    <Volume2 className={className || "h-6 w-6"} strokeWidth={2} />
);

export const VolumeOffIcon: React.FC<{className?: string}> = ({ className }) => (
    <VolumeX className={className || "h-6 w-6"} strokeWidth={2} />
);

export const MicrophoneIcon: React.FC<{className?: string}> = ({ className }) => (
    <Mic className={className || "h-6 w-6"} strokeWidth={2} />
);

export const MicrophoneOffIcon: React.FC<{className?: string}> = ({ className }) => (
    <MicOff className={className || "h-6 w-6"} strokeWidth={2} />
);

export const MenuIcon: React.FC<{className?: string}> = ({className}) => (
    <Menu className={className || "h-6 w-6"} strokeWidth={2} />
);

export const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <X className={className || "h-6 w-6"} strokeWidth={2} />
);

export const CheckmarkIcon: React.FC<{className?: string}> = ({className}) => (
    <Check className={className || "h-5 w-5"} strokeWidth={3} />
);

export const FlagENIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-5 h-3.5"} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <clipPath id="gb-s">
            <path d="M0,0 v30 h60 v-30 z"/>
        </clipPath>
        <clipPath id="gb-t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
        </clipPath>
        <g clipPath="url(#gb-s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
    </svg>
);

export const FlagFRIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-6 h-4"} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#0055A4" d="M0 0h1v2H0z"/>
        <path fill="#FFFFFF" d="M1 0h1v2H1z"/>
        <path fill="#EF4135" d="M2 0h1v2H2z"/>
    </svg>
);

export const FlagARIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-6 h-4"} viewBox="0 0 4 3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="4" height="3" fill="#fff"/>
        <rect width="1" height="3" fill="#FF0000"/>
        <rect x="1" width="3" height="1" fill="#00732F"/>
        <rect x="1" y="2" width="3" height="1" fill="#000000"/>
    </svg>
);

export const FlagESIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-6 h-4"} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#C60B1E" d="M0 0h3v0.5H0z M0 1.5h3v0.5H0z"/>
        <path fill="#FFC400" d="M0 0.5h3v1H0z"/>
    </svg>
);

export const FlagPTIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-6 h-4"} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#006233" d="M0 0h1.2v2H0z"/>
        <path fill="#D21034" d="M1.2 0h1.8v2H1.2z"/>
    </svg>
);

export const FlagDEIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-6 h-4"} viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#000000" d="M0 0h5v1H0z"/>
        <path fill="#DD0000" d="M0 1h5v1H0z"/>
        <path fill="#FFCE00" d="M0 2h5v1H0z"/>
    </svg>
);

export const FlagHIIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-6 h-4"} viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#FF9933" d="M0 0h9v2H0z"/>
        <path fill="#FFFFFF" d="M0 2h9v2H0z"/>
        <path fill="#138808" d="M0 4h9v2H0z"/>
        <circle cx="4.5" cy="3" r="0.8" fill="#000080"/>
    </svg>
);

export const FlagRUIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-6 h-4"} viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#FFFFFF" d="M0 0h9v2H0z"/>
        <path fill="#0039A6" d="M0 2h9v2H0z"/>
        <path fill="#D52B1E" d="M0 4h9v2H0z"/>
    </svg>
);

export const SunIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const MoonIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);