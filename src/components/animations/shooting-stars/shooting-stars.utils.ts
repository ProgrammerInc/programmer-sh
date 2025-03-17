import { RandomStartPoint } from './shooting-stars.types';

/**
 * Get a random starting point and angle for a shooting star
 * @param width - Current viewport width
 * @param height - Current viewport height
 * @returns An object with x, y coordinates and angle
 */
export const getRandomStartPoint = (width = 0, height = 0): RandomStartPoint => {
  // Use provided dimensions or fallback to small default values
  const viewportWidth = width || 100;
  const viewportHeight = height || 100;

  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * viewportWidth;

  switch (side) {
    case 0: // top edge
      return { x: offset, y: 0, angle: 45 };
    case 1: // right edge
      return { x: viewportWidth, y: offset, angle: 135 };
    case 2: // bottom edge
      return { x: offset, y: viewportHeight, angle: 225 };
    case 3: // left edge
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};
