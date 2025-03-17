'use client';

import { cn } from '@/utils/app.utils';
import { memo } from 'react';
import {
  BASE_CLASS_NAME,
  DEFAULT_ANIMATE,
  DEFAULT_COLOR,
  DEFAULT_GRID_SIZE,
  DEFAULT_GRID_TYPE,
  DEFAULT_OPACITY
} from './grid-pattern.constants';
import { useAnimationClass, usePatternId, usePatternPath } from './grid-pattern.hooks';
import styles from './grid-pattern.module.css';
import { GridPatternProps } from './grid-pattern.types';

/**
 * GridPattern component that renders various SVG pattern backgrounds
 * with customizable appearance and optional animation.
 *
 * @param props - Component properties
 * @returns React component with SVG pattern background
 */
export const GridPatternComponent = ({
  gridType = DEFAULT_GRID_TYPE,
  gridSize = DEFAULT_GRID_SIZE,
  opacity = DEFAULT_OPACITY,
  color = DEFAULT_COLOR,
  animate = DEFAULT_ANIMATE,
  className,
  ...props
}: GridPatternProps) => {
  // Generate a unique ID for the pattern
  const patternId = usePatternId();

  // Get the appropriate animation class based on grid type
  const animationClass = useAnimationClass(animate, gridType);

  // Get the SVG path/elements for the selected pattern type
  const patternElement = usePatternPath(gridType, gridSize, color, opacity);

  return (
    <div className={cn(BASE_CLASS_NAME, className)} {...props}>
      <svg className={styles['pattern-container']}>
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width={gridSize}
            height={gridSize}
            className={cn(animationClass)}
          >
            {patternElement}
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          className={styles['pattern-rect']}
        />
      </svg>
    </div>
  );
};

// Create a memoized version of the component for better performance
export const GridPattern = memo(GridPatternComponent);

export default GridPattern;
