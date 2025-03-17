/**
 * Type definitions for the Starfall animation component
 */

/**
 * Properties for a single star in the starfall animation
 */
export interface Star {
  /** Unique identifier for the star */
  id: number;
  /** Vertical position offset as a percentage of viewport height */
  topOffset: number;
  /** Duration of the falling animation in seconds */
  fallDuration: number;
  /** Delay before the star starts falling in seconds */
  fallDelay: number;
}

/**
 * Props for the Starfall component
 */
export interface StarfallProps {
  /** Number of stars to render */
  starCount?: number;
  /** Color of the stars */
  primaryColor?: string;
  /** Additional CSS class name */
  className?: string;
}
