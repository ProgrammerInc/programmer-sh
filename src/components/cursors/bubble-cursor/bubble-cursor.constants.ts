/**
 * BubbleCursor Component Constants
 *
 * Constants used by the BubbleCursor component for styling, animation, and defaults.
 */

import styles from './bubble-cursor.module.css';

/**
 * CSS Classes used in the BubbleCursor component.
 */
export const CSS_CLASSES = {
  /**
   * Container class for the bubble cursor.
   */
  CONTAINER: styles['bubble-container'],

  /**
   * Class for the fixed-position canvas.
   */
  CANVAS: styles['bubble-canvas'],

  /**
   * Class for the absolute-position canvas (when used within a wrapper).
   */
  CANVAS_ABSOLUTE: styles['bubble-canvas-absolute']
};

/**
 * Default values for BubbleCursor component properties.
 */
export const DEFAULT_VALUES = {
  /**
   * Default fill style for bubbles.
   */
  FILL_STYLE: '#e6f1f7',

  /**
   * Default stroke style for bubbles.
   */
  STROKE_STYLE: '#3a92c5',

  /**
   * Z-index for bubble canvas.
   */
  Z_INDEX: 99999,

  /**
   * Animation frame rate control.
   */
  ANIMATION: {
    /**
     * Whether to check for reduced motion preference.
     */
    CHECK_REDUCED_MOTION: true
  }
};
