'use client';

/**
 * BounceCards component props
 */
export interface BounceCardsProps {
  /** Optional CSS class name for the container */
  className?: string;
  /** Array of image URLs to display as cards */
  images?: string[];
  /** Width of the container in pixels */
  containerWidth?: number;
  /** Height of the container in pixels */
  containerHeight?: number;
  /** Delay before animation starts in seconds */
  animationDelay?: number;
  /** Time between each card animation in seconds */
  animationStagger?: number;
  /** GSAP easing type for the animation */
  easeType?: string;
  /** Transform styles for each card */
  transformStyles?: string[];
  /** Whether to enable hover interactions */
  enableHover?: boolean;
}
