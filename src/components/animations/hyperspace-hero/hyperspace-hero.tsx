'use client';

import { cn } from '@/utils/app.utils';
import { memo, useEffect, useRef } from 'react';
import {
  DEFAULT_CLASS_NAME,
  DEFAULT_SPEED,
  DEFAULT_STAR_COUNT,
  DEFAULT_TEXT,
  DEFAULT_TEXT_COLOR
} from './hyperspace-hero.constants';
import { useDimensions, useHyperspaceAnimation, useStars } from './hyperspace-hero.hooks';
import styles from './hyperspace-hero.module.css';
import { HyperspaceHeroProps } from './hyperspace-hero.types';

/**
 * HyperspaceHero component that renders a starfield hyperspace animation with centered text
 *
 * @param props - Component properties
 * @returns React component with hyperspace animation
 */
export const HyperspaceHeroComponent = ({
  text = DEFAULT_TEXT,
  textColor = DEFAULT_TEXT_COLOR,
  starCount = DEFAULT_STAR_COUNT,
  speed = DEFAULT_SPEED,
  className = DEFAULT_CLASS_NAME
}: HyperspaceHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use our custom hooks to manage the animation
  const { dimensions, handleResize } = useDimensions(canvasRef);
  const { starsRef, initStars } = useStars(starCount, canvasRef, dimensions);
  const { animate, animationRef } = useHyperspaceAnimation(canvasRef, starsRef, speed);

  // Initialize animation when dimensions are set
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      animate();
    }
  }, [dimensions, animate]);

  // Set up resize listener and initialize
  useEffect(() => {
    // Initial size adjustment
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup resize listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // Initialize stars when dimensions change and handle cleanup
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initStars();

      // Store ref value to avoid issues with stale refs in cleanup
      const currentAnimRef = animationRef;

      return () => {
        if (currentAnimRef.current) {
          cancelAnimationFrame(currentAnimRef.current);
        }
      };
    }
  }, [dimensions, initStars, animationRef]);

  return (
    <div className={cn(styles.container, className)}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles['text-container']}>
        <h1
          className={styles.text}
          style={{
            backgroundImage: textColor,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.1)'
          }}
        >
          {text}
        </h1>
      </div>
    </div>
  );
};

// Create a memoized version of the component for better performance
export const HyperspaceHero = memo(HyperspaceHeroComponent);

export default HyperspaceHero;
