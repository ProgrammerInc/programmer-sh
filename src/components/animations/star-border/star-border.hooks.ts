/**
 * Custom hooks for the Star Border animation component
 */

import { useMemo } from 'react';
import { StarBorderCssVariables } from './star-border.types';
import { combineClassNames, createStarBorderCssVariables } from './star-border.utils';

/**
 * Hook to create and memoize CSS custom properties for the star border
 *
 * @param color - Star color
 * @param speed - Animation duration
 * @returns Memoized CSS variables object
 */
export const useStarBorderStyles = (color: string, speed: string): StarBorderCssVariables => {
  return useMemo(() => createStarBorderCssVariables(color, speed), [color, speed]);
};

/**
 * Hook to create and memoize combined class names
 *
 * @param baseClass - Base CSS class
 * @param additionalClass - Additional CSS classes to append
 * @returns Memoized combined class name string
 */
export const useCombinedClassName = (baseClass: string, additionalClass: string = ''): string => {
  return useMemo(() => combineClassNames(baseClass, additionalClass), [baseClass, additionalClass]);
};
