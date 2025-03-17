/**
 * Utility functions for the Magnet animation component
 */

import { MagnetPosition } from './magnet.types';

/**
 * Calculates whether the cursor is within the activation area of the magnet
 *
 * @param elementRect - The bounding rectangle of the magnet element
 * @param cursorX - The X coordinate of the cursor
 * @param cursorY - The Y coordinate of the cursor
 * @param padding - The padding around the element that activates the magnet effect
 * @returns Whether the cursor is within the activation area
 */
export function isCursorWithinActivationArea(
  elementRect: DOMRect,
  cursorX: number,
  cursorY: number,
  padding: number
): boolean {
  const centerX = elementRect.left + elementRect.width / 2;
  const centerY = elementRect.top + elementRect.height / 2;

  // Calculate distance from center to cursor
  const distX = Math.abs(centerX - cursorX);
  const distY = Math.abs(centerY - cursorY);

  // Calculate activation thresholds
  const activationThresholdX = elementRect.width / 2 + padding;
  const activationThresholdY = elementRect.height / 2 + padding;

  // Check if cursor is within activation area
  return distX < activationThresholdX && distY < activationThresholdY;
}

/**
 * Calculates the magnet position offset based on cursor position
 *
 * @param elementRect - The bounding rectangle of the magnet element
 * @param cursorX - The X coordinate of the cursor
 * @param cursorY - The Y coordinate of the cursor
 * @param magnetStrength - The strength of the magnetic effect
 * @returns The calculated position offset
 */
export function calculateMagnetOffset(
  elementRect: DOMRect,
  cursorX: number,
  cursorY: number,
  magnetStrength: number
): MagnetPosition {
  const centerX = elementRect.left + elementRect.width / 2;
  const centerY = elementRect.top + elementRect.height / 2;

  // Calculate offset with strength factor
  const offsetX = (cursorX - centerX) / magnetStrength;
  const offsetY = (cursorY - centerY) / magnetStrength;

  return { x: offsetX, y: offsetY };
}
