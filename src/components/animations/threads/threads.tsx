'use client';

import { memo, useRef } from 'react';

import { StarsBackground } from '..';
import { DEFAULT_SETTINGS } from './threads.constants';
import { useThreadsAudio, useIsThreadsAudioAvailable } from './use-threads-audio.hook';
import { useThreadsAnimation } from './threads.hooks';
import styles from './threads.module.css';
import { ThreadsProps } from './threads.types';

/**
 * Threads component creates an interactive wave-like thread animation using WebGL
 *
 * The component renders animated thread lines that respond to mouse movement
 * and can be customized with different colors and behavior settings.
 * Now supports audio reactivity to create dynamic animations based on sound.
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
  audioOptions,
  audioData,
  ...rest
}: ThreadsProps) => {
  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check if the audio context is available and get audio context data
  const hasAudioContext = useIsThreadsAudioAvailable();
  const audioContext = useThreadsAudio();
  
  // Initialize audio-related variables with defaults
  let contextAudioOptions = undefined;
  let contextAudioData = undefined;
  
  // Only use audio context values if it's available and enabled
  // Since useThreadsAudio might throw, we have to try/catch
  // but the useIsThreadsAudioAvailable hook will ensure this is safe
  if (hasAudioContext && audioContext && audioContext.audioEnabled) {
    contextAudioOptions = audioContext.audioOptions;
    contextAudioData = audioContext.manualAudioData;
  }

  // Use explicitly provided options or context options if available
  const effectiveAudioOptions = audioOptions || contextAudioOptions;
  const effectiveAudioData = audioData || contextAudioData;

  // Setup and run the threads WebGL animation with audio reactivity
  useThreadsAnimation(
    containerRef, 
    color, 
    amplitude, 
    distance, 
    enableMouseInteraction,
    effectiveAudioOptions,
    effectiveAudioData
  );

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
