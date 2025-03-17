/**
 * Constants for the Grid Distortion component
 */

/**
 * Default grid size (number of cells)
 */
export const DEFAULT_GRID_SIZE = 15;

/**
 * Default mouse interaction strength
 */
export const DEFAULT_MOUSE_STRENGTH = 0.1;

/**
 * Default distortion effect strength
 */
export const DEFAULT_DISTORTION_STRENGTH = 0.15;

/**
 * Default relaxation factor
 */
export const DEFAULT_RELAXATION = 0.9;

/**
 * Default CSS class name
 */
export const DEFAULT_CLASS_NAME = '';

/**
 * Vertex shader for the grid distortion effect
 */
export const VERTEX_SHADER = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/**
 * Fragment shader for the grid distortion effect
 */
export const FRAGMENT_SHADER = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}
`;
