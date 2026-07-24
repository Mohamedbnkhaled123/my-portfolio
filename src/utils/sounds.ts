/**
 * Premium UI Click/Pop Sound — Synthesized via Web Audio API
 * Zero network latency. Zero file size. Runs entirely on the GPU audio thread.
 */

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

/**
 * Plays a crisp, high-tech "pop" click sound using Web Audio synthesis.
 * This approach is superior to Base64 MP3 because:
 * - Zero payload size (no embedded data)
 * - Instant playback (no decode step)
 * - Consistent across all browsers
 */
export const playClickSound = (): void => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // --- Oscillator: Sharp sine "pop" at 880Hz decaying to 440Hz ---
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

    // --- Gain Envelope: Fast attack, quick decay ---
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    // --- Second harmonic layer for richness ---
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1200, now);
    osc2.frequency.exponentialRampToValueAtTime(600, now + 0.06);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.08, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    // Connect the graph
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    // Play and auto-cleanup
    osc.start(now);
    osc.stop(now + 0.15);
    osc2.start(now);
    osc2.stop(now + 0.1);
  } catch {
    // Silently fail if audio context is blocked (e.g., autoplay policy)
  }
};
