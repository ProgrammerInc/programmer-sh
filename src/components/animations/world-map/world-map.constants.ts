/**
 * Constants for the WorldMap animation component
 */
import styles from './world-map.module.css';

/**
 * Default values for the WorldMap component
 */
export const DEFAULT_VALUES = {
  /** Default line color */
  LINE_COLOR: '#0ea5e9',
  /** Default theme */
  THEME: 'dark' as const,
  /** Default draggable state */
  DRAGGABLE: false,
  /** Default map height */
  MAP_HEIGHT: 100,
  /** Default map grid type */
  MAP_GRID: 'diagonal' as const,
  /** Default dot radius */
  DOT_RADIUS: 0.22,
  /** Default shape for map dots */
  DOT_SHAPE: 'circle' as const,
  /** Default background color */
  BACKGROUND_COLOR: 'transparent',
  /** Default dot colors */
  DOT_COLORS: {
    DARK: '#f1f1f1',
    LIGHT: '#2e3440'
  },
  /** Animation settings */
  ANIMATION: {
    /** Default duration for path animation in seconds */
    PATH_DURATION: 1,
    /** Default delay multiplier between paths */
    PATH_DELAY_MULTIPLIER: 0.5,
    /** Default easing function for path animation */
    PATH_EASE: 'easeOut' as const,
    /** Default duration for pulse animation in seconds */
    PULSE_DURATION: 1.5,
    /** Default initial radius for pulse animation */
    PULSE_RADIUS_FROM: 2,
    /** Default target radius for pulse animation */
    PULSE_RADIUS_TO: 8,
    /** Default initial opacity for pulse animation */
    PULSE_OPACITY_FROM: 0.5,
    /** Default target opacity for pulse animation */
    PULSE_OPACITY_TO: 0
  }
};

/**
 * SVG viewbox dimensions
 */
export const SVG_DIMENSIONS = {
  /** SVG viewbox width */
  WIDTH: 800,
  /** SVG viewbox height */
  HEIGHT: 400
};

/**
 * Map projection constants for converting lat/lng to x,y coordinates
 */
export const MAP_PROJECTION = {
  /** X-scale factor for longitude to x conversion */
  X_SCALE: SVG_DIMENSIONS.WIDTH / 360,
  /** Y-scale factor for latitude to y conversion */
  Y_SCALE: SVG_DIMENSIONS.HEIGHT / 180,
  /** Longitude offset for projection */
  LNG_OFFSET: 180,
  /** Latitude offset for projection */
  LAT_OFFSET: 90,
  /** Curve height offset for paths */
  CURVE_HEIGHT_OFFSET: 50
};

/**
 * Gradient stop positions for path gradient
 */
export const GRADIENT_STOPS = {
  /** Start position with opacity 0 */
  START: '0%',
  /** Fade-in position */
  FADE_IN: '5%',
  /** Fade-out position */
  FADE_OUT: '95%',
  /** End position with opacity 0 */
  END: '100%'
};

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  /** Container className */
  CONTAINER: styles['world-map-container'],
  /** Map image className */
  MAP_IMAGE: styles['world-map-image'],
  /** SVG overlay className */
  SVG_OVERLAY: styles['world-map-svg']
};
