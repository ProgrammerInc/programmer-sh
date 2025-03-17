'use client';

import { useId, useMemo } from 'react';
import { GridPatternType } from './grid-pattern.types';

/**
 * Hook to generate the path for a specific grid pattern type
 *
 * @param gridType - Type of grid pattern to render
 * @param gridSize - Size of the grid in pixels
 * @param color - Color of the grid pattern
 * @param opacity - Opacity of the grid pattern
 * @returns JSX elements for the pattern
 */
export const usePatternPath = (
  gridType: GridPatternType,
  gridSize: number,
  color: string,
  opacity: number
) => {
  return useMemo(() => {
    switch (gridType) {
      case 'dots':
        return (
          <circle cx={gridSize / 2} cy={gridSize / 2} r={1} fill={color} style={{ opacity }} />
        );

      case 'lines':
        return (
          <path
            d={`M ${gridSize} 0 L 0 0 L 0 ${gridSize}`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            style={{ opacity }}
          />
        );

      case 'squares':
        return (
          <rect
            x={gridSize / 4}
            y={gridSize / 4}
            width={gridSize / 2}
            height={gridSize / 2}
            fill={color}
            style={{ opacity }}
          />
        );

      case 'crosshatch':
        return (
          <>
            <path
              d={`M ${gridSize} 0 L 0 ${gridSize}`}
              fill="none"
              stroke={color}
              strokeWidth="0.5"
              style={{ opacity }}
            />
            <path
              d={`M 0 0 L ${gridSize} ${gridSize}`}
              fill="none"
              stroke={color}
              strokeWidth="0.5"
              style={{ opacity }}
            />
          </>
        );

      case 'diamonds':
        return (
          <path
            d={`M ${gridSize / 2} ${gridSize / 4} L ${(gridSize * 3) / 4} ${gridSize / 2} L ${gridSize / 2} ${(gridSize * 3) / 4} L ${gridSize / 4} ${gridSize / 2} Z`}
            fill={color}
            style={{ opacity }}
          />
        );

      default:
        return null;
    }
  }, [gridType, gridSize, color, opacity]);
};

/**
 * Hook to generate a unique pattern ID
 *
 * @returns Unique pattern ID string
 */
export const usePatternId = () => {
  return useId();
};

/**
 * Hook to determine animation class based on grid type
 *
 * @param animate - Whether to animate the pattern
 * @param gridType - Type of grid pattern
 * @returns CSS class string for animation
 */
export const useAnimationClass = (animate: boolean, gridType: GridPatternType) => {
  return useMemo(() => {
    if (!animate) return '';

    let animationClass = '';

    switch (gridType) {
      case 'dots':
        animationClass = 'animate-[dots-shift_20s_linear_infinite]';
        break;
      case 'lines':
        animationClass = 'animate-[lines-shift_20s_linear_infinite]';
        break;
      case 'squares':
        animationClass = 'animate-[squares-shift_20s_linear_infinite]';
        break;
      case 'crosshatch':
        animationClass = 'animate-[crosshatch-shift_20s_linear_infinite]';
        break;
      case 'diamonds':
        animationClass = 'animate-[diamonds-shift_20s_linear_infinite]';
        break;
      default:
        animationClass = '';
    }

    return animationClass ? `${animationClass} origin-center` : '';
  }, [animate, gridType]);
};
