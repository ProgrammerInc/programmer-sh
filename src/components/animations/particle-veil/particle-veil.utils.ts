/**
 * Utility functions for the Particle Veil animation component
 */

import {
  LIFE_DECREASE_RATE,
  LIFE_INCREASE_RATE,
  MAX_PARTICLE_LIFE,
  MIN_PARTICLE_LIFE,
  MOUSE_REPEL_FORCE,
  SPEED_VARIATION_FACTOR,
  VELOCITY_ADJUSTMENT_RATE
} from './particle-veil.constants';
import { MousePosition, Particle } from './particle-veil.types';

/**
 * Create an array of particles with random positions and properties
 *
 * @param count - Number of particles to create
 * @param width - Width of the canvas
 * @param height - Height of the canvas
 * @param colors - Available colors for particles
 * @param sizeRange - Size range [min, max] for particles
 * @param speed - Base speed for particles
 * @returns Array of initialized particles
 */
export const createParticles = (
  count: number,
  width: number,
  height: number,
  colors: string[],
  sizeRange: [number, number],
  speed: number
): Particle[] => {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const baseSpeed = speed * (SPEED_VARIATION_FACTOR + Math.random() * SPEED_VARIATION_FACTOR);

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      vx: Math.cos(angle) * baseSpeed,
      vy: Math.sin(angle) * baseSpeed,
      baseVx: Math.cos(angle) * baseSpeed,
      baseVy: Math.sin(angle) * baseSpeed,
      life: Math.random() * 0.3 + MIN_PARTICLE_LIFE,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  });
};

/**
 * Update particles based on their properties and mouse interaction
 *
 * @param particles - Array of particles to update
 * @param mousePosition - Current mouse position
 * @param interactionRadius - Radius for mouse interaction
 * @param canvasWidth - Width of the canvas
 * @param canvasHeight - Height of the canvas
 * @param dpr - Device pixel ratio
 */
export const updateParticles = (
  particles: Particle[],
  mousePosition: MousePosition,
  interactionRadius: number,
  canvasWidth: number,
  canvasHeight: number,
  dpr: number
): void => {
  particles.forEach(p => {
    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around edges
    if (p.x < 0) p.x = canvasWidth / dpr;
    if (p.x > canvasWidth / dpr) p.x = 0;
    if (p.y < 0) p.y = canvasHeight / dpr;
    if (p.y > canvasHeight / dpr) p.y = 0;

    // Mouse interaction
    const dx = mousePosition.x - p.x;
    const dy = mousePosition.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < interactionRadius) {
      // Repel from mouse
      const force = (1 - dist / interactionRadius) * MOUSE_REPEL_FORCE;
      p.vx = p.vx * (1 - force) - dx * force;
      p.vy = p.vy * (1 - force) - dy * force;
      p.life = Math.min(MAX_PARTICLE_LIFE, p.life + LIFE_INCREASE_RATE);
    } else {
      // Return to natural movement
      p.vx += (p.baseVx - p.vx) * VELOCITY_ADJUSTMENT_RATE;
      p.vy += (p.baseVy - p.vy) * VELOCITY_ADJUSTMENT_RATE;
      p.life = Math.max(MIN_PARTICLE_LIFE, p.life - LIFE_DECREASE_RATE);
    }
  });
};

/**
 * Draw particles on the canvas
 *
 * @param ctx - Canvas rendering context
 * @param particles - Array of particles to draw
 * @param dpr - Device pixel ratio
 */
export const drawParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  dpr: number
): void => {
  particles.forEach(p => {
    ctx.beginPath();
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr, 0, Math.PI * 2);
    ctx.fill();
  });
};

/**
 * Clear the canvas
 *
 * @param ctx - Canvas rendering context
 * @param width - Canvas width
 * @param height - Canvas height
 */
export const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  ctx.clearRect(0, 0, width, height);
};

/**
 * Calculate and set the canvas size accounting for device pixel ratio
 *
 * @param canvas - Canvas element
 * @returns Object containing the calculated device pixel ratio
 */
export const resizeCanvas = (canvas: HTMLCanvasElement): { dpr: number } => {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  return { dpr };
};
