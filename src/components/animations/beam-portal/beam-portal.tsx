'use client';

import { cn } from '@/utils/app.utils';
import { memo, useMemo } from 'react';
import { INTENSITY_SETTINGS, PORTAL_COLOR_SCHEMES } from './beam-portal.constants';
import styles from './beam-portal.module.css';
import { BeamPortalProps } from './beam-portal.types';
import { BeamRing } from './beam-ring';

/**
 * BeamPortal creates a visually stunning beam effect around its children
 * with configurable colors, patterns, and animation styles.
 *
 * @param props - Component properties
 * @returns Memoized React component with beam portal effects
 */
const BeamPortal = memo(function BeamPortal({
  className,
  colorScheme = 'aurora',
  pattern = 'radial',
  intensity = 'active',
  reverse = false,
  shimmer = false,
  pulse = false,
  randomize = false,
  blurAmount = 6,
  children,
  ...props
}: BeamPortalProps) {
  // Memoize the color selection based on the color scheme
  const colors = useMemo(() => {
    const scheme =
      PORTAL_COLOR_SCHEMES[colorScheme as keyof typeof PORTAL_COLOR_SCHEMES] ||
      PORTAL_COLOR_SCHEMES.default;
    return {
      outer: {
        base: scheme.tertiary,
        glow: scheme.secondary
      },
      inner: {
        base: scheme.secondary,
        glow: scheme.primary
      },
      center: {
        base: scheme.primary,
        glow: scheme.primary
      }
    };
  }, [colorScheme]);

  // Get settings from intensity
  const intensityKey = typeof intensity === 'string' ? intensity : 'active';
  const settings = INTENSITY_SETTINGS[intensityKey as keyof typeof INTENSITY_SETTINGS];

  // Container style with blurred background
  const containerStyle = useMemo(
    () => ({
      background: `radial-gradient(circle, rgba(${colors.center.base}, 0.15) 0%, rgba(0,0,0,0) 70%)`
    }),
    [colors]
  );

  return (
    <div
      className={cn(
        styles.container,
        className
      )}
      {...props}
    >
      {/* Background portal effect */}
      <div className={styles['ring-container']}>
        {/* Outer ring */}
        <BeamRing
          colors={colors.outer}
          count={settings.count}
          radius="100%"
          settings={settings}
          pattern={pattern}
          reverse={reverse}
          shimmer={shimmer}
          pulse={pulse}
          randomize={randomize}
          blurAmount={blurAmount}
          rotateSpeed={settings.speed * 15}
        />

        {/* Inner ring */}
        <BeamRing
          colors={colors.inner}
          count={settings.count * 2}
          radius="50%"
          settings={{
            ...settings,
            speed: settings.speed * 0.8,
            delay: settings.delay * 0.5
          }}
          pattern={pattern}
          reverse={!reverse}
          shimmer={shimmer}
          pulse={pulse}
          randomize={randomize}
          blurAmount={blurAmount}
          rotateSpeed={settings.speed * 10}
        />

        {/* Center glow */}
        <div
          className={styles['center-glow']}
          style={containerStyle}
        />
      </div>

      {/* Content */}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
});

// Add displayName to help with debugging
BeamPortal.displayName = 'BeamPortal';

export { BeamPortal };
export default BeamPortal;
