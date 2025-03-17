/**
 * Constants for the Orb animation component
 */

/**
 * Default hue adjustment value in degrees
 */
export const DEFAULT_HUE = 0;

/**
 * Default intensity of the hover effect
 */
export const DEFAULT_HOVER_INTENSITY = 0.2;

/**
 * Default setting for rotation on hover
 */
export const DEFAULT_ROTATE_ON_HOVER = true;

/**
 * Default setting for forcing hover state
 */
export const DEFAULT_FORCE_HOVER_STATE = false;

/**
 * CSS class name for the orb container
 */
export const ORB_CONTAINER_CLASS = 'orb-container';

/**
 * Base colors used in the orb shader before hue adjustment
 */
export const ORB_BASE_COLORS = {
  COLOR1: [0.611765, 0.262745, 0.996078],
  COLOR2: [0.298039, 0.760784, 0.913725],
  COLOR3: [0.062745, 0.078431, 0.6]
};

/**
 * Inner radius constant for the orb shader
 */
export const ORB_INNER_RADIUS = 0.6;

/**
 * Noise scale constant for the orb shader
 */
export const ORB_NOISE_SCALE = 0.65;

/**
 * Rotation speed in radians per second
 */
export const ORB_ROTATION_SPEED = 0.3;

/**
 * Hover transition smoothing factor (0-1)
 */
export const ORB_HOVER_SMOOTHING = 0.1;

/**
 * Hover detection radius (normalized units)
 */
export const ORB_HOVER_DETECTION_RADIUS = 0.8;
