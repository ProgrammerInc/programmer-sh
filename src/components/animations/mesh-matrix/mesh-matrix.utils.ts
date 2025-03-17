/**
 * Utility functions for the Mesh Matrix animation component
 */

import * as THREE from 'three';
import { BufferGeometry } from 'three';
import { DEFAULT_WAVE_AMPLITUDE, DEFAULT_WAVE_FREQUENCY } from './mesh-matrix.constants';

/**
 * Creates a plane geometry based on the viewport dimensions and mesh density
 *
 * @param viewportWidth - Width of the viewport
 * @param viewportHeight - Height of the viewport
 * @param meshDensity - Density of the mesh grid
 * @returns A new PlaneGeometry instance
 */
export function createMeshGeometry(
  viewportWidth: number,
  viewportHeight: number,
  meshDensity: number
): THREE.PlaneGeometry {
  return new THREE.PlaneGeometry(viewportWidth, viewportHeight, meshDensity, meshDensity);
}

/**
 * Calculates the distance between two points in 2D space
 *
 * @param x1 - X coordinate of the first point
 * @param y1 - Y coordinate of the first point
 * @param x2 - X coordinate of the second point
 * @param y2 - Y coordinate of the second point
 * @returns The distance between the two points
 */
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/**
 * Calculates distortion value for a vertex based on its distance from mouse and time
 *
 * @param distance - Distance from vertex to mouse position
 * @param time - Current elapsed time
 * @param distortionIntensity - Strength of the distortion effect
 * @param maxDistance - Maximum distance for mouse influence
 * @returns The calculated Z-axis displacement
 */
export function calculateVertexDistortion(
  distance: number,
  time: number,
  distortionIntensity: number,
  maxDistance: number
): number {
  // Calculate base wave distortion
  const baseWave = Math.sin(distance * DEFAULT_WAVE_FREQUENCY + time) * DEFAULT_WAVE_AMPLITUDE;

  // Calculate mouse influence based on distance
  const mouseInfluence = Math.max(0, 1 - distance / maxDistance);

  // Calculate final distortion with mouse influence
  const distortion = mouseInfluence * distortionIntensity;

  return baseWave + distortion * Math.sin(distance - time);
}

/**
 * Updates the mesh geometry vertices based on distortion calculations
 *
 * @param geometry - The buffer geometry to update
 * @param mouseX - Scaled mouse X position
 * @param mouseY - Scaled mouse Y position
 * @param time - Current elapsed time
 * @param distortionIntensity - Strength of the distortion effect
 * @param maxDistance - Maximum distance for mouse influence
 */
export function updateMeshVertices(
  geometry: BufferGeometry,
  mouseX: number,
  mouseY: number,
  time: number,
  distortionIntensity: number,
  maxDistance: number
): void {
  const positions = geometry.attributes.position.array as Float32Array;

  // Update each vertex position
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];

    const distance = calculateDistance(x, y, mouseX, mouseY);
    positions[i + 2] = calculateVertexDistortion(distance, time, distortionIntensity, maxDistance);
  }

  // Mark the position attribute as needing an update
  geometry.attributes.position.needsUpdate = true;
}
