'use client';

import { cn } from '@/utils/app.utils';
import { FC, memo, useMemo, useRef } from 'react';

import { CSS_CLASSES, DEFAULT_SHOOTING_STARS } from './shooting-stars.constants';
import { useShootingStars } from './shooting-stars.hooks';
import styles from './shooting-stars.module.css';
import { ShootingStarsProps } from './shooting-stars.types';

/**
 * ShootingStars component that renders animated shooting stars across the screen
 *
 * @param props - Component properties
 * @returns React component
 */
export const ShootingStars: FC<ShootingStarsProps> = memo(function ShootingStars({
  minSpeed = DEFAULT_SHOOTING_STARS.MIN_SPEED,
  maxSpeed = DEFAULT_SHOOTING_STARS.MAX_SPEED,
  minDelay = DEFAULT_SHOOTING_STARS.MIN_DELAY,
  maxDelay = DEFAULT_SHOOTING_STARS.MAX_DELAY,
  starColor = DEFAULT_SHOOTING_STARS.STAR_COLOR,
  trailColor = DEFAULT_SHOOTING_STARS.TRAIL_COLOR,
  starWidth = DEFAULT_SHOOTING_STARS.STAR_WIDTH,
  starHeight = DEFAULT_SHOOTING_STARS.STAR_HEIGHT,
  className
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Use our custom hook to manage the stars and animation
  const { star, starTransform } = useShootingStars({
    minSpeed,
    maxSpeed,
    minDelay,
    maxDelay,
    starWidth,
    starHeight
  });

  // Memoize the className
  const svgClassName = useMemo(() => {
    return cn(styles[CSS_CLASSES.CONTAINER], className);
  }, [className]);

  return (
    <svg ref={svgRef} className={svgClassName} aria-hidden="true">
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          className={styles[CSS_CLASSES.STAR]}
          fill="url(#gradient)"
          transform={starTransform}
        />
      )}
      <defs>
        <linearGradient
          id="gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          className={styles[CSS_CLASSES.GRADIENT]}
        >
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
});

ShootingStars.displayName = 'ShootingStars';

export default ShootingStars;
