/**
 * SpringyCursor Constants
 *
 * Constants used by the SpringyCursor component
 *
 * @module SpringyCursor/Constants
 */

/**
 * Number of dots in the springy chain.
 */
export const N_DOTS = 7;

/**
 * Time delta for physics simulation.
 */
export const DELTA_T = 0.01;

/**
 * Segment length between particles.
 */
export const SEGMENT_LENGTH = 10;

/**
 * Spring constant for force calculations.
 */
export const SPRING_K = 10;

/**
 * Mass of each particle.
 */
export const MASS = 1;

/**
 * Gravity force applied to particles.
 */
export const GRAVITY = 50;

/**
 * Resistance/friction applied to particles.
 */
export const RESISTANCE = 10;

/**
 * Minimum velocity to consider a particle stopped.
 */
export const STOP_VELOCITY = 0.1;

/**
 * Minimum acceleration to consider a particle stopped.
 */
export const STOP_ACCELERATION = 0.1;

/**
 * Size of each dot.
 */
export const DOT_SIZE = 11;

/**
 * Bounce coefficient for collisions.
 */
export const BOUNCE = 0.7;

/**
 * Default emoji for the cursor.
 */
export const DEFAULT_EMOJI = '🍆';

/**
 * Font size for the emoji rendering.
 */
export const EMOJI_FONT_SIZE = '16px serif';

/**
 * CSS classes for the SpringyCursor component.
 */
export const CSS_CLASSES = {
  /**
   * Canvas element class.
   */
  canvas: 'springy-cursor-canvas'
};

/**
 * Style properties for the cursor canvas.
 */
export const CANVAS_STYLE = {
  /**
   * Position style for the canvas when in document body.
   */
  fixedPosition: 'fixed',

  /**
   * Position style for the canvas when in a wrapper element.
   */
  absolutePosition: 'absolute',

  /**
   * Top position of the canvas.
   */
  top: '0px',

  /**
   * Left position of the canvas.
   */
  left: '0px',

  /**
   * Ensures the canvas doesn't interfere with mouse events.
   */
  pointerEvents: 'none',

  /**
   * Z-index to ensure the cursor is above other elements.
   */
  zIndex: '99999',

  /**
   * Enables hardware acceleration for smoother performance.
   */
  transform: 'translateZ(0)'
};
