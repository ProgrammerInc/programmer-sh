/**
 * Constants for the Ballpit component
 */

/**
 * Default physics configuration for the ballpit spheres
 */
export const DEFAULT_PHYSICS = {
  count: 30,
  maxX: 15,
  maxY: 15,
  maxZ: 15,
  maxSize: 5,
  minSize: 1,
  size0: 3,
  gravity: 0.1,
  friction: 0.95,
  wallBounce: 0.8,
  maxVelocity: 4,
  controlSphere0: true,
  followCursor: true
} as const;

/**
 * Default colors for the spheres (as hex values)
 */
export const DEFAULT_COLORS = [
  0xeb3f3f, // Red
  0x3feb7e, // Green
  0x3f51eb, // Blue
  0xebeb3f, // Yellow
  0xeb3feb, // Magenta
  0x3febe1 // Cyan
] as const;

/**
 * Default material parameters for spheres
 */
export const DEFAULT_MATERIAL_PARAMS = {
  metalness: 0.2,
  roughness: 0.07,
  clearcoat: 1.0,
  clearcoatRoughness: 0.2
} as const;

/**
 * Default lighting parameters
 */
export const DEFAULT_LIGHTING = {
  ambientColor: 0xffffff,
  ambientIntensity: 0.5,
  lightIntensity: 2.5
} as const;

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  container: 'ballpit-container',
  canvas: 'ballpit-canvas',
  srOnly: 'sr-only'
} as const;

/**
 * WebGL renderer configuration
 */
export const RENDERER_CONFIG = {
  powerPreference: 'high-performance',
  alpha: true,
  antialias: true
} as const;
