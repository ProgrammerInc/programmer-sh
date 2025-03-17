'use client';

import { StarsBackground } from '@/components/animations/stars-background';
import { FC, memo } from 'react';
import { SVG_CONFIG } from './spotlight.constants';
import { useSpotlightSvgProps } from './spotlight.hooks';
import styles from './spotlight.module.css';
import { SpotlightProps } from './spotlight.types';
import { createSpotlightSvgClasses } from './spotlight.utils';

/**
 * A component that renders a spotlight/glow effect with optional stars background
 *
 * @example
 * <Spotlight
 *   fill="#4c1d95"
 *   withStars={true}
 *   className="opacity-70"
 * />
 *
 * @param {SpotlightProps} props - The component props
 * @returns The Spotlight component with optional stars background
 */
export const SpotlightComponent: FC<SpotlightProps> = ({
  className,
  fill = SVG_CONFIG.DEFAULT_FILL,
  withStars = false,
  ...svgProps
}: SpotlightProps) => {
  // Get SVG props from hook
  const { filterProps, ellipseProps, blurProps } = useSpotlightSvgProps();

  return (
    <div className={styles['spotlight-container']}>
      <svg
        className={createSpotlightSvgClasses(className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={SVG_CONFIG.VIEW_BOX}
        fill="none"
        {...svgProps}
      >
        <g filter={`url(#${SVG_CONFIG.FILTER_ID})`}>
          <ellipse
            {...ellipseProps}
            fill={fill || SVG_CONFIG.DEFAULT_FILL}
            fillOpacity={SVG_CONFIG.FILL_OPACITY}
          />
        </g>
        <defs>
          <filter
            id={SVG_CONFIG.FILTER_ID}
            x={filterProps.x}
            y={filterProps.y}
            width={filterProps.width}
            height={filterProps.height}
            filterUnits={filterProps.filterUnits}
            colorInterpolationFilters={filterProps.colorInterpolationFilters}
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation={blurProps.stdDeviation} result={blurProps.result} />
          </filter>
        </defs>
      </svg>
      {withStars && <StarsBackground className={styles['spotlight-stars']} />}
    </div>
  );
};

/**
 * Memoized Spotlight component for optimal performance
 */
export const Spotlight = memo(SpotlightComponent);

/**
 * Set display name for debugging purposes
 */
Spotlight.displayName = 'Spotlight';

export default Spotlight;
