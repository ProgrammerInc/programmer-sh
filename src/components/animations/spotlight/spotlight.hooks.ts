/**
 * Custom hooks for the Spotlight animation component
 */

import { useMemo } from 'react';
import { DEFAULT_SETTINGS, MOTION_SETTINGS } from './spotlight.constants';

/**
 * Hook to create animation properties for the motion containers
 *
 * @param duration - Animation duration in seconds
 * @param xOffset - Animation x-axis offset in pixels
 * @returns Object containing animation properties for the motion container
 */
export const useSpotlightMotion = (
  duration = DEFAULT_SETTINGS.DURATION,
  xOffset = DEFAULT_SETTINGS.X_OFFSET
) => {
  return useMemo(
    () => ({
      initial: {
        opacity: MOTION_SETTINGS.INITIAL_OPACITY
      },
      animate: {
        opacity: MOTION_SETTINGS.ANIMATE_OPACITY
      },
      transition: {
        duration: MOTION_SETTINGS.FADE_DURATION
      },
      leftAnimation: {
        x: [0, xOffset, 0]
      },
      rightAnimation: {
        x: [0, -xOffset, 0]
      },
      animationTransition: {
        duration,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut' as const
      }
    }),
    [duration, xOffset]
  );
};

/**
 * Hook to create style properties for the original spotlight SVG
 *
 * @returns Object containing filter settings and props for the SVG elements
 */
export const useSpotlightSvgProps = () => {
  return useMemo(
    () => ({
      filterProps: {
        x: '0.860352',
        y: '0.838989',
        width: '3785.16',
        height: '2840.26',
        filterUnits: 'userSpaceOnUse',
        colorInterpolationFilters: 'sRGB' as 'sRGB' | 'auto' | 'inherit' | 'linearRGB'
      },
      ellipseProps: {
        cx: '1924.71',
        cy: '273.501',
        rx: '1924.71',
        ry: '273.501',
        transform: 'matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)'
      },
      blurProps: {
        stdDeviation: '151',
        result: 'effect1_foregroundBlur_1065_8'
      }
    }),
    []
  );
};
