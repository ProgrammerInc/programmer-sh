/**
 * Constants used in the Liquid Chrome animation component
 */

/**
 * Default base color for the animation as RGB values (0-1 scale)
 */
export const DEFAULT_BASE_COLOR: [number, number, number] = [0.1, 0.1, 0.1];

/**
 * Default animation speed multiplier
 * Higher values make the animation move faster
 */
export const DEFAULT_SPEED = 0.2;

/**
 * Default amplitude of the distortion
 * Controls how pronounced the wave effects are
 */
export const DEFAULT_AMPLITUDE = 0.5;

/**
 * Default frequency modifier for the x-axis distortion
 */
export const DEFAULT_FREQUENCY_X = 3;

/**
 * Default frequency modifier for the y-axis distortion
 */
export const DEFAULT_FREQUENCY_Y = 2;

/**
 * Default interactive state
 * When true, the animation responds to mouse/touch movement
 */
export const DEFAULT_INTERACTIVE = true;

/**
 * Vertex shader for the liquid chrome effect
 * Passes along position and UV coordinates
 */
export const VERTEX_SHADER = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/**
 * Fragment shader for the liquid chrome effect
 * Implements the distortion and coloring effects
 */
export const FRAGMENT_SHADER = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uResolution;
  uniform vec3 uBaseColor;
  uniform float uAmplitude;
  uniform float uFrequencyX;
  uniform float uFrequencyY;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Render function for a given uv coordinate.
  vec4 renderImage(vec2 uvCoord) {
      // Convert uvCoord (in [0,1]) to a fragment coordinate.
      vec2 fragCoord = uvCoord * uResolution.xy;
      // Map fragCoord to a normalized space.
      vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

      // Iterative cosine-based distortions.
      for (float i = 1.0; i < 10.0; i++){
          uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
          uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
      }

      // Add a liquid ripple effect based on the mouse position.
      vec2 diff = (uvCoord - uMouse);
      float dist = length(diff);
      float falloff = exp(-dist * 20.0);
      float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
      uv += (diff / (dist + 0.0001)) * ripple * falloff;

      // Original vibrant color computation.
      vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
      return vec4(color, 1.0);
  }

  void main() {
      // 3x3 supersampling for anti-aliasing.
      vec4 col = vec4(0.0);
      int samples = 0;
      for (int i = -1; i <= 1; i++){
          for (int j = -1; j <= 1; j++){
              vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
              col += renderImage(vUv + offset);
              samples++;
          }
      }
      gl_FragColor = col / float(samples);
  }
`;
