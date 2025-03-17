/**
 * Text Pressure Animation Component Constants
 */

/**
 * CSS classes for different elements of the component
 */
export const CSS_CLASSES = {
  CONTAINER: 'text-pressure-container',
  TITLE: 'text-pressure-title',
  CHAR: 'text-pressure-char'
} as const;

/**
 * Default settings for the Text Pressure component
 */
export const DEFAULT_SETTINGS = {
  /**
   * Default text content
   */
  TEXT: 'Compressa',

  /**
   * Default font family name
   */
  FONT_FAMILY: 'Compressa VF',

  /**
   * Default font URL
   */
  FONT_URL: 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',

  /**
   * Enable width variation by default
   */
  WIDTH_ENABLED: true,

  /**
   * Enable weight variation by default
   */
  WEIGHT_ENABLED: true,

  /**
   * Enable italic variation by default
   */
  ITALIC_ENABLED: true,

  /**
   * Disable opacity variation by default
   */
  ALPHA_ENABLED: false,

  /**
   * Enable flex layout by default
   */
  FLEX_ENABLED: true,

  /**
   * Disable stroke effect by default
   */
  STROKE_ENABLED: false,

  /**
   * Disable automatic scaling by default
   */
  SCALE_ENABLED: false,

  /**
   * Default text color
   */
  TEXT_COLOR: '#FFFFFF',

  /**
   * Default stroke color
   */
  STROKE_COLOR: '#FF0000',

  /**
   * Default stroke width in pixels
   */
  STROKE_WIDTH: 2,

  /**
   * Minimum font size in pixels
   */
  MIN_FONT_SIZE: 24,

  /**
   * Font variation minimum values
   */
  FONT_VARIATION_MIN: {
    WIDTH: 5,
    WEIGHT: 100,
    ITALIC: 0
  },

  /**
   * Font variation maximum values
   */
  FONT_VARIATION_MAX: {
    WIDTH: 200,
    WEIGHT: 900,
    ITALIC: 1
  },

  /**
   * Mouse movement easing factor (higher = faster)
   */
  MOUSE_EASING: 15
} as const;
