'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { RevealCard } from '../RevealCard';
import { 
  ExternalLink, 
  Sparkle, 
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
// TWIN STAR ICON — Matches About Me Badge Star Engine
// ═══════════════════════════════════════════════════
const TwinStarIcon: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  const cycleDuration = isHovered ? 0.8 : 2;
  const twinStarClass = "text-[7px] leading-none text-[#007A7C] dark:text-[#00FBFF] pointer-events-none select-none";

  return (
    <div className="relative flex items-center justify-center" style={{ width: 18, height: 18 }}>
      <motion.div 
        animate={{ scale: [1, 1.18, 1] }} 
        transition={{ duration: cycleDuration, ease: "easeInOut", repeat: Infinity }} 
        className="relative z-10"
      >
        <Sparkle className="w-4 h-4 text-[#007A7C] dark:text-[#00FBFF]" />
      </motion.div>
      <motion.span 
        className={`absolute ${twinStarClass}`} 
        animate={{ opacity: [0, 0, 1, 0], x: [0, 0, 9, 9], y: [0, 0, -9, -9] }} 
        transition={{ duration: cycleDuration, times: [0, 0.5, 0.7, 1], ease: "easeOut", repeat: Infinity }}
      >
        ✦
      </motion.span>
      <motion.span 
        className={`absolute ${twinStarClass}`} 
        animate={{ opacity: [0, 0, 1, 0], x: [0, 0, -9, -9], y: [0, 0, 9, 9] }} 
        transition={{ duration: cycleDuration, times: [0, 0.5, 0.7, 1], ease: "easeOut", repeat: Infinity }}
      >
        ✧
      </motion.span>
    </div>
  );
};

