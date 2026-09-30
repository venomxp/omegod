import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MenuIcon, CloseIcon, OmeGodLogoIcon } from './icons/Icons';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const MainLayout: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3.5 py-1 text-sm font-medium transition-all ${
      isActive
        ? 'text-gray-900 dark:text-white font-bold border-b-2 border-gray-900 dark:border-white pb-0.5'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`;
    
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block w-full text-left px-4 py-3 rounded-lg text-lg transition-colors ${
      isActive
        ? 'bg-black/10 dark:bg-white/10 text-brand-dark-text dark:text-white font-bold'
        : 'text-gray-600 dark:text-gray-300 hover:text-brand-dark-text dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
    }`;

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative flex flex-col">
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0c0d12]/90 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/10 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center relative">
            <Link to="/" className="flex items-center gap-2 text-brand-dark-text dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-lg p-0.5">
                <OmeGodLogoIcon className="h-7 w-7 sm:h-8 sm:w-8 text-pink-500 flex-shrink-0" />
                <span className="text-2xl sm:text-3xl font-bold tracking-tight font-outfit">OmeGod</span>
            </Link>
            
            <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 lg:gap-4">
                <NavLink to="/" className={navLinkClasses} end>{t('nav.home')}</NavLink>
                <NavLink to="/privacy" className={navLinkClasses}>{t('nav.privacy')}</NavLink>
                <NavLink to="/terms" className={navLinkClasses}>{t('nav.terms')}</NavLink>
                <NavLink to="/rules" className={navLinkClasses}>{t('nav.rules')}</NavLink>
            </nav>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language & Theme Switchers: visible on desktop, hidden on mobile (accessible via mobile sidebar) */}
              <div className="hidden md:flex items-center gap-2 sm:gap-3">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
              
              <Link
                to="/chat?start=true"
                className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#ff1361] via-[#f72585] to-[#ff6b35] hover:from-[#ff0055] hover:to-[#ff5520] shadow-md shadow-pink-500/25 active:scale-95 transition-all font-outfit"
              >
                {t('home.getStarted') || 'Start Chatting'}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-brand-dark-text dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Open menu"
              >
                <MenuIcon className="w-5 h-5" />
              </button>
            </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity md:hidden ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      ></div>
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white/70 dark:bg-brand-gray/80 backdrop-blur-xl border-l border-gray-200 dark:border-white/10 shadow-2xl shadow-black/20 dark:shadow-2xl dark:shadow-black/60 transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          <div>
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2.5 text-brand-dark-text dark:text-white">
                  <OmeGodLogoIcon className="h-7 w-7" />
                  <span className="text-2xl font-bold tracking-tight font-outfit">OmeGod</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-dark-text dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-col space-y-2">
              <NavLink to="/" className={mobileNavLinkClasses} onClick={handleMobileLinkClick} end>{t('nav.home')}</NavLink>
              <NavLink to="/privacy" className={mobileNavLinkClasses} onClick={handleMobileLinkClick}>{t('nav.privacy')}</NavLink>
              <NavLink to="/terms" className={mobileNavLinkClasses} onClick={handleMobileLinkClick}>{t('nav.terms')}</NavLink>
              <NavLink to="/rules" className={mobileNavLinkClasses} onClick={handleMobileLinkClick}>{t('nav.rules')}</NavLink>
            </nav>

            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-center gap-4">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>
            </div>
          </div>
        </div>
      </div>


      <main>
        <Outlet />
      </main>
      
      <footer className="text-gray-500 dark:text-gray-400 pt-12 pb-10 border-t border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          <div className="flex justify-center gap-x-6 mt-4 text-sm">
            <Link to="/privacy" className="hover:text-brand-dark-text dark:hover:text-white transition-colors">{t('nav.privacy')}</Link>
            <Link to="/terms" className="hover:text-brand-dark-text dark:hover:text-white transition-colors">{t('nav.terms')}</Link>
            <Link to="/rules" className="hover:text-brand-dark-text dark:hover:text-white transition-colors">{t('nav.rules')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;