import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export const useAppInit = () => {
  const { theme, dir, language, lang } = useAppStore();
  const activeLang = lang || language || 'en';
  const activeDir = dir || (activeLang === 'ar' ? 'rtl' : 'ltr');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.setAttribute('dir', activeDir);
    document.documentElement.setAttribute('lang', activeLang);
    if (activeLang === 'ar') {
      document.body?.classList.add('font-arabic');
      document.body?.classList.remove('font-english');
    } else {
      document.body?.classList.add('font-english');
      document.body?.classList.remove('font-arabic');
    }
  }, [theme, activeDir, activeLang]);
};
