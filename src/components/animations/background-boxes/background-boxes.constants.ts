/**
 * Constants for the BackgroundBoxes component
 */

/**
 * Default grid dimensions
 */
export const DEFAULT_GRID = {
  /** Default number of rows */
  rowCount: 150,
  /** Default number of columns */
  colCount: 100
};

/**
 * Default transformation style for the container
 */
export const DEFAULT_TRANSFORM = {
  transform:
    'translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)'
};

/**
 * Default color variables for box hover effects
 */
export const DEFAULT_COLORS = [
  '--sky-300',
  '--pink-300',
  '--green-300',
  '--yellow-300',
  '--red-300',
  '--purple-300',
  '--blue-300',
  '--indigo-300',
  '--violet-300'
];

/**
 * Animation settings for box hover effects
 */
export const DEFAULT_ANIMATION = {
  /** Duration for hover transition in seconds */
  hoverDuration: 0,
  /** Duration for non-hover animation in seconds */
  animateDuration: 2
};

/**
 * CSS class names for component elements
 */
export const CSS_CLASSES = {
  /** Container class name */
  container: 'background-boxes-container',
  /** Row class name */
  row: 'background-boxes-row',
  /** Box class name */
  box: 'background-boxes-box',
  /** Icon class name */
  icon: 'background-boxes-icon'
};
