/**
 * Type definitions for the Liquid Chrome animation component
 */

import { Renderer } from 'ogl';
import { HTMLAttributes } from 'react';

/**
 * Props for the LiquidChrome component
 */
export interface LiquidChromeProps extends HTMLAttributes<HTMLDivElement> {
  /** Base color as an RGB array. Default is [0.1, 0.1, 0.1]. */
  baseColor?: [number, number, number];
  /** Animation speed multiplier. Default is 0.2. */
  speed?: number;
  /** Amplitude of the distortion. Default is 0.5. */
  amplitude?: number;
  /** Frequency modifier for the x distortion. Default is 3. */
  frequencyX?: number;
  /** Frequency modifier for the y distortion. Default is 2. */
  frequencyY?: number;
  /** Enable mouse/touch interaction. Default is true. */
  interactive?: boolean;
}

/**
 * Extended WebGL context type that OGL uses internally
 * This helps with TypeScript errors when using OGL functions
 */
export type OGLRenderingContext = WebGLRenderingContext & {
  renderer?: Renderer;
  canvas: HTMLCanvasElement;
};

/**
 * Uniform values for the WebGL shader program
 */
export interface LiquidChromeUniforms {
  uTime: { value: number };
  uResolution: { value: Float32Array };
  uBaseColor: { value: Float32Array };
  uAmplitude: { value: number };
  uFrequencyX: { value: number };
  uFrequencyY: { value: number };
  uMouse: { value: Float32Array };
}

/**
 * Event handler type for mouse movement
 */
export type MouseMoveHandler = (event: MouseEvent) => void;

/**
 * Event handler type for touch movement
 */
export type TouchMoveHandler = (event: TouchEvent) => void;

/**
 * Resize handler function type
 */
export type ResizeHandler = () => void;

/**
 * Animation update function type
 */
export type AnimationUpdateFunction = (time: number) => void;
