
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon, CheckmarkIcon, FlagENIcon, FlagFRIcon, FlagARIcon, FlagESIcon, FlagPTIcon, FlagDEIcon, FlagHIIcon, FlagRUIcon } from './icons/Icons';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: <FlagENIcon className="w-6 h-4 rounded-sm" /> },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: <FlagFRIcon className="w-6 h-4 rounded-sm" /> },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: <FlagARIcon className="w-6 h-4 rounded-sm" /> },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: <FlagESIcon className="w-6 h-4 rounded-sm" /> },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: <FlagPTIcon className="w-6 h-4 rounded-sm" /> },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: <FlagDEIcon className="w-6 h-4 rounded-sm" /> },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: <FlagHIIcon className="w-6 h-4 rounded-sm" /> },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: <FlagRUIcon className="w-6 h-4 rounded-sm" /> },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 360; // Approximate height of the dropdown menu in pixels
      
      // Open upwards if there's not enough space below AND there's enough space above
      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        setDirection('up');
      } else {
        setDirection('down');
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200/80 dark:border-white/10 rounded-full text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all active:scale-95 shadow-xs"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="flex-shrink-0 overflow-hidden rounded-[2px] shadow-xs">{currentLanguage.flag}</span>
        <span className="font-medium text-slate-700 dark:text-slate-200">{currentLanguage.name}</span>
        <ChevronDownIcon className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className={`absolute end-0 w-56 z-50 overflow-hidden 
                     bg-white dark:bg-[#16171f] border border-gray-200 dark:border-white/15 
                     rounded-2xl shadow-2xl shadow-black/25 dark:shadow-black/70 
                     animate-fade-in-up
                     ${direction === 'down' 
                        ? 'mt-2 origin-top-right' 
                        : 'bottom-full mb-2 origin-bottom-right'
                     }`}
          style={{animationDuration: '0.2s'}}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="p-3 border-b border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">
              Select Language
            </h3>
          </div>
          <ul className="p-1.5 space-y-0.5">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-colors ${
                    i18n.language === lang.code
                      ? 'bg-pink-50 dark:bg-pink-500/15 text-pink-600 dark:text-pink-400 font-bold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-brand-dark-text dark:hover:text-white'
                  }`}
                  role="menuitem"
                >
                  <span className="flex-shrink-0">{lang.flag}</span>
                  <span className="flex-grow">{lang.nativeName}</span>
                  {i18n.language === lang.code && <CheckmarkIcon className="w-4 h-4 text-pink-500 dark:text-pink-400" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;