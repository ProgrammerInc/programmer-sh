/**
 * Type definitions for the Scroll Float animation component
 */
import { ReactNode, RefObject } from 'react';

/**
 * Props for the ScrollFloat component
 */
export interface ScrollFloatProps {
  /** Content to be displayed with the float animation */
  children: ReactNode;

  /** Reference to the scrollable container (defaults to window) */
  scrollContainerRef?: RefObject<HTMLElement>;

  /** Additional class name for the container element */
  containerClassName?: string;

  /** Additional class name for the text wrapper */
  textClassName?: string;

  /** Duration of the animation in seconds */
  animationDuration?: number;

  /** GSAP easing function */
  ease?: string;

  /** ScrollTrigger start position */
  scrollStart?: string;

  /** ScrollTrigger end position */
  scrollEnd?: string;

  /** Delay between each character's animation */
  stagger?: number;
}

/**
 * Animation configuration for GSAP
 */
export interface ScrollFloatAnimation {
  /** Initial animation state */
  from: Record<string, unknown>;

  /** Final animation state */
  to: Record<string, unknown>;
}
