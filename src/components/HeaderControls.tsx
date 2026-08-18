'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { RevealInteractive } from './RevealInteractive';

interface HeaderControlsProps {
  isMobile?: boolean;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({ isMobile = false }) => {
  const { theme, lang, language, toggleTheme, setLanguage, toggleLang } = useAppStore();
  const currentLang = lang || language || 'en';

  if (isMobile) {
    return (
      <div className="flex items-center gap-1.5 ms-auto">
        {/* Mobile Language Switcher (Pill with 3D Flip) */}
        <motion.button
          onClick={() => toggleLang()}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle Language"
          className="relative px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary hover:text-accent-cyan border border-slate-200/60 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 backdrop-blur-sm transition-colors cursor-pointer"
        >
          <motion.span
            key={currentLang}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="inline-block text-accent-cyan font-bold"
          >
            {currentLang === 'en' ? 'AR' : 'EN'}
          </motion.span>
        </motion.button>

        {/* Mobile Theme Toggle (360° Rotation Micro-Interaction) */}
        <motion.button
          onClick={() => toggleTheme()}
          whileTap={{ scale: 0.88 }}
          aria-label="Toggle Theme"
          className="p-1.5 rounded-full text-secondary hover:text-accent-cyan transition-colors cursor-pointer flex items-center justify-center"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -180, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </motion.div>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 ms-2">
      {/* Desktop Language Switcher (3D Flip Pill with Globe) */}
      <RevealInteractive radiusClass="rounded-full">
        <motion.button
          onClick={() => toggleLang()}
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle Language"
          className="flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-full w-full h-full transition-colors cursor-pointer"
        >
          <Globe className="w-4 h-4 text-accent-cyan flex-shrink-0" />
          <motion.span
            key={currentLang}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-xs lg:text-sm font-bold uppercase inline-block"
          >
            {currentLang === 'en' ? 'AR' : 'EN'}
          </motion.span>
        </motion.button>
      </RevealInteractive>

      {/* Desktop Theme Toggle (360° Smooth Rotation Micro-Interaction) */}
      <RevealInteractive radiusClass="rounded-full">
        <motion.button
          onClick={() => toggleTheme()}
          whileTap={{ scale: 0.88 }}
          aria-label="Toggle Theme"
          className="flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2 rounded-full w-full h-full transition-colors cursor-pointer"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -180, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400" /> : <Moon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-800" />}
          </motion.div>
        </motion.button>
      </RevealInteractive>
    </div>
  );
};
