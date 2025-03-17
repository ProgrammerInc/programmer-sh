/**
 * Type definitions for the Aurora component
 */

/**
 * Props interface for the Aurora component
 */
export interface AuroraProps {
  /** Background color for the canvas (default: 'transparent') */
  backgroundColor?: string;

  /** Array of color strings for the aurora gradient effect (default: ['#00d8ff', '#7cff67', '#00d8ff']) */
  colorStops?: string[];

  /** Amplitude of the aurora wave effect (default: 1.0) */
  amplitude?: number;

  /** Blending factor for the aurora effect edges (default: 0.5) */
  blend?: number;

  /** Current time value for the animation (internally managed if not provided) */
  time?: number;

  /** Speed multiplier for the animation (default: 1.0) */
  speed?: number;

  /** Whether to display a star background behind the aurora (default: false) */
  withStars?: boolean;
}
