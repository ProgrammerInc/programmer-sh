/**
 * Utility functions for the ShapeBlur animation component
 */

import * as THREE from 'three';

/**
 * Composes CSS class names dynamically
 *
 * @param {...string} classes - CSS class names to be combined
 * @returns {string} Combined class names string
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Resizes the WebGL renderer and updates the camera projection matrix
 *
 * @param {THREE.WebGLRenderer} renderer - Three.js WebGL renderer
 * @param {THREE.OrthographicCamera} camera - Three.js orthographic camera
 * @param {THREE.Mesh} mesh - Three.js mesh containing the shader material
 * @param {THREE.Vector2} resolution - Resolution vector for the shader
 * @param {HTMLElement} container - DOM container element
 * @param {number} pixelRatio - Custom pixel ratio override
 */
export const resizeRenderer = (
  renderer: THREE.WebGLRenderer,
  camera: THREE.OrthographicCamera,
  mesh: THREE.Mesh,
  resolution: THREE.Vector2,
  container: HTMLElement,
  pixelRatio: number
): void => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Limit devicePixelRatio to avoid performance issues on high-DPI displays
  const dpr = Math.min(window.devicePixelRatio || 1, pixelRatio);

  renderer.setSize(width, height);
  renderer.setPixelRatio(dpr);

  camera.left = -width / 2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = -height / 2;
  camera.updateProjectionMatrix();

  mesh.scale.set(width, height, 1);
  resolution.set(width, height).multiplyScalar(dpr);
};

/**
 * Creates a damped mouse position vector based on current and target mouse positions
 *
 * @param {THREE.Vector2} current - Current damped mouse position
 * @param {THREE.Vector2} target - Target mouse position to damp towards
 * @param {number} damping - Damping factor (higher = more responsive)
 * @param {number} deltaTime - Time elapsed since last update
 */
export const dampMousePosition = (
  current: THREE.Vector2,
  target: THREE.Vector2,
  damping: number,
  deltaTime: number
): void => {
  current.x = THREE.MathUtils.damp(current.x, target.x, damping, deltaTime);
  current.y = THREE.MathUtils.damp(current.y, target.y, damping, deltaTime);
};
