/**
 * Constants for the GridPattern component
 */

/**
 * Default grid pattern type
 */
export const DEFAULT_GRID_TYPE = 'dots';

/**
 * Default grid size in pixels
 */
export const DEFAULT_GRID_SIZE = 20;

/**
 * Default opacity for grid patterns
 */
export const DEFAULT_OPACITY = 0.2;

/**
 * Default color for grid patterns
 */
export const DEFAULT_COLOR = 'currentColor';

/**
 * Default animation state
 */
export const DEFAULT_ANIMATE = false;

/**
 * Animation duration in seconds
 */
export const ANIMATION_DURATION = 20;

/**
 * Animation configuration by grid type
 */
export const ANIMATION_BY_TYPE = {
  dots: 'animate-[dots-shift_20s_linear_infinite]',
  lines: 'animate-[lines-shift_20s_linear_infinite]',
  squares: 'animate-[squares-shift_20s_linear_infinite]',
  crosshatch: 'animate-[crosshatch-shift_20s_linear_infinite]',
  diamonds: 'animate-[diamonds-shift_20s_linear_infinite]'
};

/**
 * Base CSS class name
 */
export const BASE_CLASS_NAME = 'relative h-full w-full overflow-hidden';
