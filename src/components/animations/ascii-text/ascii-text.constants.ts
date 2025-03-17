/**
 * Constants for the ASCII Text component
 */

import {
  ASCIITextAnimationConfig,
  AsciiFilterOptions,
  CanvasAsciiOptions,
  CanvasTxtOptions
} from './ascii-text.types';

/**
 * CSS class names used in the ASCII Text component
 */
export const CSS_CLASSES = {
  root: 'ascii-text',
  canvas: 'ascii-text-canvas',
  pre: 'ascii-text-pre'
};

/**
 * Default configuration for the ASCII text component
 */
export const DEFAULT_ASCII_TEXT_CONFIG: CanvasAsciiOptions = {
  text: 'David!',
  asciiFontSize: 8,
  textFontSize: 200,
  textColor: '#fdf9f3',
  planeBaseHeight: 8,
  enableWaves: true
};

/**
 * Default configuration for the ASCII filter
 */
export const DEFAULT_ASCII_FILTER_OPTIONS: AsciiFilterOptions = {
  fontSize: 12,
  fontFamily: "'Courier New', monospace",
  charset: ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
  invert: true
};

/**
 * Default configuration for the canvas text
 */
export const DEFAULT_CANVAS_TXT_OPTIONS: CanvasTxtOptions = {
  fontSize: 200,
  fontFamily: 'Arial',
  color: '#fdf9f3'
};

/**
 * Default animation configuration
 */
export const DEFAULT_ANIMATION_CONFIG: ASCIITextAnimationConfig = {
  waveAmplitude: 1.0,
  speedFactor: 1.0,
  colorTransitionSpeed: 1.0
};

/**
 * Device pixel ratio constant for rendering calculations
 */
export const PX_RATIO = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

/**
 * GLSL vertex shader for text distortion effect
 */
export const VERTEX_SHADER = `
varying vec2 vUv;
uniform float uTime;
uniform float mouse;
uniform float uEnableWaves;

void main() {
    vUv = uv;
    float time = uTime * 5.;

    float waveFactor = uEnableWaves;

    vec3 transformed = position;

    transformed.x += sin(time + position.y) * 0.5 * waveFactor;
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;
    transformed.z += sin(time + position.x) * waveFactor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

/**
 * GLSL fragment shader for text color manipulation
 */
export const FRAGMENT_SHADER = `
varying vec2 vUv;
uniform float mouse;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    float time = uTime;
    vec2 pos = vUv;
    
    float move = sin(time + mouse) * 0.01;
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
}
`;
