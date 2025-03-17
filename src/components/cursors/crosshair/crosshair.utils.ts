/**
 * @fileoverview Utility functions for the Crosshair component
 * @module Crosshair/Utils
 */

import { MousePosition } from './crosshair.types';

/**
 * Linear interpolation between two values
 *
 * @param a - Starting value
 * @param b - Target value
 * @param n - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

/**
 * Get mouse position relative to container or window
 *
 * @param e - Mouse event
 * @param container - Optional container element
 * @returns Mouse position coordinates
 */
export const getMousePos = (e: Event, container?: HTMLElement | null): MousePosition => {
  const mouseEvent = e as MouseEvent;
  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - bounds.left,
      y: mouseEvent.clientY - bounds.top
    };
  }
  return { x: mouseEvent.clientX, y: mouseEvent.clientY };
};
