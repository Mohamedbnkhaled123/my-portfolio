'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { RevealInteractive } from './RevealInteractive';

interface HeaderControlsProps {
  isMobile?: boolean;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({ isMobile = false }) => {
  const { theme, lang, language, toggleTheme, toggleLang } = useAppStore();
  const currentLang = lang || language || 'en';

  if (isMobile) {
    return (
      <div className="flex items-center gap-1.5 ms-auto">
        {/* Mobile Language Switcher (Framed Pill with Globe) */}
        <RevealInteractive radiusClass="rounded-full">
          <motion.button
            onClick={() => toggleLang()}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle Language"
            className="flex items-center justify-center gap-1 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <motion.div
              animate={{ rotate: currentLang === 'ar' ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center flex-shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-accent-cyan" />
            </motion.div>
            <span className="text-[11px] font-bold uppercase tracking-wider block">
              {currentLang === 'en' ? 'AR' : 'EN'}
            </span>
          </motion.button>
        </RevealInteractive>

        {/* Mobile Theme Toggle (Framed Circle) */}
        <RevealInteractive radiusClass="rounded-full">
          <motion.button
            onClick={() => toggleTheme()}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle Theme"
            className="flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-1.5 rounded-full transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-slate-300 hover:text-white" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-700 hover:text-slate-900" />
            )}
          </motion.button>
        </RevealInteractive>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Desktop Language Switcher (Framed Pill with Globe) */}
      <RevealInteractive radiusClass="rounded-full">
        <motion.button
          onClick={() => toggleLang()}
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle Language"
          className="flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 px-2.5 lg:px-3 py-2 rounded-full w-full h-full transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ rotate: currentLang === 'ar' ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center flex-shrink-0"
          >
            <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-accent-cyan" />
          </motion.div>
          <span className="text-xs lg:text-sm font-bold uppercase block">
            {currentLang === 'en' ? 'AR' : 'EN'}
          </span>
        </motion.button>
      </RevealInteractive>

      {/* Desktop Theme Toggle (Framed Circle) */}
      <RevealInteractive radiusClass="rounded-full">
        <motion.button
          onClick={() => toggleTheme()}
          whileTap={{ scale: 0.88 }}
          aria-label="Toggle Theme"
          className="flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 p-2 rounded-full w-full h-full transition-colors cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 lg:w-5 lg:h-5 text-slate-300 hover:text-white" />
          ) : (
            <Moon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-700 hover:text-slate-900" />
          )}
        </motion.button>
      </RevealInteractive>
    </div>
  );
};
