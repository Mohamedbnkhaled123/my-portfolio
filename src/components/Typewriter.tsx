'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * High-performance Typewriter effect.
 * All loop state lives in refs to prevent multiple
 * concurrent timeout chains from React re-renders.
 * Only setDisplayText triggers a render (once per character).
 */
export const Typewriter: React.FC<TypewriterProps> = ({
  strings,
  typingSpeed = 70,
  deletingSpeed = 40,
  delayBetween = 1000,
  className = '',
  style,
}) => {
  const [displayText, setDisplayText] = useState('');

  // All mutable loop state lives in refs — immune to re-renders
  const stringIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Cache props in refs so the tick function never goes stale
  const stringsRef = useRef(strings);
  const typingSpeedRef = useRef(typingSpeed);
  const deletingSpeedRef = useRef(deletingSpeed);
  const delayBetweenRef = useRef(delayBetween);

  stringsRef.current = strings;
  typingSpeedRef.current = typingSpeed;
  deletingSpeedRef.current = deletingSpeed;
  delayBetweenRef.current = delayBetween;

  useEffect(() => {
    // Single tick function — stable reference, never recreated
    const tick = () => {
      const currentStrings = stringsRef.current;
      const currentString = currentStrings[stringIdxRef.current];

      if (!isDeletingRef.current) {
        // Typing forward
        charIdxRef.current++;
        setDisplayText(currentString.slice(0, charIdxRef.current));

        if (charIdxRef.current >= currentString.length) {
          // Finished typing — pause, then start deleting
          timeoutRef.current = setTimeout(() => {
            isDeletingRef.current = true;
            timeoutRef.current = setTimeout(tick, deletingSpeedRef.current);
          }, delayBetweenRef.current);
          return;
        }

        timeoutRef.current = setTimeout(tick, typingSpeedRef.current);
      } else {
        // Deleting
        charIdxRef.current--;
        setDisplayText(currentString.slice(0, charIdxRef.current));

        if (charIdxRef.current <= 0) {
          // Finished deleting — move to next string
          isDeletingRef.current = false;
          stringIdxRef.current = (stringIdxRef.current + 1) % currentStrings.length;
          timeoutRef.current = setTimeout(tick, typingSpeedRef.current);
          return;
        }

        timeoutRef.current = setTimeout(tick, deletingSpeedRef.current);
      }
    };

    // Start the single loop
    timeoutRef.current = setTimeout(tick, typingSpeedRef.current);

    // Cleanup — kills the ONE active timeout, guaranteed no leak
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []); // Empty deps — runs once, never restarts

  return (
    <span className={className} style={style}>
      {displayText}
      <span
        className="inline-block w-[4px] ml-[2px] animate-blink"
        style={{
          height: '1.1em',
          verticalAlign: 'text-bottom',
          background: 'linear-gradient(180deg, #06b6d4, #8b5cf6)',
          boxShadow: '0 0 8px rgba(139,92,246,0.6), 0 0 16px rgba(6,182,212,0.3)',
        }}
      />
    </span>
  );
};
