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
      <div className="flex items-center gap-1.5 ml-auto">
        {/* Mobile Language Switcher with 3D Flip */}
        <div style={{ perspective: 800 }}>
          <motion.button
            onClick={() => toggleLang()}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle Language"
            className="text-secondary hover:text-accent-cyan p-1.5 cursor-pointer flex items-center justify-center transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={currentLang}
                initial={{ rotateY: -180, opacity: 0, scale: 0.8 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: 180, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                className="text-xs font-bold uppercase text-accent-cyan block"
              >
                {currentLang === 'en' ? 'AR' : 'EN'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Theme Toggle (360° Rotation Micro-Interaction) */}
        <div style={{ perspective: 800 }}>
          <motion.button
            onClick={() => toggleTheme()}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle Theme"
            className="text-secondary hover:text-accent-cyan p-1.5 cursor-pointer flex items-center justify-center transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -180, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 180, scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Desktop Language Switcher (Pill with true 3D Coin Flip Effect) */}
      <RevealInteractive radiusClass="rounded-full">
        <div style={{ perspective: 1000 }} className="w-full h-full">
          <motion.button
            onClick={() => toggleLang()}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle Language"
            className="flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 px-2.5 lg:px-3 py-2 rounded-full w-full h-full transition-colors cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentLang}
                initial={{ rotateY: -180, opacity: 0, scale: 0.85 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: 180, opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                className="flex items-center gap-1.5"
              >
                <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-accent-cyan flex-shrink-0" />
                <span className="text-xs lg:text-sm font-bold uppercase block">{currentLang === 'en' ? 'AR' : 'EN'}</span>
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </RevealInteractive>

      {/* Desktop Theme Toggle (360° Smooth Rotation Micro-Interaction) */}
      <RevealInteractive radiusClass="rounded-full">
        <div style={{ perspective: 1000 }} className="w-full h-full">
          <motion.button
            onClick={() => toggleTheme()}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle Theme"
            className="flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 p-2 rounded-full w-full h-full transition-colors cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -360, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 360, scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400" /> : <Moon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-800" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </RevealInteractive>
    </div>
  );
};
