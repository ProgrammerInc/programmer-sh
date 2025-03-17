/**
 * Utility functions for the Magnet Lines animation component
 */

import React from 'react';
import { PointerPosition } from './magnet-lines.types';

/**
 * Calculates the rotation angle for a line element based on pointer position
 *
 * @param elementRect - The element's bounding client rectangle
 * @param pointerPosition - The current pointer position
 * @returns The calculated rotation angle in degrees
 */
export function calculateRotationAngle(
  elementRect: DOMRect,
  pointerPosition: PointerPosition
): number {
  // Calculate the center point of the element
  const centerX = elementRect.x + elementRect.width / 2;
  const centerY = elementRect.y + elementRect.height / 2;

  // Calculate the vector components from center to pointer
  const b = pointerPosition.x - centerX;
  const a = pointerPosition.y - centerY;

  // Calculate the hypotenuse (distance from center to pointer)
  // Use 1 as a fallback to prevent division by zero
  const c = Math.sqrt(a * a + b * b) || 1;

  // Calculate the rotation angle in degrees using arccos
  // Adjust sign based on whether pointer is above or below the center
  const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointerPosition.y > centerY ? 1 : -1);

  return r;
}

/**
 * Creates an array of spans for the grid
 *
 * @param total - Total number of spans to create
 * @param lineColor - Color of the lines
 * @param lineWidth - Width of the lines
 * @param lineHeight - Height of the lines
 * @param baseAngle - Base angle for the lines
 * @returns Array of JSX elements
 */
export function createGridSpans(
  total: number,
  lineColor: string,
  lineWidth: string,
  lineHeight: string,
  baseAngle: number
): React.ReactElement[] {
  return Array.from({ length: total }, (_, i) => {
    // Using React.createElement instead of JSX to avoid compilation issues
    return React.createElement('span', {
      key: i,
      className: 'block origin-center',
      style: {
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        '--rotate': `${baseAngle}deg`,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform'
      } as React.CSSProperties
    });
  });
}
