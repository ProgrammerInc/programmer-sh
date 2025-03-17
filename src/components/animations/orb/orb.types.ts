/**
 * Type definitions for the Orb animation component
 */

/**
 * Props for the Orb component
 *
 * @interface OrbProps
 * @property {number} [hue] - The base hue value for the orb in degrees (0-360)
 * @property {number} [hoverIntensity] - Intensity of the distortion effect when hovering (0-1)
 * @property {boolean} [rotateOnHover] - Whether the orb should rotate when hovered
 * @property {boolean} [forceHoverState] - Force the hover state to be active
 * @property {string} [className] - Additional CSS class(es) to apply to the container
 */
export interface OrbProps {
  /**
   * The base hue value for the orb in degrees (0-360)
   * Controls the color scheme of the orb
   */
  hue?: number;

  /**
   * Intensity of the distortion effect when hovering (0-1)
   * Higher values create more pronounced distortion
   */
  hoverIntensity?: number;

  /**
   * Whether the orb should rotate when hovered
   * If true, the orb will rotate when the mouse hovers over it
   */
  rotateOnHover?: boolean;

  /**
   * Force the hover state to be active
   * Useful for creating always-active effects
   */
  forceHoverState?: boolean;

  /**
   * Additional CSS class(es) to apply to the container
   */
  className?: string;
}

/**
 * WebGL Shader Uniforms for the Orb component
 *
 * @interface OrbUniforms
 */
export interface OrbUniforms {
  iTime: { value: number };
  iResolution: { value: [number, number, number] };
  hue: { value: number };
  hover: { value: number };
  rot: { value: number };
  hoverIntensity: { value: number };
}
