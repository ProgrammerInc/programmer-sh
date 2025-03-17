/**
 * Constants for the CircularText component
 */

/**
 * Default rotation duration in seconds
 */
export const DEFAULT_SPIN_DURATION = 20;

/**
 * Default hover behavior
 */
export const DEFAULT_ON_HOVER = 'speedUp' as const;

/**
 * Animation transition presets for various hover behaviors
 */
export const ANIMATION_PRESETS = {
  /** Standard smooth linear rotation */
  default: {
    scale: 1,
    type: 'tween',
    ease: 'linear',
    duration: DEFAULT_SPIN_DURATION,
    repeat: Infinity
  },
  /** Slower rotation for 'slowDown' hover mode */
  slowDown: {
    scale: 1,
    type: 'tween',
    ease: 'linear',
    duration: DEFAULT_SPIN_DURATION * 2,
    repeat: Infinity
  },
  /** Faster rotation for 'speedUp' hover mode */
  speedUp: {
    scale: 1,
    type: 'tween',
    ease: 'linear',
    duration: DEFAULT_SPIN_DURATION / 4,
    repeat: Infinity
  },
  /** Extreme speed for 'goBonkers' hover mode */
  goBonkers: {
    scale: 0.8,
    type: 'tween',
    ease: 'linear',
    duration: DEFAULT_SPIN_DURATION / 20,
    repeat: Infinity
  },
  /** Spring configuration for various transitions */
  spring: {
    type: 'spring',
    damping: 20,
    stiffness: 300
  }
};

/**
 * Default size for the circular container in pixels
 */
export const DEFAULT_SIZE = 200;

/**
 * Default font size class
 */
export const DEFAULT_FONT_SIZE = 'text-2xl';
