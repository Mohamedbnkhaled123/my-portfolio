import { create } from 'zustand';
import { translations, Language } from '../i18n/translations';

type Theme = 'light' | 'dark';

interface AppState {
  lang: Language;
  theme: Theme;
  alertContactPulse: boolean;
  toggleLang: () => void;
  toggleTheme: () => void;
  fireContactPulse: () => void;
  t: (key: string) => string;
}

const isClient = typeof window !== 'undefined';

// Helper to determine initial Theme
const getInitialTheme = (): Theme => {
  if (!isClient) return 'dark';
  const saved = localStorage.getItem('portfolio-theme') as Theme | null;
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Helper to determine initial Lang
const getInitialLang = (): Language => {
  if (!isClient) return 'en';
  return (localStorage.getItem('portfolio-lang') as Language) || 'en';
};

export const useAppStore = create<AppState>((set, get) => {
  const initialTheme = getInitialTheme();
  const initialLang = getInitialLang();

  // Apply initial HTML classes
  const applyTheme = (t: Theme) => {
    if (!isClient) return;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(t);
    localStorage.setItem('portfolio-theme', t);
  };
  
  const applyLang = (l: Language) => {
    if (!isClient) return;
    const html = document.documentElement;
    html.lang = l;
    html.dir = l === 'ar' ? 'rtl' : 'ltr';
    if (l === 'ar') {
      document.body?.classList.add('font-arabic');
      document.body?.classList.remove('font-english');
    } else {
      document.body?.classList.add('font-english');
      document.body?.classList.remove('font-arabic');
    }
    localStorage.setItem('portfolio-lang', l);
  };

  // Run on store creation (Client Side only)
  if (isClient) {
    applyTheme(initialTheme);
    applyLang(initialLang);
  }

  let pulseTimer: ReturnType<typeof setTimeout> | null = null;

  return {
    lang: initialLang,
    theme: initialTheme,
    alertContactPulse: false,

    toggleLang: () => set((state) => {
      const nextLang = state.lang === 'en' ? 'ar' : 'en';
      applyLang(nextLang);
      return { lang: nextLang };
    }),

    toggleTheme: () => {
      const state = get();
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';

      const executeThemeChange = () => {
        applyTheme(nextTheme);
        set({ theme: nextTheme });
      };

      // @ts-ignore - View Transitions API might not be in the current TS DOM types
      if (!document.startViewTransition) {
        executeThemeChange();
        return;
      }

      // @ts-ignore
      document.startViewTransition(() => {
        executeThemeChange();
      });
    },

    fireContactPulse: () => set(() => {
      if (pulseTimer) clearTimeout(pulseTimer);
      pulseTimer = setTimeout(() => {
        set({ alertContactPulse: false });
        pulseTimer = null;
      }, 5000);
      return { alertContactPulse: true };
    }),

    t: (key: string): string => {
      const { lang } = get();
      const value = key.split('.').reduce((obj: any, k: string) => (obj || {})[k], translations[lang]);
      return typeof value === 'string' ? value : key;
    }
  };
});
