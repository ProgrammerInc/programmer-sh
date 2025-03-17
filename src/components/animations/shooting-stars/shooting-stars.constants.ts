/**
 * Constants for the ShootingStars animation component
 */

/**
 * Default configuration values for the ShootingStars animation
 */
export const DEFAULT_SHOOTING_STARS = {
  /** @type {number} Minimum speed of the shooting stars */
  MIN_SPEED: 10,
  /** @type {number} Maximum speed of the shooting stars */
  MAX_SPEED: 30,
  /** @type {number} Minimum delay between shooting stars in milliseconds */
  MIN_DELAY: 1200,
  /** @type {number} Maximum delay between shooting stars in milliseconds */
  MAX_DELAY: 4200,
  /** @type {string} Color of the shooting star head */
  STAR_COLOR: '#9E00FF',
  /** @type {string} Color of the shooting star trail */
  TRAIL_COLOR: '#2EB9DF',
  /** @type {number} Width of the star element */
  STAR_WIDTH: 10,
  /** @type {number} Height of the star element */
  STAR_HEIGHT: 1
};

/**
 * CSS classes used in the ShootingStars component
 */
export const CSS_CLASSES = {
  /** @type {string} Container class */
  CONTAINER: 'shooting-stars-container',
  /** @type {string} Star element class */
  STAR: 'shooting-star',
  /** @type {string} Gradient class */
  GRADIENT: 'shooting-star-gradient'
};

/**
 * Animation configuration for shooting stars
 */
export const ANIMATION = {
  /** @type {number} Frame rate multiplier for smooth animation */
  FRAME_RATE_MULTIPLIER: 1,
  /** @type {number} Scale factor for star growth as it moves */
  SCALE_FACTOR: 100,
  /** @type {number} Margin for off-screen star removal (pixels) */
  OFF_SCREEN_MARGIN: 20
};
