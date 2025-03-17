/**
 * Constants for the Snowflake Cursor component.
 */

/**
 * Array of possible emoji characters for snowflakes.
 */
export const POSSIBLE_EMOJI = ['❄️'];

/**
 * Default canvas style properties.
 */
export const CANVAS_STYLES = {
  /**
   * Position the canvas absolutely or fixed depending on container.
   */
  position: 'absolute', // Will be updated based on element prop

  /**
   * Position the canvas at the top of its container.
   */
  top: '0',

  /**
   * Position the canvas at the left of its container.
   */
  left: '0',

  /**
   * Prevent the canvas from intercepting pointer events.
   */
  pointerEvents: 'none',

  /**
   * Force high z-index to ensure the canvas is above other elements.
   */
  zIndex: '99999',

  /**
   * Create stacking context with hardware acceleration.
   */
  transform: 'translateZ(0)'
};

/**
 * Font settings for rendering emoji.
 */
export const FONT_SETTINGS = {
  /**
   * Font size and family for emoji.
   */
  font: '12px serif',

  /**
   * Text baseline alignment.
   */
  textBaseline: 'middle',

  /**
   * Text horizontal alignment.
   */
  textAlign: 'center'
};

/**
 * Snowflake particle physics constants.
 */
export const PARTICLE_PHYSICS = {
  /**
   * Minimum lifespan in frames.
   */
  minLifeSpan: 80,

  /**
   * Random additional lifespan in frames.
   */
  additionalLifeSpan: 60,

  /**
   * Base horizontal velocity.
   */
  baseHorizontalVelocity: 0.5,

  /**
   * Base vertical velocity.
   */
  baseVerticalVelocity: 1.0,

  /**
   * Horizontal velocity variation factor.
   */
  horizontalVariationFactor: 2 / 75,

  /**
   * Vertical velocity reduction factor.
   */
  verticalReductionFactor: 1 / 300
};
