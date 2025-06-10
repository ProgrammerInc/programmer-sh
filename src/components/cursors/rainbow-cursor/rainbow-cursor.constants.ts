/**
 * Rainbow Cursor Constants Module
 *
 * Constants used by the Rainbow Cursor component, including canvas styles,
 * context settings, and user preference queries.
 *
 * @module RainbowCursorConstants
 */

/**
 * CSS style properties for the canvas element.
 */
export const CANVAS_STYLES = {
  /**
   * Position the canvas at the top left.
   */
  top: '0px',

  /**
   * Position the canvas at the top left.
   */
  left: '0px',

  /**
   * Prevent the canvas from capturing mouse events.
   */
  pointerEvents: 'none',

  /**
   * Force high z-index to appear above other elements.
   */
  zIndex: '99999',

  /**
   * Use hardware acceleration and create a stacking context.
   */
  transform: 'translateZ(0)'
};

/**
 * Default values for Rainbow Cursor component.
 */
export const DEFAULT_VALUES = {
  /**
   * Number of particles in the rainbow trail.
   */
  length: 20,

  /**
   * Default rainbow colors (red, orange, yellow, green, blue, purple).
   */
  colors: ['#FE0000', '#FD8C00', '#FFE500', '#119F0B', '#0644B3', '#C22EDC'],

  /**
   * Size of the cursor trail in pixels.
   */
  size: 3,

  /**
   * Speed factor for the trailing effect.
   */
  trailSpeed: 0.4,

  /**
   * Speed of color cycling animation.
   */
  colorCycleSpeed: 0.002,

  /**
   * Blur effect for the cursor in pixels.
   */
  blur: 0,

  /**
   * Speed of the pulsing animation.
   */
  pulseSpeed: 0.01,

  /**
   * Minimum scale factor for pulsing animation.
   */
  pulseMin: 0.8,

  /**
   * Maximum scale factor for pulsing animation.
   */
  pulseMax: 1.2
};

/**
 * Canvas context settings for rendering the cursor.
 */
export const CANVAS_CONTEXT_SETTINGS = {
  /**
   * Join style for line segments.
   */
  lineJoin: 'round' as CanvasLineJoin,

  /**
   * Cap style for line ends.
   */
  lineCap: 'round' as CanvasLineCap
};

/**
 * Media query for reduced motion preference.
 */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
