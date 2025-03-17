import { SVGProps } from 'react';

/**
 * Props for the original Spotlight component
 */
export interface SpotlightProps extends SVGProps<SVGSVGElement> {
  /** Optional CSS class name */
  className?: string;

  /** Color fill for the spotlight effect */
  fill?: string;

  /** Whether to include the StarsBackground component */
  withStars?: boolean;
}

/**
 * Props for the enhanced Spotlight component with more customization options
 */
export interface SpotlightNewProps {
  /** First gradient value for the main spotlight effect */
  gradientFirst?: string;

  /** Second gradient value for the secondary spotlight effect */
  gradientSecond?: string;

  /** Third gradient value for the tertiary spotlight effect */
  gradientThird?: string;

  /** Vertical offset in pixels (default: -350) */
  translateY?: number;

  /** Width of the main spotlight in pixels (default: 560) */
  width?: number;

  /** Height of the spotlight effect in pixels (default: 1380) */
  height?: number;

  /** Width of the secondary spotlights in pixels (default: 240) */
  smallWidth?: number;

  /** Animation duration in seconds (default: 7) */
  duration?: number;

  /** Horizontal movement offset in pixels (default: 100) */
  xOffset?: number;

  /** Whether to include the StarsBackground component (default: false) */
  withStars?: boolean;
}
