/**
 * @file image-trail.utils.ts
 * @description Utility functions for the ImageTrail cursor component
 */

import { PointerPosition } from './image-trail.types';

/**
 * Linear interpolation between two values
 * @param a - First value
 * @param b - Second value
 * @param n - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function lerp(a: number, b: number, n: number): number {
  return (1 - n) * a + n * b;
}

/**
 * Get local pointer position relative to an element
 * @param e - Mouse or touch event
 * @param rect - Element's bounding rectangle
 * @returns Object with x and y coordinates
 */
export function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect): PointerPosition {
  let clientX = 0,
    clientY = 0;
  if ('touches' in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

/**
 * Calculate distance between two points
 * @param p1 - First point
 * @param p2 - Second point
 * @returns Distance between points
 */
export function getMouseDistance(p1: PointerPosition, p2: PointerPosition): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

/**
 * Map a value from one range to another
 * @param value - Value to map
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped value
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Map speed to a value within a range
 * @param speed - Speed value to map
 * @param min - Minimum output value
 * @param max - Maximum output value
 * @returns Mapped value
 */
export function mapSpeedToRange(speed: number, min: number, max: number): number {
  // Clamp speed between 0 and 100 for stability
  const clampedSpeed = Math.min(Math.max(speed, 0), 100);
  return mapRange(clampedSpeed, 0, 100, min, max);
}

/**
 * Get new position in a circular array
 * @param position - Current position
 * @param offset - Offset to add (can be negative)
 * @param arr - Array to navigate
 * @returns New position index
 */
export function getNewPosition<T>(position: number, offset: number, arr: T[]): number {
  const len = arr.length;
  if (len === 0) return 0;

  let newPosition = (position + offset) % len;
  if (newPosition < 0) newPosition += len;
  return newPosition;
}
