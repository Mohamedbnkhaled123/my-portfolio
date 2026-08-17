'use client';

import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function ClientStoreSync() {
  const { lang, theme } = useAppStore();

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('portfolio-lang');
      if (savedLang === 'ar' || savedLang === 'en') {
        if (savedLang !== lang) {
          useAppStore.setState({ lang: savedLang });
        }
        document.documentElement.lang = savedLang;
        document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
        if (savedLang === 'ar') {
          document.body.classList.add('font-arabic');
          document.body.classList.remove('font-english');
        } else {
          document.body.classList.add('font-english');
          document.body.classList.remove('font-arabic');
        }
      }

      const savedTheme = localStorage.getItem('portfolio-theme');
      if ((savedTheme === 'light' || savedTheme === 'dark') && savedTheme !== theme) {
        useAppStore.setState({ theme: savedTheme });
      }
    } catch {
      // Ignore in private browsing
    }
  }, []);

  return null;
}
