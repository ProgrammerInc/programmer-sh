/**
 * GlassIcons Component
 *
 * A modern UI component featuring glass-like icon buttons with 3D hover effects.
 * Each button has a colored background, a glass front layer with blur effect,
 * and a label that appears on hover.
 *
 * Features:
 * - 3D transformations on hover
 * - Backdrop blur effects for a glass-like appearance
 * - Predefined gradient colors for common use cases
 * - Support for custom colors and classes
 * - Responsive grid layout
 *
 * @example
 * ```tsx
 * import { GlassIcons } from '@/components/ui/glass-icons';
 * import { HomeIcon, SettingsIcon } from 'some-icon-library';
 *
 * const items = [
 *   { icon: <HomeIcon className="text-white" />, color: 'blue', label: 'Home' },
 *   { icon: <SettingsIcon className="text-white" />, color: 'purple', label: 'Settings' },
 * ];
 *
 * <GlassIcons items={items} className="max-w-4xl" />
 * ```
 *
 * @module
 */

import GlassIcons from './glass-icons';

export type { GlassIconsItem, GlassIconsProps } from './glass-icons.types';
export { GlassIcons };

export default GlassIcons;
