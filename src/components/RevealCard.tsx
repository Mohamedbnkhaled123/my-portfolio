'use client';

import React, { useRef, useState, useEffect } from 'react';

interface RevealCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isManualActive?: boolean; 
  manualState?: boolean;   
}

export const RevealCard: React.FC<RevealCardProps> = ({ 
  children, 
  className = '', 
  style,
  isManualActive = false,
  manualState = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  
  const hasHover = typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false;

  // ═══════════════════════════════════════════════════
  // ORIGINAL: Fast mouse tracking inside element
  // ═══════════════════════════════════════════════════
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Bypass React state entirely for 60fps performance
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    // ═══════════════════════════════════════════════════
    // MAGNETIC PROXIMITY LOGIC (inner edge peaks)
    // ═══════════════════════════════════════════════════
    const minDist = Math.min(x, rect.width - x, y, rect.height - y);
    const peak = minDist < 30 ? 1 + (1 - minDist / 30) : 1; 
    cardRef.current.style.setProperty('--proximity-peak', peak.toString());
  };

  // ═══════════════════════════════════════════════════
  // NEW: Proximity detection — smooth pre-hover glow
  // Only controls --proximity (0→1). Does NOT touch
  // mouse tracking speed. Sets --mouse-x/y to nearest
  // edge point ONLY when mouse is outside the element.
  // ═══════════════════════════════════════════════════
  useEffect(() => {
    if (!hasHover) return;

    let rafId: number | null = null;
    let targetProximity = 0;
    let currentProximity = 0;
    let isAnimating = false;

    const startAnimating = () => {
      if (isAnimating) return;
      isAnimating = true;
      const animate = () => {
        if (cardRef.current) {
          currentProximity += (targetProximity - currentProximity) * 0.08;

          if (currentProximity > 0.001) {
            cardRef.current.style.setProperty('--proximity', currentProximity.toFixed(4));
            rafId = requestAnimationFrame(animate);
          } else {
            currentProximity = 0;
            cardRef.current.style.setProperty('--proximity', '0');
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
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;

      // Signed distance to element edge (0 = inside)
      const dx = Math.max(0, -x, x - width);
      const dy = Math.max(0, -y, y - height);
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 80; // Activation radius in px
      targetProximity = dist === 0 ? 1 : Math.max(0, 1 - dist / maxDist);

      // Performance Optimization: Don't start loop if strictly outside activation zone
      if (targetProximity === 0 && currentProximity < 0.001) return;

      // Set mouse position exactly to cursor (no clamping) to cast a realistic external light source
      if (dist > 0 && targetProximity > 0) {
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
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

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 800);
  };

  const isPulseActive = isManualActive ? manualState : isClicked;
  
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {}}
      onMouseLeave={() => {
        if (hasHover) {
          if (cardRef.current) {
            cardRef.current.style.setProperty('--proximity-peak', '1');
          }
        }
      }}
      onClick={handleClick}
      className={`reveal-wrapper relative overflow-hidden rounded-xl bg-slate-200 dark:bg-card border-transparent backdrop-blur-md transition-all duration-500 z-10 cursor-pointer ${className}`}
      style={style}
    >
      {/* 1. Border Reveal Layer — Nested opacity bypasses CSS calc() bugs */}
      <div 
        className="absolute inset-0 z-[-2] pointer-events-none rounded-[inherit]" 
        style={{ opacity: 'var(--proximity, 0)' }}
      >
        <div 
          className="reveal-border absolute inset-0 rounded-[inherit]"
          style={{
            opacity: 'calc(var(--reveal-hover-opacity, 0.65) * var(--proximity-peak, 1))',
            filter: 'brightness(var(--proximity-peak, 1))',
            background: 'var(--card-glow-border, var(--gradient-border))',
            backgroundSize: '200% auto',
            animation: 'cyber-shimmer 8s linear infinite',
            maskImage: `radial-gradient(var(--reveal-radius, 80px) circle at var(--mouse-x) var(--mouse-y), white, transparent)`,
            WebkitMaskImage: `radial-gradient(var(--reveal-radius, 80px) circle at var(--mouse-x) var(--mouse-y), white, transparent)`,
          }}
        />
      </div>

      {/* 1.5. Full Border Pulse Layer (Click) */}
      <div 
        className="reveal-border absolute inset-0 rounded-[inherit]"
        style={{
          opacity: isPulseActive ? 1 : 0,
          background: 'var(--card-glow-border, var(--gradient-border))',
          backgroundSize: '200% auto',
          animation: 'cyber-shimmer 8s linear infinite',
          zIndex: -2,
          transition: isPulseActive ? 'opacity 0.1s ease-out' : 'opacity 1s ease-out',
        }}
      />
      
      {/* 2. Inner card gap surface */}
      <div className="absolute inset-[1px] bg-card rounded-[calc(0.75rem-1px)] z-[-1]" />

      {/* 3. Spotlight Glow — Nested Opacity Engine */}
      <div 
        className="reveal-spotlight absolute inset-0 z-0 pointer-events-none mix-blend-normal dark:mix-blend-screen rounded-[inherit]"
        style={{ opacity: 'var(--proximity, 0)' }}
      >
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            opacity: isPulseActive ? 0 : 1,
            transition: isPulseActive ? 'opacity 0.1s ease-out' : 'opacity 1s ease-out',
          }}
        >
          <div
            className="absolute inset-0 rounded-[inherit]"
            style={{
              opacity: 'var(--spotlight-hover-opacity, 0.15)',
              background: `radial-gradient(var(--glow-radius, 100px) circle at var(--mouse-x) var(--mouse-y), var(--spotlight-core) 0%, var(--spotlight-fade) 40%, transparent 80%)`,
            }}
          />
        </div>
      </div>
      
      {/* 4. Neon Click Pulse (Visual Purity) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none rounded-[inherit]"
        style={{
          opacity: isPulseActive ? 1 : `calc(var(--proximity, 0) * 0.1)`,
          boxShadow: isPulseActive
            ? 'var(--card-pulse-shadow, inset 0 0 25px rgba(139,92,246,0.2), inset 0 0 50px rgba(217,70,239,0.12), 0 0 15px rgba(139,92,246,0.3))'
            : 'none',
          transition: isPulseActive ? 'opacity 0.1s ease-out' : 'opacity 0.3s ease-out',
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-center">
          {children}
      </div>
    </div>
  );
};
