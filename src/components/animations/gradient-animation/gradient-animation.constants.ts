/**
 * Constants for the Gradient Animation component
 */

/**
 * Default gradient background start color
 */
export const DEFAULT_GRADIENT_BACKGROUND_START = 'rgb(108, 0, 162)';

/**
 * Default gradient background end color
 */
export const DEFAULT_GRADIENT_BACKGROUND_END = 'rgb(0, 17, 82)';

/**
 * Default first color for gradient animation (in RGB format)
 */
export const DEFAULT_FIRST_COLOR = '18, 113, 255';

/**
 * Default second color for gradient animation (in RGB format)
 */
export const DEFAULT_SECOND_COLOR = '221, 74, 255';

/**
 * Default third color for gradient animation (in RGB format)
 */
export const DEFAULT_THIRD_COLOR = '100, 220, 255';

/**
 * Default fourth color for gradient animation (in RGB format)
 */
export const DEFAULT_FOURTH_COLOR = '200, 50, 50';

/**
 * Default fifth color for gradient animation (in RGB format)
 */
export const DEFAULT_FIFTH_COLOR = '180, 180, 50';

/**
 * Default pointer color for interactive mode (in RGB format)
 */
export const DEFAULT_POINTER_COLOR = '140, 100, 255';

/**
 * Default size for gradient elements
 */
export const DEFAULT_SIZE = '80%';

/**
 * Default CSS mix-blend-mode value
 */
export const DEFAULT_BLENDING_VALUE = 'hard-light';

/**
 * Default interactive mode state
 */
export const DEFAULT_INTERACTIVE = true;

/**
 * CSS variable names used in the component
 */
export const CSS_VARIABLES = {
  gradientBackgroundStart: '--gradient-background-start',
  gradientBackgroundEnd: '--gradient-background-end',
  firstColor: '--first-color',
  secondColor: '--second-color',
  thirdColor: '--third-color',
  fourthColor: '--fourth-color',
  fifthColor: '--fifth-color',
  pointerColor: '--pointer-color',
  size: '--size',
  blendingValue: '--blending-value'
};

/**
 * Safari browser detection regex
 */
export const SAFARI_DETECTION_REGEX = /^((?!chrome|android).)*safari/i;
