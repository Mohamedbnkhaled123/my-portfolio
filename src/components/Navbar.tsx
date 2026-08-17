'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppStore } from '../store/useAppStore';
import { Menu, Moon, Sun, X, Globe, Download } from 'lucide-react';
import { RevealInteractive } from './RevealInteractive';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  key: string;
  path: string;
}

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useAppStore();
  const { lang, toggleLang, t, fireContactPulse } = useAppStore();

  const navItems: NavItem[] = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'skills', path: '/skills' },
    { key: 'experience', path: '/experience' },
    { key: 'projects', path: '/projects' },
    { key: 'education', path: '/education' },
    { key: 'contact', path: '/contact' },
  ];

  const handleNavClick = (path: string): void => {
    if (path === '/contact') {
      fireContactPulse();
    }
    setIsOpen(false);
    if (pathname !== path) {
      router.push(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed w-full z-[100] top-0 left-0 border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#020617]/40 dark:bg-gradient-to-r dark:from-[rgba(6,182,212,0.15)] dark:via-[rgba(139,92,246,0.15)] dark:to-[rgba(217,70,239,0.15)] backdrop-blur-xl shadow-sm dark:shadow-none transition-all duration-300">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-premium-gradient"></div>
      {/* Ambient Top Glow (Dark Mode Only) */}
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-[rgba(139,92,246,0.1)] to-transparent pointer-events-none -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ═══ LOGO ═══ */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('/')}>
            <Image src={theme === 'dark' ? "/night-logo.png" : "/Light-logo.png"} alt="Logo" width={140} height={50} className="h-9 sm:h-11 w-auto object-contain origin-left" priority />
          </div>

          {/* ═══ DESKTOP NAV LINKS — visible from md (768px) ═══ */}
          <div className="hidden md:flex items-center gap-x-1 lg:gap-x-2 xl:gap-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path === '/' && pathname === '/');
              return (
                <RevealInteractive 
                  key={item.key} 
                  radiusClass="rounded-lg"
                  onClick={() => handleNavClick(item.path)}
                >
                  <button
                    className={`rounded-lg px-2 lg:px-3 py-2 text-xs lg:text-sm font-bold transition-all duration-200 block cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-accent-cyan bg-accent-cyan/10 shadow-[0_0_12px_rgba(0,251,255,0.2)] border border-accent-cyan/30'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10'
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                </RevealInteractive>
              );
            })}
          </div>

          {/* ═══ DESKTOP ACTIONS — visible from md (768px) and above ═══ */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4 pl-2">
            {/* CV Download */}
            <RevealInteractive radiusClass="rounded-lg" className="light-teal-spotlight">
              <a
                href="/Mohamed_Khaled_CV.pdf"
                download="Mohamed_Khaled_CV.pdf"
                className="flex items-center justify-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 text-[11px] lg:text-sm font-bold rounded-lg border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/70 hover:shadow-[0_0_15px_rgb(var(--accent-cyan)_/_0.25)] transition-all duration-300 w-full h-full cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4 flex-shrink-0" />
                <span className="inline">{t('nav.downloadCV')}</span>
              </a>
            </RevealInteractive>

            <RevealInteractive radiusClass="rounded-full">
              <motion.button
                onClick={() => {
                  playClickSound();
                  toggleLang();
                }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 px-2 lg:px-3 py-2 rounded-full w-full h-full transition-colors cursor-pointer"
                aria-label="Toggle Language"
              >
                <motion.div
                  key={lang}
                  initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-center gap-1.5"
                >
                  <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-accent-cyan" />
                  <span className="text-xs lg:text-sm font-bold uppercase block">{lang === 'en' ? 'AR' : 'EN'}</span>
                </motion.div>
              </motion.button>
            </RevealInteractive>
            
            <RevealInteractive radiusClass="rounded-full">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 p-2 rounded-full w-full h-full transition-colors cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 lg:w-5 lg:h-5" /> : <Moon className="w-4 h-4 lg:w-5 lg:h-5" />}
              </button>
            </RevealInteractive>
          </div>

          {/* ═══ MOBILE/TABLET LAYOUT ═══ */}
          <div className="flex md:hidden items-center flex-1 min-w-0">
            <div className="hidden min-[376px]:block flex-1" />

            {/* CV Download */}
            <div className="hidden min-[376px]:flex flex-shrink-0 items-center justify-center px-2">
              <a
                href="/Mohamed_Khaled_CV.pdf"
                download="Mohamed_Khaled_CV.pdf"
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] min-[425px]:text-[11px] font-bold rounded-lg border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/70 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{t('nav.downloadCV')}</span>
              </a>
            </div>

            {/* Toggle Group & Hamburger */}
            <div className="flex items-center gap-1 ml-auto min-[376px]:ml-0 min-[376px]:flex-1 min-[376px]:justify-end">
              <motion.button 
                onClick={() => {
                  playClickSound();
                  toggleLang();
                }} 
                whileTap={{ scale: 0.88 }}
                aria-label="Toggle Language" 
                className="text-secondary hover:text-accent-cyan p-1.5 cursor-pointer flex items-center justify-center transition-colors"
              >
                <motion.span 
                  key={lang}
                  initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs font-bold uppercase text-accent-cyan"
                >
                  {lang === 'en' ? 'AR' : 'EN'}
                </motion.span>
              </motion.button>
              <motion.button 
                onClick={() => {
                  playClickSound();
                  toggleTheme();
                }} 
                whileTap={{ scale: 0.88 }}
                aria-label="Toggle Theme" 
                className="text-secondary hover:text-accent-cyan p-1.5 cursor-pointer flex items-center justify-center transition-colors"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.div>
              </motion.button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation Menu"
                className="text-secondary hover:text-primary p-2 cursor-pointer"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ═══ COLLAPSED MENU DROPDOWN (Animated) ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-background border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 pt-2 pb-5 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path || (item.path === '/' && pathname === '/');
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleNavClick(item.path)}
                    className={`block w-full text-left px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/30'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-transparent'
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                );
              })}
              
              {/* Mobile CV Download */}
              <div className="min-[376px]:hidden mt-4">
                <a
                  href="/Mohamed_Khaled_CV.pdf"
                  download="Mohamed_Khaled_CV.pdf"
                  className="flex items-center justify-center gap-2 w-full text-left px-3 py-2 rounded-md font-medium transition-colors border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {t('nav.downloadCV')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
