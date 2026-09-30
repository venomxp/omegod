import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { OmeGodLogoIcon, ShieldCheckIcon } from './icons/Icons';

export interface BanDetails {
  ip?: string;
  reason?: string;
  expiresAt?: number;
  durationMinutes?: number;
}

interface BannedScreenProps {
  banDetails?: BanDetails | null;
}

export const BannedScreen: React.FC<BannedScreenProps> = ({ banDetails }) => {
  const { i18n } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!banDetails?.expiresAt) return;

    const updateCountdown = () => {
      const remainingMs = (banDetails.expiresAt || 0) - Date.now();
      if (remainingMs <= 0) {
        setTimeLeft(i18n.language === 'ar' ? 'انتهت فترة الحظر (حدث الصفحة)' : 'Ban expired (refresh page)');
        return;
      }
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [banDetails?.expiresAt, i18n.language]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950 text-white select-none overflow-y-auto">
      {/* Ambient Red Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-red-600/15 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-lg bg-[#14151f] border border-red-500/30 rounded-[32px] p-6 sm:p-8 shadow-2xl shadow-red-950/50 text-center animate-fade-in my-auto">
        
        {/* Top Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <OmeGodLogoIcon className="h-7 w-7 text-pink-500" />
          <span className="text-xl font-bold tracking-tight font-outfit text-white">OmeGod Safety</span>
        </div>

        {/* Warning Icon Badge */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-red-500/10 border-2 border-red-500/50 flex items-center justify-center text-red-500 shadow-lg">
            <span className="text-4xl sm:text-5xl">🚫</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white tracking-tight">
          {i18n.language === 'ar' ? 'تم حظرك من استخدام الموقع' : 'You Have Been Banned'}
        </h1>

        <p className="mt-2.5 text-xs sm:text-sm text-red-300/90 leading-relaxed font-medium">
          {i18n.language === 'ar'
            ? 'تم رصد مخالفة صريحة لقواعد المجتمع والآداب العامة عبر كاميرا الفيديو الخاصة بك (عري، أو سلوك غير لائق).'
            : 'An explicit violation of Community Guidelines was detected on your video stream (nudity, exposed genitalia, or inappropriate behavior).'}
        </p>

        {/* Ban Details Card */}
        <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-start space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-slate-400 font-medium">
              {i18n.language === 'ar' ? 'السبب:' : 'Reason:'}
            </span>
            <span className="font-bold text-red-400 text-end">
              {banDetails?.reason || (i18n.language === 'ar' ? 'انتهاك قواعد العري والمحتوى الجنسي' : 'Nudity & Sexual Content Violation')}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-slate-400 font-medium">
              {i18n.language === 'ar' ? 'عنوان IP المحظور:' : 'Banned IP:'}
            </span>
            <span className="font-mono text-slate-200 font-semibold">
              {banDetails?.ip || 'Protected'}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-slate-400 font-medium">
              {i18n.language === 'ar' ? 'مدة الحظر:' : 'Ban Duration:'}
            </span>
            <span className="font-bold text-amber-400">
              {i18n.language === 'ar' ? '24 ساعة (حظر تلقائي)' : '24 Hours (Auto-Ban)'}
            </span>
          </div>

          {timeLeft && (
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400 font-medium">
                {i18n.language === 'ar' ? 'الوقت المتبقي:' : 'Time Remaining:'}
              </span>
              <span className="font-mono font-bold text-emerald-400">
                {timeLeft}
              </span>
            </div>
          )}
        </div>

        {/* AI Monitoring & Protection Notice */}
        <div className="mt-5 p-3 rounded-xl bg-red-950/30 border border-red-500/20 text-[11px] text-slate-300 leading-normal flex items-start gap-2.5 text-start">
          <span className="text-base flex-shrink-0">🤖</span>
          <span>
            {i18n.language === 'ar'
              ? 'تعتمد منصة OmeGod على أنظمة الذكاء الاصطناعي في تحليل البث المباشر فورياً لحماية المستخدمين وحظر أي حساب يقوم بالتعري أو ممارسة أفعال غير قانونية.'
              : 'OmeGod uses real-time automated AI moderation to scan live video streams, instantly protecting the community and blocking violators.'}
          </span>
        </div>

        {/* Action Link to Rules */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/rules"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all text-center"
          >
            {i18n.language === 'ar' ? 'قراءة شروط المجتمع' : 'Read Community Rules'}
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all text-center"
          >
            {i18n.language === 'ar' ? 'إعادة فحص حالة الحظر' : 'Check Ban Status'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default BannedScreen;
