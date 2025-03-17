/**
 * Constants for the BlurText component
 */

/**
 * Default animation settings from top to bottom
 */
export const DEFAULT_FROM_TOP = {
  filter: 'blur(10px)',
  opacity: 0,
  transform: 'translate3d(0,-50px,0)'
};

/**
 * Default animation settings from bottom to top
 */
export const DEFAULT_FROM_BOTTOM = {
  filter: 'blur(10px)',
  opacity: 0,
  transform: 'translate3d(0,50px,0)'
};

/**
 * Default animation target state
 */
export const DEFAULT_TO = {
  filter: 'blur(0px)',
  opacity: 1,
  transform: 'translate3d(0,0,0)'
};

/**
 * Default spring configuration
 */
export const DEFAULT_SPRING_CONFIG = {
  tension: 170,
  friction: 26,
  // Adding default easing property for react-spring
  easing: (t: number): number => {
    // Implementation of easeOutCubic
    return 1 - Math.pow(1 - t, 3);
  }
};
