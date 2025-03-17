/**
 * Constants for the Swarm Effect animation component
 */

import { HoverEffectType } from './swarm-effect.types';

/**
 * Default settings for the SwarmEffect component
 */
export const DEFAULT_SETTINGS = {
  /** Default particle size in pixels */
  PARTICLE_SIZE: 2,
  /** Default spacing between particles in pixels */
  PARTICLE_SPACING: 4,
  /** Default particle color */
  PARTICLE_COLOR: 'hsl(280, 100%, 60%)',
  /** Default radius around cursor that affects particles */
  DISPLACEMENT_RADIUS: 50,
  /** Default hover effect */
  HOVER_EFFECT: 'scatter' as HoverEffectType
};

/**
 * Particle rendering settings
 */
export const PARTICLE_SETTINGS = {
  /** Minimum brightness threshold for particles */
  MIN_BRIGHTNESS: 20,
  /** Minimum alpha threshold for particles */
  MIN_ALPHA: 128,
  /** Interpolation factor for smooth particle movement */
  MOVEMENT_EASING: 0.25,
  /** Force multiplier for particle displacement */
  FORCE_MULTIPLIER: 1.2
};

/**
 * Canvas rendering settings
 */
export const CANVAS_SETTINGS = {
  /** Context creation options for optimized pixel data reading */
  CONTEXT_OPTIONS: { willReadFrequently: true } as CanvasRenderingContext2DSettings
};

/**
 * CSS classes for the SwarmEffect component
 */
export const CSS_CLASSES = {
  /** Main container class */
  CONTAINER: 'swarm-effect-container',
  /** Canvas class */
  CANVAS: 'swarm-effect-canvas',
  /** Hidden image class */
  HIDDEN_IMAGE: 'swarm-effect-hidden-image'
};
