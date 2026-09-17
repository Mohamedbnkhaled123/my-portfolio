'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { RevealCard } from '../RevealCard';
import { 
  ExternalLink, 
  Sparkles, 
  ShoppingCart, 
  BarChart3, 
  ShieldCheck, 
  Terminal, 
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProjectData {
  key: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
}

// ═══════════════════════════════════════════════════
// TIERED PROJECT LINK — Matches Hero Orbit Icon Logic
// Subtle brand-color glow on hover, intense pulse on click.
// ═══════════════════════════════════════════════════
const TieredProjectLink: React.FC<{
  href: string;
  icon: React.ElementType;
  label: string;
  brandColor: string;
}> = ({ href, icon: Icon, label, brandColor }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ 
        scale: 1.05, 
        filter: `drop-shadow(0px 0px 8px ${brandColor})`,
        color: brandColor === '#00FBFF' ? 'rgb(var(--accent-cyan))' : brandColor,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ filter: 'drop-shadow(0px 0px 0px transparent)' }}
      className="flex items-center gap-2 text-secondary transition-colors duration-300"
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-bold tracking-wider">{label}</span>
    </motion.a>
  );
};

// ═══════════════════════════════════════════════════
// GITHUB INTERACTIVE DROPDOWN BUTTON
// Clean button that expands a compact list on click
// ═══════════════════════════════════════════════════
const GitHubDropdownButton: React.FC<{ t: any }> = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-white/[0.05] border border-slate-300 dark:border-white/15 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(0,251,255,0.2)] transition-all duration-300 cursor-pointer"
        aria-expanded={isOpen}
      >
        <FaGithub className="w-4 h-4 text-slate-700 dark:text-slate-200" />
        <span>{t('projects.shoPRO.sourceCodeBtn')}</span>
        <ChevronDown 
          className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} 
        />
      </button>

      {/* Dropdown Menu (List of repositories) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute z-50 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 right-0 rtl:right-auto rtl:left-0 min-w-[220px] rounded-xl bg-white dark:bg-[#070d1e] border border-slate-200 dark:border-cyan-500/30 shadow-2xl p-1.5 backdrop-blur-xl"
          >
            {/* Item 1: Frontend Code */}
            <a
              href="https://github.com/Mohamedbnkhaled123/Front-end-e-commerce"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-200 group/item"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover/item:scale-125 transition-transform" />
                <span>{t('projects.shoPRO.frontendRepoBtn')}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover/item:opacity-100 transition-opacity" />
            </a>

            {/* Item 2: Backend Code */}
            <a
              href="https://github.com/Mohamedbnkhaled123/back-end-E-commerce"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-300 transition-all duration-200 group/item border-t border-slate-100 dark:border-white/5"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 group-hover/item:scale-125 transition-transform" />
                <span>{t('projects.shoPRO.backendRepoBtn')}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover/item:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ═══════════════════════════════════════════════════
