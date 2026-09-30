import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OmeGodLogoIcon, CloseIcon } from './icons/Icons';

interface AgeConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AgeConsentModal: React.FC<AgeConsentModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const { i18n } = useTranslation();
  const [isAge18, setIsAge18] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  if (!isOpen) return null;

  const isFormValid = isAge18 && isTermsAccepted;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    localStorage.setItem('omegod_age_terms_accepted', 'true');
    onConfirm();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative w-full max-w-[430px] bg-white dark:bg-[#161824] rounded-[32px] p-6 sm:p-7 shadow-2xl shadow-black/30 border border-slate-100 dark:border-white/10 text-slate-900 dark:text-white transition-all transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Logo + Brand & Close Button */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <OmeGodLogoIcon className="h-6 w-6 text-pink-500 flex-shrink-0" />
            <span className="text-xl font-bold tracking-tight font-outfit text-slate-900 dark:text-white">OmeGod</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Friendly Community Illustration */}
        <div className="relative w-full h-36 sm:h-40 my-1 flex items-center justify-center">
          <svg viewBox="0 0 320 160" className="w-full h-full object-contain" fill="none">
            <defs>
              <radialGradient id="globeAtmosphereModal" cx="50%" cy="50%" r="50%">
                <stop offset="65%" stopColor="#60a5fa" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </radialGradient>
              <linearGradient id="globeGradModal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            {/* Ambient Aura */}
            <circle cx="160" cy="80" r="75" fill="url(#globeAtmosphereModal)" />
            
            {/* Globe Base */}
            <circle cx="160" cy="80" r="54" fill="url(#globeGradModal)" />
            {/* Continents */}
            <path d="M135,60 Q145,55 155,62 Q160,75 150,85 Q140,88 135,78 Z" fill="#34d399" opacity="0.9" />
            <path d="M170,65 Q185,60 195,72 Q185,90 175,85 Q168,75 170,65 Z" fill="#34d399" opacity="0.9" />
            <path d="M150,95 Q165,92 170,105 Q158,115 148,105 Z" fill="#34d399" opacity="0.9" />

            {/* Floating Connection Clouds/Bubbles */}
            <rect x="90" y="28" width="22" height="14" rx="7" fill="#38bdf8" opacity="0.6" />
            <rect x="210" y="26" width="24" height="14" rx="7" fill="#f472b6" opacity="0.6" />

            {/* Left Character (Friendly Boy) */}
            <g transform="translate(75, 45)">
              <circle cx="32" cy="38" r="30" fill="#fde68a" opacity="0.3" />
              {/* Hair */}
              <path d="M14,30 Q30,6 52,24 Q48,42 42,46 Q16,42 14,30 Z" fill="#1e293b" />
              {/* Face */}
              <circle cx="32" cy="36" r="20" fill="#fcd34d" />
              {/* Eyes & Smile */}
              <circle cx="26" cy="34" r="2.5" fill="#1e293b" />
              <circle cx="38" cy="34" r="2.5" fill="#1e293b" />
              <path d="M28,42 Q32,48 37,42" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Cheeks */}
              <circle cx="22" cy="39" r="2.5" fill="#f87171" opacity="0.5" />
              <circle cx="42" cy="39" r="2.5" fill="#f87171" opacity="0.5" />
              {/* Shirt */}
              <path d="M14,56 Q32,48 50,56 L52,75 L12,75 Z" fill="#3b82f6" />
            </g>

            {/* Right Character (Friendly Girl) */}
            <g transform="translate(178, 45)">
              <circle cx="35" cy="38" r="30" fill="#fbcfe8" opacity="0.3" />
              {/* Curly Hair */}
              <circle cx="20" cy="28" r="14" fill="#451a03" />
              <circle cx="50" cy="28" r="14" fill="#451a03" />
              <circle cx="35" cy="18" r="14" fill="#451a03" />
              <circle cx="16" cy="42" r="12" fill="#451a03" />
              <circle cx="54" cy="42" r="12" fill="#451a03" />
              {/* Face */}
              <circle cx="35" cy="36" r="19" fill="#d97706" />
              {/* Eyes & Smile */}
              <circle cx="29" cy="34" r="2.5" fill="#1e293b" />
              <circle cx="41" cy="34" r="2.5" fill="#1e293b" />
              <path d="M31,42 Q35,48 40,42" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Cheeks */}
              <circle cx="25" cy="39" r="2.5" fill="#f43f5e" opacity="0.6" />
              <circle cx="45" cy="39" r="2.5" fill="#f43f5e" opacity="0.6" />
              {/* Shirt */}
              <path d="M18,55 Q35,48 52,55 L55,75 L15,75 Z" fill="#ec4899" />
            </g>
          </svg>
        </div>

        {/* Modal Headings */}
        <div className="text-center px-1 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-slate-900 dark:text-white leading-tight">
            {i18n.language === 'ar' ? 'انضم إلى مجتمع عالمي من أشخاص حقيقيين 🌍' : 'Join a global community of real people 🌍'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {i18n.language === 'ar' ? 'يرجى تأكيد ما يلي للمتابعة:' : 'Please confirm the following to continue:'}
          </p>
        </div>

        {/* 2 Required Confirmation Checkboxes */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Checkbox 1: Age Confirmation (18+) */}
          <label 
            className={`flex items-start gap-3.5 p-3 rounded-2xl border transition-all cursor-pointer ${
              isAge18 
                ? 'bg-pink-500/10 border-pink-500/40 dark:border-pink-500/50' 
                : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            {/* Custom Checkbox Input */}
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={isAge18}
                onChange={(e) => setIsAge18(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                isAge18 
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 border-pink-600 text-white shadow-sm' 
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
              }`}>
                {isAge18 && (
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-current stroke-[3]" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>

            {/* Icon & Label Text */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <span className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-950/70 border border-red-300 dark:border-red-600/50 flex items-center justify-center text-red-600 dark:text-red-400 font-extrabold text-[11px] flex-shrink-0 leading-none shadow-xs">
                18+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {i18n.language === 'ar' ? 'عمري 18 عاماً أو أكبر.' : 'I am 18 years old or older.'}
              </span>
            </div>
          </label>

          {/* Checkbox 2: Terms, Privacy & Rules */}
          <label 
            className={`flex items-start gap-3.5 p-3 rounded-2xl border transition-all cursor-pointer ${
              isTermsAccepted 
                ? 'bg-pink-500/10 border-pink-500/40 dark:border-pink-500/50' 
                : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            {/* Custom Checkbox Input */}
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                isTermsAccepted 
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 border-pink-600 text-white shadow-sm' 
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
              }`}>
                {isTermsAccepted && (
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-current stroke-[3]" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>

            {/* Icon & Label Text with Links */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-300 dark:border-blue-600/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs flex-shrink-0 shadow-xs">
                🛡️
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {i18n.language === 'ar' ? (
                  <>
                    أوافق على{' '}
                    <Link to="/terms" target="_blank" onClick={(e) => e.stopPropagation()} className="text-pink-600 dark:text-pink-400 underline underline-offset-2 hover:opacity-80">
                      شروط الاستخدام
                    </Link>
                    ، و{' '}
                    <Link to="/privacy" target="_blank" onClick={(e) => e.stopPropagation()} className="text-pink-600 dark:text-pink-400 underline underline-offset-2 hover:opacity-80">
                      سياسة الخصوصية
                    </Link>
                    ، و{' '}
                    <Link to="/rules" target="_blank" onClick={(e) => e.stopPropagation()} className="text-pink-600 dark:text-pink-400 underline underline-offset-2 hover:opacity-80">
                      قواعد المجتمع
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    I agree to OmeGod's{' '}
                    <Link to="/terms" target="_blank" onClick={(e) => e.stopPropagation()} className="text-pink-600 dark:text-pink-400 underline underline-offset-2 hover:opacity-80">
                      Terms
                    </Link>
                    ,{' '}
                    <Link to="/privacy" target="_blank" onClick={(e) => e.stopPropagation()} className="text-pink-600 dark:text-pink-400 underline underline-offset-2 hover:opacity-80">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link to="/rules" target="_blank" onClick={(e) => e.stopPropagation()} className="text-pink-600 dark:text-pink-400 underline underline-offset-2 hover:opacity-80">
                      Community Rules
                    </Link>
                    .
                  </>
                )}
              </span>
            </div>
          </label>

          {/* Action Button: Disabled until BOTH checkboxes are verified */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-bold font-outfit text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                isFormValid
                  ? 'text-white bg-gradient-to-r from-[#ff1361] via-[#f72585] to-[#ff6b35] hover:from-[#ff0055] hover:to-[#ff5520] shadow-xl shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                  : 'text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-not-allowed opacity-65'
              }`}
            >
              <span>{i18n.language === 'ar' ? 'موافق وبدء الدردشة' : 'Agree & Start Chat'}</span>
              <span className="text-lg leading-none">→</span>
            </button>
            
            {!isFormValid && (
              <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2 font-medium">
                {i18n.language === 'ar' 
                  ? 'يجب الموافقة على كلا الشرطين لتفعيل الزر والبدء' 
                  : 'Please check both boxes above to enable Start Chat'}
              </p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default AgeConsentModal;
