/**
 * Type definitions for the Dither component
 */

import * as THREE from 'three';

/**
 * Properties for the Dither component
 */
export interface DitherProps {
  /** Speed of the wave animation */
  waveSpeed?: number;
  /** Frequency of the wave pattern */
  waveFrequency?: number;
  /** Amplitude of the wave effect */
  waveAmplitude?: number;
  /** RGB color values for the wave */
  waveColor?: [number, number, number];
  /** Number of colors for the dithering effect */
  colorNum?: number;
  /** Size of the pixels for the pixelation effect */
  pixelSize?: number;
  /** Whether to disable the animation */
  disableAnimation?: boolean;
  /** Whether to enable mouse interaction with the wave */
  enableMouseInteraction?: boolean;
  /** Radius of the mouse interaction effect */
  mouseRadius?: number;
}

/**
 * Properties for the DitheredWaves component
 */
export interface DitheredWavesProps {
  /** Speed of the wave animation */
  waveSpeed: number;
  /** Frequency of the wave pattern */
  waveFrequency: number;
  /** Amplitude of the wave effect */
  waveAmplitude: number;
  /** RGB color values for the wave */
  waveColor: [number, number, number];
  /** Number of colors for the dithering effect */
  colorNum: number;
  /** Size of the pixels for the pixelation effect */
  pixelSize: number;
  /** Whether to disable the animation */
  disableAnimation: boolean;
  /** Whether to enable mouse interaction with the wave */
  enableMouseInteraction: boolean;
  /** Radius of the mouse interaction effect */
  mouseRadius: number;
}

/**
 * Types for shader uniform values
 */
export type UniformValue = number | THREE.Vector2 | THREE.Vector3 | THREE.Color | THREE.Texture;

/**
 * Uniforms for the wave shader
 */
export interface WaveUniforms {
  /** Current animation time */
  time: THREE.Uniform<number>;
  /** Canvas resolution */
  resolution: THREE.Uniform<THREE.Vector2>;
  /** Speed of the wave animation */
  waveSpeed: THREE.Uniform<number>;
  /** Frequency of the wave pattern */
  waveFrequency: THREE.Uniform<number>;
  /** Amplitude of the wave effect */
  waveAmplitude: THREE.Uniform<number>;
  /** Color of the wave */
  waveColor: THREE.Uniform<THREE.Color>;
  /** Current mouse position */
  mousePos: THREE.Uniform<THREE.Vector2>;
  /** Whether mouse interaction is enabled */
  enableMouseInteraction: THREE.Uniform<number>;
  /** Radius of mouse interaction effect */
  mouseRadius: THREE.Uniform<number>;
  /** Allow additional uniforms */
  [key: string]: THREE.Uniform<UniformValue>;
}

/**
 * Mouse position state
 */
export interface MousePosition {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}
