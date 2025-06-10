'use client';

/**
 * Switch Component - A toggle control for binary choices
 *
 * Features:
 * - Keyboard accessible using Tab and Space
 * - Screen reader accessible with ARIA support
 * - Customizable size and color scheme options
 * - Smooth transition animations
 * - Disabled state styling
 * - Focus state highlighting for keyboard navigation
 *
 * @example
 * ```tsx
 * // Basic usage
 * import { Switch } from '@/components/ui/switch';
 *
 * <Switch aria-label="Toggle dark mode" />
 *
 * // Controlled component
 * import { useState } from 'react';
 * import { Switch } from '@/components/ui/switch';
 *
 * function DarkModeToggle() {
 *   const [isDarkMode, setIsDarkMode] = useState(false);
 *   return (
 *     <Switch
 *       checked={isDarkMode}
 *       onCheckedChange={setIsDarkMode}
 *       aria-label="Toggle dark mode"
 *     />
 *   );
 * }
 * ```
 */

// Export switch components and types
export * from './switch';
export * from './switch.types';

// For backwards compatibility
import { Switch } from './switch';
export default Switch;
