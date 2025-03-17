/**
 * Star object interface for the hyperspace animation
 */
export interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  size: number;
  color: string;
}

/**
 * Props for the HyperspaceHero component
 */
export interface HyperspaceHeroProps {
  /**
   * Text to display in the center of the animation
   */
  text?: string;

  /**
   * Color of the text, can be a solid color or gradient
   */
  textColor?: string;

  /**
   * Number of stars to render in the animation
   */
  starCount?: number;

  /**
   * Animation speed factor
   */
  speed?: number;

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
}
