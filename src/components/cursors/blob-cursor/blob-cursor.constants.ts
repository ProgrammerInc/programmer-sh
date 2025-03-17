/**
 * BlobCursor Component Constants
 *
 * Constants used by the BlobCursor component for styling, animation, and defaults.
 */

import styles from './blob-cursor.module.css';

/**
 * CSS Classes used in the BlobCursor component.
 */
export const CSS_CLASSES = {
  /**
   * Container class for the blob cursor overlay.
   */
  CONTAINER: styles['blob-container'],

  /**
   * Class for the blob canvas element.
   */
  CANVAS: styles['blob-canvas'],

  /**
   * Class for the individual blob elements.
   */
  BLOB_ELEMENT: styles['blob-element'],

  /**
   * Class for the blob highlight effect.
   */
  BLOB_HIGHLIGHT: styles['blob-highlight']
};

/**
 * Animation configurations for the blob cursor.
 */
export const ANIMATION_CONFIG = {
  /**
   * Fast animation settings for the primary blob.
   */
  FAST: { tension: 1200, friction: 40 },

  /**
   * Slow animation settings for trailing blobs.
   */
  SLOW: { mass: 10, tension: 200, friction: 50 }
};

/**
 * Default values for BlobCursor component properties.
 */
export const DEFAULT_VALUES = {
  /**
   * Default blob type.
   */
  BLOB_TYPE: 'circle',

  /**
   * Default fill color for the blobs.
   */
  FILL_COLOR: '#00f0ff',

  /**
   * Sizes for each animated blob.
   */
  BLOB_SIZES: [
    { width: 60, height: 60 },
    { width: 125, height: 125 },
    { width: 75, height: 75 }
  ],

  /**
   * Styles for the highlight elements within each blob.
   */
  HIGHLIGHT_STYLES: [
    { top: 20, left: 20, width: 20, height: 20 },
    { top: 35, left: 35, width: 35, height: 35 },
    { top: 25, left: 25, width: 25, height: 25 }
  ]
};

/**
 * SVG filter configurations.
 */
export const SVG_FILTER = {
  /**
   * Blob filter ID.
   */
  FILTER_ID: 'blob',

  /**
   * Standard deviation for Gaussian blur.
   */
  STD_DEVIATION: 30,

  /**
   * Color matrix values for the blob effect.
   */
  COLOR_MATRIX: '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10'
};
