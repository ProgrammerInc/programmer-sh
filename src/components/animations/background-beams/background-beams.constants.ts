/**
 * Constants for the BackgroundBeams component
 */

/**
 * Default colors for beam gradients
 */
export const DEFAULT_COLORS = {
  start: '#18CCFC',
  middle: '#6344F5',
  end: '#AE48FF'
};

/**
 * Default animation durations and timing
 */
export const DEFAULT_ANIMATION = {
  /** Base duration for beam animations in seconds */
  baseDuration: 10,
  /** Random duration addition for varied animations */
  randomDuration: 10,
  /** Animation ease type */
  ease: 'easeInOut',
  /** Whether animations should repeat */
  repeat: Infinity,
  /** Maximum random delay for staggered animations */
  maxDelay: 10
};

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  container: 'background-beams-container',
  svg: 'background-beams-svg',
  path: 'background-beams-path'
};

/**
 * Default opacity values
 */
export const DEFAULT_OPACITY = {
  /** Base stroke opacity for beam paths */
  stroke: 0.4,
  /** Base radial gradient opacity */
  radialStart: 0,
  /** Color stop opacity */
  colorStop: 1,
  /** End color stop opacity */
  colorStopEnd: 0
};

/**
 * Default gradient attributes for animated SVG paths
 */
export const DEFAULT_GRADIENT = {
  initial: {
    x1: '0%',
    x2: '0%',
    y1: '0%',
    y2: '0%'
  },
  animate: {
    x1: ['0%', '100%'],
    x2: ['0%', '95%'],
    y1: ['0%', '100%'],
    y2: ['0%', '93%']
  }
};
