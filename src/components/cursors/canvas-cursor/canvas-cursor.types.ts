/**
 * CanvasCursor Types Module
 *
 * Type definitions for the CanvasCursor component.
 *
 * @module CanvasCursorTypes
 */

/**
 * Wave options configuration
 */
export interface WaveOptions {
  /** Phase offset of the wave */
  phase: number;
  /** Maximum amplitude of the wave */
  amplitude: number;
  /** Frequency of the wave oscillation */
  frequency: number;
  /** Y-axis offset from the center */
  offset: number;
}

/**
 * Line options configuration
 */
export interface LineOptions {
  /** Spring constant that affects line elasticity */
  spring: number;
}

/**
 * Node type for line segments
 */
export interface NodeType {
  /** X-coordinate of the node */
  x: number;
  /** Y-coordinate of the node */
  y: number;
  /** X-axis velocity of the node */
  vx: number;
  /** Y-axis velocity of the node */
  vy: number;
}

/**
 * Extended canvas context with additional properties for animation
 */
export interface CanvasContextWithRunning extends CanvasRenderingContext2D {
  /** Flag indicating whether the animation is running */
  running: boolean;
  /** Current animation frame number */
  frame: number;
}

/**
 * Props for the CanvasCursor component
 */
export interface CanvasCursorProps {
  /** Optional element to contain the cursor (defaults to document body) */
  wrapperElement?: HTMLElement | null;
}

/**
 * Interface for line objects in the canvas cursor
 */
export interface LineInterface {
  /** Updates the line's position and properties */
  update: () => void;
  /** Draws the line on the canvas */
  draw: (ctx: CanvasRenderingContext2D) => void;
}

/**
 * State for the CanvasCursor component
 */
export interface CanvasCursorState {
  /** Flag indicating whether the component is mounted */
  mounted: boolean;
  /** Canvas rendering context with additional properties */
  ctx: CanvasContextWithRunning | null;
  /** Function to update the animation */
  f: { update: () => number } | null;
  /** Array of line objects that form the cursor */
  lines: Array<LineInterface>;
  /** Animation timer value */
  e: number;
  /** Current cursor position */
  pos: { x: number; y: number };
  /** Current animation frame ID */
  animationFrame: number | null;
}

/**
 * Configuration options for the CanvasCursor
 */
export interface CanvasCursorConfig {
  /** Enable debug mode for logging */
  debug: boolean;
  /** Friction coefficient for movement damping */
  friction: number;
  /** Number of trail segments to display */
  trails: number;
  /** Size of the cursor */
  size: number;
  /** Dampening factor for spring physics */
  dampening: number;
  /** Tension for spring physics */
  tension: number;
}
