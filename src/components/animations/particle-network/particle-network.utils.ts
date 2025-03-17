/**
 * Utility functions for the Particle Network animation component
 */

import { EDGE_BOUNCE_MARGIN } from './particle-network.constants';
import { MousePosition, Particle } from './particle-network.types';

/**
 * Create an array of randomly positioned and moving particles
 *
 * @param count - Number of particles to create
 * @param width - Width of the canvas
 * @param height - Height of the canvas
 * @param size - Size of each particle
 * @param speed - Movement speed multiplier
 * @returns Array of particles with random positions and velocities
 */
export const createParticles = (
  count: number,
  width: number,
  height: number,
  size: number,
  speed: number
): Particle[] => {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size
    });
  }

  return particles;
};

/**
 * Update particle positions and handle boundary collisions
 *
 * @param particles - Array of particles to update
 * @param width - Width of the canvas
 * @param height - Height of the canvas
 */
export const updateParticles = (particles: Particle[], width: number, height: number): void => {
  particles.forEach(particle => {
    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Bounce off edges
    if (particle.x <= EDGE_BOUNCE_MARGIN || particle.x >= width - EDGE_BOUNCE_MARGIN) {
      particle.vx *= -1;
    }

    if (particle.y <= EDGE_BOUNCE_MARGIN || particle.y >= height - EDGE_BOUNCE_MARGIN) {
      particle.vy *= -1;
    }

    // Ensure particles stay within bounds
    particle.x = Math.max(0, Math.min(width, particle.x));
    particle.y = Math.max(0, Math.min(height, particle.y));
  });
};

/**
 * Draw particles on the canvas
 *
 * @param ctx - Canvas rendering context
 * @param particles - Array of particles to draw
 * @param color - Color of the particles
 */
export const drawParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  color: string
): void => {
  particles.forEach(particle => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });
};

/**
 * Draw connections between particles and to mouse position
 *
 * @param ctx - Canvas rendering context
 * @param particles - Array of particles
 * @param mousePosition - Current mouse position
 * @param isMouseActive - Whether the mouse is active in the canvas
 * @param maxDistance - Maximum distance for drawing connections
 * @param lineColor - Color of connection lines
 * @param interactive - Whether to draw connections to mouse
 */
export const drawConnections = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  mousePosition: MousePosition,
  isMouseActive: boolean,
  maxDistance: number,
  lineColor: string,
  interactive: boolean
): void => {
  ctx.beginPath();
  ctx.strokeStyle = lineColor;

  // Draw connections between particles
  for (let i = 0; i < particles.length; i++) {
    const particle1 = particles[i];

    // Draw connections to mouse if interactive
    if (interactive && isMouseActive) {
      const mouseDistance = Math.hypot(
        mousePosition.x - particle1.x,
        mousePosition.y - particle1.y
      );

      if (mouseDistance < maxDistance) {
        ctx.moveTo(particle1.x, particle1.y);
        ctx.lineTo(mousePosition.x, mousePosition.y);
      }
    }

    // Draw connections to other particles
    for (let j = i + 1; j < particles.length; j++) {
      const particle2 = particles[j];
      const distance = Math.hypot(particle2.x - particle1.x, particle2.y - particle1.y);

      if (distance < maxDistance) {
        ctx.moveTo(particle1.x, particle1.y);
        ctx.lineTo(particle2.x, particle2.y);
      }
    }
  }

  ctx.stroke();
};

/**
 * Calculate the appropriate canvas size based on its container
 *
 * @param canvas - The canvas element
 * @returns Object with width and height properties
 */
export const calculateCanvasSize = (
  canvas: HTMLCanvasElement
): { width: number; height: number } => {
  const rect = canvas.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height
  };
};

/**
 * Clear the entire canvas
 *
 * @param ctx - Canvas rendering context
 * @param width - Width of the canvas
 * @param height - Height of the canvas
 */
export const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  ctx.clearRect(0, 0, width, height);
};
