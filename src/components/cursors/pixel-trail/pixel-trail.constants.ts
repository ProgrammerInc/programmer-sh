/**
 * Constants for the Pixel Trail component.
 */
import * as THREE from 'three';

/**
 * CSS class names used in the Pixel Trail component.
 */
export const CSS_CLASSES = {
  /**
   * SVG container class.
   */
  svg: 'absolute overflow-hidden z-1',

  /**
   * Canvas container class.
   */
  canvas: 'absolute z-1'
};

/**
 * Default values for the Pixel Trail component.
 */
export const DEFAULT_VALUES = {
  /**
   * Default grid size for pixelation.
   */
  gridSize: 40,

  /**
   * Default trail size.
   */
  trailSize: 0.1,

  /**
   * Default maximum age of trail points in milliseconds.
   */
  maxAge: 250,

  /**
   * Default interpolation factor.
   */
  interpolate: 5,

  /**
   * Default pixel color.
   */
  color: '#ffffff',

  /**
   * Default gooey filter id.
   */
  gooeyFilterId: 'goo-filter',

  /**
   * Default gooey filter strength.
   */
  gooeyFilterStrength: 10,

  /**
   * Default linear easing function.
   * @param x - Input value between 0 and 1
   * @returns Same value (linear easing)
   */
  linearEasing: (x: number): number => x
};

/**
 * Default WebGL context attributes.
 */
export const DEFAULT_GL_PROPS = {
  /**
   * Disable antialiasing for better performance.
   */
  antialias: false,

  /**
   * Prefer high performance GPU mode.
   */
  powerPreference: 'high-performance' as const,

  /**
   * Enable transparency.
   */
  alpha: true
};

/**
 * Default shader material initial uniforms.
 */
export const DEFAULT_MATERIAL_UNIFORMS = {
  /**
   * Default resolution.
   */
  resolution: new THREE.Vector2(),

  /**
   * Default mouse trail texture (null initially).
   */
  mouseTrail: null,

  /**
   * Default grid size.
   */
  gridSize: 100,

  /**
   * Default pixel color.
   */
  pixelColor: new THREE.Color('#ffffff')
};

/**
 * Shader code for vertex shader.
 */
export const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * Shader code for fragment shader.
 */
export const FRAGMENT_SHADER = `
  uniform vec2 resolution;
  uniform sampler2D mouseTrail;
  uniform float gridSize;
  uniform vec3 pixelColor;

  vec2 coverUv(vec2 uv) {
    vec2 s = resolution.xy / max(resolution.x, resolution.y);
    vec2 newUv = (uv - 0.5) * s + 0.5;
    return clamp(newUv, 0.0, 1.0);
  }

  float sdfCircle(vec2 p, float r) {
      return length(p - 0.5) - r;
  }

  void main() {
    vec2 screenUv = gl_FragCoord.xy / resolution;
    vec2 uv = coverUv(screenUv);

    vec2 gridUv = fract(uv * gridSize);
    vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

    float trail = texture2D(mouseTrail, gridUvCenter).r;

    gl_FragColor = vec4(pixelColor, trail);
  }
`;

/**
 * Default texture settings for trail texture.
 */
export const TEXTURE_SETTINGS = {
  /**
   * Use nearest-neighbor filtering for pixelated effect.
   */
  minFilter: THREE.NearestFilter,

  /**
   * Use nearest-neighbor filtering for pixelated effect.
   */
  magFilter: THREE.NearestFilter,

  /**
   * Clamp to edge for texture wrapping in S direction.
   */
  wrapS: THREE.ClampToEdgeWrapping,

  /**
   * Clamp to edge for texture wrapping in T direction.
   */
  wrapT: THREE.ClampToEdgeWrapping
};
