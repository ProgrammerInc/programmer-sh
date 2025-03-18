import * as THREE from 'three';

/**
 * Default values for the Lanyard component
 */
export const LANYARD_DEFAULTS = {
  /**
   * Default camera position [x, y, z]
   */
  POSITION: [0, 0, 30] as [number, number, number],
  
  /**
   * Default gravity vector [x, y, z]
   */
  GRAVITY: [0, -40, 0] as [number, number, number],
  
  /**
   * Default field of view in degrees
   */
  FOV: 20,
  
  /**
   * Default background transparency setting
   */
  TRANSPARENT: true,
  
  /**
   * Default maximum speed for the lanyard physics
   */
  MAX_SPEED: 50,
  
  /**
   * Default minimum speed for the lanyard physics
   */
  MIN_SPEED: 0
};

/**
 * Creates the environment lighting for the lanyard scene
 * 
 * @returns An array of lightformer configurations for the environment
 */
export const createLanyardEnvironment = () => [
  {
    intensity: 2,
    color: 'white',
    position: [0, -1, 5],
    rotation: [0, 0, Math.PI / 3],
    scale: [100, 0.1, 1]
  },
  {
    intensity: 3,
    color: 'white',
    position: [-1, -1, 1],
    rotation: [0, 0, Math.PI / 3],
    scale: [100, 0.1, 1]
  },
  {
    intensity: 3,
    color: 'white',
    position: [1, 1, 1],
    rotation: [0, 0, Math.PI / 3],
    scale: [100, 0.1, 1]
  },
  {
    intensity: 10,
    color: 'white',
    position: [-10, 0, 14],
    rotation: [0, Math.PI / 2, Math.PI / 3],
    scale: [100, 10, 1]
  }
];

/**
 * Set up the clear color for the WebGL renderer
 * 
 * @param gl - The WebGL renderer
 * @param transparent - Whether the background should be transparent
 */
export const setupRenderer = (gl: THREE.WebGLRenderer, transparent: boolean): void => {
  gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
};
