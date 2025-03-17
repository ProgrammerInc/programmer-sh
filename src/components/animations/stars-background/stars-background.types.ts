/**
 * Type definitions for the Stars Background animation component
 */

/**
 * Properties for a single star in the stars background
 */
export interface StarProps {
  /** X-coordinate of the star */
  x: number;
  /** Y-coordinate of the star */
  y: number;
  /** Radius of the star in pixels */
  radius: number;
  /** Opacity of the star (0-1) */
  opacity: number;
  /** Speed of twinkling animation, or null if star doesn't twinkle */
  twinkleSpeed: number | null;
}

/**
 * Props for the StarsBackground component
 */
export interface StarsBackgroundProps {
  /** Density of stars per pixel area (higher = more stars) */
  starDensity?: number;
  /** If true, all stars will twinkle */
  allStarsTwinkle?: boolean;
  /** If allStarsTwinkle is false, determines chance of a star twinkling */
  twinkleProbability?: number;
  /** Minimum speed for the twinkling animation */
  minTwinkleSpeed?: number;
  /** Maximum speed for the twinkling animation */
  maxTwinkleSpeed?: number;
  /** Additional CSS classes to apply to the canvas */
  className?: string;
}

/**
 * Canvas dimensions information
 */
export interface CanvasDimensions {
  /** Width of the canvas in pixels */
  width: number;
  /** Height of the canvas in pixels */
  height: number;
}

/**
 * Type for the render function used in the animation loop
 */
export type RenderFunction = () => void;
