'use client';

import { cn } from '@/utils/app.utils';
import { memo } from 'react';
import {
  DEFAULT_ACCENT_COLOR,
  DEFAULT_ANIMATION_SPEED,
  DEFAULT_BLUR_INTENSITY,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR
} from './gradient-mesh.constants';
import { useGradientMeshStyle } from './gradient-mesh.hooks';
import { GradientMeshProps } from './gradient-mesh.types';

/**
 * GradientMesh creates a visually appealing background with animated gradients
 * that blend between primary, secondary, and accent colors.
 *
 * @param props - Component properties
 * @returns Memoized React component with animated gradient background
 */
const GradientMesh = memo(function GradientMesh({
  primaryColor = DEFAULT_PRIMARY_COLOR,
  secondaryColor = DEFAULT_SECONDARY_COLOR,
  accentColor = DEFAULT_ACCENT_COLOR,
  animationSpeed = DEFAULT_ANIMATION_SPEED,
  blurIntensity = DEFAULT_BLUR_INTENSITY,
  className,
  ...props
}: GradientMeshProps) {
  // Use custom hook to generate the gradient style
  const gradientStyle = useGradientMeshStyle(
    primaryColor,
    secondaryColor,
    accentColor,
    animationSpeed,
    blurIntensity
  );

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)} {...props}>
      <div className="absolute inset-0 z-0" style={gradientStyle} />
    </div>
  );
});

// Add named export for index.ts compatibility
export { GradientMesh };

export default GradientMesh;
