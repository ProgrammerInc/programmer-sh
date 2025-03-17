/**
 * Constants for the Lightning animation component.
 */

/**
 * WebGL vertex shader source code.
 * Sets up the position attribute for rendering a full-screen quad.
 */
export const VERTEX_SHADER = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

/**
 * WebGL fragment shader source code.
 * Renders the lightning effect with parameters for hue, offset, speed, intensity, and size.
 */
export const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform float uHue;
  uniform float uXOffset;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform float uSize;
  
  #define OCTAVE_COUNT 10

  // Convert HSV to RGB.
  vec3 hsv2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
      return c.z * mix(vec3(1.0), rgb, c.y);
  }

  float hash11(float p) {
      p = fract(p * .1031);
      p *= p + 33.33;
      p *= p + p;
      return fract(p);
  }

  float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * .1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
  }

  mat2 rotate2d(float theta) {
      float c = cos(theta);
      float s = sin(theta);
      return mat2(c, -s, s, c);
  }

  float noise(vec2 p) {
      vec2 ip = floor(p);
      vec2 fp = fract(p);
      float a = hash12(ip);
      float b = hash12(ip + vec2(1.0, 0.0));
      float c = hash12(ip + vec2(0.0, 1.0));
      float d = hash12(ip + vec2(1.0, 1.0));
      
      vec2 t = smoothstep(0.0, 1.0, fp);
      return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
  }

  float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < OCTAVE_COUNT; ++i) {
          value += amplitude * noise(p);
          p *= rotate2d(0.45);
          p *= 2.0;
          amplitude *= 0.5;
      }
      return value;
  }

  void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
      // Normalized pixel coordinates.
      vec2 uv = fragCoord / iResolution.xy;
      uv = 2.0 * uv - 1.0;
      uv.x *= iResolution.x / iResolution.y;
      // Apply horizontal offset.
      uv.x += uXOffset;
      
      // Adjust uv based on size and animate with speed.
      uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
      
      float dist = abs(uv.x);
      // Compute base color using hue.
      vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
      // Compute color with intensity and speed affecting time.
      vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
      col = pow(col, vec3(1.0));
      fragColor = vec4(col, 1.0);
  }

  void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

/**
 * Default hue value for the lightning color.
 */
export const DEFAULT_HUE = 230;

/**
 * Default horizontal offset.
 */
export const DEFAULT_X_OFFSET = 0;

/**
 * Default animation speed multiplier.
 */
export const DEFAULT_SPEED = 1;

/**
 * Default intensity of the lightning effect.
 */
export const DEFAULT_INTENSITY = 1;

/**
 * Default size multiplier.
 */
export const DEFAULT_SIZE = 1;

/**
 * Vertices for rendering a full-screen quad as two triangles.
 */
export const FULL_SCREEN_QUAD_VERTICES = new Float32Array([
  -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1
]);
