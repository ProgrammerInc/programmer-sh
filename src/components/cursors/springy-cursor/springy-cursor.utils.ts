/**
 * SpringyCursor Utils
 *
 * Utility functions for the SpringyCursor component
 *
 * @module SpringyCursor/Utils
 */

import {
  BOUNCE,
  DOT_SIZE,
  EMOJI_FONT_SIZE,
  SEGMENT_LENGTH,
  SPRING_K,
  STOP_ACCELERATION,
  STOP_VELOCITY
} from './springy-cursor.constants';
import { Particle, Point, Vec } from './springy-cursor.types';

/**
 * Creates an emoji canvas for use with the SpringyCursor.
 *
 * @param emoji - Emoji character to use
 * @returns Canvas element with the emoji drawn on it
 */
export function createEmojiCanvas(emoji: string): HTMLCanvasElement | null {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) return null;

  context.font = EMOJI_FONT_SIZE;
  context.textBaseline = 'middle';
  context.textAlign = 'center';

  const measurements = context.measureText(emoji);
  canvas.width = measurements.width;
  canvas.height = measurements.actualBoundingBoxAscent * 2;

  context.textAlign = 'center';
  context.font = EMOJI_FONT_SIZE;
  context.textBaseline = 'middle';
  context.fillText(emoji, canvas.width / 2, measurements.actualBoundingBoxAscent);

  return canvas;
}

/**
 * Calculates spring force between two particles.
 *
 * @param p1 - First particle position
 * @param p2 - Second particle position
 * @returns Spring force vector
 */
export function calculateSpringForce(p1: Point, p2: Point): Vec {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const spring = new Vec(0, 0);

  if (len > SEGMENT_LENGTH) {
    const springF = SPRING_K * (len - SEGMENT_LENGTH);
    spring.X += (dx / len) * springF;
    spring.Y += (dy / len) * springF;
  }

  return spring;
}

/**
 * Handles boundary collisions for a particle with the canvas.
 *
 * @param particle - Particle to check for collisions
 * @param width - Canvas width
 * @param height - Canvas height
 */
export function handleBoundaryCollisions(particle: Particle, width: number, height: number): void {
  // Bottom boundary
  if (particle.position.y >= height - DOT_SIZE - 1) {
    if (particle.velocity.y > 0) {
      particle.velocity.y = BOUNCE * -particle.velocity.y;
    }
    particle.position.y = height - DOT_SIZE - 1;
  }

  // Right boundary
  if (particle.position.x >= width - DOT_SIZE) {
    if (particle.velocity.x > 0) {
      particle.velocity.x = BOUNCE * -particle.velocity.x;
    }
    particle.position.x = width - DOT_SIZE - 1;
  }

  // Left boundary
  if (particle.position.x < 0) {
    if (particle.velocity.x < 0) {
      particle.velocity.x = BOUNCE * -particle.velocity.x;
    }
    particle.position.x = 0;
  }
}

/**
 * Checks if a particle can be considered stopped based on velocity and acceleration.
 *
 * @param velocity - Current velocity vector
 * @param acceleration - Current acceleration vector
 * @returns True if the particle can be considered stopped
 */
export function isParticleStopped(velocity: Point, acceleration: Vec): boolean {
  return (
    Math.abs(velocity.x) < STOP_VELOCITY &&
    Math.abs(velocity.y) < STOP_VELOCITY &&
    Math.abs(acceleration.X) < STOP_ACCELERATION &&
    Math.abs(acceleration.Y) < STOP_ACCELERATION
  );
}

/**
 * Gets the relative mouse position within an element.
 *
 * @param event - Mouse or touch event
 * @param wrapperElement - Optional wrapper element
 * @returns Mouse coordinates relative to the element or viewport
 */
export function getRelativeMousePosition(
  event: MouseEvent | Touch,
  wrapperElement?: HTMLElement
): Point {
  if (!wrapperElement) {
    return { x: event.clientX, y: event.clientY };
  }

  const boundingRect = wrapperElement.getBoundingClientRect();
  return {
    x: event.clientX - boundingRect.left,
    y: event.clientY - boundingRect.top
  };
}
