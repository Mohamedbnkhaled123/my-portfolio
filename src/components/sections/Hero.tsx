import React, { useRef, useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import profileImg from '../../assets/profile.jpg';
import { RevealInteractive } from '../RevealInteractive';
import { Typewriter } from '../Typewriter';
import { playClickSound } from '../../utils/sounds';
import { SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiFirebase } from 'react-icons/si';
import { FaGitAlt, FaGithub, FaHtml5, FaCss3Alt } from 'react-icons/fa';

// ═══════════════════════════════════════════════════
// ICON DATA — Pure data, zero positioning logic
// ═══════════════════════════════════════════════════
interface OrbitIcon {
  Icon: React.ElementType;
  color: string;
  name: string;
}

const orbitIcons: OrbitIcon[] = [
  { Icon: SiReact, color: '#61DAFB', name: 'React' },
  { Icon: FaHtml5, color: '#E34F26', name: 'HTML5' },
  { Icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind CSS' },
  { Icon: FaGitAlt, color: '#F05032', name: 'Git' },
  { Icon: SiNextdotjs, color: 'currentColor', name: 'Next.js' },
  { Icon: FaCss3Alt, color: '#1572B6', name: 'CSS3' },
  { Icon: SiFirebase, color: '#FFCA28', name: 'Firebase' },
  { Icon: SiJavascript, color: '#F7DF1E', name: 'JavaScript' },
  { Icon: FaGithub, color: 'currentColor', name: 'GitHub' },
  { Icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
];

// ═══════════════════════════════════════════════════════════════════
// MATH ENGINE — Continuous proportional scaling
// 
// All layout values are computed from a single source: viewport width.
// No discrete breakpoints. A linear interpolation (lerp) function
// maps vw ranges to smooth output curves for every dimension.
//
// Architecture:
//   profileSize = lerp(vw, [320→1440], [90→250])
//   orbitRadius = profileSize/2 + dynamicGap
//   dynamicGap  = profileSize * 0.35  (constant ratio)
//   iconSize    = profileSize * 0.18  (18% of image)
//   iconPadding = iconSize * 0.35
//   repulsion   = proportional to available space toward viewport edge
//   containerW  = orbitRadius * 2 + iconSize + iconPadding * 2
// ═══════════════════════════════════════════════════════════════════

/** Linear interpolation: maps value from [inMin, inMax] → [outMin, outMax], clamped. */
function lerp(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

interface OrbitDimensions {
  profileSize: number;
  orbitRadius: number;
  iconSize: number;
  iconPadding: number;
  containerSize: number;
  repulsionDist: number;
  floatAmplitude: number;
  isSideBySide: boolean; // true when 2-column layout is active
}

/**
 * Single source of truth for all orbital math.
 * Every value is derived from viewport width through continuous functions.
 * Zero discrete breakpoints for sizing — only a single layout breakpoint
 * at 321px to toggle stacked vs side-by-side.
 */
function useOrbitDimensions(): OrbitDimensions {
  const [dims, setDims] = useState<OrbitDimensions>(() => computeDimensions(typeof window !== 'undefined' ? window.innerWidth : 1024));

  useEffect(() => {
    const update = () => setDims(computeDimensions(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return dims;
}

function computeDimensions(vw: number): OrbitDimensions {
  const isSideBySide = vw >= 321;

  // ── Profile Size ──
  // On mobile (<425px) the image is the hero; it dominates.
  // On desktop it shares space equally with the text column.
  let profileSize: number;
  if (!isSideBySide) {
    // Stacked — image can breathe, scale generously
    profileSize = Math.round(lerp(vw, 280, 400, 140, 190));
  } else {
    // Side-by-side — image lives in 5/12 column
    const imageColumnWidth = vw * (5 / 12);
    // Column fill ratio: reduced at narrow widths (321-417px) to prevent
    // orbit icons from overlapping with the text column.
    // Column fill ratio: reduced at narrow widths (321-417px) to prevent
    // orbit icons from overlapping with the text column.
    const columnFillRatio = lerp(vw, 321, 768, 0.48, 0.55);
    profileSize = Math.round(
      Math.min(
        Math.max(imageColumnWidth * columnFillRatio, 90), // floor: 90px (was 110)
        lerp(vw, 321, 1440, 100, 260)                     // starts smaller
      )
    );
  }

  // ── Orbit Gap ──
  // Tighter orbit on mobile (icons hug the image), looser on desktop.
  // Increased starting gap from 0.15 to 0.24 to ensure icons don't touch image on small screens.
  const GAP_RATIO = lerp(vw, 321, 768, 0.24, 0.32);
  const dynamicGap = Math.round(profileSize * GAP_RATIO);
  const orbitRadius = Math.round(profileSize / 2 + dynamicGap);

  // ── Icon Dimensions ──
  // Icons are supporting elements on mobile (smaller ratio),
  // more prominent on desktop.
  const ICON_SIZE_RATIO = lerp(vw, 321, 768, 0.09, 0.12);
  const iconSize = Math.round(Math.max(profileSize * ICON_SIZE_RATIO, 12)); // floor 12px
  const iconPadding = Math.round(iconSize * 0.4);
  const iconBoxSize = iconSize + iconPadding * 2;

  // Container encompasses full orbit ring + icon box on each edge
  const containerSize = orbitRadius * 2 + iconBoxSize;

  // Repulsion — proportional to available space (can never leave container)
  const availableSpace = (containerSize / 2) - orbitRadius;
  const repulsionDist = Math.max(2, Math.round(availableSpace * 0.4));

  // ── Float Amplitude ──
  // Reduced on mobile to prevent overlap with the larger image
  const floatAmplitude = Math.round(lerp(vw, 321, 768, 4, 7));

  return {
    profileSize,
    orbitRadius,
    iconSize,
    iconPadding,
    containerSize,
    repulsionDist,
    floatAmplitude,
    isSideBySide,
  };
}

// ═══════════════════════════════════════════════════
// ORBIT SLOT — Positions icon with spring-driven repulsion
// Uses useTransform for radial displacement from center,
// ensuring 60fps via Framer Motion's optimized path.
// ═══════════════════════════════════════════════════
const OrbitSlot: React.FC<{
  cx: number;
  cy: number;
  angle: number;
  repulsionSpring: any;
  pushDist: number;
  children: React.ReactNode;
}> = ({ cx, cy, angle, repulsionSpring, pushDist, children }) => {
  const x = useTransform(repulsionSpring, (v: number) => cx + v * Math.cos(angle) * pushDist);
  const y = useTransform(repulsionSpring, (v: number) => cy + v * Math.sin(angle) * pushDist);

  return (
    <motion.div
      className="absolute"
      style={{ left: '50%', top: '50%', x, y, zIndex: 30 }}
    >
      <div style={{ transform: 'translate(-50%, -50%)' }}>
        {children}
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════
// SINGLE ORBIT ICON — Tiered Interaction Model
//
// Hover State: Low-intensity glow + thin border highlight using brand color.
// Click State: 2-second Reveal border animation using varying intensities of brand color.
// Float: Gentle vertical oscillation.
// ═══════════════════════════════════════════════════
const StaticOrbitIcon: React.FC<{
  item: OrbitIcon;
  index: number;
  iconSize: number;
  iconPadding: number;
  floatAmplitude: number;
}> = ({ item, index, iconSize, iconPadding, floatAmplitude }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBorderRevealed, setIsBorderRevealed] = useState(false);

  // Resolve the actual hex color for glow (handle 'currentColor')
  const glowHex = item.color === 'currentColor' ? '#94a3b8' : item.color;

  const handleIconClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (isClicked) return;
    setIsClicked(true);
    setIsBorderRevealed(true);
    setIsHovered(false);

    // Core click burst ends fast
    setTimeout(() => setIsClicked(false), 800);
    // Sustain gradient reveal border for 2 seconds
    setTimeout(() => setIsBorderRevealed(false), 2000);
  };

  // Tiered visual states — single boxShadow replaces all borders to prevent stacking
  const getBoxShadow = () => {
    if (isClicked) {
      return `0 0 0 1.5px ${glowHex}, 0 0 25px ${glowHex}cc, 0 0 50px ${glowHex}aa`;
    }
    if (isBorderRevealed) {
      return `0 0 0 1px ${glowHex}, 0 0 15px ${glowHex}55, 0 0 0px transparent`;
    }
    if (isHovered) {
      return `0 0 0 1px ${glowHex}, 0 0 12px ${glowHex}44, 0 0 0px transparent`;
    }
    // Default outward border, formatted with 3 shadow layers to match interaction states. 
    // This perfectly solves the abrupt snap out by allowing Framer Motion to interpolate matching property counts.
    return `0 0 0 1px rgba(0,0,0,0.1), 0 0 0px transparent, 0 0 0px transparent`;
  };

  return (
    <motion.div
      className="cursor-pointer z-30 outline-none"
      style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
      onClick={handleIconClick}
      onHoverStart={() => !isClicked && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Vertical float — amplitude calibrated to prevent profile overlap */}
      <motion.div
        animate={{ y: [0, -floatAmplitude, 0] }}
        transition={{
          duration: 3 + index * 0.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
      >
        <motion.div
          animate={{
            scale: isClicked ? 1.2 : isHovered ? 1.08 : 1,
            boxShadow: getBoxShadow(),
          }}
          transition={{
            scale: { type: 'spring', stiffness: 400, damping: 20 },
            boxShadow: { duration: isClicked || isBorderRevealed || isHovered ? 0.2 : 0.5, ease: 'easeOut' }
          }}
          className="relative bg-card/60 backdrop-blur-xl overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center group/icon outline-none select-none transition-all duration-300 ease-in-out"
          style={{ outline: 'none', padding: iconPadding }}
        >
          <item.Icon
            className="text-primary"
            style={{
              ...(item.color !== 'currentColor' ? { color: item.color } : {}),
              width: iconSize,
              height: iconSize,
            }}
          />
          {/* Tooltip */}
          <span className="absolute -bottom-8 md:-bottom-10 bg-black/80 backdrop-blur-md text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md shadow-lg transition-opacity duration-300 whitespace-nowrap border border-[#8b5cf6]/50 opacity-0 group-hover/icon:opacity-100 pointer-events-none">
            {item.name}
          </span>

          {/* Click flash burst — radial brand-color expansion */}
          <AnimatePresence>
            {isClicked && (
              <motion.div
                className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${glowHex}44 0%, transparent 70%)` }}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


// ═══════════════════════════════════════════════════
// MAIN HERO COMPONENT
// ═══════════════════════════════════════════════════
export const Hero: React.FC = () => {
  const { lang, t, fireContactPulse } = useAppStore();
  const isRtl = lang === 'ar';
  const [isGlowFlash, setIsGlowFlash] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // ═══════════════════════════════════════════════════
  // TYPEWRITER CTA STRINGS
  // ═══════════════════════════════════════════════════
  const ctaStrings = lang === 'ar'
    ? [
      'لنصنع شيئاً استثنائياً معاً.',
      'رؤيتك الرقمية تبدأ من هنا.',
      'حول أفكارك إلى تجارب مستخدم مذهلة.',
      'ارتقِ بعملك عبر حلول ويب عصرية.',
    ]
    : [
      "Let's build something extraordinary together.",
      'Your digital journey starts here.',
      'Transform your ideas into amazing digital experiences.',
      'Elevating your business with modern web solutions.',
    ];

  // ═══════════════════════════════════════════════════
  // MATH-DRIVEN DIMENSIONS — Single source of truth
  // All sizes derived from viewport width via continuous functions.
  // ═══════════════════════════════════════════════════
  const {
    profileSize,
    orbitRadius,
    iconSize,
    iconPadding,
    containerSize,
    repulsionDist,
    floatAmplitude,
    isSideBySide,
  } = useOrbitDimensions();

  // ═══════════════════════════════════════════════════
  // PROXIMITY-BASED SCALE + REPULSION PIPELINE
  //
  // Architecture (Zero React Re-renders):
  //   1. mousemove on container → compute distance D from image center
  //   2. Map D to proximity [0..1] via inverse clamped formula
  //   3. Feed proximity into MotionValue → Spring → useTransform
  //   4. Spring drives both assemblyScale AND icon repulsion
  //
  // All math runs in the event handler. Only MotionValues are
  // mutated — zero useState, zero re-renders, guaranteed 60fps.
  // ═══════════════════════════════════════════════════
  const rawProximity = useMotionValue(0);
  const hoverSpring = useSpring(rawProximity, { stiffness: 180, damping: 22, mass: 0.6 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Proximity-based Image Scale Spring
  const targetScale = useMotionValue(1.0);
  const assemblyScale = useSpring(targetScale, { stiffness: 500, damping: 15 });

  // Repulsion spring — icons push outward proportionally to proximity
  const repulsionRaw = useMotionValue(0);
  const repulsionSpring = useSpring(repulsionRaw, { stiffness: 150, damping: 20, mass: 0.8 });

  // Derived animated values — scale DISABLED: image stays static like About section
  const outerGlowOpacity = useTransform(hoverSpring, [0, 1], [0.3, 0.7]);

  // Track whether we're in a click pulse (click overrides hover proximity)
  const isClickPulseRef = useRef(false);

  // ── Proximity Mouse Handler ──
  // Computes distance from cursor to image center, maps to 0..1 proximity.
  // Activation radius = profileSize * 1.2 (defined just beyond the image edge).
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isClickPulseRef.current) return; // Don't override click animation

    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Activation radius: proximity starts when cursor enters ~1.2× the image radius
    const activationRadius = (rect.width / 2) * 1.2;

    if (distance >= activationRadius) {
      // Outside activation zone — decay to base
      rawProximity.set(0);
      repulsionRaw.set(0);
      return;
    }

    // Map distance → proximity: 1.0 at center, 0.0 at activation edge
    const proximity = Math.max(0, Math.min(1, 1 - distance / activationRadius));

    rawProximity.set(proximity);
    repulsionRaw.set(proximity * 0.6); // Icons push out at 60% of scale intensity

    // Only update scale if not actively holding a click
    if (!isClickPulseRef.current) {
      targetScale.set(1.0 + proximity * 0.1);
    }
  };

  // ── Mouse Leave ──
  // Spring physics handle the 300ms+ smooth decay automatically
  const handleContainerMouseLeave = () => {
    if (isClickPulseRef.current) return;
    rawProximity.set(0);
    repulsionRaw.set(0);
    targetScale.set(1.0);
  };

  // ── Click/Touch Handler ──
  // Overrides proximity with a full-intensity pulse, then releases
  const handleAssemblyClick = () => {
    if (isClickPulseRef.current) return;
    isClickPulseRef.current = true;
    rawProximity.set(1);
    repulsionRaw.set(1);
    targetScale.set(1.15); // Instant click pop
    setIsPulsing(true);

    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      glowX.set(rect.width / 2);
      glowY.set(rect.height / 2);
    }

    // 0.5s explicitly holding the 1.15 scale
    setTimeout(() => {
      // Returns to specific proximity-based scale (not strictly 1.0)
      targetScale.set(1.0 + rawProximity.get() * 0.1);
      isClickPulseRef.current = false;
    }, 1000);

    setTimeout(() => {
      rawProximity.set(0);
      repulsionRaw.set(0);
      setIsPulsing(false);
      // Wait, we DO NOT reset targetScale here anymore because the mouse might still be hovered.
      // If mouse is outside, handleContainerMouseLeave's fallback or the next mouseMove resolves it.
    }, 1200);
  };

  // Border reveal mouse tracking (for the gradient ring on the profile)
  const imageRef = useRef<HTMLDivElement>(null);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const glowTemplate = useMotionTemplate`radial-gradient(120px circle at ${glowX}px ${glowY}px, white, transparent)`;

  const total = orbitIcons.length;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden scroll-mt-24">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgba(139,92,246,0.2)] rounded-full blur-[128px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgba(217,70,239,0.15)] rounded-full blur-[128px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[rgba(6,182,212,0.08)] rounded-full blur-[180px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 w-full">
        <div className="grid grid-cols-12 gap-y-8 gap-x-2 sm:gap-x-4 md:gap-x-10 lg:gap-x-16 items-center">

          {/* ═══ TEXT & BUTTONS COLUMN ═══ */}
          <div className={`col-span-12 ${isSideBySide ? 'min-[321px]:col-span-7' : ''} lg:col-span-7 flex flex-col justify-center text-center ${isRtl ? 'min-[321px]:text-right' : 'min-[321px]:text-left'} z-10 w-full`}>
            <p className="text-sm md:text-base font-medium tracking-wide mb-2 md:mb-4 animate-fade-in-up text-accent-cyan transition-colors duration-300">
              {t('hero.role')}
            </p>
            <h1 className={`text-4xl min-[321px]:text-[20px] min-[425px]:text-[26px] sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-6 text-premium-gradient leading-tight transition-all ${lang === 'ar' ? 'arabic-text-fix pt-2 md:pt-4' : ''}`}>
              {t('hero.name')}
            </h1>
            <p className={`text-base min-[321px]:text-[9px] min-[425px]:text-[11px] sm:text-sm md:text-lg lg:text-xl text-secondary mb-0 max-w-2xl mx-auto min-[321px]:mx-0 leading-relaxed ${lang === 'ar' ? 'arabic-text-fix' : ''}`}>
              {t('hero.intro')}
            </p>

            {/* Typewriter CTA — drives engagement */}
            <div className="min-h-[2rem] md:min-h-[2.5rem] mt-2 md:mt-4 flex items-center" style={{ minHeight: '2rem' }}>
              <Typewriter
                key={lang}
                strings={ctaStrings}
                typingSpeed={30}
                deletingSpeed={20}
                delayBetween={1000}
                className={`text-sm min-[321px]:text-[9px] min-[425px]:text-[11px] sm:text-sm md:text-lg lg:text-xl font-medium text-accent-cyan transition-colors duration-300 ${lang === 'ar' ? 'arabic-text-fix' : ''}`}
              />
            </div>

            {/* BUTTONS — always a row, below text */}
            <div className={`flex flex-row items-center justify-center ${isRtl ? 'min-[321px]:justify-start' : 'min-[321px]:justify-start'} gap-2 sm:gap-4 w-full mt-4 sm:mt-8`}>
              {/* PRIMARY CTA */}
              <RevealInteractive radiusClass="rounded-lg" className="flex-1 min-w-0 md:flex-none md:w-40 h-8 min-[425px]:h-10 md:h-12">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full h-full bg-premium-gradient text-white rounded-lg font-bold flex items-center justify-center transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] cursor-pointer text-[9px] min-[425px]:text-[11px] sm:text-xs md:text-base whitespace-nowrap px-1"
                >
                  {t('hero.viewProjects')}
                </button>
              </RevealInteractive>

              {/* SECONDARY CTA */}
              <RevealInteractive radiusClass="rounded-lg" className="flex-1 min-w-0 md:flex-none md:w-40 h-8 min-[425px]:h-10 md:h-12 light-teal-spotlight">
                <motion.button
                  onClick={() => {
                    playClickSound();
                    fireContactPulse();
                    setIsGlowFlash(true);
                    setTimeout(() => setIsGlowFlash(false), 800);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden w-full h-full bg-transparent border-2 border-black/10 dark:border-white/10 text-accent-cyan rounded-lg font-bold flex items-center justify-center transition-all hover:bg-accent-cyan/10 hover:border-accent-cyan hover:shadow-[0_0_15px_rgb(var(--accent-cyan)_/_0.25)] cursor-pointer text-[9px] min-[425px]:text-[11px] sm:text-xs md:text-base whitespace-nowrap px-1"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#00FBFF] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isGlowFlash ? 0.2 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                  <span className="relative z-10">{t('hero.contactMe')}</span>
                </motion.button>
              </RevealInteractive>
            </div>
          </div>

          {/* ═══ ORBIT ASSEMBLY COLUMN ═══
               Container is sized by math: containerSize = orbitRadius*2 + iconBoxSize
               Max-width prevents overflow into text column. */}
          <div className={`col-span-12 ${isSideBySide ? 'min-[321px]:col-span-5' : ''} lg:col-span-5 flex flex-col justify-center items-center z-10 w-full min-w-0 relative overflow-visible`}>

            <motion.div
              ref={containerRef}
              className="relative flex items-center justify-center"
              style={{
                width: containerSize,
                height: containerSize,
                maxWidth: '100%',
                transformOrigin: 'center center',
              }}
              onMouseMove={handleContainerMouseMove}
              onMouseLeave={handleContainerMouseLeave}
            >
              {/* Outer Glow Ring — Cyber-Noir ambient emission */}
              <motion.div
                className="absolute rounded-full blur-xl z-0 pointer-events-none"
                style={{
                  width: profileSize + 40,
                  height: profileSize + 40,
                  background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #d946ef)',
                  opacity: outerGlowOpacity,
                }}
              />

              {/* ═══ TRIGONOMETRIC ORBIT RING ═══
                   Radius and push distance computed from math engine.
                   Icons orbit at profileSize/2 + gap, push out proportionally. */}
              {orbitIcons.map((item, idx) => {
                const angle = (idx / total) * 2 * Math.PI;
                const cx = Math.cos(angle) * orbitRadius;
                const cy = Math.sin(angle) * orbitRadius;

                return (
                  <OrbitSlot
                    key={idx}
                    cx={cx}
                    cy={cy}
                    angle={angle}
                    repulsionSpring={repulsionSpring}
                    pushDist={repulsionDist}
                  >
                    <StaticOrbitIcon item={item} index={idx} iconSize={iconSize} iconPadding={iconPadding} floatAmplitude={floatAmplitude} />
                  </OrbitSlot>
                );
              })}

              {/* ═══ CENTRAL PROFILE IMAGE ═══
                   Size derived from math engine.
                   We apply WebKit specific fixes (translateZ(0), isolation, and mask-image)
                   to guarantee the clip path holds during the grayscale 
                   filter transition and scaling transforms. */}
              <motion.div
                ref={imageRef}
                onMouseMove={handleImageMouseMove}
                onClick={handleAssemblyClick}
                className="relative aspect-square flex items-center justify-center z-10 group/profile pointer-events-auto rounded-full overflow-hidden cursor-pointer"
                style={{
                  width: profileSize,
                  height: profileSize,
                  scale: assemblyScale,
                  clipPath: 'circle(50%)',
                  WebkitClipPath: 'circle(50%)',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  isolation: 'isolate',
                  maskImage: 'radial-gradient(white, black)',
                  WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                }}
              >
                {/* Border Reveal Layer */}
                <motion.div
                  className={`absolute inset-0 rounded-full z-0 transition-opacity duration-300 ${isPulsing ? 'opacity-0' : 'opacity-0 group-hover/profile:opacity-100'}`}
                  style={{
                    background: 'var(--gradient-border)',
                    maskImage: glowTemplate,
                    WebkitMaskImage: glowTemplate,
                  }}
                />
                

                {/* Border Pulse Layer */}
                <motion.div
                  className="absolute inset-0 rounded-full z-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isPulsing ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ background: 'var(--gradient-border)' }}
                />

                {/* The actual image wrapper - structured identically to About.tsx to prevent WebKit clipping bugs */}
                <div
                  className="absolute inset-[2px] overflow-hidden rounded-full z-10 bg-card pointer-events-none"
                  style={{
                    boxShadow: '0 0 50px rgba(139,92,246,0.5)',
                  }}
                >
                  <img
                    src={profileImg}
                    alt={t('hero.name')}
                    className="w-full h-full object-cover grayscale-[10%] group-hover/profile:grayscale-0 transition-colors duration-700 rounded-full"
                    draggable={false}
                  />
                </div>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
