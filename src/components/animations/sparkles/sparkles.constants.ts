/**
 * Constants for the Sparkles animation component
 */

/**
 * Default values for the Sparkles component
 */
export const DEFAULT_SPARKLES = {
  /** @type {string} Default background color */
  BACKGROUND: '#0d47a1',
  /** @type {string} Default particle color */
  PARTICLE_COLOR: '#ffffff',
  /** @type {number} Default minimum particle size */
  MIN_SIZE: 1,
  /** @type {number} Default maximum particle size */
  MAX_SIZE: 3,
  /** @type {number} Default animation speed */
  SPEED: 4,
  /** @type {number} Default particle density/count */
  PARTICLE_DENSITY: 120,
  /** @type {number} Default FPS limit */
  FPS_LIMIT: 120
};

/**
 * CSS classes used in the Sparkles component
 */
export const CSS_CLASSES = {
  /** @type {string} Container class */
  CONTAINER: 'sparkles-container',
  /** @type {string} Particles wrapper class */
  PARTICLES_WRAPPER: 'sparkles-particles-wrapper'
};

/**
 * Animation modes and settings
 */
export const ANIMATION = {
  /** @type {string} Default out mode for particles */
  OUT_MODE: 'out',
  /** @type {number} Default width for density calculation */
  DENSITY_WIDTH: 400,
  /** @type {number} Default height for density calculation */
  DENSITY_HEIGHT: 400
};

/**
 * Interactive modes configuration
 */
export const INTERACTIVE_MODES = {
  /** @type {string} Mode when clicking on particles */
  CLICK: 'push',
  /** @type {string} Mode when hovering over particles */
  HOVER: 'repulse',
  /** @type {number} Default push quantity */
  PUSH_QUANTITY: 4,
  /** @type {number} Default repulse distance */
  REPULSE_DISTANCE: 200,
  /** @type {number} Default repulse duration */
  REPULSE_DURATION: 0.4
};
