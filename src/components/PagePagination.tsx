'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '../store/useAppStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RevealInteractive } from './RevealInteractive';

interface PageRoute {
  path: string;
  key: string;
}

export const PAGES: PageRoute[] = [
  { path: '/', key: 'home' },
  { path: '/about', key: 'about' },
  { path: '/skills', key: 'skills' },
  { path: '/experience', key: 'experience' },
  { path: '/projects', key: 'projects' },
  { path: '/education', key: 'education' },
  { path: '/contact', key: 'contact' },
];

export const PagePagination: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, t, fireContactPulse } = useAppStore();

  const currentPath = (pathname || '/').toLowerCase();
  const currentIndex = PAGES.findIndex(p => p.path === currentPath);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  const prevPage = activeIndex > 0 ? PAGES[activeIndex - 1] : null;
  const nextPage = activeIndex < PAGES.length - 1 ? PAGES[activeIndex + 1] : null;

  const handleNavigate = (path: string) => {
    if (path === '/contact') {
      fireContactPulse();
    }
    if (pathname !== path) {
      router.push(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5 my-4 sm:my-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[rgba(6,182,212,0.12)] via-[rgba(139,92,246,0.15)] to-[rgba(217,70,239,0.12)] border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.18)] flex flex-row items-center justify-between gap-2 sm:gap-4 overflow-hidden">
      {/* Ambient Gradient Glow inside the pagination container */}
      <div className="absolute inset-0 bg-gradient-radial from-[rgba(139,92,246,0.2)] via-transparent to-transparent pointer-events-none -z-10"></div>
      
      {/* Previous Page Button (Icon-only on mobile, full text on sm+) */}
      <div className="flex-shrink-0">
        {prevPage ? (
          <RevealInteractive radiusClass="rounded-full sm:rounded-xl">
            <button
              onClick={() => handleNavigate(prevPage.path)}
              className="flex items-center justify-center gap-2 w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 rounded-full sm:rounded-xl bg-card border border-slate-200 dark:border-white/10 hover:border-accent-cyan/50 text-slate-700 dark:text-slate-200 hover:text-accent-cyan transition-all duration-300 shadow-sm cursor-pointer font-bold text-xs sm:text-sm"
              title={`${t('pagination.previous')}: ${t(`nav.${prevPage.key}`)}`}
              aria-label="Previous Page"
            >
              {lang === 'ar' ? <ChevronRight className="w-4 h-4 text-accent-cyan flex-shrink-0" /> : <ChevronLeft className="w-4 h-4 text-accent-cyan flex-shrink-0" />}
              <span className="hidden sm:inline whitespace-nowrap">
                {t('pagination.previous')}: <strong className="text-primary">{t(`nav.${prevPage.key}`)}</strong>
              </span>
            </button>
          </RevealInteractive>
        ) : (
          <div className="w-10 h-10 sm:w-[130px] sm:h-10"></div>
        )}
      </div>

      {/* Page Numbers Indicator (Compact pills) */}
      <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 dark:bg-white/5 p-1 sm:p-1.5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm overflow-x-auto max-w-full">
        {PAGES.map((page, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={page.path}
              onClick={() => handleNavigate(page.path)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 flex items-center justify-center flex-shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-premium-gradient text-slate-950 shadow-[0_0_10px_rgba(0,251,255,0.4)] scale-110'
                  : 'text-slate-500 dark:text-slate-300 hover:text-primary hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
              title={t(`nav.${page.key}`)}
              aria-label={t(`nav.${page.key}`)}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Next Page Button (Icon-only on mobile, full text on sm+) */}
      <div className="flex-shrink-0">
        {nextPage ? (
          <RevealInteractive radiusClass="rounded-full sm:rounded-xl">
            <button
              onClick={() => handleNavigate(nextPage.path)}
              className="flex items-center justify-center gap-2 w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 rounded-full sm:rounded-xl bg-card border border-slate-200 dark:border-white/10 hover:border-accent-cyan/50 text-slate-700 dark:text-slate-200 hover:text-accent-cyan transition-all duration-300 shadow-sm cursor-pointer font-bold text-xs sm:text-sm"
              title={`${t('pagination.next')}: ${t(`nav.${nextPage.key}`)}`}
              aria-label="Next Page"
            >
              <span className="hidden sm:inline whitespace-nowrap">
                {t('pagination.next')}: <strong className="text-primary">{t(`nav.${nextPage.key}`)}</strong>
              </span>
              {lang === 'ar' ? <ChevronLeft className="w-4 h-4 text-accent-cyan flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-accent-cyan flex-shrink-0" />}
            </button>
          </RevealInteractive>
        ) : (
          <div className="w-10 h-10 sm:w-[130px] sm:h-10"></div>
        )}
      </div>

    </div>
  );
};
