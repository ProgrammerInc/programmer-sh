/**
 * Constants for the WavyBackground animation component
 */
import styles from './wavy-background.module.css';

/**
 * Default values for the WavyBackground component
 */
export const DEFAULT_VALUES = {
  /** Default blur amount */
  BLUR: 10,
  /** Default animation speed */
  SPEED: 'fast' as const,
  /** Default wave opacity */
  WAVE_OPACITY: 0.5,
  /** Default wave width */
  WAVE_WIDTH: 50,
  /** Default background fill */
  BACKGROUND_FILL: 'black',
  /** Default number of waves to draw */
  WAVE_COUNT: 5,
  /** Step size for x-coordinate when drawing waves */
  X_STEP: 5
};

/**
 * Animation speed values in noise units per frame
 */
export const ANIMATION_SPEEDS = {
  /** Slow animation speed */
  SLOW: 0.001,
  /** Fast animation speed */
  FAST: 0.002
};

/**
 * Default wave colors
 */
export const DEFAULT_COLORS = [
  '#38bdf8', // Sky blue
  '#818cf8', // Indigo
  '#c084fc', // Purple
  '#e879f9', // Fuchsia
  '#22d3ee' // Cyan
];

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  /** Container className */
  CONTAINER: styles['wavy-container'],
  /** Canvas className */
  CANVAS: styles['wavy-canvas'],
  /** Content className */
  CONTENT: styles['wavy-content']
};
