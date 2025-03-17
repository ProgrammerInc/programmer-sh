import * as THREE from 'three';

/**
 * Props interface for the GridDistortion component
 */
export interface GridDistortionProps {
  /** Number of cells in the distortion grid (default: 15) */
  grid?: number;

  /** Strength of mouse interaction (default: 0.1) */
  mouse?: number;

  /** Strength of the distortion effect (default: 0.15) */
  strength?: number;

  /** Relaxation factor for the distortion effect (default: 0.9) */
  relaxation?: number;

  /** Source URL for the image to be distorted */
  imageSrc: string;

  /** Optional CSS class name */
  className?: string;
}

/**
 * Interface for the uniforms used in the shader materials
 * Uses index signature to match Three.js IUniform requirements
 */
export interface GridDistortionUniforms {
  /** Time uniform for animation */
  time: { value: number };

  /** Resolution uniform containing width, height and pixel ratio info */
  resolution: { value: THREE.Vector4 };

  /** Image texture uniform */
  uTexture: { value: THREE.Texture | null };

  /** Data texture for distortion calculations */
  uDataTexture: { value: THREE.DataTexture | null };

  /** Index signature for Three.js compatibility */
  [uniform: string]: { value: unknown };
}

/**
 * Mouse state for tracking interaction with the distortion effect
 */
export interface MouseState {
  /** Current X position (normalized 0-1) */
  x: number;

  /** Current Y position (normalized 0-1) */
  y: number;

  /** Previous X position */
  prevX: number;

  /** Previous Y position */
  prevY: number;

  /** Velocity in X direction */
  vX: number;

  /** Velocity in Y direction */
  vY: number;
}
