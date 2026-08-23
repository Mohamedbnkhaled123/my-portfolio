'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useAppStore } from '../../store/useAppStore';
import { motion } from 'framer-motion';

import { RevealCard } from '../RevealCard';
import aboutImg from '../../assets/about-image.png';
import { Code2, Sparkle } from 'lucide-react';
import { RevealInteractive } from '../RevealInteractive';

// ═══════════════════════════════════════════════════
// ANIMATED ABOUT ME BADGE — Centered Header Badge
// ═══════════════════════════════════════════════════
const AnimatedAboutBadge: React.FC<{
  t: (key: string) => string;
  isRtl: boolean;
  onClick: () => void;
}> = ({ t, isRtl, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cycleDuration = isHovered ? 0.8 : 2;

  const twinStarClass = "text-[7px] leading-none text-[#007A7C] dark:text-[#00FBFF] pointer-events-none select-none";

  return (
    <div className="flex justify-center mb-3 sm:mb-4">
      <RevealInteractive radiusClass="rounded-full" className="inline-block light-teal-spotlight">
        <button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative z-10 cursor-pointer flex items-center justify-center gap-3 px-6 py-2.5 rounded-full bg-transparent outline-none transition-all duration-500 ease-out ${isRtl ? 'flex-row-reverse' : ''}`}
        >
          {/* Unified ✧ Star Engine */}
          <div className="relative flex items-center justify-center" style={{ width: 18, height: 18 }}>
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: cycleDuration, ease: "easeInOut", repeat: Infinity }} className="relative z-10">
              <Sparkle className="w-4 h-4 text-[#007A7C] dark:text-[#00FBFF]" />
            </motion.div>
            <motion.span className={`absolute ${twinStarClass}`} animate={{ opacity: [0, 0, 1, 0], x: [0, 0, 9, 9], y: [0, 0, -9, -9] }} transition={{ duration: cycleDuration, times: [0, 0.5, 0.7, 1], ease: "easeOut", repeat: Infinity }}>✦</motion.span>
            <motion.span className={`absolute ${twinStarClass}`} animate={{ opacity: [0, 0, 1, 0], x: [0, 0, -9, -9], y: [0, 0, 9, 9] }} transition={{ duration: cycleDuration, times: [0, 0.5, 0.7, 1], ease: "easeOut", repeat: Infinity }}>✧</motion.span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-300 uppercase tracking-wide">
            {t('about.title')}
          </span>
        </button>
      </RevealInteractive>
    </div>
  );
};

export const About: React.FC = () => {
  const { lang, t } = useAppStore();
  const isRtl = lang === 'ar';
  
  const [imageMousePos, setImageMousePos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setImageMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Shimmer sweep state
  const [isShimmering, setIsShimmering] = useState(false);
  const triggerShimmer = () => {
    if (isShimmering) return;
    setIsShimmering(true);
    setTimeout(() => setIsShimmering(false), 700);
  };

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 relative overflow-hidden scroll-mt-24 w-full">
      {/* Background Glow — Violet + Magenta depth layers */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[rgba(139,92,246,0.15)] rounded-full blur-[128px] -z-10 opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[rgba(217,70,239,0.08)] rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-8 w-full">
        
        {/* ═══ SECTION HEADER (CENTERED AT TOP ACCORDING TO SKETCH) ═══ */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 z-10 relative">
          <AnimatedAboutBadge t={t} isRtl={isRtl} onClick={triggerShimmer} />
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-2">
            <span className="text-accent">{lang === 'ar' ? 'تصميم وتطوير ' : 'Crafting '}</span>
            <span className="text-premium-gradient">
              {lang === 'ar' ? 'تجارب رقمية مذهلة' : 'Digital Experiences'}
            </span>
          </h1>
        </div>

        {/* ═══ SIDE-BY-SIDE CONTENT (IMAGE AND TEXT START AT THE TOP BASELINE) ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start z-10 relative">
          
          {/* Image Container on Left (Right in RTL) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative group w-full max-w-sm sm:max-w-md">
              {/* Outer Decorative Gradient Frame */}
              <div className="absolute -inset-1 bg-premium-gradient rounded-[2rem] blur-lg opacity-30 group-hover:opacity-70 transition duration-1000 -z-10"></div>
              
              {/* About Profile Image Wrapper with Interactive Pure Border Reveal */}
              <div
                ref={imageRef}
                onMouseMove={handleImageMouseMove}
                className="relative aspect-[3/4] sm:aspect-[4/5] w-full flex items-center justify-center z-10 group/about cursor-pointer rounded-[2rem] transition-shadow duration-500 hover:shadow-[0_0_40px_rgb(var(--accent-cyan)_/_0.3)]"
                style={{
                  '--mouse-x': `${imageMousePos.x}px`,
                  '--mouse-y': `${imageMousePos.y}px`,
                } as React.CSSProperties}
              >
                {/* 1px glowing rectangle tracking cursor */}
                <div 
                  className="absolute inset-[0px] rounded-[2rem] z-0 transition-opacity duration-300 opacity-0 group-hover/about:opacity-100 pointer-events-none"
                  style={{
                    background: 'var(--gradient-border)',
                    maskImage: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), white, transparent)`,
                    WebkitMaskImage: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), white, transparent)`,
                  }}
                />

                {/* The actual image container */}
                <div className="absolute inset-[2px] overflow-hidden rounded-[calc(2rem-2px)] z-10 bg-card" style={{ boxShadow: '0 0 25px rgba(139,92,246,0.25), 0 0 50px rgba(217,70,239,0.1)' }}>
                  <Image 
                    src={aboutImg} 
                    alt={t('hero.name')} 
                    fill
                    sizes="(max-width: 768px) 320px, 448px"
                    className="object-cover object-top grayscale-[15%] group-hover/about:grayscale-0 transition-transform duration-700 scale-100 group-hover/about:scale-105"
                  />
                  {/* Subtle bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 dark:opacity-60 z-10 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content on Right (Left in RTL) Starting at exact same top baseline */}
          <div className={`lg:col-span-7 ${isRtl ? 'text-right' : 'text-left'} w-full flex flex-col justify-start`}>
            <RevealCard 
              className="text-base sm:text-lg text-secondary leading-relaxed relative overflow-hidden group h-full"
            >
              {/* Subtle tech background icon */}
              <div className={`absolute -top-12 ${isRtl ? 'left-0 transform -scale-x-100' : 'right-0'} p-10 opacity-10 group-hover:opacity-12 transition-opacity duration-700 pointer-events-none`}>
                <Code2 className="w-48 h-48 transform -rotate-12" />
              </div>

              {/* Direction-Aware Shimmer Sweep */}
              {isShimmering && (
                <motion.div
                  className="absolute inset-0 z-20 pointer-events-none"
                  initial={{ x: isRtl ? '100%' : '-100%' }}
                  animate={{ x: isRtl ? '-100%' : '100%' }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  style={{
                    background: `linear-gradient(${isRtl ? '-75deg' : '75deg'}, transparent 30%, rgba(6,182,212,0.12) 45%, rgba(139,92,246,0.18) 50%, rgba(217,70,239,0.12) 55%, transparent 70%)`,
                  }}
                />
              )}

              <p className="relative z-10 p-6 sm:p-8 md:p-10 whitespace-pre-line leading-relaxed">{t('about.description')}</p>
            </RevealCard>
          </div>

        </div>
      </div>
    </section>
  );
};
