/**
 * Type definitions for the Noise animation component
 */

/**
 * Props for the Noise component
 *
 * @interface NoiseProps
 */
export interface NoiseProps {
  /**
   * Size of the noise pattern in pixels
   * @default 250
   */
  patternSize?: number;

  /**
   * Horizontal scale factor for the pattern
   * @default 1
   */
  patternScaleX?: number;

  /**
   * Vertical scale factor for the pattern
   * @default 1
   */
  patternScaleY?: number;

  /**
   * Number of frames before refreshing the noise pattern
   * @default 2
   */
  patternRefreshInterval?: number;

  /**
   * Alpha transparency value for the noise pattern (0-255)
   * @default 15
   */
  patternAlpha?: number;

  /**
   * Additional CSS class names to apply to the canvas
   */
  className?: string;
}
