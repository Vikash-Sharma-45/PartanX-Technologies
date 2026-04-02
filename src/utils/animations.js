// Animation utility functions for GSAP
// Centralizes animation configs for consistency

/**
 * Default ease curve for scroll-triggered reveals
 */
export const EASE_OUT = 'power3.out';
export const EASE_INOUT = 'power2.inOut';
export const EASE_BOUNCE = 'elastic.out(1, 0.6)';

/**
 * Fade up animation config
 */
export const fadeUpConfig = (delay = 0, duration = 0.9) => ({
  from: { opacity: 0, y: 60 },
  to: { opacity: 1, y: 0, duration, delay, ease: EASE_OUT },
});

/**
 * Stagger children fade up
 */
export const staggerChildren = (staggerAmount = 0.12) => ({
  opacity: 0,
  y: 40,
  stagger: staggerAmount,
  ease: EASE_OUT,
  duration: 0.8,
});

/**
 * Scale in animation
 */
export const scaleIn = (delay = 0) => ({
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1, duration: 0.8, delay, ease: EASE_OUT },
});

/**
 * Standard scroll trigger settings
 */
export const scrollTriggerDefaults = (trigger, options = {}) => ({
  trigger,
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
  ...options,
});

/**
 * Magnetic effect strength multiplier
 */
export const MAGNETIC_STRENGTH = 0.4;
