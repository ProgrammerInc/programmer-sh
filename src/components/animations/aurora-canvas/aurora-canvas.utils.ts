/**
 * Utility functions for the Aurora Canvas component
 *
 * @module AuroraCanvas
 */

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Particle } from './aurora-canvas.types';

/**
 * Utility function for combining class names with Tailwind merge support
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a new particle with random properties within given constraints
 *
 * @param width - Canvas width
 * @param height - Canvas height
 * @param colors - Available colors for particles
 * @param speed - Base speed for particle movement
 * @param layers - Number of layers
 * @returns A new particle object
 */
export function createParticle(
  width: number,
  height: number,
  colors: string[],
  speed: number,
  layers: number
): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    size: Math.random() * 80 + 40,
    color: colors[Math.floor(Math.random() * colors.length)],
    layer: Math.floor(Math.random() * layers)
  };
}

/**
 * Updates particle position and handles boundary wrapping
 *
 * @param particle - The particle to update
 * @param width - Canvas width
 * @param height - Canvas height
 */
export function updateParticlePosition(particle: Particle, width: number, height: number): void {
  // Update position
  particle.x += particle.vx;
  particle.y += particle.vy;

  // Wrap around edges
  if (particle.x < -particle.size) particle.x = width + particle.size;
  if (particle.x > width + particle.size) particle.x = -particle.size;
  if (particle.y < -particle.size) particle.y = height + particle.size;
  if (particle.y > height + particle.size) particle.y = -particle.size;
}

/**
 * Apply interactive forces to a particle based on mouse position
 *
 * @param particle - The particle to update
 * @param mouseX - Mouse X position
 * @param mouseY - Mouse Y position
 * @param interactiveDistance - Maximum distance for interaction
 * @param interactiveForce - Strength of interaction
 */
export function applyInteractiveForce(
  particle: Particle,
  mouseX: number,
  mouseY: number,
  interactiveDistance: number,
  interactiveForce: number
): void {
  const dx = mouseX - particle.x;
  const dy = mouseY - particle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < interactiveDistance) {
    const force = (1 - distance / interactiveDistance) * interactiveForce;
    particle.vx += dx * force;
    particle.vy += dy * force;
  }
}

/**
 * Limits particle velocity to prevent excessive speeds
 *
 * @param particle - The particle to update
 * @param maxVelocity - Maximum allowed velocity
 */
export function limitParticleVelocity(particle: Particle, maxVelocity: number): void {
  particle.vx = Math.max(Math.min(particle.vx, maxVelocity), -maxVelocity);
  particle.vy = Math.max(Math.min(particle.vy, maxVelocity), -maxVelocity);
}
