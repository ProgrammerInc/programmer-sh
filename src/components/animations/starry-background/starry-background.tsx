'use client';

import { memo, useRef } from 'react';

import { DEFAULT_SETTINGS } from './starry-background.constants';
import { useParallaxEffect, useStars } from './starry-background.hooks';
import styles from './starry-background.module.css';
import { StarryBackgroundProps } from './starry-background.types';
import { calculateParallaxTransform, calculateStarStyle } from './starry-background.utils';

/**
 * StarryBackground component creates an animated background with stars and optional parallax effect
 *
 * @param props - Component properties
 * @returns A React component with animated stars background
 */
export const StarryBackgroundComponent = ({
  backgroundColor = DEFAULT_SETTINGS.BACKGROUND_COLOR,
  className = '',
  children,
  noiseOpacity = DEFAULT_SETTINGS.NOISE_OPACITY,
  enableParallax = DEFAULT_SETTINGS.ENABLE_PARALLAX
}: StarryBackgroundProps) => {
  // Reference to the container for parallax effect
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Generate stars with custom hook
  const stars = useStars(DEFAULT_SETTINGS.STAR_COUNT);

  // Handle parallax effect with custom hook
  const mousePosition = useParallaxEffect(parallaxRef, enableParallax);

  return (
    <div
      ref={parallaxRef}
      className={`${styles['starry-background-container']} ${className}`}
      style={{ backgroundColor }}
    >
      {/* Noise overlay */}
      <div
        className={styles['starry-background-noise']}
        style={{
          opacity: noiseOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(400%) brightness(100%)'
        }}
      />

      {/* Stars grid */}
      <div className={styles['starry-background-stars-grid']}>
        {stars.map((props, i) => (
          <div
            key={i}
            className={styles['starry-background-star-container']}
            style={
              enableParallax
                ? calculateParallaxTransform(mousePosition, props.parallaxLayer)
                : undefined
            }
          >
            <div className={styles['starry-background-star']} style={calculateStarStyle(props)} />
          </div>
        ))}
      </div>

      {/* Content */}
      {children && <div className={styles['starry-background-content']}>{children}</div>}
    </div>
  );
};

/**
 * Memoized StarryBackground component for optimal performance
 */
export const StarryBackground = memo(StarryBackgroundComponent);

/**
 * Set display name for debugging purposes
 */
StarryBackground.displayName = 'StarryBackground';

export default StarryBackground;
