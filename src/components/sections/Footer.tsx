import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, Phone, ArrowUp, Heart, Download } from 'lucide-react';
import { RevealInteractive } from '../RevealInteractive';

export const Footer: React.FC = () => {
  const { theme, lang, t } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'skills', path: '/skills' },
    { key: 'experience', path: '/experience' },
    { key: 'projects', path: '/projects' },
    { key: 'education', path: '/education' },
    { key: 'contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background border-t border-slate-200 dark:border-white/10 pt-16 pb-12 overflow-hidden transition-colors duration-300">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-premium-gradient"></div>

      {/* Soft Background Glow Effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-radial from-[var(--glow)] to-transparent opacity-20 blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-white/10">
          
          {/* Column 1: Brand & Bio (Col span 5) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center cursor-pointer mb-4" onClick={() => handleNavClick('/')}>
              <img 
                src={theme === 'dark' ? "/night-logo.png" : "/Light-logo.png"} 
                alt="Logo" 
                className="h-16 w-auto object-contain scale-110 origin-left" 
              />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              {lang === 'ar' 
                ? 'مطور واجهات أمامية متخصص في بناء تطبيقات ويب عصرية، سريعة، وتفاعلية باستخدام React و Next.js و TypeScript.'
                : 'Frontend Developer specializing in building modern, high-performance, and interactive web applications with React, Next.js, and TypeScript.'}
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/mohamedbn-khaled"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 hover:border-[#0a66c2]/40 transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>

              <a
                href="https://github.com/Mohamedbnkhaled123"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-all duration-300 shadow-sm"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>

              <a
                href="mailto:momokhaled937@gmail.com"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-300 shadow-sm"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href="tel:01024891448"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-green-500 hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-300 shadow-sm"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Col span 4) */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 relative inline-block">
              {lang === 'ar' ? 'روابط السريعة' : 'Quick Navigation'}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-cyan rounded-full"></span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
                return (
                  <button
                    key={link.key}
                    onClick={() => handleNavClick(link.path)}
                    className={`text-left text-sm font-medium py-1.5 transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'text-accent-cyan font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                    }`}
                  >
                    <span className="text-xs text-accent-cyan opacity-60">›</span>
                    <span>{t(`nav.${link.key}`)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 3: Actions & Back To Top (Col span 3) */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end gap-6">
            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 relative inline-block">
                {lang === 'ar' ? 'السيرة الذاتية' : 'Resume / CV'}
              </h3>
              <RevealInteractive radiusClass="rounded-xl">
                <a
                  href="/Mohamed_Khaled_CV.pdf"
                  download="Mohamed_Khaled_CV.pdf"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 transition-all duration-300 font-bold text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('nav.downloadCV')}</span>
                </a>
              </RevealInteractive>
            </div>

            {/* Back To Top Button */}
            <RevealInteractive radiusClass="rounded-full">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-accent-cyan hover:border-accent-cyan/40 transition-all duration-300 text-xs font-bold cursor-pointer"
              >
                <span>{lang === 'ar' ? 'العودة للأعلى' : 'Back to Top'}</span>
                <ArrowUp className="w-4 h-4 text-accent-cyan" />
              </button>
            </RevealInteractive>
          </div>

        </div>

        {/* Bottom Copyright & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Mohamed Khaled AbdelSattar. {t('footer.rights')}</p>
          <div className="flex items-center gap-1.5">
            <span>{t('footer.madeWith')}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
};
