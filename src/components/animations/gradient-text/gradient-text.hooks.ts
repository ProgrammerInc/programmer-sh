'use client';

import { useMemo } from 'react';

/**
 * Hook that generates the gradient style for text based on colors and animation speed
 *
 * @param colors - Array of colors for the gradient
 * @param animationSpeed - Animation duration in seconds
 * @returns Style object with background image and animation duration
 */
export const useGradientStyle = (colors: string[], animationSpeed: number): React.CSSProperties => {
  return useMemo(
    () => ({
      backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
      animationDuration: `${animationSpeed}s`
    }),
    [colors, animationSpeed]
  );
};

/**
 * Hook that generates the text gradient style with background clip
 *
 * @param gradientStyle - Base gradient style
 * @returns Text gradient style object with additional properties
 */
export const useTextGradientStyle = (gradientStyle: React.CSSProperties): React.CSSProperties => {
  return useMemo(
    () => ({
      ...gradientStyle,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      backgroundSize: '300% 100%'
    }),
    [gradientStyle]
  );
};

/**
 * Hook that generates the border gradient style
 *
 * @param gradientStyle - Base gradient style
 * @returns Border gradient style object
 */
export const useBorderGradientStyle = (gradientStyle: React.CSSProperties): React.CSSProperties => {
  return useMemo(
    () => ({
      ...gradientStyle,
      backgroundSize: '300% 100%'
    }),
    [gradientStyle]
  );
};

/**
 * Hook that generates the inner border style
 *
 * @returns Inner border style object with positioning properties
 */
export const useInnerBorderStyle = (): React.CSSProperties => {
  return useMemo(
    () => ({
      width: 'calc(100% - 2px)',
      height: 'calc(100% - 2px)',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }),
    []
  );
};
