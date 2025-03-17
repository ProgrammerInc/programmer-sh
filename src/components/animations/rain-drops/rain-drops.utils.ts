/**
 * Utility functions for the Rain Drops animation component
 */
import { ANIMATION_SETTINGS } from './rain-drops.constants';
import { ExplosionParticle } from './rain-drops.types';

/**
 * Generate random particles for explosion effect
 *
 * @param count - Number of particles to generate
 * @returns Array of explosion particles with random properties
 */
export const generateExplosionParticles = (
  count: number = ANIMATION_SETTINGS.EXPLOSION_PARTICLE_COUNT
): ExplosionParticle[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(
      Math.random() * ANIMATION_SETTINGS.MAX_PARTICLE_DIRECTION_X * 2 -
        ANIMATION_SETTINGS.MAX_PARTICLE_DIRECTION_X
    ),
    directionY: Math.floor(
      Math.random() * -ANIMATION_SETTINGS.MAX_PARTICLE_DIRECTION_Y -
        ANIMATION_SETTINGS.MIN_PARTICLE_DIRECTION_Y
    )
  }));
};

/**
 * Generate random duration for particle animations
 *
 * @returns Random duration value between min and max settings
 */
export const getRandomParticleDuration = (): number => {
  return (
    Math.random() * ANIMATION_SETTINGS.MAX_ADDITIONAL_PARTICLE_DURATION +
    ANIMATION_SETTINGS.MIN_PARTICLE_DURATION
  );
};

/**
 * Check if a point is within an element's bounds
 *
 * @param pointX - X coordinate of the point
 * @param pointY - Y coordinate of the point
 * @param elementRect - DOMRect of the element
 * @returns True if point is inside the element bounds
 */
export const isPointInElementBounds = (
  pointX: number,
  pointY: number,
  elementRect: DOMRect
): boolean => {
  return (
    pointX >= elementRect.left &&
    pointX <= elementRect.right &&
    pointY >= elementRect.top &&
    pointY <= elementRect.bottom
  );
};

/**
 * Calculate the relative position inside a parent element
 *
 * @param x - Absolute X coordinate
 * @param y - Absolute Y coordinate
 * @param parentRect - DOMRect of the parent element
 * @returns Coordinates relative to the parent element
 */
export const calculateRelativePosition = (
  x: number,
  y: number,
  parentRect: DOMRect
): { x: number; y: number } => {
  return {
    x: x - parentRect.left,
    y: y - parentRect.top
  };
};
