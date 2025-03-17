/**
 * Constants for the Globe component
 */

import { GlobeConfig } from './globe.types';

// Animation constants
export const RING_PROPAGATION_SPEED = 3;
export const ASPECT_RATIO = 1.2;
export const CAMERA_Z = 300;
export const RING_UPDATE_INTERVAL = 2000;

// WebGL renderer constants
export const CLEAR_COLOR = 0xffaaff;
export const CLEAR_ALPHA = 0;

// Scene constants
export const FOG_NEAR = 400;
export const FOG_FAR = 2000;

// Camera constants
export const CAMERA_FOV = 50;
export const CAMERA_NEAR = 180;
export const CAMERA_FAR = 1800;

// Light constants
export const AMBIENT_LIGHT_INTENSITY = 0.6;
export const POINT_LIGHT_INTENSITY = 0.8;
export const DIRECTIONAL_LEFT_LIGHT_POSITION = [-400, 100, 400] as const;
export const DIRECTIONAL_TOP_LIGHT_POSITION = [-200, 500, 200] as const;
export const POINT_LIGHT_POSITION = [-200, 500, 200] as const;

// OrbitControls constants
export const MIN_POLAR_ANGLE = Math.PI / 3.5;
export const MAX_POLAR_ANGLE = Math.PI - Math.PI / 3;

// Arc stroke options
export const ARC_STROKE_OPTIONS = [0.32, 0.28, 0.3] as const;
export const ARC_DASH_GAP = 15;

// Rotation factor for manual rotation
export const ROTATION_FACTOR = 0.0005;

// Default configuration for the globe
export const DEFAULT_GLOBE_CONFIG: GlobeConfig = {
  pointSize: 1,
  atmosphereColor: '#ffffff',
  showAtmosphere: true,
  atmosphereAltitude: 0.1,
  polygonColor: 'rgba(255,255,255,0.7)',
  globeColor: '#1d072e',
  emissive: '#000000',
  emissiveIntensity: 0.1,
  shininess: 0.9,
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  ambientLight: '#ffffff',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  autoRotate: true,
  autoRotateSpeed: 0.01
};
