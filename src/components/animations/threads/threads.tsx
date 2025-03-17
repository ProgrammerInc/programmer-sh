'use client';

import { memo, useRef } from 'react';

import { StarsBackground } from '..';
import { DEFAULT_SETTINGS } from './threads.constants';
import { useThreadsAnimation } from './threads.hooks';
import styles from './threads.module.css';
import { ThreadsProps } from './threads.types';

/**
 * Threads component creates an interactive wave-like thread animation using WebGL
 *
 * The component renders animated thread lines that respond to mouse movement
 * and can be customized with different colors and behavior settings.
 *
 * @param props - Component properties
 * @returns A React component with interactive thread animation
 */
export const ThreadsComponent = ({
  color = DEFAULT_SETTINGS.COLOR,
  amplitude = DEFAULT_SETTINGS.AMPLITUDE,
  distance = DEFAULT_SETTINGS.DISTANCE,
  enableMouseInteraction = DEFAULT_SETTINGS.ENABLE_MOUSE_INTERACTION,
  withStars = DEFAULT_SETTINGS.WITH_STARS,
  ...rest
}: ThreadsProps) => {
  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup and run the threads WebGL animation
  useThreadsAnimation(containerRef, color, amplitude, distance, enableMouseInteraction);

  return (
    <div ref={containerRef} className={styles['threads-container']} {...rest}>
      {withStars && (
        <div className={styles['threads-stars-wrapper']}>
          <StarsBackground starDensity={0.0003} allStarsTwinkle={true} twinkleProbability={0.8} />
        </div>
      )}
    </div>
  );
};

/**
 * Memoized Threads component for optimal performance
 */
export const Threads = memo(ThreadsComponent);

/**
 * Set display name for debugging purposes
 */
Threads.displayName = 'Threads';

export default Threads;
