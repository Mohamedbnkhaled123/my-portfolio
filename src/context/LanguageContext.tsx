import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations, Language } from '../i18n/translations';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('portfolio-lang') as Language) || 'en';
  });

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // Update body font family based on language
    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-english');
    } else {
      document.body.classList.add('font-english');
      document.body.classList.remove('font-arabic');
    }
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  const toggleLang = (): void => setLang(prev => prev === 'en' ? 'ar' : 'en');

  const t = (key: string): string => {
    // Simple deep nested key support: 'hero.title'
    const value = key.split('.').reduce((obj: any, k: string) => (obj || {})[k], translations[lang]);
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
