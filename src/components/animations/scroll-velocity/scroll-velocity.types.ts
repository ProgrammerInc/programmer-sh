/**
 * Type definitions for the Scroll Velocity animation component
 */
import { CSSProperties, ReactNode, RefObject } from 'react';

/**
 * VelocityMapping defines how scroll velocity is mapped to animation speed
 */
export interface VelocityMapping {
  /** Input range for velocity mapping [min, max] */
  input: [number, number];

  /** Output range for velocity factor [min, max] */
  output: [number, number];
}

/**
 * Props for the VelocityText inner component
 */
export interface VelocityTextProps {
  /** Text content to be displayed and animated */
  children: ReactNode;

  /** Base velocity of the text animation (positive = right, negative = left) */
  baseVelocity: number;

  /** Reference to the scrollable container (defaults to window) */
  scrollContainerRef?: RefObject<HTMLElement>;

  /** Additional className for text elements */
  className?: string;

  /** Damping factor for the spring animation (higher = less oscillation) */
  damping?: number;

  /** Stiffness factor for the spring animation (higher = faster) */
  stiffness?: number;

  /** Number of copies of text to create a seamless loop */
  numCopies?: number;

  /** Mapping of scroll velocity to animation speed */
  velocityMapping?: VelocityMapping;

  /** Additional className for parallax container */
  parallaxClassName?: string;

  /** Additional className for scroller element */
  scrollerClassName?: string;

  /** Additional inline styles for parallax container */
  parallaxStyle?: CSSProperties;

  /** Additional inline styles for scroller element */
  scrollerStyle?: CSSProperties;
}

/**
 * Props for the ScrollVelocity component
 */
export interface ScrollVelocityProps {
  /** Reference to the scrollable container (defaults to window) */
  scrollContainerRef?: RefObject<HTMLElement>;

  /** Array of text strings to be displayed in alternating directions */
  texts: string[];

  /** Base velocity for the animation (positive = right) */
  velocity?: number;

  /** Additional className for text elements */
  className?: string;

  /** Damping factor for the spring animation (higher = less oscillation) */
  damping?: number;

  /** Stiffness factor for the spring animation (higher = faster) */
  stiffness?: number;

  /** Number of copies of text to create a seamless loop */
  numCopies?: number;

  /** Mapping of scroll velocity to animation speed */
  velocityMapping?: VelocityMapping;

  /** Additional className for parallax container */
  parallaxClassName?: string;

  /** Additional className for scroller element */
  scrollerClassName?: string;

  /** Additional inline styles for parallax container */
  parallaxStyle?: CSSProperties;

  /** Additional inline styles for scroller element */
  scrollerStyle?: CSSProperties;
}
