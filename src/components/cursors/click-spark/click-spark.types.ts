/**
 * Click Spark Types
 *
 * Type definitions for the ClickSpark component
 *
 * @module ClickSpark/Types
 */

import React from 'react';

/**
 * Props for the ClickSpark component
 */
export interface ClickSparkProps {
  /** Color of the spark particles */
  sparkColor?: string;
  /** Size of each spark particle */
  sparkSize?: number;
  /** Radius of the spark explosion */
  sparkRadius?: number;
  /** Number of spark particles to create */
  sparkCount?: number;
  /** Duration of the spark animation in milliseconds */
  duration?: number;
  /** Easing function to use for the animation */
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  /** Extra scale factor for the spark radius */
  extraScale?: number;
  /** Child elements to render with the click spark effect */
  children?: React.ReactNode;
}

/**
 * Represents a single spark particle in the animation
 */
export interface Spark {
  /** X coordinate of the spark */
  x: number;
  /** Y coordinate of the spark */
  y: number;
  /** Angle of the spark's movement in radians */
  angle: number;
  /** Timestamp when the spark was created */
  startTime: number;
}

/**
 * State for the ClickSpark component
 */
export interface ClickSparkState {
  /** Array of active spark particles */
  sparks: Spark[];
  /** Initial timestamp for animation */
  startTime: number | null;
}
