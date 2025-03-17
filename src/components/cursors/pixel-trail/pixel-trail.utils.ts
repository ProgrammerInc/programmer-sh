/**
 * Utility functions for the Pixel Trail component.
 */
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import {
  DEFAULT_MATERIAL_UNIFORMS,
  FRAGMENT_SHADER,
  TEXTURE_SETTINGS,
  VERTEX_SHADER
} from './pixel-trail.constants';

/**
 * Combines multiple class names into a single string.
 *
 * @param classes - Class names to combine
 * @returns Combined class name string
 */
export function cn(...classes: (string | undefined | boolean | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Creates the dot material with shaders for the pixel trail.
 */
export const DotMaterial = shaderMaterial(
  DEFAULT_MATERIAL_UNIFORMS,
  VERTEX_SHADER,
  FRAGMENT_SHADER
);

/**
 * Creates a linear easing function.
 *
 * @param x - Input value between 0 and 1
 * @returns Output value between 0 and 1
 */
export function linearEasing(x: number): number {
  return x;
}

/**
 * Configures texture settings for the mouse trail texture.
 *
 * @param texture - THREE.js texture to configure
 */
export function configureTrailTexture(texture: THREE.Texture | null): void {
  if (!texture) return;

  texture.minFilter = TEXTURE_SETTINGS.minFilter;
  texture.magFilter = TEXTURE_SETTINGS.magFilter;
  texture.wrapS = TEXTURE_SETTINGS.wrapS;
  texture.wrapT = TEXTURE_SETTINGS.wrapT;
}

/**
 * Calculates the scale for the mesh based on viewport dimensions.
 *
 * @param viewportWidth - Width of the viewport
 * @param viewportHeight - Height of the viewport
 * @returns Scale factor for the mesh
 */
export function calculateMeshScale(viewportWidth: number, viewportHeight: number): number {
  return Math.max(viewportWidth, viewportHeight) / 2;
}
