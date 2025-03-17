/**
 * SpotlightCursor Constants
 *
 * Constants used by the SpotlightCursor component
 *
 * @module SpotlightCursor/Constants
 */

/**
 * Default configuration values for the spotlight effect
 */
export const DEFAULT_CONFIG = {
  /**
   * Default radius of the spotlight in pixels
   */
  radius: 200,

  /**
   * Default brightness of the spotlight (0-1)
   */
  brightness: 0.15,

  /**
   * Default color of the spotlight
   */
  color: '#ffffff',

  /**
   * Default smoothing factor for cursor movement (0-1)
   */
  smoothing: 0.1,

  /**
   * Default speed of the pulse animation in milliseconds
   */
  pulseSpeed: 2000
};

/**
 * CSS classes for the SpotlightCursor component
 */
export const CSS_CLASSES = {
  /**
   * Base class for the spotlight cursor canvas
   */
  canvas: 'spotlight-cursor-canvas'
};

/**
 * Style properties for the cursor canvas
 */
export const CANVAS_STYLE = {
  /**
   * Position style for the canvas
   */
  position: 'fixed',

  /**
   * Top position of the canvas
   */
  top: '0px',

  /**
   * Left position of the canvas
   */
  left: '0px',

  /**
   * Ensures the canvas doesn't interfere with mouse events
   */
  pointerEvents: 'none',

  /**
   * Z-index to ensure the cursor is above other elements
   */
  zIndex: '99999',

  /**
   * Width of the canvas (100% of viewport)
   */
  width: '100%',

  /**
   * Height of the canvas (100% of viewport)
   */
  height: '100%'
};

/**
 * Canvas rendering constants
 */
export const RENDERING = {
  /**
   * Base overlay opacity
   */
  overlayOpacity: 0.85,

  /**
   * Pulse amplitude (how much the spotlight size varies)
   */
  pulseAmplitude: 0.1,

  /**
   * Glow size multiplier relative to spotlight size
   */
  glowSizeMultiplier: 1.2,

  /**
   * Glow opacity
   */
  glowOpacity: 0.2
};
