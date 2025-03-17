'use client';

import { memo } from 'react';
import { StarsBackground } from '..';
import { DEFAULT_AURORA_CONFIG } from './aurora-background.constants';
import { useAuroraClassName, useContainerClassName } from './aurora-background.hooks';
import styles from './aurora-background.module.css';
import { AuroraBackgroundProps } from './aurora-background.types';
import { cn } from './aurora-background.utils';

/**
 * Aurora Background component that creates a colorful aurora effect with optional stars
 *
 * This component renders a vibrant aurora effect in the background with customizable
 * gradient colors and optional starry background. Designed to create immersive
 * atmospheric backgrounds for hero sections, landing pages, or special UI elements.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <AuroraBackground>
 *   <h1>Welcome to my site</h1>
 * </AuroraBackground>
 *
 * // Custom configuration
 * <AuroraBackground
 *   showRadialGradient={false}
 *   withStars={true}
 *   className="my-custom-class"
 *   ariaLabel="Decorative aurora background"
 * >
 *   <div>Content goes here</div>
 * </AuroraBackground>
 * ```
 */
const AuroraBackground = memo(
  ({
    className,
    children,
    showRadialGradient = true,
    withStars = true,
    ariaLabel = 'Decorative aurora background effect',
    ...props
  }: AuroraBackgroundProps) => {
    // Use custom hooks for memoized class names
    const containerClassName = useContainerClassName(className);
    const auroraClassName = useAuroraClassName(
      showRadialGradient,
      DEFAULT_AURORA_CONFIG.blurAmount,
      DEFAULT_AURORA_CONFIG.opacity
    );

    // Alternative approach using CSS modules
    const containerClassModules = cn(styles['aurora-container'], className);
    const auroraClassModules = cn(
      styles['aurora-effect'],
      showRadialGradient && styles['aurora-effect-masked']
    );

    return (
      <main>
        <div className={containerClassName} role="region" aria-label={ariaLabel} {...props}>
          <div className={styles.wrapper}>
            <div className={auroraClassName} aria-hidden="true"></div>
          </div>
          {children}
          {withStars && <StarsBackground className="stars-background" aria-hidden="true" />}
        </div>
      </main>
    );
  }
);

// Add displayName to help with debugging
AuroraBackground.displayName = 'AuroraBackground';

// Export both as default and named export for different import patterns
export { AuroraBackground };
export default AuroraBackground;
