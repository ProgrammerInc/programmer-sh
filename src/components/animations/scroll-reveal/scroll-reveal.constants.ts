/**
 * Constants for the Scroll Reveal animation component
 */

/**
 * Default enable blur setting
 */
export const DEFAULT_ENABLE_BLUR = true;

/**
 * Default base opacity for words before animation
 */
export const DEFAULT_BASE_OPACITY = 0.1;

/**
 * Default base rotation in degrees before animation
 */
export const DEFAULT_BASE_ROTATION = 3;

/**
 * Default blur strength in pixels
 */
export const DEFAULT_BLUR_STRENGTH = 4;

/**
 * Default ScrollTrigger start position for rotation animation
 */
export const DEFAULT_ROTATION_START = 'top bottom';

/**
 * Default ScrollTrigger end position for rotation animation
 */
export const DEFAULT_ROTATION_END = 'bottom bottom';

/**
 * Default ScrollTrigger start position for word animations
 */
export const DEFAULT_WORD_ANIMATION_START = 'top bottom-=20%';

/**
 * Default ScrollTrigger end position for word animations
 */
export const DEFAULT_WORD_ANIMATION_END = 'bottom bottom';

/**
 * Default stagger delay between word animations in seconds
 */
export const DEFAULT_STAGGER = 0.05;

/**
 * Default rotation animation configuration
 */
export const DEFAULT_ROTATION_ANIMATION = {
  from: {
    transformOrigin: '0% 50%',
    rotate: DEFAULT_BASE_ROTATION
  },
  to: {
    ease: 'none',
    rotate: 0
  },
  scrollTrigger: {
    start: DEFAULT_ROTATION_START,
    end: DEFAULT_ROTATION_END,
    scrub: true
  }
};

/**
 * Default opacity animation configuration
 */
export const DEFAULT_OPACITY_ANIMATION = {
  from: {
    opacity: DEFAULT_BASE_OPACITY,
    willChange: 'opacity'
  },
  to: {
    ease: 'none',
    opacity: 1,
    stagger: DEFAULT_STAGGER
  },
  scrollTrigger: {
    start: DEFAULT_WORD_ANIMATION_START,
    end: DEFAULT_WORD_ANIMATION_END,
    scrub: true
  }
};

/**
 * Default blur animation configuration
 */
export const DEFAULT_BLUR_ANIMATION = {
  from: {
    filter: `blur(${DEFAULT_BLUR_STRENGTH}px)`
  },
  to: {
    ease: 'none',
    filter: 'blur(0px)',
    stagger: DEFAULT_STAGGER
  },
  scrollTrigger: {
    start: DEFAULT_WORD_ANIMATION_START,
    end: DEFAULT_WORD_ANIMATION_END,
    scrub: true
  }
};

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  /** Main container class */
  CONTAINER: 'container',

  /** Text wrapper class */
  TEXT_WRAPPER: 'text-wrapper',

  /** Word span class */
  WORD: 'word',

  /** Screen reader only class */
  SR_ONLY: 'sr-only'
};
