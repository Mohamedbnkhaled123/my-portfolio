import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, Language } from '../i18n/translations';

export type Theme = 'dark' | 'light';
export type Direction = 'ltr' | 'rtl';

interface AppState {
  theme: Theme;
  language: Language;
  lang: Language; // Alias for backward compatibility
  dir: Direction;
  alertContactPulse: boolean;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleLang: () => void;
  fireContactPulse: () => void;
  t: (key: string) => string;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => {
      let pulseTimer: ReturnType<typeof setTimeout> | null = null;

      return {
        theme: 'dark', // Default to Dark Mode
        language: 'en', // Default to English
        lang: 'en', // Default to English
        dir: 'ltr', // Default to LTR
        alertContactPulse: false,

        toggleTheme: () => {
          const nextTheme: Theme = get().theme === 'dark' ? 'light' : 'dark';
          const executeChange = () => {
            set({ theme: nextTheme });
            if (typeof document !== 'undefined') {
              document.documentElement.classList.toggle('dark', nextTheme === 'dark');
              document.documentElement.classList.toggle('light', nextTheme === 'light');
            }
          };

          if (typeof document !== 'undefined' && 'startViewTransition' in document) {
            (document as any).startViewTransition(executeChange);
          } else {
            executeChange();
          }
        },

        setLanguage: (newLang: Language) => {
          const nextDir: Direction = newLang === 'ar' ? 'rtl' : 'ltr';
          const executeChange = () => {
            set({ language: newLang, lang: newLang, dir: nextDir });
            if (typeof document !== 'undefined') {
              document.documentElement.setAttribute('dir', nextDir);
              document.documentElement.setAttribute('lang', newLang);
              if (newLang === 'ar') {
                document.body?.classList.add('font-arabic');
                document.body?.classList.remove('font-english');
              } else {
                document.body?.classList.add('font-english');
                document.body?.classList.remove('font-arabic');
              }
            }
          };

          if (typeof document !== 'undefined' && 'startViewTransition' in document) {
            (document as any).startViewTransition(executeChange);
          } else {
            executeChange();
          }
        },

        toggleLang: () => {
          const currentLang = get().lang || get().language;
          const nextLang: Language = currentLang === 'en' ? 'ar' : 'en';
          get().setLanguage(nextLang);
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
          const currentLang = get().lang || get().language || 'en';
          const value = key.split('.').reduce((obj: any, k: string) => (obj || {})[k], translations[currentLang]);
          return typeof value === 'string' ? value : key;
        }
      };
    },
    {
      name: 'app-preferences',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        lang: state.lang,
        dir: state.dir,
      }),
    }
  )
);
