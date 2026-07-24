import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, t, fireContactPulse } = useAppStore();

  const currentPath = location.pathname.toLowerCase();
  const currentIndex = PAGES.findIndex(p => p.path === currentPath);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  const prevPage = activeIndex > 0 ? PAGES[activeIndex - 1] : null;
  const nextPage = activeIndex < PAGES.length - 1 ? PAGES[activeIndex + 1] : null;

  const handleNavigate = (path: string) => {
    if (path === '/contact') {
      fireContactPulse();
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 mt-12 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Previous Page Button */}
      <div className="w-full sm:w-auto">
        {prevPage ? (
          <RevealInteractive radiusClass="rounded-xl">
            <button
              onClick={() => handleNavigate(prevPage.path)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-card border border-slate-200 dark:border-white/10 hover:border-accent-cyan/50 text-slate-700 dark:text-slate-200 hover:text-accent-cyan transition-all duration-300 shadow-sm w-full cursor-pointer font-bold text-sm"
            >
              {lang === 'ar' ? <ChevronRight className="w-4 h-4 text-accent-cyan" /> : <ChevronLeft className="w-4 h-4 text-accent-cyan" />}
              <span>{t('pagination.previous')}: <strong className="text-primary">{t(`nav.${prevPage.key}`)}</strong></span>
            </button>
          </RevealInteractive>
        ) : (
          <div className="h-11 min-w-[140px]"></div>
        )}
      </div>

      {/* Page Numbers Indicator */}
      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 p-1.5 rounded-full border border-slate-200 dark:border-white/10">
        {PAGES.map((page, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={page.path}
              onClick={() => handleNavigate(page.path)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isActive
                  ? 'bg-premium-gradient text-slate-950 shadow-[0_0_12px_rgba(0,251,255,0.4)] scale-110'
                  : 'text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
              title={t(`nav.${page.key}`)}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Next Page Button */}
      <div className="w-full sm:w-auto">
        {nextPage ? (
          <RevealInteractive radiusClass="rounded-xl">
            <button
              onClick={() => handleNavigate(nextPage.path)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-card border border-slate-200 dark:border-white/10 hover:border-accent-cyan/50 text-slate-700 dark:text-slate-200 hover:text-accent-cyan transition-all duration-300 shadow-sm w-full cursor-pointer font-bold text-sm"
            >
              <span>{t('pagination.next')}: <strong className="text-primary">{t(`nav.${nextPage.key}`)}</strong></span>
              {lang === 'ar' ? <ChevronLeft className="w-4 h-4 text-accent-cyan" /> : <ChevronRight className="w-4 h-4 text-accent-cyan" />}
            </button>
          </RevealInteractive>
        ) : (
          <div className="h-11 min-w-[140px]"></div>
        )}
      </div>
    </div>
  );
};
