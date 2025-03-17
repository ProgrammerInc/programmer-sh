/**
 * Constants for the Meteors animation component
 */

/**
 * Default number of meteors to render if not specified
 */
export const DEFAULT_METEOR_COUNT = 50;

/**
 * Base classes for meteor elements - since animation is now in CSS module, removing Tailwind animation class
 */
export const BASE_METEOR_CLASSES = [
  'absolute rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
  "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px]"
];

/**
 * Default CSS module class for meteor gradient when no custom color is provided
 */
export const DEFAULT_METEOR_GRADIENT_CLASS = 'meteor-default-gradient';

/**
 * CSS module class for custom gradient meteors when a color is provided
 */
export const CUSTOM_GRADIENT_CLASS = 'meteor-custom-gradient';

/**
 * CSS module class for meteor elements
 */
export const METEOR_CLASS = 'meteor-element';

/**
 * CSS module class for meteors container
 */
export const METEORS_CONTAINER_CLASS = 'meteors-container';

/**
 * CSS module class for stars background
 */
export const STARS_BACKGROUND_CLASS = 'stars-background';

/**
 * Default style for when a custom color is provided
 */
export const METEOR_COLOR_STYLE = '--meteor-from-color';

/**
 * Random number ranges for meteor animation parameters
 */
export const METEOR_ANIMATION = {
  /** Minimum delay in seconds */
  MIN_DELAY: 0.1,
  /** Maximum delay in seconds */
  MAX_DELAY: 10,
  /** Minimum duration in seconds */
  MIN_DURATION: 2,
  /** Maximum duration in seconds */
  MAX_DURATION: 10
};

/**
 * Configuration for meteor positioning
 */
export const METEOR_POSITION = {
  /** Minimum left position in pixels */
  MIN_LEFT: -1920,
  /** Maximum left position in pixels */
  MAX_LEFT: 1920
};
