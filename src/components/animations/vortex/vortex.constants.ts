/**
 * Vortex Animation Component Constants
 */

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  /**
   * Container for the vortex animation
   */
  CONTAINER: 'vortex-container',

  /**
   * Canvas element
   */
  CANVAS: 'vortex-canvas',

  /**
   * Content overlay
   */
  CONTENT: 'vortex-content'
} as const;

/**
 * Default settings for the vortex animation
 */
export const DEFAULT_SETTINGS = {
  /**
   * Default number of particles
   */
  PARTICLE_COUNT: 700,

  /**
   * Default range for vertical particle distribution
   */
  RANGE_Y: 400,

  /**
   * Default base lifetime of particles
   */
  BASE_TTL: 50,

  /**
   * Default range of random lifetime variation
   */
  RANGE_TTL: 150,

  /**
   * Default base movement speed of particles
   */
  BASE_SPEED: 0.0,

  /**
   * Default range of random speed variation
   */
  RANGE_SPEED: 1.5,

  /**
   * Default base radius of particles
   */
  BASE_RADIUS: 1,

  /**
   * Default range of random radius variation
   */
  RANGE_RADIUS: 2,

  /**
   * Default base hue value for particles (0-360)
   */
  BASE_HUE: 220,

  /**
   * Default range of random hue variation
   */
  RANGE_HUE: 100,

  /**
   * Default background color for the canvas
   */
  BACKGROUND_COLOR: '#000000'
} as const;

/**
 * Constants for noise generation and animation
 */
export const ANIMATION_SETTINGS = {
  /**
   * Number of noise steps
   */
  NOISE_STEPS: 3,

  /**
   * X-offset for noise generation
   */
  X_OFFSET: 0.00125,

  /**
   * Y-offset for noise generation
   */
  Y_OFFSET: 0.00125,

  /**
   * Z-offset for noise generation
   */
  Z_OFFSET: 0.0005,

  /**
   * First blur level for glow effect
   */
  GLOW_BLUR_1: '8px',

  /**
   * Second blur level for glow effect
   */
  GLOW_BLUR_2: '4px',

  /**
   * Brightness for glow effect
   */
  GLOW_BRIGHTNESS: '200%'
} as const;

/**
 * Mathematical constants
 */
export const MATH_CONSTANTS = {
  /**
   * Half of PI
   */
  HALF_PI: 0.5 * Math.PI,

  /**
   * Tau (2 * PI)
   */
  TAU: 2 * Math.PI,

  /**
   * Conversion from degrees to radians
   */
  TO_RAD: Math.PI / 180
} as const;
