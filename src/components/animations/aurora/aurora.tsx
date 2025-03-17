'use client';

import { memo } from 'react';
import { StarsBackground } from '..';
import { DEFAULT_AURORA_CONFIG } from './aurora.constants';
import { useAurora } from './aurora.hooks';
import styles from './aurora.module.css';
import { AuroraProps } from './aurora.types';

/**
 * Aurora component that renders a smooth, colorful aurora effect with WebGL
 *
 * This component creates a beautiful aurora borealis effect using WebGL shaders.
 * It's highly customizable with props for colors, animation speed, and intensity.
 * Can optionally include a starry background for a complete night sky effect.
 *
 * @example
 * ```tsx
 * // Basic usage with default values
 * <Aurora />
 *
 * // Customized aurora with specific colors and effects
 * <Aurora
 *   backgroundColor="#050505"
 *   colorStops={['#00d8ff', '#7cff67', '#00d8ff']}
 *   amplitude={1.2}
 *   blend={0.6}
 *   withStars={true}
 * />
 *
 * // Controlled animation speed
 * <Aurora
 *   speed={0.5}
 *   colorStops={['#ff5e62', '#ff9966', '#ffcc33']}
 * />
 * ```
 *
 * @returns React component with aurora animation
 */
export const Aurora = memo(function Aurora(props: AuroraProps) {
  const { withStars = DEFAULT_AURORA_CONFIG.withStars } = props;

  // Use the custom hook to manage WebGL rendering and animation
  const { containerRef } = useAurora(props);

  return (
    <div className={styles['aurora-container']} ref={containerRef}>
      {withStars && <StarsBackground />}
    </div>
  );
});

// Add display name for better debugging
Aurora.displayName = 'Aurora';

export default Aurora;
