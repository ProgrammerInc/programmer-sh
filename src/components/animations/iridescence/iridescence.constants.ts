/**
 * Constants for the iridescence animation effect including shader code.
 */

/**
 * Vertex shader for the iridescence effect.
 * Sets up basic position and UV coordinates for a full-screen triangle.
 */
export const VERTEX_SHADER = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

/**
 * Fragment shader for the iridescence effect.
 * Creates a dynamic, colorful pattern that responds to time and mouse position.
 *
 * Uniforms:
 * - uTime: Time in seconds for animation
 * - uColor: Base color to tint the effect
 * - uResolution: Screen dimensions and aspect ratio
 * - uMouse: Normalized mouse position (0-1)
 * - uAmplitude: Strength of the mouse interaction
 * - uSpeed: Animation speed multiplier
 */
export const FRAGMENT_SHADER = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Add a subtle offset based on the mouse position
  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;
