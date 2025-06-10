'use client';

import * as React from 'react';

import { cn } from '@/utils/app.utils';
import styles from './glass-icons.module.css';
import { GlassIconProps, GlassIconsProps } from './glass-icons.types';

/**
 * Mapping of predefined color names to gradient values
 * Using proper hue-degree-notation for CSS compliance
 */
const gradientMapping: Record<string, string> = {
  blue: 'linear-gradient(hsl(223deg, 90%, 50%), hsl(208deg, 90%, 50%))',
  purple: 'linear-gradient(hsl(283deg, 90%, 50%), hsl(268deg, 90%, 50%))',
  red: 'linear-gradient(hsl(3deg, 90%, 50%), hsl(348deg, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253deg, 90%, 50%), hsl(238deg, 90%, 50%))',
  orange: 'linear-gradient(hsl(43deg, 90%, 50%), hsl(28deg, 90%, 50%))',
  green: 'linear-gradient(hsl(123deg, 90%, 40%), hsl(108deg, 90%, 40%))'
};

/**
 * GlassIcon Component
 *
 * Individual glass icon button with 3D hover effect.
 */
const GlassIcon = React.memo(function GlassIcon({
  item,
  getBackgroundStyle
}: GlassIconProps): JSX.Element {
  return (
    <button
      type="button"
      aria-label={item.label}
      className={cn(styles['icon-button'], item.customClass)}
    >
      {/* Back layer */}
      <span className={styles['back-layer']} style={getBackgroundStyle(item.color)}></span>

      {/* Front layer */}
      <span className={styles['front-layer']}>
        <span className={styles['icon-wrapper']} aria-hidden="true">
          {item.icon}
        </span>
      </span>

      {/* Label */}
      <span className={styles['icon-label']}>{item.label}</span>
    </button>
  );
});

GlassIcon.displayName = 'GlassIcon';

/**
 * GlassIcons Component
 *
 * A grid of glass-like icon buttons with 3D hover effects.
 * Each button has a colored background, a glass front layer, and a label.
 *
 * @example
 * ```tsx
 * const items = [
 *   { icon: <HomeIcon />, color: 'blue', label: 'Home' },
 *   { icon: <SettingsIcon />, color: 'purple', label: 'Settings' },
 * ];
 *
 * <GlassIcons items={items} className="max-w-4xl" />
 * ```
 */
const GlassIcons = React.memo(function GlassIcons({
  items,
  className
}: GlassIconsProps): JSX.Element {
  /**
   * Returns the background style based on the color name or value
   */
  const getBackgroundStyle = React.useCallback((color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  }, []);

  return (
    <div className={cn(styles['icons-container'], className)}>
      {items.map((item, index) => (
        <GlassIcon key={index} item={item} getBackgroundStyle={getBackgroundStyle} />
      ))}
    </div>
  );
});

GlassIcons.displayName = 'GlassIcons';

export { GlassIcons };
export default GlassIcons;
