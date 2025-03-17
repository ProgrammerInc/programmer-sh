/**
 * Constants for the ShinyText animation component
 */

/**
 * Default values for ShinyText animation
 */
export const DEFAULT_SHINY_TEXT = {
  /** @type {boolean} Default disabled state */
  DISABLED: false,
  /** @type {number} Default animation speed in seconds */
  SPEED: 5,
  /** @type {string} Default text color (slightly transparent light gray) */
  TEXT_COLOR: '#b5b5b5a4'
};

/**
 * Shine gradient configuration
 */
export const SHINE_GRADIENT = {
  /** @type {string} Linear gradient for the shine effect */
  BACKGROUND_IMAGE:
    'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
  /** @type {string} Background size to allow animation */
  BACKGROUND_SIZE: '200% 100%'
};

/**
 * CSS classes used in the ShinyText component
 */
export const CSS_CLASSES = {
  /** @type {string} Container class */
  CONTAINER: 'shiny-text-container',
  /** @type {string} Animated element class */
  ANIMATED: 'shiny-text-animated'
};
