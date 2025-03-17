/**
 * Constants for the Ballpit animation component
 *
 * @module BallpitConstants
 */

/**
 * Default configuration for the Ballpit animation
 *
 * @const {object} DEFAULT_X_CONFIG - Default values for all configurable parameters
 */
export const DEFAULT_X_CONFIG = {
  /** Number of balls to render */
  count: 200,
  /** Array of colors for the balls (default black) */
  colors: [0, 0, 0],
  /** Ambient light color (white) */
  ambientColor: 0xffffff,
  /** Ambient light intensity */
  ambientIntensity: 1,
  /** Point light intensity */
  lightIntensity: 200,
  /** Material parameters for the balls */
  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15
  },
  /** Minimum size of balls */
  minSize: 0.5,
  /** Maximum size of balls */
  maxSize: 1,
  /** Size of the first ball */
  size0: 1,
  /** Gravity strength */
  gravity: 0.5,
  /** Friction coefficient */
  friction: 0.9975,
  /** Wall bounce coefficient */
  wallBounce: 0.95,
  /** Maximum velocity of balls */
  maxVelocity: 0.15,
  /** Maximum X bound */
  maxX: 5,
  /** Maximum Y bound */
  maxY: 5,
  /** Maximum Z bound */
  maxZ: 2,
  /** Whether to control the first sphere */
  controlSphere0: false,
  /** Whether balls should follow cursor movements */
  followCursor: true
};
