import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import RulesPage from './components/RulesPage';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './components/MainLayout';
import { ThemeProvider } from './providers/ThemeProvider';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-transparent text-brand-dark-text dark:text-gray-200 font-inter transition-colors duration-300">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/rules" element={<RulesPage />} />
            </Route>
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;