/**
 * Constants for the Spotlight animation component
 */

/**
 * CSS class names used in the Spotlight component
 */
export const CSS_CLASSES = {
  /** Container class */
  CONTAINER: 'spotlight-container',
  /** SVG animation class */
  ANIMATE_SPOTLIGHT: 'animate-spotlight',
  /** Pointer events none class */
  POINTER_EVENTS_NONE: 'pointer-events-none',
  /** Absolute positioning class */
  ABSOLUTE: 'absolute',
  /** Z-index class */
  Z_INDEX: 'z-[1]',
  /** Standard large height class */
  HEIGHT_LARGE: 'h-[169%]',
  /** Standard width class */
  WIDTH_DEFAULT: 'w-[138%]',
  /** Large screen width class */
  WIDTH_LARGE: 'lg:w-[84%]',
  /** Initial opacity class */
  OPACITY_ZERO: 'opacity-0',
  /** Stars background class */
  STARS_BACKGROUND: 'stars-background',
  /** Motion inset class */
  MOTION_INSET: 'inset-0',
  /** Motion width class */
  MOTION_WIDTH: 'w-full',
  /** Motion height class */
  MOTION_HEIGHT: 'h-full',
  /** Z-index for motion elements */
  Z_INDEX_MOTION: 'z-40'
};

/**
 * Default gradients for the enhanced Spotlight
 */
export const DEFAULT_GRADIENTS = {
  /** Primary gradient */
  PRIMARY:
    'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)',
  /** Secondary gradient */
  SECONDARY:
    'radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)',
  /** Tertiary gradient */
  TERTIARY:
    'radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)'
};

/**
 * Default animation and size values
 */
export const DEFAULT_SETTINGS = {
  /** Default height */
  HEIGHT: 1380,
  /** Default width */
  WIDTH: 560,
  /** Default small width */
  SMALL_WIDTH: 240,
  /** Default duration in seconds */
  DURATION: 7,
  /** Default x offset for animation */
  X_OFFSET: 100,
  /** Default y translation */
  TRANSLATE_Y: -350
};

/**
 * Default SVG values for the original Spotlight
 */
export const SVG_CONFIG = {
  /** Default fill color */
  DEFAULT_FILL: '#f1f1f1',
  /** Default fill opacity */
  FILL_OPACITY: '0.21',
  /** Default filter ID */
  FILTER_ID: 'filter',
  /** Default viewBox */
  VIEW_BOX: '0 0 3787 2842'
};

/**
 * Motion animation settings for the enhanced spotlight
 */
export const MOTION_SETTINGS = {
  /** Initial opacity for the motion container */
  INITIAL_OPACITY: 0,
  /** Target opacity for the motion container when animated */
  ANIMATE_OPACITY: 1,
  /** Duration of the fade-in effect in seconds */
  FADE_DURATION: 1.5
};
