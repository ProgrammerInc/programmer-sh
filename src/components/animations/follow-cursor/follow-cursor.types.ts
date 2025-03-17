/**
 * Type definitions for the FollowCursor component
 */

import { ReactNode } from 'react';

/**
 * Properties for the FollowCursor component
 */
export interface FollowCursorProps {
  /** Content to be rendered inside the component */
  children: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Spring animation configuration */
  animationConfig?: AnimationConfig;
  /** Scale factor when hovering over the component */
  hoverScale?: number;
  /** Horizontal offset from cursor position */
  offsetX?: number;
  /** Width of the card (value with unit) */
  cardWidth?: string;
  /** Factor that controls the intensity of rotation */
  rotationFactor?: number;
  /** CSS perspective value for 3D effect */
  perspective?: string;
  /** Factor that controls the zoom sensitivity */
  zoomSensitivity?: number;
  /** Spring configuration for wheel events */
  wheelConfig?: AnimationConfig;
  /** Whether to enable tilt effect */
  enableTilt?: boolean;
  /** Whether to enable zoom effect */
  enableZoom?: boolean;
  /** Whether to enable drag functionality */
  enableDrag?: boolean;
}

/**
 * Spring animation configuration
 */
export interface AnimationConfig {
  /** Mass of the spring (higher means slower, more resistance) */
  mass?: number;
  /** Spring tension (higher means faster) */
  tension?: number;
  /** Friction (higher means more dampening) */
  friction?: number;
  /** Additional animation properties */
  [key: string]: number | undefined;
}

/**
 * State to track touch interactions
 */
export interface TouchState {
  /** Starting X position of touch */
  startX?: number;
  /** Starting Y position of touch */
  startY?: number;
  /** X offset at the start of touch */
  offsetX?: number;
  /** Y offset at the start of touch */
  offsetY?: number;
}
