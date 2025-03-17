/**
 * Type definitions for the Scroll Reveal animation component
 */
import { ReactNode, RefObject } from 'react';

/**
 * Props for the ScrollReveal component
 */
export interface ScrollRevealProps {
  /** Content to be displayed with the reveal animation */
  children: ReactNode;

  /** Reference to the scrollable container (defaults to window) */
  scrollContainerRef?: RefObject<HTMLElement>;

  /** Whether to enable blur effect during animation */
  enableBlur?: boolean;

  /** Base opacity for words before animation (0-1) */
  baseOpacity?: number;

  /** Base rotation in degrees before animation */
  baseRotation?: number;

  /** Blur strength in pixels when blur is enabled */
  blurStrength?: number;

  /** Additional class name for the container element */
  containerClassName?: string;

  /** Additional class name for the text element */
  textClassName?: string;

  /** ScrollTrigger end position for rotation animation */
  rotationEnd?: string;

  /** ScrollTrigger end position for word animation */
  wordAnimationEnd?: string;
}

/**
 * Animation configuration for GSAP
 */
export interface RevealAnimation {
  /** Initial animation state */
  from: Record<string, unknown>;

  /** Final animation state */
  to: Record<string, unknown>;

  /** ScrollTrigger configuration */
  scrollTrigger: {
    start: string;
    end: string;
    scrub: boolean;
  };
}
