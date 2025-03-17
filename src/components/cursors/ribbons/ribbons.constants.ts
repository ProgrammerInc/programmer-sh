/**
 * Constants for the Ribbons cursor component.
 */

/**
 * Canvas style properties for the OGL renderer.
 */
export const CANVAS_STYLES = {
  /**
   * Position the canvas absolutely within its container.
   */
  position: 'absolute',

  /**
   * Position the canvas at the top of its container.
   */
  top: '0',

  /**
   * Position the canvas at the left of its container.
   */
  left: '0',

  /**
   * Make the canvas fill its container width.
   */
  width: '100%',

  /**
   * Make the canvas fill its container height.
   */
  height: '100%'
};

/**
 * Default values for Ribbons component.
 */
export const DEFAULT_VALUES = {
  /**
   * Default colors for the ribbons.
   */
  colors: ['#ff9346', '#7cff67', '#ffee51', '#00d8ff'],

  /**
   * Default spring constant.
   */
  baseSpring: 0.03,

  /**
   * Default friction value.
   */
  baseFriction: 0.9,

  /**
   * Default thickness of ribbons.
   */
  baseThickness: 30,

  /**
   * Default factor for offsetting ribbons from each other.
   */
  offsetFactor: 0.05,

  /**
   * Default maximum age for trail points.
   */
  maxAge: 500,

  /**
   * Default number of points in each ribbon.
   */
  pointCount: 50,

  /**
   * Default speed multiplier for animation.
   */
  speedMultiplier: 0.6,

  /**
   * Whether fade effect is enabled by default.
   */
  enableFade: false,

  /**
   * Whether shader effect is enabled by default.
   */
  enableShaderEffect: false,

  /**
   * Default amplitude for shader effect.
   */
  effectAmplitude: 2,

  /**
   * Default background color (transparent).
   */
  backgroundColor: [0, 0, 0, 0]
};

/**
 * Container class name for the ribbons component.
 */
export const CONTAINER_CLASS_NAME = 'relative w-full h-full';

/**
 * Vertex shader for the ribbons effect.
 */
export const VERTEX_SHADER = `
  precision highp float;
  
  attribute vec3 position;
  attribute vec3 next;
  attribute vec3 prev;
  attribute vec2 uv;
  attribute float side;
  
  uniform vec2 uResolution;
  uniform float uDPR;
  uniform float uThickness;
  uniform float uTime;
  uniform float uEnableShaderEffect;
  uniform float uEffectAmplitude;
  
  varying vec2 vUV;
  
  vec4 getPosition() {
      vec4 current = vec4(position, 1.0);
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      vec2 nextScreen = next.xy * aspect;
      vec2 prevScreen = prev.xy * aspect;
      vec2 tangent = normalize(nextScreen - prevScreen);
      vec2 normal = vec2(-tangent.y, tangent.x);
      normal /= aspect;
      normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
      float dist = length(nextScreen - prevScreen);
      normal *= smoothstep(0.0, 0.02, dist);
      float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
      float pixelWidth = current.w * pixelWidthRatio;
      normal *= pixelWidth * uThickness;
      current.xy -= normal * side;
      if(uEnableShaderEffect > 0.5) {
        current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
      }
      return current;
  }
  
  void main() {
      // Pass the original uv to the fragment shader.
      vUV = uv;
      gl_Position = getPosition();
  }
`;

/**
 * Fragment shader for the ribbons effect.
 */
export const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uEnableFade;
  varying vec2 vUV;
  void main() {
      float fadeFactor = 1.0;
      if(uEnableFade > 0.5) {
          fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
      }
      gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
  }
`;
