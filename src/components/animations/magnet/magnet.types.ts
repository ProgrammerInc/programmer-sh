/**
 * Type definitions for the Magnet animation component
 */

import { HTMLAttributes, ReactNode } from 'react';

/**
 * Props for the Magnet component
 *
 * @interface MagnetProps
 */
export interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  /** React children to be rendered inside the magnet element */
  children: ReactNode;

  /** Padding around the element in pixels that activates the magnet effect */
  padding?: number;

  /** Whether the magnet effect is disabled */
  disabled?: boolean;

  /** Strength of the magnetic effect (lower values = stronger pull) */
  magnetStrength?: number;

  /** CSS transition value when magnetic effect is active */
  activeTransition?: string;

  /** CSS transition value when magnetic effect is inactive */
  inactiveTransition?: string;

  /** Additional class name for the wrapper element */
  wrapperClassName?: string;

  /** Additional class name for the inner element that moves */
  innerClassName?: string;
}

/**
 * Position coordinates for the magnetic effect
 */
export interface MagnetPosition {
  /** X-axis offset in pixels */
  x: number;

  /** Y-axis offset in pixels */
  y: number;
}
