/**
 * Constants for the Scroll Float animation component
 */

/**
 * Default animation duration in seconds
 */
export const DEFAULT_ANIMATION_DURATION = 1;

/**
 * Default GSAP easing function
 * Uses back.inOut(2) for a smooth elastic effect
 */
export const DEFAULT_EASE = 'back.inOut(2)';

/**
 * Default ScrollTrigger start position
 * Starts animation when the center of the element reaches 50% below the bottom of the viewport
 */
export const DEFAULT_SCROLL_START = 'center bottom+=50%';

/**
 * Default ScrollTrigger end position
 * Ends animation when the bottom of the element reaches 40% above the bottom of the viewport
 */
export const DEFAULT_SCROLL_END = 'bottom bottom-=40%';

/**
 * Default stagger delay between each character's animation in seconds
 */
export const DEFAULT_STAGGER = 0.03;

/**
 * Default animation configuration for GSAP
 */
export const DEFAULT_ANIMATION = {
  from: {
    willChange: 'opacity, transform',
    opacity: 0,
    yPercent: 120,
    scaleY: 2.3,
    scaleX: 0.7,
    transformOrigin: '50% 0%'
  },
  to: {
    opacity: 1,
    yPercent: 0,
    scaleY: 1,
    scaleX: 1
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

  /** Character span class */
  CHAR: 'char'
};
