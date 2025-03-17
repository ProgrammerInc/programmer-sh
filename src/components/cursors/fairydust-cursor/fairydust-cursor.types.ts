/**
 * @fileoverview Type definitions for the FairyDustCursor component
 * @module FairyDustCursor/Types
 */

/**
 * Props for the FairyDustCursor component
 */
export interface FairyDustCursorProps {
  /** Array of colors for particles */
  colors?: string[];
  /** Target element to attach the cursor to */
  element?: HTMLElement;
  /** Set of characters to use for particles */
  characterSet?: string[];
  /** Size of particles in pixels */
  particleSize?: number;
  /** Number of particles to create per movement */
  particleCount?: number;
  /** Gravitational constant for particle physics */
  gravity?: number;
  /** Fade speed of particles */
  fadeSpeed?: number;
  /** Initial velocity range for particles */
  initialVelocity?: {
    min: number;
    max: number;
  };
}

/**
 * Represents a single fairy dust particle in the animation
 */
export interface FairyDustParticle {
  /** X coordinate of the particle */
  x: number;
  /** Y coordinate of the particle */
  y: number;
  /** Character to display for the particle */
  character: string;
  /** Color of the particle */
  color: string;
  /** Velocity vector of the particle */
  velocity: {
    x: number;
    y: number;
  };
  /** Current life span of the particle */
  lifeSpan: number;
  /** Initial life span of the particle */
  initialLifeSpan: number;
  /** Scale factor of the particle */
  scale: number;
}

/**
 * Canvas size dimensions
 */
export interface CanvasSize {
  /** Width of the canvas */
  width: number;
  /** Height of the canvas */
  height: number;
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
 * State for the FairyDustCursor component
 */
export interface FairyDustCursorState {
  /** Array of active particles */
  particles: FairyDustParticle[];
  /** Current cursor position */
  cursor: MousePosition;
  /** Last cursor position */
  lastPos: MousePosition;
}