// PROJECT CARD — Secondary Projects Assembly
// ═══════════════════════════════════════════════════
const ProjectCard: React.FC<{ project: ProjectData; t: any }> = ({ project, t }) => {
  const { lang } = useAppStore();
  const rawProximity = useMotionValue(0);
  const hoverSpring = useSpring(rawProximity, { stiffness: 300, damping: 25, mass: 0.5 });
  const cardScale = useTransform(hoverSpring, [0, 1], [1, 1.05]);

  const handleCardClick = () => {
    rawProximity.set(1);
    setTimeout(() => {
      rawProximity.set(0);
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }, 800);
  };

  return (
    <motion.div
      style={{ scale: cardScale }}
      onClick={handleCardClick}
      className="group/card flex flex-col no-underline flex-grow-0 flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] max-w-md lg:max-w-none cursor-pointer"
    >
      <RevealCard 
        className="flex flex-col h-full p-6 transition-colors duration-500 group-hover/card:border-[#00FBFF]/40"
        style={{
          '--card-glow-border': '#00FBFF',
          '--spotlight-core': 'rgba(0, 251, 255, 0.3)',
          '--spotlight-fade': 'rgba(0, 251, 255, 0.05)',
        } as React.CSSProperties}
      >
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-20 transition-opacity duration-700 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/30 to-transparent h-20 w-full animate-scanline" />
        </div>

        <div className="flex-1 relative overflow-visible">
          <h3 className={`text-2xl font-bold text-accent mb-3 group-hover/card:text-accent-cyan transition-colors duration-300 ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
            {t(`projects.${project.key}.title`)}
          </h3>
          
          <p className={`text-secondary mb-6 leading-relaxed relative z-10 text-sm sm:text-base ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
            {t(`projects.${project.key}.description`)}
          </p>

          <div className="mb-6 relative z-10 overflow-visible">
            <p className="text-xs font-semibold text-accent mb-2.5 opacity-80 tracking-wider">{t('projects.techStack')}:</p>
            <ul className="flex flex-wrap gap-2 overflow-visible">
              {project.tech.map((tItem, tIdx) => (
                <li 
                  key={tIdx} 
                  className="text-[10px] font-mono font-semibold tracking-tight text-accent-cyan bg-accent-cyan/10 px-2.5 py-1 rounded-md border border-accent-cyan/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-cyan/20 hover:drop-shadow-[0_0_8px_rgb(var(--accent-cyan)_/_0.6)]"
                >
                  {tItem}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-black/10 dark:border-white/5 w-full relative z-20">
          <TieredProjectLink 
            href={project.liveUrl} 
            icon={ExternalLink} 
            label="Live" 
            brandColor="#00FBFF" 
          />
          <TieredProjectLink 
            href={project.githubUrl} 
            icon={FaGithub} 
            label="Source" 
            brandColor="#d946ef" 
          />
        </div>
      </RevealCard>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════
// FLAGSHIP PROJECT CARD — shoPRO Enterprise MEAN Stack
// ═══════════════════════════════════════════════════
const FlagshipProjectCard: React.FC<{ t: any; lang: string }> = ({ t, lang }) => {
  const shoPROTech = [
    'Angular 21 (Signals & Standalone)',
    'Node.js & Express 5',
    'MongoDB & Mongoose',
    'Chart.js Analytics',
    'Hybrid Cart Sync',
    'JWT & Bcrypt Security',
    'RxJS Reactive State',
    '3D View Transitions'
  ];

  return (
    <div className="w-full relative group/flagship mb-14">
      {/* Outer ambient radiant glow */}
      <div className="absolute -inset-1 sm:-inset-1.5 bg-gradient-to-r from-cyan-500/30 via-purple-600/30 to-pink-500/30 rounded-3xl blur-xl opacity-70 group-hover/flagship:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

      {/* Flagship Container */}
      <div className="relative rounded-2xl sm:rounded-3xl border-2 border-cyan-400/40 bg-white/95 dark:bg-[#070d1e]/95 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_50px_rgba(0,251,255,0.12)] transition-all duration-500 group-hover/flagship:border-cyan-400/70">
        
        {/* Top Header Badge & Live Production Signal */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-pink-500/15 border border-cyan-400/40 text-cyan-600 dark:text-cyan-300 shadow-[0_0_15px_rgba(0,251,255,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 animate-pulse" />
            <span>{t('projects.flagshipBadge')}</span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Enterprise MEAN Stack</span>
          </div>
        </div>

        {/* Project Title */}
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-600 dark:from-cyan-300 dark:via-sky-200 dark:to-purple-300">
            {t('projects.shoPRO.title')}
          </span>
        </h2>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {shoPROTech.map((tech, idx) => (
            <span 
              key={idx}
              className="text-[11px] sm:text-xs font-mono font-medium tracking-tight text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 px-3 py-1 rounded-lg shadow-sm hover:border-cyan-400 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 1. Customer-Facing Description */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-cyan-950/20 border border-slate-200 dark:border-cyan-500/30 mb-8">
          <p className={`text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
            {t('projects.shoPRO.description')}
          </p>
        </div>

        {/* Operational & Technical Highlights Grid */}
        <div className="mb-8">
          <h3 className={`text-xs tracking-wider font-semibold text-cyan-600 dark:text-cyan-400 mb-4 flex items-center gap-2 ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
            <Terminal className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{t('projects.shoPRO.highlightsTitle')}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Highlight 1: Storefront */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/[0.04] transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-2.5 mb-2.5 text-cyan-600 dark:text-cyan-300 font-bold text-sm sm:text-base">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                  <ShoppingCart className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                </div>
                <span>{t('projects.shoPRO.highlight1Title')}</span>
              </div>
              <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
                {t('projects.shoPRO.highlight1Desc')}
              </p>
            </div>

            {/* Highlight 2: BI Hub */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-purple-400/50 hover:bg-purple-500/[0.04] transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-2.5 mb-2.5 text-purple-600 dark:text-purple-300 font-bold text-sm sm:text-base">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-400/20">
                  <BarChart3 className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                </div>
                <span>{t('projects.shoPRO.highlight2Title')}</span>
              </div>
              <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
                {t('projects.shoPRO.highlight2Desc')}
              </p>
            </div>

            {/* Highlight 3: Clean Architecture */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-emerald-400/50 hover:bg-emerald-500/[0.04] transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-2.5 mb-2.5 text-emerald-600 dark:text-emerald-300 font-bold text-sm sm:text-base">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                </div>
                <span>{t('projects.shoPRO.highlight3Title')}</span>
              </div>
              <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
                {t('projects.shoPRO.highlight3Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Architecture & Recruiter Insight (Deep sleek dark style, harmonious contrast) */}
        <div className="relative rounded-xl border border-slate-200/80 dark:border-cyan-500/20 bg-slate-100/70 dark:bg-[#030712]/70 p-4 sm:p-5 mb-8 backdrop-blur-md shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex-shrink-0 mt-0.5">
              <Terminal className="w-4 h-4" />
            </div>
            <p className={`text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300/90 leading-relaxed italic ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
              &ldquo;{t('projects.shoPRO.ctaQuote')}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Buttons: Live Demo + GitHub Interactive Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-200 dark:border-white/10">
          {/* Primary CTA: Live Demo */}
          <a
            href="https://customer-demo-e-commerce.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide text-slate-900 bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-[0_0_25px_rgba(0,251,255,0.4)] hover:shadow-[0_0_35px_rgba(0,251,255,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4 text-slate-900" />
            <span>{t('projects.shoPRO.liveDemoBtn')}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-900 opacity-80" />
          </a>

          {/* Secondary Action: GitHub Code Dropdown */}
          <GitHubDropdownButton t={t} />
        </div>

      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const { t, lang } = useAppStore();

  const projectsData: ProjectData[] = [
    {
      key: 'parisClinic',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'Cloud Firestore'],
      githubUrl: 'https://github.com/Mohamedbnkhaled123/react-firebase-clinic-system',
      liveUrl: 'https://paris-clinic.vercel.app/',
    },
    {
      key: 'veloraBags',
      tech: ['React', 'Firebase', 'Zustand', 'Context API'],
      githubUrl: 'https://github.com/Mohamedbnkhaled123/E-commerce-firebase-React-system',
      liveUrl: 'https://velora-bag.vercel.app/',
    },
    {
      key: 'eShop',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Server Components'],
      githubUrl: 'https://github.com/Mohamedbnkhaled123/E-commerce-React-Next.js',
      liveUrl: 'https://electronice-ecommerce-alpha.vercel.app/',
    }
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 relative overflow-hidden scroll-mt-24 w-full">
      {/* Background depth glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[rgba(139,92,246,0.12)] rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[rgba(217,70,239,0.08)] rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-8">
        {/* Section Main Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-premium-gradient mb-4 relative inline-block tracking-widest uppercase">
            {t('projects.title')}
            <span className="absolute -bottom-4 left-0 w-full h-px bg-premium-gradient opacity-50" />
          </h1>
        </div>

        {/* 1. Flagship Enterprise Project Showcase */}
        <FlagshipProjectCard t={t} lang={lang} />

        {/* 2. Divider for Other Projects */}
        <div className="mt-14 mb-10 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-secondary inline-flex items-center gap-3 tracking-wide">
            <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-cyan-400 opacity-60" />
            <span>{t('projects.otherProjectsTitle')}</span>
            <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-cyan-400 opacity-60" />
          </h3>
        </div>

        {/* 3. Other Production Projects Grid */}
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {projectsData.map((project, idx) => (
            <ProjectCard key={idx} project={project} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};
