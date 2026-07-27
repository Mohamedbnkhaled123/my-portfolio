'use client';

import React, { useRef, useState } from 'react';
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  radiusClass?: string;
}

export const RevealInteractive: React.FC<RevealProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', radiusClass = 'rounded-md', ...props }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const hasHover = typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false;

  // ═══════════════════════════════════════════════════
  // ORIGINAL: Fast mouse tracking inside element
  // ═══════════════════════════════════════════════════
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasHover || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    wrapperRef.current.style.setProperty('--mouse-x', `${x}px`);
    wrapperRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // ═══════════════════════════════════════════════════
  // NEW: Proximity detection — smooth pre-hover glow
  // Only controls --proximity (0→1). Does NOT touch
  // mouse tracking speed. Sets --mouse-x/y to nearest
  // edge point ONLY when mouse is outside the element.
  // ═══════════════════════════════════════════════════
  React.useEffect(() => {
    if (!hasHover) return;

    let rafId: number | null = null;
    let targetProximity = 0;
    let currentProximity = 0;
    let isAnimating = false;

    const startAnimating = () => {
      if (isAnimating) return;
      isAnimating = true;
      const animate = () => {
        if (wrapperRef.current) {
          currentProximity += (targetProximity - currentProximity) * 0.08;

          if (currentProximity > 0.001) {
            wrapperRef.current.style.setProperty('--proximity', currentProximity.toFixed(4));
            rafId = requestAnimationFrame(animate);
          } else {
            currentProximity = 0;
            wrapperRef.current.style.setProperty('--proximity', '0');
            isAnimating = false;
            rafId = null;
          }
        } else {
          isAnimating = false;
          rafId = null;
        }
      };
      rafId = requestAnimationFrame(animate);
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Signed distance to element edge (0 = inside)
      const dx = Math.max(0, -x, x - rect.width);
      const dy = Math.max(0, -y, y - rect.height);
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 80; // Activation radius in px
      targetProximity = dist === 0 ? 1 : Math.max(0, 1 - dist / maxDist);

      // Performance Optimization: Don't start loop if strictly outside activation zone
      if (targetProximity === 0 && currentProximity < 0.001) return;

      // Set mouse position exactly to cursor (no clamping) to cast a realistic external light source
      if (dist > 0 && targetProximity > 0) {
        wrapperRef.current.style.setProperty('--mouse-x', `${x}px`);
        wrapperRef.current.style.setProperty('--mouse-y', `${y}px`);
      }

      // Start animation loop on-demand
      startAnimating();
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [hasHover]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 800);
    if (props.onClick) props.onClick(e);
  };

  const isPulseActive = isClicked;

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      onClick={handleClick}
      className={`relative overflow-hidden ${radiusClass} bg-slate-300 dark:bg-white/5 transition-all duration-300 z-10 cursor-pointer ${className}`}
      {...props}
    >
      {/* Border Reveal Layer — Nested opacity bypasses CSS calc() bugs.
          Parent handles proximity (0 to 1), Child handles peak intensity. */}
      <div 
        className="absolute inset-0 z-[-2] pointer-events-none" 
        style={{ opacity: 'var(--proximity, 0)' }}
      >
        <div 
          className={`absolute inset-0 ${radiusClass}`}
          style={{
            opacity: 'var(--reveal-hover-opacity, 0.8)',
            background: 'var(--gradient-border)',
            backgroundSize: '200% auto',
            animation: 'cyber-shimmer 8s linear infinite',
            maskImage: `radial-gradient(var(--reveal-radius, 50px) circle at var(--mouse-x) var(--mouse-y), white, transparent)`,
            WebkitMaskImage: `radial-gradient(var(--reveal-radius, 50px) circle at var(--mouse-x) var(--mouse-y), white, transparent)`,
          }}
        />
      </div>

      {/* Full Border Pulse Layer (Click) */}
      <div 
        className={`absolute inset-0 ${radiusClass}`}
        style={{
          opacity: isPulseActive ? 1 : 0,
          background: 'var(--gradient-border)',
          backgroundSize: '200% auto',
          animation: 'cyber-shimmer 8s linear infinite',
          zIndex: -2,
          transition: isPulseActive ? 'opacity 0.1s ease-out' : 'opacity 1s ease-out',
        }}
      />
      
      {/* Inner Mask */}
      <div className={`absolute inset-[1px] ${radiusClass} z-[-1] pointer-events-none bg-card`} />

      {/* Spotlight Glow — Nested Opacity Engine */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none mix-blend-normal dark:mix-blend-screen"
        style={{ opacity: 'var(--proximity, 0)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: isPulseActive ? 0 : 1,
            transition: isPulseActive ? 'opacity 0.1s ease-out' : 'opacity 1s ease-out',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              opacity: 'var(--spotlight-hover-opacity, 0.15)',
              background: `radial-gradient(var(--glow-radius, 70px) circle at var(--mouse-x) var(--mouse-y), var(--spotlight-core) 0%, var(--spotlight-fade) 40%, transparent 80%)`,
            }}
          />
        </div>
      </div>
      
      {/* Real Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
      </div>
    </div>
  );
};
