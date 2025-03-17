/**
 * Hooks for the BeamPortal component
 */

import { useCallback, useMemo } from 'react';
import { PATTERN_STYLES } from './beam-portal.constants';
import { PortalPattern } from './beam-portal.types';

/**
 * Hook to generate beam positions based on count and randomization
 *
 * @param count - Number of beams to generate
 * @param randomize - Whether to use random distribution
 * @returns Function to get position for each beam index
 */
export const useBeamPositions = (count: number, randomize?: boolean) => {
  return useCallback(
    (index: number) => {
      if (!randomize) {
        return index * (360 / count);
      }
      const hash = (index * 1337) % 360;
      return hash;
    },
    [count, randomize]
  );
};

/**
 * Hook to generate beam styles based on pattern and animation settings
 *
 * @param getPosition - Function to calculate beam position angles
 * @param pattern - Animation pattern type
 * @param settings - Animation speed, delay and other settings
 * @param options - Additional animation options
 * @returns Function to get style for each beam index
 */
export const useBeamStyles = (
  getPosition: (index: number) => number,
  pattern: PortalPattern,
  settings: { speed: number; opacity: number; delay: number },
  options: {
    reverse?: boolean;
    shimmer?: boolean;
    pulse?: boolean;
    blurAmount?: number;
  }
) => {
  const { reverse, shimmer, pulse, blurAmount } = options;

  return useCallback(
    (index: number) => {
      const angle = getPosition(index);
      const delay = settings.delay * index;
      const patternStyle = PATTERN_STYLES[pattern];
      const animations = [
        `${patternStyle.animation} ${settings.speed}s cubic-bezier(0.4, 0.26, 0, 0.97) ${delay}s infinite ${
          reverse ? 'reverse' : ''
        }`
      ];

      if (pulse) {
        animations.push(`beam-pulse ${settings.speed * 1.5}s ease-in-out ${delay}s infinite`);
      }
      if (shimmer) {
        animations.push(`beam-shimmer ${settings.speed}s linear ${delay}s infinite`);
      }

      return {
        '--beam-angle': `${angle}deg`,
        '--offset': '0px',
        '--wave-offset': '0px',
        '--pulse-scale': '1',
        '--zigzag-offset': '0px',
        transform: patternStyle.transform,
        animation: animations.join(', '),
        filter: `blur(${blurAmount || 6}px)`
      } as React.CSSProperties;
    },
    [getPosition, pattern, pulse, reverse, settings, shimmer, blurAmount]
  );
};

/**
 * Hook to generate rotation style for beam containers
 *
 * @param rotateSpeed - Speed of rotation in seconds per revolution
 * @param reverse - Whether to reverse the rotation direction
 * @returns CSS style object with animation properties
 */
export const useRotationStyle = (rotateSpeed?: number, reverse?: boolean) => {
  return useMemo(() => {
    return {
      animation: rotateSpeed
        ? `spin ${rotateSpeed}s linear infinite${reverse ? ' reverse' : ''}`
        : undefined
    };
  }, [rotateSpeed, reverse]);
};
