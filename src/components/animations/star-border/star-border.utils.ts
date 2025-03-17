/**
 * Utility functions for the Star Border animation component
 */

import { StarBorderCssVariables } from './star-border.types';

/**
 * Creates CSS variables for the star border animation
 *
 * @param color - Star color
 * @param speed - Animation duration
 * @returns CSS variables object with custom properties
 */
export const createStarBorderCssVariables = (
  color: string,
  speed: string
): StarBorderCssVariables => ({
  '--star-color': color,
  '--animation-duration': speed
});

/**
 * Combines class names for the component
 *
 * @param baseClass - Base CSS class name
 * @param additionalClass - Additional CSS class names to append
 * @returns Combined class name string
 */
export const combineClassNames = (baseClass: string, additionalClass: string = ''): string => {
  if (!additionalClass) return baseClass;
  return `${baseClass} ${additionalClass}`;
};
