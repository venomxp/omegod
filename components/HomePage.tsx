

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FaqItem from './FaqItem';
import { GlobeIcon, OmeGodLogoIcon, ShieldCheckIcon, VideoCameraIcon, CheckmarkIcon, HelpCircleIcon } from './icons/Icons';
import AgeConsentModal from './AgeConsentModal';

const Ticker: React.FC = () => {
  const { t } = useTranslation();
  const tickerItems = t('home.ticker', { returnObjects: true }) as string[];
  const duplicatedItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems]; // Duplicate for seamless scroll

  return (
    <div className="relative w-full overflow-hidden py-8 bg-brand-light-card dark:bg-brand-dark">
       <div className="absolute inset-0 border-y border-gray-200 dark:border-white/10"></div>
       <div className="relative flex whitespace-nowrap animate-scroll-ticker">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center mx-6">
            <span className="text-xl font-medium text-brand-dark-text dark:text-white">{item}</span>
            <OmeGodLogoIcon className="w-6 h-6 mx-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  
  const [interests, setInterests] = useState<string[]>(() => {
    try {
      const storedInterests = window.localStorage.getItem('omegod-interests');
      return storedInterests ? JSON.parse(storedInterests) : [];
    } catch (error) {
      console.error('Error reading interests from localStorage', error);
      return [];
    }
  });

  const [customInterest, setCustomInterest] = useState('');
  
  useEffect(() => {
    try {
      window.localStorage.setItem('omegod-interests', JSON.stringify(interests));
    } catch (error) {
      console.error('Error saving interests to localStorage', error);
    }
  }, [interests]);

  const heroStats = t('home.heroStats', { returnObjects: true }) as { value: string; label: string }[];
  const features = t('home.features', { returnObjects: true }) as { icon: string; title: string; description: string }[];
  const metrics = t('home.metrics', { returnObjects: true }) as { value: string; label: string }[];
  const faqs = t('home.faqs', { returnObjects: true }) as { question: string; answer: string }[];
  const predefinedInterests = t('home.interests', { returnObjects: true }) as { label: string; emoji: string }[];
  const chatUrl = `/chat?start=true${interests.length > 0 ? `&interests=${interests.join(',')}` : ''}`;
  
  const iconMap: { [key: string]: React.ReactNode } = {
    ShieldCheck: <ShieldCheckIcon className="w-8 h-8 text-white" />,
    VideoCamera: <VideoCameraIcon className="w-8 h-8 text-white" />,
    Globe: <GlobeIcon className="w-8 h-8 text-white" />,
  };

  const getFeatureBadge = (index: number) => {
    if (i18n.language === 'ar') {
      const tags = ['مجهول 100%', 'دقة عالية HD', '+190 دولة'];
      return tags[index] || '';
    }
    if (i18n.language === 'fr') {
      const tags = ['100% Anonyme', 'Ultra HD 60fps', '+190 Pays'];
      return tags[index] || '';
    }
    const tags = ['100% Anonymous', 'Ultra HD 60fps', '190+ Countries'];
    return tags[index] || '';
  };

  const getFeaturePerks = (index: number) => {
    if (i18n.language === 'ar') {
      const perks = [
        ['بدون بريد أو تسجيل مسبق', 'تشفير كامل وحماية الهوية'],
        ['بث فيديو سلس 60 إطار/ثانية', 'صوت نقي ومباشر بذكاء'],
        ['مطابقة فورية بنقرة واحدة', 'تواصل مع ثقافات من كل العالم']
      ];
      return perks[index] || [];
    }
    if (i18n.language === 'fr') {
      const perks = [
        ['Aucune inscription requise', 'Confidentialité totale & zéro log'],
        ['Flux vidéo 60fps haute fidélité', 'Ajustement adaptatif de débit'],
        ['Connexion mondiale instantanée', 'Découvrez de nouvelles cultures']
      ];
      return perks[index] || [];
    }
    const perks = [
      ['No registration or email required', 'Zero logs & total privacy protection'],
      ['Smooth 60fps high-definition streams', 'Ultra-low latency adaptive WebRTC'],
      ['Instant 1-click global matching', 'Connect with 190+ cultures safely']
    ];
    return perks[index] || [];
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleToggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleAddCustomInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInterest = customInterest.trim();
    if (trimmedInterest && !interests.includes(trimmedInterest)) {
      setInterests(prev => [...prev, trimmedInterest]);
    }
    setCustomInterest('');
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(prev => prev.filter(i => i !== interestToRemove));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
        {/* Ambient Warm Glow behind the right cards */}
        <div 
          aria-hidden="true" 
          className="absolute top-1/2 -translate-y-1/2 end-0 lg:end-10 w-[550px] h-[550px] bg-gradient-to-br from-pink-300/30 via-rose-200/25 to-orange-200/20 dark:from-pink-900/15 dark:via-rose-900/10 dark:to-orange-950/10 rounded-full blur-3xl pointer-events-none -z-10" 
        />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column (Text & Primary CTA) */}
            <div className="lg:col-span-7 text-center flex flex-col items-center justify-center">
              {/* Eyebrow badge */}
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-slate-500 dark:text-slate-400 mb-3 sm:mb-4 text-center">
                {i18n.language === 'ar' ? 'دردشة عفوية. أشخاص حقيقيون.' : 'RANDOM CHAT. REAL PEOPLE.'}
              </p>

              {/* Bold Editorial Headline matching reference screenshot */}
              <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.08] sm:leading-[1.12] text-[#0f172a] dark:text-white select-none text-center flex flex-col items-center">
                <span className="block text-center">{i18n.language === 'ar' ? 'أشخاص رائعون' : 'Good People'}</span>
                <span className="inline-flex items-center justify-center gap-3 mt-1 sm:mt-2 text-center">
                  <span className="inline-block bg-gradient-to-r from-[#ff1361] via-[#f72585] to-[#ff6b35] bg-clip-text text-transparent pb-2 sm:pb-3 pe-1 overflow-visible">
                    {i18n.language === 'ar' ? 'في كل مكان' : 'Everywhere'}
                  </span>
                  {/* Cute hand-drawn heart doodle */}
                  <svg 
                    className="w-7 h-7 sm:w-10 sm:h-10 text-[#ff2e7e] -rotate-12 inline-block flex-shrink-0 mb-1 sm:mb-2" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed font-normal text-center">
                {i18n.language === 'ar'
                  ? 'محادثات فيديو ورسائل نصية فورية مع أشخاص من جميع أنحاء العالم. خلفيات متنوعة، لكن بنفس التواصل الإنساني الحقيقي.'
                  : 'Instant video and text chat with strangers from around the world. Different backgrounds. Same human connection.'}
              </p>

              {/* Primary CTA Row */}
              <div className="mt-8 sm:mt-10 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const hasAccepted = localStorage.getItem('omegod_age_terms_accepted') === 'true';
                    if (hasAccepted) {
                      navigate(chatUrl);
                    } else {
                      setIsConsentModalOpen(true);
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#ff1361] via-[#f72585] to-[#ff6b35] hover:from-[#ff0055] hover:to-[#ff5520] shadow-xl shadow-pink-500/35 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all font-outfit cursor-pointer"
                >
                  <span>{t('home.getStarted')}</span>
                  <span className="text-xl leading-none">→</span>
                </button>
              </div>

              {/* Interests & Topics matching feature (Centrally aligned) */}
              <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-white/10 flex flex-col items-center text-center w-full max-w-xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-3 w-full">
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5">
                    <span>⚡</span>
                    <span>{t('home.interestsTitle')}</span>
                    {interests.length > 0 && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-600 dark:text-pink-400">
                        {interests.length} {i18n.language === 'ar' ? 'محدد' : 'selected'}
                      </span>
                    )}
                  </span>
                  {interests.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setInterests([])}
                      className="text-[11px] text-pink-600 hover:text-pink-700 dark:text-pink-400 font-semibold underline underline-offset-2 ms-2"
                    >
                      {i18n.language === 'ar' ? 'مسح الكل' : 'Clear all'}
                    </button>
                  )}
                </div>

                {/* Selected Interests tags */}
                {interests.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3 max-w-xl mx-auto">
                    {interests.map(interest => (
                      <span
                        key={interest}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-600 to-orange-500 text-white shadow-sm"
                      >
                        <span>#{interest}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveInterest(interest)}
                          className="hover:opacity-75 transition-opacity"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Quick Add Custom Interest Input */}
                <form onSubmit={handleAddCustomInterest} className="relative flex items-center mb-3 max-w-md w-full mx-auto">
                  <input
                    type="text"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    placeholder={t('home.addInterestPlaceholder')}
                    className="w-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-full ps-4 pe-20 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 border border-slate-200 dark:border-white/10 placeholder:text-slate-400 text-center sm:text-start"
                  />
                  <button
                    type="submit"
                    className="absolute end-1.5 px-4 py-1.5 bg-gradient-to-r from-pink-600 to-orange-500 text-white font-bold text-xs rounded-full shadow-sm hover:opacity-95 active:scale-95 transition-all"
                  >
                    {t('home.addButton')}
                  </button>
                </form>

                {/* Predefined tag pills */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xl mx-auto">
                  {predefinedInterests.map(interest => {
                    const isSelected = interests.includes(interest.label);
                    return (
                      <button
                        key={interest.label}
                        type="button"
                        onClick={() => handleToggleInterest(interest.label)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-600 to-orange-500 text-white border-transparent shadow-sm scale-105'
                            : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10'
                        }`}
                      >
                        <span>{interest.emoji}</span>
                        <span>{interest.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column (The Overlapping Polaroid Cards) */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-6 pb-10 sm:py-12">
              
              {/* Decorative Burst Lines above woman's card */}
              <div className="absolute top-0 right-1/4 sm:right-1/3 z-20 pointer-events-none">
                <svg className="w-10 h-10 text-[#ff2e7e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 3v4M6.34 6.34l2.83 2.83M17.66 6.34l-2.83 2.83" />
                </svg>
              </div>

              {/* Decorative Heart between cards */}
              <div className="absolute top-1/3 left-1 sm:-left-4 z-30 pointer-events-none">
                <svg className="w-9 h-9 text-[#ff2e7e] -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
              </div>

              <div className="relative w-full max-w-[490px] h-[430px] sm:h-[490px] md:h-[520px] flex items-center justify-center">

                {/* Card 1: Right Card (Live stranger) - Tilted clockwise - ON TOP */}
                <div className="absolute right-0 sm:right-2 top-2 sm:top-4 w-[245px] sm:w-[285px] md:w-[315px] bg-white dark:bg-[#1a1b24] p-3.5 sm:p-4 rounded-[32px] shadow-2xl shadow-rose-950/20 dark:shadow-black/90 border border-slate-100 dark:border-white/10 rotate-[5deg] hover:rotate-3 transition-transform duration-300 z-20 select-none">
                  {/* Photo with rounded corners */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] bg-slate-100 dark:bg-slate-800">
                    <img 
                      src="/images/card-top.png" 
                      onError={(e) => {
                        e.currentTarget.src = "https://i.postimg.cc/j5zyvfZM/Chat-GPT-Image-Sep-29-2026-11-18-49-PM.png";
                      }}
                      alt="Live stranger smiling and waving" 
                      className="w-full h-full object-cover"
                    />

                    {/* Live Badge */}
                    <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                      <span>Live</span>
                    </div>
                  </div>

                  {/* Floating Chat Message Bubble overlapping bottom-left */}
                  <div className="absolute -bottom-4 -left-6 sm:-left-8 bg-white dark:bg-[#1a1b24] p-3 sm:p-3.5 rounded-2xl shadow-xl shadow-black/10 border border-slate-100 dark:border-white/10 max-w-[200px] sm:max-w-[225px] z-30">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">Hey! 👋</p>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Where are you from?</p>
                  </div>
                </div>

                {/* Card 2: Left Card (New match) - Tilted counter-clockwise - UNDERNEATH */}
                <div className="absolute left-0 sm:left-2 bottom-4 sm:bottom-6 w-[235px] sm:w-[270px] md:w-[298px] bg-white dark:bg-[#1a1b24] p-3.5 sm:p-4 rounded-[32px] shadow-xl shadow-black/20 dark:shadow-black/70 border border-slate-100 dark:border-white/10 -rotate-[6deg] hover:-rotate-3 transition-transform duration-300 z-10 select-none">
                  {/* Photo with rounded corners */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] bg-slate-100 dark:bg-slate-800">
                    <img 
                      src="/images/card-bottom.png" 
                      onError={(e) => {
                        e.currentTarget.src = "https://i.postimg.cc/YSL6GZgh/Chat-GPT-Image-Sep-29-2026-11-09-34-PM.png";
                      }}
                      alt="New match stranger smiling" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Floating "New match!" Pill Badge */}
                  <div className="absolute -bottom-3 left-4 sm:left-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a1b24] shadow-lg shadow-black/10 border border-slate-100 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white z-30">
                    <span className="text-sm">💖</span>
                    <span>New match!</span>
                  </div>

                  {/* Floating Typing Bubble next to bottom-right */}
                  <div className="absolute -bottom-5 -right-5 sm:-right-7 inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-[#1a1b24] shadow-lg shadow-black/10 border border-slate-100 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 z-30">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-typing-dot-1" />
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-typing-dot-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-typing-dot-3" />
                    </span>
                    <span>Typing...</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
          
          {/* Stats Bar (Centrally aligned) */}
          <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-center gap-10 sm:gap-20 text-center max-w-2xl mx-auto">
            {heroStats.map((stat, index) => (
              <div key={index} className="p-3 flex flex-col items-center justify-center text-center min-w-[140px]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] dark:text-white font-outfit text-center">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium text-center">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Ticker />

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 relative overflow-hidden">
        {/* Modern ambient auras */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1000px] h-[450px] bg-gradient-to-r from-pink-500/10 via-orange-500/10 to-rose-500/10 dark:from-pink-900/20 dark:via-orange-950/20 dark:to-rose-950/20 blur-[130px] rounded-full"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/5 dark:bg-pink-600/10 blur-[90px] rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/5 dark:bg-orange-600/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-pink-500/10 to-orange-500/10 dark:from-pink-500/20 dark:to-orange-500/20 border border-pink-500/30 dark:border-pink-500/40 text-pink-600 dark:text-orange-400 mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 animate-pulse"></span>
              <span>{i18n.language === 'ar' ? 'مميزات المنصة' : i18n.language === 'fr' ? 'Pourquoi Nous Choisir' : 'Next-Gen Video Chat'}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit text-brand-dark-text dark:text-white tracking-tight leading-tight">
              {t('home.servicesTitle')}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-light-text dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {i18n.language === 'ar' 
                ? 'تجربة دردشة عصرية سريعة، مجهولة بالكامل، وتعمل بدقة عالية وبدون أي تعقيدات أو تسجيل.'
                : i18n.language === 'fr'
                ? 'Découvrez une plateforme moderne, ultra rapide et sécurisée pour faire de nouvelles rencontres sans friction.'
                : 'Experience spontaneous, high-definition video conversations with absolute privacy and zero setup.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {features.map((feature, index) => {
              const badge = getFeatureBadge(index);
              const perks = getFeaturePerks(index);
              return (
                <div 
                  key={index} 
                  className="group relative flex flex-col justify-between p-8 sm:p-9 rounded-3xl bg-white/90 dark:bg-[#151518]/90 backdrop-blur-xl border border-gray-200/90 dark:border-white/10 shadow-xl shadow-gray-200/40 dark:shadow-2xl dark:shadow-black/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/15 dark:hover:shadow-pink-500/20 hover:border-pink-400/60 dark:hover:border-pink-500/40 overflow-hidden"
                >
                  {/* Subtle top-right ambient flare on hover */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-pink-500/10 via-orange-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none opacity-60 group-hover:opacity-100"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="relative">
                        <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 p-0.5 shadow-lg shadow-pink-500/25 group-hover:shadow-pink-500/40 group-hover:scale-105 transition-all duration-300">
                          <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-pink-600 to-orange-500 flex items-center justify-center text-white">
                            {iconMap[feature.icon]}
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-pink-500/30 blur-lg rounded-2xl -z-10 group-hover:opacity-100 opacity-40 transition-opacity duration-300"></div>
                      </div>

                      {badge && (
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 tracking-wide shadow-sm">
                          {badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-brand-dark-text dark:text-white mb-3 font-outfit tracking-tight group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-brand-light-text dark:text-gray-300 leading-relaxed text-sm sm:text-base mb-6">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bullet perks */}
                  <div className="relative z-10 pt-5 mt-auto border-t border-gray-100 dark:border-white/10 flex flex-col gap-2.5">
                    {perks.map((perk, perkIdx) => (
                      <div key={perkIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white flex-shrink-0">
                          <CheckmarkIcon className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-medium">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {metrics.map((metric, index) => (
                    <div key={index}>
                        <p className="text-4xl lg:text-5xl font-bold font-outfit text-brand-dark-text dark:text-white">{metric.value}</p>
                        <p className="mt-2 text-sm text-brand-light-text dark:text-brand-light-gray">{metric.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 sm:py-32 relative overflow-hidden">
        {/* Modern ambient auras */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-orange-500/10 dark:from-pink-900/15 dark:via-rose-950/15 dark:to-orange-950/15 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-pink-500/5 dark:bg-pink-600/10 blur-[90px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-pink-500/10 to-orange-500/10 dark:from-pink-500/20 dark:to-orange-500/20 border border-pink-500/30 dark:border-pink-500/40 text-pink-600 dark:text-orange-400 mb-4 shadow-sm">
              <HelpCircleIcon className="w-3.5 h-3.5" />
              <span>{i18n.language === 'ar' ? 'مركز الأسئلة والمساعدة' : i18n.language === 'fr' ? 'Questions Fréquentes' : 'Help & Answers'}</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit text-brand-dark-text dark:text-white tracking-tight leading-tight">
              {t('home.faqTitle')}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-light-text dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
              {t('home.faqSubtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem 
                key={index} 
                index={index}
                question={faq.question} 
                answer={faq.answer} 
                isOpen={openFaqIndex === index}
                onClick={() => toggleFaq(index)}
              />
            ))}
          </div>

          {/* Bottom Support & Help Card */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-pink-500/5 via-rose-500/5 to-orange-500/5 dark:from-white/[0.03] dark:to-white/[0.01] border border-pink-500/20 dark:border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left rtl:sm:text-right">
            <div>
              <h4 className="text-lg font-bold font-outfit text-brand-dark-text dark:text-white">
                {i18n.language === 'ar' ? 'هل لديك استفسار آخر؟' : i18n.language === 'fr' ? 'Vous avez d\'autres questions ?' : 'Still have questions?'}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {i18n.language === 'ar' 
                  ? 'اطلع على القواعد والشروط الكاملة لضمان محادثات آمنة وممتعة.' 
                  : i18n.language === 'fr' 
                  ? 'Consultez nos règles et conditions pour une expérience optimale.' 
                  : 'Check out our community guidelines and privacy policies for safe chatting.'}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Link 
                to="/rules" 
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white dark:bg-white/10 text-gray-800 dark:text-white border border-gray-200 dark:border-white/10 hover:border-pink-500/50 hover:text-pink-600 dark:hover:text-pink-400 transition-all shadow-sm"
              >
                {t('nav.rules')}
              </Link>
              <Link 
                to="/privacy" 
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white dark:bg-white/10 text-gray-800 dark:text-white border border-gray-200 dark:border-white/10 hover:border-pink-500/50 hover:text-pink-600 dark:hover:text-pink-400 transition-all shadow-sm"
              >
                {t('nav.privacy')}
              </Link>
              <button 
                type="button"
                onClick={() => {
                  const hasAccepted = localStorage.getItem('omegod_age_terms_accepted') === 'true';
                  if (hasAccepted) {
                    navigate(chatUrl);
                  } else {
                    setIsConsentModalOpen(true);
                  }
                }}
                className="px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-pink-600 to-orange-500 text-white shadow-md shadow-pink-500/25 hover:scale-105 transition-all cursor-pointer"
              >
                {t('home.getStarted')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 18+ and Terms & Rules Consent Modal */}
      <AgeConsentModal
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
        onConfirm={() => {
          setIsConsentModalOpen(false);
          navigate(chatUrl);
        }}
      />
    </>
  );
};

export default HomePage;