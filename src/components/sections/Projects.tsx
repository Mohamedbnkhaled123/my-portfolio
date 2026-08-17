'use client';

import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { RevealCard } from '../RevealCard';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
      <span className="text-xs font-bold tracking-widest uppercase">{label}</span>
    </motion.a>
  );
};

// ═══════════════════════════════════════════════════
// PROJECT CARD — Parent Scaling Assembly
// Scales the entire card (1.05x) on click using spring physics.
// Includes Scanline effect and Tiered Links.
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
        {/* Cyber Scanline Overlay — subtle animation on hover. Brought outside flex-1 so we don't need overflow-hidden on flex container */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-20 transition-opacity duration-700 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/30 to-transparent h-20 w-full animate-scanline" />
        </div>

        <div className="flex-1 relative overflow-visible">

          <h3 className={`text-2xl font-bold text-accent mb-3 group-hover/card:text-accent-cyan transition-colors duration-300 ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
            {t(`projects.${project.key}.title`)}
          </h3>
          
          <p className={`text-secondary mb-6 leading-relaxed relative z-10 ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
            {t(`projects.${project.key}.description`)}
          </p>

          <div className="mb-6 relative z-10 overflow-visible">
            <p className="text-sm font-semibold text-accent mb-3 opacity-80">{t('projects.techStack')}:</p>
            <ul className="flex flex-wrap gap-2 overflow-visible pl-1">
              {project.tech.map((tItem, tIdx) => (
                <li 
                  key={tIdx} 
                  className="text-[10px] font-mono font-bold tracking-tighter text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded border border-accent-cyan/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-cyan/20 hover:drop-shadow-[0_0_8px_rgb(var(--accent-cyan)_/_0.6)] cursor-pointer"
                >
                  {tItem}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Project Links — Tiered Interaction Model */}
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5 w-full relative z-20">
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

export const Projects: React.FC = () => {
  const { t } = useAppStore();

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
    <section id="projects" className="py-20 relative overflow-hidden scroll-mt-24">
      {/* Background depth glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[rgba(139,92,246,0.12)] rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[rgba(217,70,239,0.08)] rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-premium-gradient pb-3 mb-4 relative inline-block tracking-widest uppercase">
            {t('projects.title')}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-premium-gradient opacity-60 rounded-full" />
          </h1>
        </div>

        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {projectsData.map((project, idx) => (
            <ProjectCard key={idx} project={project} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};
