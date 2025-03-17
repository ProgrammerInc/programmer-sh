/**
 * @fileoverview Type definitions for the Crosshair component
 * @module Crosshair/Types
 */

import { RefObject } from 'react';

/**
 * Props for the Crosshair component
 */
export interface CrosshairProps {
  /** Color of the crosshair lines */
  color?: string;
  /** Reference to the container element */
  containerRef?: RefObject<HTMLElement>;
}

/**
 * Mouse position coordinates
 */
export interface MousePosition {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Rendered style object for animation
 */
export interface RenderedStyle {
  /** Previous value */
  previous: number;
  /** Current value */
  current: number;
  /** Amount to interpolate */
  amt: number;
}

/**
 * Collection of rendered styles
 */
export interface RenderedStyles {
  /** X translation */
  tx: RenderedStyle;
  /** Y translation */
  ty: RenderedStyle;
  /** Any additional styles */
  [key: string]: RenderedStyle;
}

/**
 * Animation primitive values
 */
export interface PrimitiveValues {
  /** Turbulence value for filter */
  turbulence: number;
}
