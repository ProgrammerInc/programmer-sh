/**
 * TextFlagCursor Types
 *
 * Type definitions for the TextFlagCursor component
 *
 * @module TextFlagCursor/Types
 */

import { HTMLAttributes } from 'react';

/**
 * Character object in the text flag
 */
export interface TextFlagCharacter {
  /**
   * The character to display
   */
  letter: string;

  /**
   * X position of the character
   */
  x: number;

  /**
   * Y position of the character
   */
  y: number;
}

/**
 * Configuration options for the TextFlagCursor
 */
export interface TextFlagConfig {
  /**
   * Text to display in the flag
   * @default 'Programmer.SH'
   */
  text?: string;

  /**
   * Color of the text
   * @default '#64ffda'
   */
  color?: string;

  /**
   * Font family for the text
   * @default 'monospace'
   */
  font?: string;

  /**
   * Text size in pixels
   * @default 12
   */
  textSize?: number;

  /**
   * Gap between characters
   * @default textSize + 2
   */
  gap?: number;

  /**
   * Container element for the cursor
   * @default document.body
   */
  element?: HTMLElement;
}

/**
 * Cursor position
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
 * State for the TextFlagCursor
 */
export interface TextFlagCursorState {
  /**
   * Whether the component is mounted
   */
  mounted: boolean;

  /**
   * Current cursor position
   */
  cursor: Position;

  /**
   * Array of characters in the text flag
   */
  characters: TextFlagCharacter[];

  /**
   * Current angle for the oscillation effect
   */
  angle: number;

  /**
   * Canvas element
   */
  canvas: HTMLCanvasElement | null;

  /**
   * Canvas rendering context
   */
  context: CanvasRenderingContext2D | null;

  /**
   * Animation frame ID for cancelation
   */
  animationFrame: number | null;
}

/**
 * Props for the TextFlagCursor component
 */
export interface TextFlagCursorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Configuration options for the text flag cursor
   */
  config?: TextFlagConfig;
}
