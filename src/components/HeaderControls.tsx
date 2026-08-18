'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { RevealInteractive } from './RevealInteractive';
import { LanguageToggle } from './LanguageToggle';

interface HeaderControlsProps {
  isMobile?: boolean;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({ isMobile = false }) => {
  const { theme, toggleTheme } = useAppStore();

  if (isMobile) {
    return (
      <div className="flex items-center gap-1.5 ms-auto">
        {/* Mobile Language Switcher */}
        <LanguageToggle isMobile={true} />

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
      {/* Desktop Language Switcher */}
      <LanguageToggle isMobile={false} />

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
