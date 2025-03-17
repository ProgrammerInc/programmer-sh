/**
 * Types for the Rain Drops animation component
 */
import { CSSProperties, ReactNode, RefObject } from 'react';

/**
 * Props for the Rain Drops component
 *
 * @interface RainDropsProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 */
export interface RainDropsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display within the rain effect
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Whether to show stars background
   * @default true
   */
  withStars?: boolean;
}

/**
 * Options for customizing rain beam animations
 *
 * @interface BeamOptions
 */
export interface BeamOptions {
  /**
   * Initial X position of the beam
   */
  initialX?: number;

  /**
   * X position to translate to
   */
  translateX?: number;

  /**
   * Initial Y position of the beam
   */
  initialY?: number;

  /**
   * Y position to translate to
   */
  translateY?: number;

  /**
   * Rotation angle in degrees
   */
  rotate?: number;

  /**
   * Additional CSS class names for the beam
   */
  className?: string;

  /**
   * Duration of animation in seconds
   */
  duration?: number;

  /**
   * Delay before animation starts in seconds
   */
  delay?: number;

  /**
   * Delay between animation repeats in seconds
   */
  repeatDelay?: number;
}

/**
 * Props for the CollisionMechanism component
 *
 * @interface CollisionMechanismProps
 */
export interface CollisionMechanismProps {
  /**
   * Reference to the container element (bottom surface)
   */
  containerRef: RefObject<HTMLDivElement>;

  /**
   * Reference to the parent element (containing all beams)
   */
  parentRef: RefObject<HTMLDivElement>;

  /**
   * Options for customizing the beam
   */
  beamOptions?: BeamOptions;
}

/**
 * Props for the Explosion component
 *
 * @interface ExplosionProps
 */
export interface ExplosionProps {
  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Inline styles for positioning
   */
  style?: CSSProperties;

  /**
   * Additional props to pass to the component
   */
  [key: string]: unknown;
}

/**
 * Represents an explosion particle
 *
 * @interface ExplosionParticle
 */
export interface ExplosionParticle {
  /**
   * Unique identifier for the particle
   */
  id: number;

  /**
   * Initial X position
   */
  initialX: number;

  /**
   * Initial Y position
   */
  initialY: number;

  /**
   * X direction/velocity
   */
  directionX: number;

  /**
   * Y direction/velocity
   */
  directionY: number;
}

/**
 * Represents collision state
 *
 * @interface CollisionState
 */
export interface CollisionState {
  /**
   * Whether a collision was detected
   */
  detected: boolean;

  /**
   * Coordinates of the collision point
   */
  coordinates: { x: number; y: number } | null;
}
