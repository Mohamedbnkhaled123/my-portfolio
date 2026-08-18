'use client';

import React from 'react';
import { useAppStore } from '../store/useAppStore';

interface LanguageToggleProps {
  className?: string;
  isMobile?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '', isMobile = false }) => {
  const { lang, language, toggleLang } = useAppStore();
  const currentLang = lang || language || 'en';

  return (
    <button
      onClick={() => toggleLang()}
      className={`group relative inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md hover:border-accent-cyan/70 dark:hover:border-accent-cyan/60 hover:shadow-[0_0_15px_rgba(0,251,255,0.25)] shadow-xs transition-all duration-300 active:scale-95 cursor-pointer ${className}`}
      title={currentLang === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
      aria-label="Toggle Language"
    >
      {/* Animated Translation SVG Icon */}
      <svg 
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 dark:text-slate-300 group-hover:rotate-180 group-hover:text-accent-cyan transition-transform duration-500 flex-shrink-0" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>

      {/* Language Text with Flip / Sliding Badge Animation */}
      <div className="overflow-hidden h-4 sm:h-5 w-6 sm:w-8 text-[11px] sm:text-xs font-bold relative flex items-center justify-center">
        <span 
          className={`absolute transition-all duration-300 uppercase tracking-wider ${
            currentLang === 'en' 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-4 opacity-0 pointer-events-none'
          } text-slate-800 dark:text-slate-200`}
        >
          EN
        </span>
        <span 
          className={`absolute transition-all duration-300 ${
            currentLang === 'ar' 
              ? 'translate-y-0 opacity-100 font-arabic font-bold' 
              : 'translate-y-4 opacity-0 pointer-events-none'
          } text-accent-cyan`}
        >
          عربي
        </span>
      </div>
    </button>
  );
};
