/**
 * GlitchCursor
 *
 * Type definitions for the GlitchCursor component
 *
 * @module GlitchCursor/Types
 */

/**
 * Offset properties for glitch effect layers
 */
export interface GlitchOffset {
  /** X-axis offset from the cursor position */
  x: number;
  /** Y-axis offset from the cursor position */
  y: number;
  /** Scale factor for the glitch element */
  scale: number;
  /** Rotation angle in degrees */
  rotation: number;
  /** Opacity value (0-1) */
  opacity: number;
  /** Hue value for the color (0-360) */
  hue: number;
}

/**
 * State for the GlitchCursor component
 */
export interface GlitchCursorState {
  /** Whether the glitch effect is active */
  glitchActive: boolean;
  /** Array of offset values for each glitch layer */
  glitchOffsets: GlitchOffset[];
  /** Intensity of the glitch effect (1-3) */
  intensity: number;
}
