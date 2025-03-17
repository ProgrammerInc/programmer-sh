/**
 * Type definitions for the Starry Background animation component
 */

import { ReactNode } from 'react';

/**
 * Properties for a single star in the starry background
 */
export interface StarProperties {
  /** Whether the star has a glow effect */
  isGlowing: boolean;
  /** Base opacity of the star */
  baseOpacity: number;
  /** Size of the star in pixels */
  size: number;
  /** Intensity of the glow effect */
  glowIntensity: number;
  /** Delay before the animation starts */
  animationDelay: string;
  /** Duration of the animation */
  animationDuration: string;
  /** Layer for parallax effect (0-2) */
  parallaxLayer: number;
}

/**
 * Mouse position coordinates for parallax effect
 */
export interface MousePosition {
  /** X-coordinate relative to container (-0.5 to 0.5) */
  x: number;
  /** Y-coordinate relative to container (-0.5 to 0.5) */
  y: number;
}

/**
 * Props for the StarryBackground component
 */
export interface StarryBackgroundProps {
  /** Background color of the container */
  backgroundColor?: string;
  /** Additional CSS class names */
  className?: string;
  /** Content to render within the background */
  children?: ReactNode;
  /** Opacity of the noise overlay (0-1) */
  noiseOpacity?: number;
  /** Whether to enable parallax mouse movement effect */
  enableParallax?: boolean;
}
