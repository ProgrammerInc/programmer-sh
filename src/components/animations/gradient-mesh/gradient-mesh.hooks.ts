'use client';

import { useMemo } from 'react';

/**
 * Hook to generate gradient mesh styles based on provided colors and settings
 *
 * @param primaryColor - Primary color for the gradient
 * @param secondaryColor - Secondary color for the gradient
 * @param accentColor - Accent color for additional depth
 * @param animationSpeed - Animation speed in seconds
 * @param blurIntensity - Blur intensity for the gradient
 * @returns CSS styles object with gradient background, filter, and animation
 */
export const useGradientMeshStyle = (
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  animationSpeed: number,
  blurIntensity: number
): React.CSSProperties => {
  return useMemo(
    () => ({
      background: `
      radial-gradient(at 27% 37%, ${primaryColor} 0px, transparent 50%),
      radial-gradient(at 97% 21%, ${secondaryColor} 0px, transparent 50%),
      radial-gradient(at 52% 99%, ${accentColor} 0px, transparent 50%),
      radial-gradient(at 10% 29%, ${primaryColor} 0px, transparent 50%),
      radial-gradient(at 97% 96%, ${secondaryColor} 0px, transparent 50%),
      radial-gradient(at 33% 50%, ${accentColor} 0px, transparent 50%),
      radial-gradient(at 79% 53%, ${primaryColor} 0px, transparent 50%)
    `,
      filter: `blur(${blurIntensity}px)`,
      animation: `gradient-animation ${animationSpeed}s ease infinite`
    }),
    [primaryColor, secondaryColor, accentColor, animationSpeed, blurIntensity]
  );
};