// ═══════════════════════════════════════════════════
// TIERED PROJECT LINK — Matches Hero Orbit Icon Logic
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
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/15 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(0,251,255,0.2)] backdrop-blur-xl transition-all duration-300 cursor-pointer"
        aria-expanded={isOpen}
      >
        <FaGithub className="w-4 h-4 text-slate-700 dark:text-slate-200" />
        <span>{t('projects.shoPRO.sourceCodeBtn')}</span>
        <ChevronDown 
          className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute z-50 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 right-0 rtl:right-auto rtl:left-0 min-w-[220px] rounded-2xl bg-white/95 dark:bg-[#070d1e]/95 border border-slate-200 dark:border-cyan-500/30 shadow-2xl p-2 backdrop-blur-2xl"
          >
            {/* Item 1: Frontend Code */}
            <a
              href="https://github.com/Mohamedbnkhaled123/Front-end-e-commerce"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-200 group/item"
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
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-300 transition-all duration-200 group/item border-t border-slate-100 dark:border-white/5"
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
// SECONDARY PROJECT CARD
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
// Glassy aesthetic with twin star engine & bottom tech stack
// ═══════════════════════════════════════════════════
const FlagshipProjectCard: React.FC<{ t: any; lang: string }> = ({ t, lang }) => {
  const [isBadgeHovered, setIsBadgeHovered] = useState(false);

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
      <div className="absolute -inset-1 sm:-inset-1.5 bg-gradient-to-r from-cyan-500/25 via-purple-600/25 to-pink-500/25 rounded-3xl blur-xl opacity-70 group-hover/flagship:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

      {/* Flagship Container — Glassmorphic Surface */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-cyan-400/30 dark:border-white/[0.12] dark:border-t-cyan-400/40 bg-white/90 dark:bg-[#070d1e]/85 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover/flagship:border-cyan-400/60">
        
        {/* Top Header Badge with Twin Star Engine (Enterprise MEAN Stack badge removed) */}
        <div className="flex items-center justify-between mb-6">
          <div 
            onMouseEnter={() => setIsBadgeHovered(true)}
            onMouseLeave={() => setIsBadgeHovered(false)}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-400/30 text-cyan-700 dark:text-cyan-300 shadow-[0_0_15px_rgba(0,251,255,0.15)] backdrop-blur-xl cursor-default transition-colors"
          >
            <TwinStarIcon isHovered={isBadgeHovered} />
            <span>{t('projects.flagshipBadge')}</span>
          </div>
        </div>

        {/* Project Title */}
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-6 ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-600 dark:from-cyan-300 dark:via-sky-200 dark:to-purple-300">
            {t('projects.shoPRO.title')}
          </span>
        </h2>

        {/* 1. Customer-Facing Description (Glassy Card) */}
        <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-white/80 via-white/50 to-white/30 dark:from-white/[0.06] dark:via-white/[0.02] dark:to-transparent border border-slate-200/80 dark:border-white/[0.1] dark:border-t-white/[0.2] backdrop-blur-xl shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/[0.02] to-transparent pointer-events-none" />
          <p className={`text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed relative z-10 ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
            {t('projects.shoPRO.description')}
          </p>
        </div>

        {/* Operational & Technical Highlights Grid (3 Frosted Glassy Cards) */}
        <div className="mb-8">
          <h3 className={`text-xs tracking-wider font-semibold text-cyan-600 dark:text-cyan-400 mb-4 flex items-center gap-2 ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
            <Terminal className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>{t('projects.shoPRO.highlightsTitle')}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Highlight 1: Storefront */}
            <div className="group/item relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/70 via-white/40 to-white/20 dark:from-white/[0.05] dark:via-white/[0.02] dark:to-transparent border border-slate-200/80 dark:border-white/[0.08] dark:border-t-white/[0.16] hover:border-cyan-400/50 dark:hover:border-cyan-400/40 backdrop-blur-xl shadow-md dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/[0.03] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-cyan-600 dark:text-cyan-300 font-bold text-sm sm:text-base">
                  <div className="p-2 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-400/25 text-cyan-500 dark:text-cyan-300 backdrop-blur-md">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <span>{t('projects.shoPRO.highlight1Title')}</span>
                </div>
                <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
                  {t('projects.shoPRO.highlight1Desc')}
                </p>
              </div>
            </div>

            {/* Highlight 2: BI Hub */}
            <div className="group/item relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/70 via-white/40 to-white/20 dark:from-white/[0.05] dark:via-white/[0.02] dark:to-transparent border border-slate-200/80 dark:border-white/[0.08] dark:border-t-white/[0.16] hover:border-purple-400/50 dark:hover:border-purple-400/40 backdrop-blur-xl shadow-md dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-400/[0.03] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-purple-600 dark:text-purple-300 font-bold text-sm sm:text-base">
                  <div className="p-2 rounded-xl bg-purple-500/10 dark:bg-purple-500/15 border border-purple-400/25 text-purple-500 dark:text-purple-400 backdrop-blur-md">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span>{t('projects.shoPRO.highlight2Title')}</span>
                </div>
                <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
                  {t('projects.shoPRO.highlight2Desc')}
                </p>
              </div>
            </div>

            {/* Highlight 3: Clean Architecture */}
            <div className="group/item relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/70 via-white/40 to-white/20 dark:from-white/[0.05] dark:via-white/[0.02] dark:to-transparent border border-slate-200/80 dark:border-white/[0.08] dark:border-t-white/[0.16] hover:border-emerald-400/50 dark:hover:border-emerald-400/40 backdrop-blur-xl shadow-md dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-400/[0.03] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-emerald-600 dark:text-emerald-300 font-bold text-sm sm:text-base">
                  <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-400/25 text-emerald-500 dark:text-emerald-400 backdrop-blur-md">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>{t('projects.shoPRO.highlight3Title')}</span>
                </div>
                <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
                  {t('projects.shoPRO.highlight3Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills — Moved to Bottom as Requested */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
              {t('projects.techStack')}:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {shoPROTech.map((tech, idx) => (
              <span 
                key={idx}
                className="text-[11px] sm:text-xs font-mono font-medium tracking-tight text-cyan-700 dark:text-cyan-300 bg-white/70 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/[0.1] backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture & Recruiter Insight (Deep Glassy Note) */}
        <div className="relative rounded-2xl border border-slate-200/80 dark:border-white/[0.08] dark:border-t-white/[0.15] bg-gradient-to-b from-slate-100/80 to-slate-50/40 dark:from-[#030712]/80 dark:to-black/50 p-4 sm:p-5 mb-8 backdrop-blur-xl shadow-sm overflow-hidden">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex-shrink-0 mt-0.5 backdrop-blur-md">
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
