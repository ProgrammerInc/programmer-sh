/**
 * Types for the Ribbons cursor component.
 */
import { Color, Polyline, Vec3 } from 'ogl';

/**
 * Properties for the Ribbons component.
 */
export interface RibbonsProps {
  /**
   * Array of colors for the ribbons.
   * @default ['#ff9346', '#7cff67', '#ffee51', '#00d8ff']
   */
  colors?: string[];

  /**
   * Base spring constant for ribbon movement.
   * @default 0.03
   */
  baseSpring?: number;

  /**
   * Base friction value for dampening ribbon movement.
   * @default 0.9
   */
  baseFriction?: number;

  /**
   * Base thickness of the ribbons in pixels.
   * @default 30
   */
  baseThickness?: number;

  /**
   * Factor for offsetting ribbons from each other.
   * @default 0.05
   */
  offsetFactor?: number;

  /**
   * Maximum age of trail points in milliseconds.
   * @default 500
   */
  maxAge?: number;

  /**
   * Number of points in each ribbon trail.
   * @default 50
   */
  pointCount?: number;

  /**
   * Multiplier for animation speed.
   * @default 0.6
   */
  speedMultiplier?: number;

  /**
   * Whether to enable fading effect on the ribbons.
   * @default false
   */
  enableFade?: boolean;

  /**
   * Whether to enable wavy shader effect on the ribbons.
   * @default false
   */
  enableShaderEffect?: boolean;

  /**
   * Amplitude of the shader effect when enabled.
   * @default 2
   */
  effectAmplitude?: number;

  /**
   * Background color as an RGBA array [r, g, b, a] with values from 0 to 1.
   * @default [0, 0, 0, 0]
   */
  backgroundColor?: number[];
}

/**
 * Structure representing a ribbon line.
 */
export interface RibbonLine {
  /**
   * Spring constant for this ribbon.
   */
  spring: number;

  /**
   * Friction value for this ribbon.
   */
  friction: number;

  /**
   * Current velocity of the mouse for this ribbon.
   */
  mouseVelocity: Vec3;

  /**
   * Offset from the mouse position for this ribbon.
   */
  mouseOffset: Vec3;

  /**
   * Array of points forming the ribbon.
   */
  points: Vec3[];

  /**
   * Polyline object for rendering the ribbon.
   */
  polyline: Polyline;
}

/**
 * Shader uniforms for the ribbon polyline.
 */
export interface RibbonUniforms {
  /**
   * Color of the ribbon.
   */
  uColor: { value: Color };

  /**
   * Thickness of the ribbon.
   */
  uThickness: { value: number };

  /**
   * Opacity of the ribbon.
   */
  uOpacity: { value: number };

  /**
   * Current time for animations.
   */
  uTime: { value: number };

  /**
   * Whether shader effects are enabled (1.0) or disabled (0.0).
   */
  uEnableShaderEffect: { value: number };

  /**
   * Amplitude of the shader effect.
   */
  uEffectAmplitude: { value: number };

  /**
   * Whether fade effect is enabled (1.0) or disabled (0.0).
   */
  uEnableFade: { value: number };
}
