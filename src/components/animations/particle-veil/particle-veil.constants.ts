/**
 * Constants for the Particle Veil animation component
 */

/**
 * Default number of particles to render
 */
export const DEFAULT_PARTICLE_COUNT = 100;

/**
 * Default colors for the particles
 */
export const DEFAULT_PARTICLE_COLORS = ['#ffffff'];

/**
 * Default mouse interaction radius in pixels
 */
export const DEFAULT_INTERACTION_RADIUS = 100;

/**
 * Default particle movement speed
 */
export const DEFAULT_SPEED = 1;

/**
 * Default particle size range [min, max]
 */
export const DEFAULT_SIZE_RANGE: [number, number] = [1, 3];

/**
 * CSS class name for the particle veil container
 */
export const PARTICLE_VEIL_CONTAINER_CLASS = 'particle-veil-container';

/**
 * Force factor for mouse interaction
 */
export const MOUSE_REPEL_FORCE = 0.15;

/**
 * Life increase rate when particles are near the mouse
 */
export const LIFE_INCREASE_RATE = 0.1;

/**
 * Life decrease rate when particles are away from the mouse
 */
export const LIFE_DECREASE_RATE = 0.02;

/**
 * Minimum particle life value
 */
export const MIN_PARTICLE_LIFE = 0.7;

/**
 * Maximum particle life value
 */
export const MAX_PARTICLE_LIFE = 1.0;

/**
 * Velocity adjustment rate for returning to base velocity
 */
export const VELOCITY_ADJUSTMENT_RATE = 0.1;

/**
 * Mouse position when the mouse is considered "away" from the canvas
 */
export const OFF_SCREEN_MOUSE_POSITION = { x: -1000, y: -1000 };

/**
 * Particle speed variation factor
 */
export const SPEED_VARIATION_FACTOR = 0.5;
