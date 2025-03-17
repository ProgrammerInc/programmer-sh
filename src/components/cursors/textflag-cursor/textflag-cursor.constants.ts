/**
 * TextFlagCursor Constants
 *
 * Constants used by the TextFlagCursor component
 *
 * @module TextFlagCursor/Constants
 */

/**
 * Default configuration values for the text flag cursor
 */
export const DEFAULT_CONFIG = {
  /**
   * Default text to display
   */
  text: 'Programmer.SH',

  /**
   * Default color for the text
   */
  color: '#64ffda',

  /**
   * Default font family
   */
  font: 'monospace',

  /**
   * Default text size in pixels
   */
  textSize: 12,

  /**
   * Default gap between characters (computed at runtime)
   */
  gap: 0, // This will be computed as textSize + 2

  /**
   * Default container element (computed at runtime)
   */
  element: null as HTMLElement | null
};

/**
 * Canvas rendering constants
 */
export const RENDERING = {
  /**
   * X radius for the oscillation effect
   */
  radiusX: 2,

  /**
   * Y radius for the oscillation effect
   */
  radiusY: 5,

  /**
   * Angle increment per frame
   */
  angleIncrement: 0.15,

  /**
   * Character follow speed (higher = slower)
   */
  followSpeed: 5,

  /**
   * Offset for the first character position
   */
  cursorOffset: 2
};

/**
 * Canvas style properties
 */
export const CANVAS_STYLE = {
  /**
   * Position for body-level cursor
   */
  fixedPosition: 'fixed',

  /**
   * Position for element-level cursor
   */
  absolutePosition: 'absolute',

  /**
   * Top position
   */
  top: '0px',

  /**
   * Left position
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
   * Hardware acceleration for smoother animation
   */
  transform: 'translateZ(0)'
};
