'use client';

import { memo, useRef } from 'react';

import { DEFAULT_SETTINGS } from './stars-background.constants';
import { useAnimationLoop, useCanvasSetup, useStars } from './stars-background.hooks';
import styles from './stars-background.module.css';
import { StarsBackgroundProps } from './stars-background.types';
import { createClassNames } from './stars-background.utils';

/**
 * StarsBackground component that renders an animated starry background on a canvas
 *
 * Creates a canvas with randomly generated stars that can twinkle based on configuration
 *
 * @param props - Component properties
 * @returns A React component with animated stars on a canvas
 */
export const StarsBackgroundComponent = ({
  starDensity = DEFAULT_SETTINGS.STAR_DENSITY,
  allStarsTwinkle = DEFAULT_SETTINGS.ALL_STARS_TWINKLE,
  twinkleProbability = DEFAULT_SETTINGS.TWINKLE_PROBABILITY,
  minTwinkleSpeed = DEFAULT_SETTINGS.MIN_TWINKLE_SPEED,
  maxTwinkleSpeed = DEFAULT_SETTINGS.MAX_TWINKLE_SPEED,
  className
}: StarsBackgroundProps) => {
  // Ref for the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Setup canvas dimensions and handle resizing
  const { dimensions, isSetup } = useCanvasSetup(canvasRef);

  // Generate and manage stars
  const { stars, setStars } = useStars(
    dimensions,
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed
  );

  // Setup animation loop for rendering stars
  useAnimationLoop(canvasRef, stars, setStars);

  // Create combined class names for the canvas
  const canvasClassName = createClassNames(styles['stars-background-canvas'], className);

  return <canvas ref={canvasRef} className={canvasClassName} />;
};

/**
 * Memoized StarsBackground component for optimal performance
 */
export const StarsBackground = memo(StarsBackgroundComponent);

/**
 * Set display name for debugging purposes
 */
StarsBackground.displayName = 'StarsBackground';

export default StarsBackground;
