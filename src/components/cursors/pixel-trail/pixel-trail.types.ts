/**
 * Types for the Pixel Trail component.
 */
import { CanvasProps, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Props for SVG gooey filter effect.
 */
export interface GooeyFilterProps {
  /**
   * ID for the SVG filter.
   * @default 'goo-filter'
   */
  id?: string;

  /**
   * Strength of the gooey effect.
   * @default 10
   */
  strength?: number;
}

/**
 * Material uniforms for the dot shader.
 */
export interface DotMaterialUniforms {
  /**
   * Resolution of the canvas.
   */
  resolution: THREE.Vector2;

  /**
   * Texture for mouse trail.
   */
  mouseTrail: THREE.Texture | null;

  /**
   * Size of the grid for pixelation.
   */
  gridSize: number;

  /**
   * Color of the pixels.
   */
  pixelColor: THREE.Color;
}

/**
 * Props for the 3D scene component.
 */
export interface SceneProps {
  /**
   * Size of the grid for pixelation.
   */
  gridSize: number;

  /**
   * Size of the trail effect.
   */
  trailSize: number;

  /**
   * Maximum age of trail points in milliseconds.
   */
  maxAge: number;

  /**
   * Interpolation factor for smooth trail.
   */
  interpolate: number;

  /**
   * Easing function for trail animation.
   */
  easingFunction: (x: number) => number;

  /**
   * Color of the pixels.
   */
  pixelColor: string;
}

/**
 * Props for the PixelTrail component.
 */
export interface PixelTrailProps {
  /**
   * Size of the grid for pixelation.
   * @default 40
   */
  gridSize?: number;

  /**
   * Size of the trail effect.
   * @default 0.1
   */
  trailSize?: number;

  /**
   * Maximum age of trail points in milliseconds.
   * @default 250
   */
  maxAge?: number;

  /**
   * Interpolation factor for smooth trail.
   * @default 5
   */
  interpolate?: number;

  /**
   * Easing function for trail animation.
   * @default (x) => x
   */
  easingFunction?: (x: number) => number;

  /**
   * Props for Three.js Canvas component.
   */
  canvasProps?: Partial<CanvasProps>;

  /**
   * Props for WebGL context.
   */
  glProps?: WebGLContextAttributes & { powerPreference?: string };

  /**
   * Configuration for gooey filter effect.
   */
  gooeyFilter?: { id: string; strength: number };

  /**
   * Color of the pixels.
   * @default '#ffffff'
   */
  color?: string;

  /**
   * Additional CSS class name.
   */
  className?: string;
}

/**
 * Type for the return value of useTrailTexture hook.
 */
export type UseTrailTextureReturn = [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];
