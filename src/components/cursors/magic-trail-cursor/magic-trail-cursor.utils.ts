/**
 * MagicTrailCursor
 *
 * Utility functions for the MagicTrailCursor component
 *
 * @module MagicTrailCursor/Utils
 */

import { Particle, Position } from './magic-trail-cursor.types';

/**
 * Creates a new particle with random properties
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param color - Particle color
 * @returns New particle object
 */
export function createParticle(x: number, y: number, color: string): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 2 + 1;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    color,
    size: Math.random() * 3 + 1
  };
}

/**
 * Calculates the distance between two points
 * @param pointA - First point
 * @param pointB - Second point
 * @returns Distance between points
 */
export function getDistance(pointA: Position, pointB: Position): number {
  return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y);
}

/**
 * Smoothly interpolates a position towards a target
 * @param current - Current position
 * @param target - Target position
 * @param smoothing - Smoothing factor (0-1)
 * @returns Updated position
 */
export function smoothPosition(current: Position, target: Position, smoothing: number): Position {
  return {
    x: current.x + (target.x - current.x) * smoothing,
    y: current.y + (target.y - current.y) * smoothing
  };
}

/**
 * Converts a color with opacity to a hex string
 * @param color - Base color (hex)
 * @param opacity - Opacity value (0-1)
 * @returns Color with opacity as hex string
 */
export function colorWithOpacity(color: string, opacity: number): string {
  return `${color}${Math.floor(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`;
}

/**
 * Gets the relative mouse position within a container
 * @param event - Mouse event
 * @param container - Container element
 * @returns Position relative to container
 */
export function getRelativeMousePosition(event: MouseEvent, container: HTMLElement): Position {
  if (container === document.body) {
    return { x: event.clientX, y: event.clientY };
  }

  const rect = container.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

/**
 * Checks if a point is within the bounds of a container
 * @param point - Point to check
 * @param container - Container element
 * @returns Whether the point is in bounds
 */
export function isPointInBounds(point: Position, container: HTMLElement): boolean {
  const width = container === document.body ? window.innerWidth : container.clientWidth;
  const height = container === document.body ? window.innerHeight : container.clientHeight;

  return point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height;
}
