/**
 * Utility functions for the Squares animation component
 */

import { GridOffset } from './squares.types';

/**
 * Calculate the starting position for grid rendering
 *
 * @param offset - Current grid offset
 * @param squareSize - Size of each square in pixels
 * @returns Starting X and Y coordinates
 */
export const calculateGridStart = (offset: GridOffset, squareSize: number): GridOffset => {
  return {
    x: Math.floor(offset.x / squareSize) * squareSize,
    y: Math.floor(offset.y / squareSize) * squareSize
  };
};

/**
 * Calculate the next grid offset based on direction and speed
 *
 * @param currentOffset - Current grid offset
 * @param direction - Direction of animation
 * @param speed - Animation speed
 * @param squareSize - Size of each square in pixels
 * @returns Updated grid offset
 */
export const calculateNextOffset = (
  currentOffset: GridOffset,
  direction: 'diagonal' | 'up' | 'right' | 'down' | 'left',
  speed: number,
  squareSize: number
): GridOffset => {
  const effectiveSpeed = Math.max(speed, 0.1);
  const newOffset = { ...currentOffset };

  switch (direction) {
    case 'right':
      newOffset.x = (newOffset.x - effectiveSpeed + squareSize) % squareSize;
      break;
    case 'left':
      newOffset.x = (newOffset.x + effectiveSpeed + squareSize) % squareSize;
      break;
    case 'up':
      newOffset.y = (newOffset.y + effectiveSpeed + squareSize) % squareSize;
      break;
    case 'down':
      newOffset.y = (newOffset.y - effectiveSpeed + squareSize) % squareSize;
      break;
    case 'diagonal':
      newOffset.x = (newOffset.x - effectiveSpeed + squareSize) % squareSize;
      newOffset.y = (newOffset.y - effectiveSpeed + squareSize) % squareSize;
      break;
  }

  return newOffset;
};

/**
 * Calculate the hovered square coordinates based on mouse position
 *
 * @param mouseX - Mouse X coordinate relative to canvas
 * @param mouseY - Mouse Y coordinate relative to canvas
 * @param offset - Current grid offset
 * @param startPos - Starting position for grid rendering
 * @param squareSize - Size of each square in pixels
 * @returns Coordinates of the hovered square
 */
export const calculateHoveredSquare = (
  mouseX: number,
  mouseY: number,
  offset: GridOffset,
  startPos: GridOffset,
  squareSize: number
): GridOffset => {
  return {
    x: Math.floor((mouseX + offset.x - startPos.x) / squareSize),
    y: Math.floor((mouseY + offset.y - startPos.y) / squareSize)
  };
};

/**
 * Create a radial gradient for the overlay
 *
 * @param ctx - Canvas rendering context
 * @param width - Canvas width
 * @param height - Canvas height
 * @param innerColor - Inner color of the gradient
 * @param outerColor - Outer color of the gradient
 * @returns Canvas gradient
 */
export const createOverlayGradient = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  innerColor: string,
  outerColor: string
): CanvasGradient => {
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    Math.sqrt(width ** 2 + height ** 2) / 2
  );
  gradient.addColorStop(0, innerColor);
  gradient.addColorStop(1, outerColor);

  return gradient;
};

/**
 * Check if two grid offsets are equal
 *
 * @param a - First grid offset
 * @param b - Second grid offset
 * @returns True if offsets are equal
 */
export const areGridOffsetsEqual = (a: GridOffset | null, b: GridOffset | null): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.x === b.x && a.y === b.y;
};
