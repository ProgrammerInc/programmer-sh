/**
 * Character Cursor Types
 *
 * Type definitions for the CharacterCursor component
 *
 * @module CharacterCursor/Types
 */

import { Particle } from './character-particle';

/**
 * Represents a single character particle in the cursor animation
 */
export interface CharacterParticle {
  /** Sign of rotation (1 or -1) */
  rotationSign: number;
  /** Current age of the particle in frames */
  age: number;
  /** Initial lifespan of the particle in frames */
  initialLifeSpan: number;
  /** Current remaining lifespan of the particle in frames */
  lifeSpan: number;
  /** Velocity vector of the particle */
  velocity: { x: number; y: number };
  /** Current position of the particle */
  position: { x: number; y: number };
  /** Canvas element containing the rendered character */
  canv: HTMLCanvasElement;
  /** Updates the particle state and renders it to the given context */
  update: (context: CanvasRenderingContext2D) => void;
}

/**
 * Props for the CharacterCursor component
 */
export interface CharacterCursorProps {
  /** Characters to use for the cursor particles */
  characters?: string[];
  /** Colors to use for the cursor particles */
  colors?: string[];
  /** Offset from the cursor position */
  cursorOffset?: { x: number; y: number };
  /** Font specification for rendering characters */
  font?: string;
  /** Function to determine the lifespan of a character particle */
  characterLifeSpanFunction?: () => number;
  /** Function to determine the initial velocity of a character particle */
  initialCharacterVelocityFunction?: () => { x: number; y: number };
  /** Functions to determine how velocity changes over time */
  characterVelocityChangeFunctions?: {
    /** Function to determine x velocity change based on age and lifespan */
    x_func: (age: number, lifeSpan: number) => number;
    /** Function to determine y velocity change based on age and lifespan */
    y_func: (age: number, lifeSpan: number) => number;
  };
  /** Function to determine the scaling of a character based on age and lifespan */
  characterScalingFunction?: (age: number, lifeSpan: number) => number;
  /** Function to determine rotation in degrees based on age and lifespan */
  characterNewRotationDegreesFunction?: (age: number, lifeSpan: number) => number;
  /** Optional element to constrain the cursor to */
  wrapperElement?: HTMLElement;
}

/**
 * State for the CharacterCursor component
 */
export interface CharacterCursorState {
  /** Whether the component has been initialized */
  initialized: boolean;
  /** Whether the component is currently mounted */
  mounted: boolean;
  /** Array of active particles */
  particles: Particle[];
  /** Array of pre-rendered character canvas elements */
  canvImages: HTMLCanvasElement[];
  /** Current cursor position */
  cursorPosition: { x: number; y: number };
  /** Reference to the current animation frame */
  animationFrame: number | null;
  /** Current canvas width */
  width: number;
  /** Current canvas height */
  height: number;
  /** Canvas rendering context */
  context: CanvasRenderingContext2D | null;
}
