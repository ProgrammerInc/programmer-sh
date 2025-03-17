/**
 * Types for the BeamPortal component
 */

export type PortalVariant =
  | 'default'
  | 'matrix'
  | 'sunset'
  | 'aurora'
  | 'cosmic'
  | 'cyber'
  | 'frost'
  | 'fire'
  | 'void'
  | 'neon'
  | 'ocean'
  | 'forest'
  | 'desert'
  | 'twilight'
  | 'volcano'
  | 'arctic'
  | 'nebula'
  | 'rainbow'
  | 'midnight';

export type PortalPattern = 'default' | 'linear' | 'radial' | 'wave' | 'pulse' | 'zigzag' | string;

export type PortalIntensity = 'calm' | 'active' | 'intense' | number;

/**
 * Properties for the BeamPortal component
 */
export interface BeamPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** CSS class name for the component */
  className?: string;
  /** Color scheme of the portal. Default is aurora */
  colorScheme?: PortalVariant;
  /** Animation pattern for beams. Default is radial */
  pattern?: PortalPattern;
  /** Animation intensity level. Default is active */
  intensity?: PortalIntensity;
  /** Whether to reverse the animation direction */
  reverse?: boolean;
  /** Whether to add a shimmer effect */
  shimmer?: boolean;
  /** Whether to add a pulse effect */
  pulse?: boolean;
  /** Whether to use random distribution for beams */
  randomize?: boolean;
  /** Blur amount for glow effects (px) */
  blurAmount?: number;
  /** Children to render in portal */
  children?: React.ReactNode;
}

/**
 * Properties for the BeamRing component
 */
export interface BeamRingProps {
  /** Colors for the beam ring */
  colors: {
    base: string;
    glow: string;
  };
  /** Number of beams in the ring */
  count: number;
  /** Radius of the ring */
  radius: string;
  /** Animation settings */
  settings: {
    speed: number;
    opacity: number;
    delay: number;
  };
  /** Animation pattern */
  pattern: PortalPattern;
  /** Whether to reverse animation direction */
  reverse?: boolean;
  /** Whether to add a shimmer effect */
  shimmer?: boolean;
  /** Whether to add a pulse effect */
  pulse?: boolean;
  /** Whether to use random distribution for beams */
  randomize?: boolean;
  /** Blur amount for glow effects */
  blurAmount?: number;
  /** Speed of ring rotation */
  rotateSpeed?: number;
}
