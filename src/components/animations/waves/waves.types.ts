/**
 * Types for the Waves animation component
 */
import type { CSSProperties } from 'react';

/**
 * Props for the Waves component
 */
export interface WavesProps {
  /** Color of the wave lines */
  lineColor?: string;
  /** Background color of the container */
  backgroundColor?: string;
  /** Speed of wave movement along X axis */
  waveSpeedX?: number;
  /** Speed of wave movement along Y axis */
  waveSpeedY?: number;
  /** Amplitude of waves on X axis */
  waveAmpX?: number;
  /** Amplitude of waves on Y axis */
  waveAmpY?: number;
  /** Gap between wave lines on X axis */
  xGap?: number;
  /** Gap between wave points on Y axis */
  yGap?: number;
  /** Friction applied to cursor influence (lower = more slippery) */
  friction?: number;
  /** Tension applied to cursor influence (higher = more responsive) */
  tension?: number;
  /** Maximum cursor influence distance */
  maxCursorMove?: number;
  /** Additional inline styles for the container */
  style?: CSSProperties;
  /** Additional class name for the component */
  className?: string;
}

/**
 * Animation configuration internal state
 */
export interface WavesConfig {
  /** Color of the wave lines */
  lineColor: string;
  /** Speed of wave movement along X axis */
  waveSpeedX: number;
  /** Speed of wave movement along Y axis */
  waveSpeedY: number;
  /** Amplitude of waves on X axis */
  waveAmpX: number;
  /** Amplitude of waves on Y axis */
  waveAmpY: number;
  /** Friction applied to cursor influence */
  friction: number;
  /** Tension applied to cursor influence */
  tension: number;
  /** Maximum cursor influence distance */
  maxCursorMove: number;
  /** Gap between wave lines on X axis */
  xGap: number;
  /** Gap between wave points on Y axis */
  yGap: number;
}

/**
 * Wave point in the grid
 */
export interface Point {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Wave movement offset */
  wave: { x: number; y: number };
  /** Cursor influence offset */
  cursor: { x: number; y: number; vx: number; vy: number };
}

/**
 * Mouse tracking data
 */
export interface Mouse {
  /** Current X position */
  x: number;
  /** Current Y position */
  y: number;
  /** Last X position */
  lx: number;
  /** Last Y position */
  ly: number;
  /** Smoothed X position */
  sx: number;
  /** Smoothed Y position */
  sy: number;
  /** Velocity */
  v: number;
  /** Smoothed velocity */
  vs: number;
  /** Angle of movement */
  a: number;
  /** Whether mouse position has been initialized */
  set: boolean;
}

/**
 * Container dimensions and position
 */
export interface BoundingRect {
  /** Width of the container */
  width: number;
  /** Height of the container */
  height: number;
  /** Left position of the container */
  left: number;
  /** Top position of the container */
  top: number;
}
