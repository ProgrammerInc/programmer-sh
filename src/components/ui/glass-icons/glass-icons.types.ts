/**
 * @file glass-icons.types.ts
 * @description Type definitions for the GlassIcons component.
 */
import React from 'react';

/**
 * Represents an item in the GlassIcons component.
 * Each item consists of an icon, color, label, and optional custom class.
 *
 * @example
 * ```tsx
 * const glassIconItem: GlassIconsItem = {
 *   icon: <HomeIcon className="w-5 h-5 text-white" />,
 *   color: 'blue',
 *   label: 'Home',
 *   customClass: 'hover:scale-110'
 * };
 * ```
 */
export interface GlassIconsItem {
  /** The icon element to be displayed */
  icon: React.ReactElement;

  /** Color for the icon background (can be a predefined color or custom value) */
  color: string;

  /** Text label displayed below the icon */
  label: string;

  /** Optional custom class to apply to the button */
  customClass?: string;
}

/**
 * Props for the GlassIcons component.
 *
 * @example
 * ```tsx
 * <GlassIcons
 *   items={iconItems}
 *   className="max-w-3xl"
 * />
 * ```
 */
export interface GlassIconsProps {
  /** Array of GlassIconsItem objects to display */
  items: GlassIconsItem[];

  /** Optional CSS class to apply to the container */
  className?: string;
}

/**
 * Props for the GlassIcon component.
 *
 * @internal
 */
export interface GlassIconProps {
  /** The item to display */
  item: GlassIconsItem;

  /** Function to get the background style based on color */
  getBackgroundStyle: (color: string) => React.CSSProperties;
}
