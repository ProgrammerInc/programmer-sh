/**
 * ArrowCursor Component Constants
 *
 * Constants used by the ArrowCursor component for styling, animation, and defaults.
 */

import styles from './arrow-cursor.module.css';

/**
 * CSS Classes used in the ArrowCursor component.
 */
export const CSS_CLASSES = {
  /**
   * Container class for the cursor overlay.
   */
  CONTAINER: styles['arrow-container'],

  /**
   * Base class for the arrow indicator.
   */
  ARROW_INDICATOR: styles['arrow-indicator'],

  /**
   * Base class for the arrow icon.
   */
  ARROW_ICON: styles['arrow-icon']
};

/**
 * Default values for ArrowCursor component properties.
 */
export const DEFAULT_VALUES = {
  /**
   * Default background color for the arrow indicator.
   */
  BG_COLOR: '#111827',

  /**
   * Default foreground color for the arrow indicator.
   */
  FG_COLOR: '#64ffda',

  /**
   * Default offset position for the indicator from the cursor.
   */
  POSITION_OFFSET: {
    X: 15,
    Y: -25
  }
};
