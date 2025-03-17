/**
 * Constants for the GridMotion component
 */

/**
 * Default gradient color for the background
 */
export const DEFAULT_GRADIENT_COLOR = 'black';

/**
 * CSS variable name for the gradient color
 */
export const GRADIENT_COLOR_CSS_VAR = '--grid-motion-gradient-color';

/**
 * Total number of items in the grid (4 rows x 7 columns)
 */
export const TOTAL_ITEMS = 28;

/**
 * Number of rows in the grid
 */
export const ROWS_COUNT = 4;

/**
 * Number of columns per row
 */
export const COLUMNS_PER_ROW = 7;

/**
 * Maximum movement amount for the rows
 */
export const MAX_MOVE_AMOUNT = 300;

/**
 * Base duration for animation inertia
 */
export const BASE_DURATION = 0.8;

/**
 * Inertia factors for each row (outer rows move slower)
 */
export const INERTIA_FACTORS = [0.6, 0.4, 0.3, 0.2];

/**
 * Path to the noise overlay texture
 */
export const NOISE_TEXTURE_PATH = '/assets/noise.png';
