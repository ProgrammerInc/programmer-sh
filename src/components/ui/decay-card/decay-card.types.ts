/**
 * Decay Card component types
 */

import { ReactNode } from 'react';

/**
 * Props for the Decay Card component
 *
 * @interface DecayCardProps
 * @example
 * ```tsx
 * <DecayCard
 *   width={400}
 *   height={600}
 *   image="/images/photo.jpg"
 * >
 *   Title
 *   <span>Subtitle</span>
 * </DecayCard>
 * ```
 */
export interface DecayCardProps {
  /** Width of the card in pixels (default: 300) */
  width?: number;

  /** Height of the card in pixels (default: 400) */
  height?: number;

  /** URL for the card's image (default: placeholder image) */
  image?: string;

  /** Content to render inside the card, typically text */
  children?: ReactNode;
}

/**
 * Mouse position object for tracking cursor
 *
 * @interface MousePosition
 */
export interface MousePosition {
  /** X coordinate */
  x: number;

  /** Y coordinate */
  y: number;
}

/**
 * Window size object for responsive calculations
 *
 * @interface WindowSize
 */
export interface WindowSize {
  /** Window width */
  width: number;

  /** Window height */
  height: number;
}

/**
 * Image transform values for animation
 *
 * @interface ImageValues
 */
export interface ImageValues {
  /** Image transformation values */
  imgTransforms: {
    /** X position offset */
    x: number;

    /** Y position offset */
    y: number;

    /** Rotation around Z axis in degrees */
    rz: number;
  };

  /** Displacement scale for distortion effect */
  displacementScale: number;
}
