/**
 * SpotlightCursor Types
 *
 * Type definitions for the SpotlightCursor component
 *
 * @module SpotlightCursor/Types
 */

import { HTMLAttributes } from 'react';

/**
 * Interface for the spotlight position
 */
export interface Position {
  /**
   * X coordinate
   */
  x: number;

  /**
   * Y coordinate
   */
  y: number;
}

/**
 * Interface for the configuration options of the spotlight effect
 */
export interface SpotlightConfig {
  /**
   * Radius of the spotlight in pixels
   * @default 200
   */
  radius?: number;

  /**
   * Brightness of the spotlight (0-1)
   * @default 0.15
   */
  brightness?: number;

  /**
   * Color of the spotlight
   * @default '#ffffff'
   */
  color?: string;

  /**
   * Smoothing factor for cursor movement (0-1)
   * @default 0.1
   */
  smoothing?: number;

  /**
   * Speed of the pulse animation in milliseconds
   * @default 2000
   */
  pulseSpeed?: number;
}

/**
 * State object used in the SpotlightCursor component
 */
export interface SpotlightCursorState {
  /**
   * Whether the component is mounted
   */
  mounted: boolean;

  /**
   * Current spotlight position
   */
  position: Position;

  /**
   * Target position to move towards
   */
  targetPosition: Position;

  /**
   * Animation frame ID for cancelation
   */
  animationFrame: number | null;

  /**
   * Canvas rendering context
   */
  context: CanvasRenderingContext2D | null;

  /**
   * Whether the cursor is currently hovered
   */
  isHovered: boolean;
}

/**
 * Props for the SpotlightCursor component
 */
export interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  /**
   * Configuration options for the spotlight effect
   */
  config?: SpotlightConfig;
}
