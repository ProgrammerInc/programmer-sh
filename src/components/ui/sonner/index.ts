/**
 * Sonner Toast Notification Component
 *
 * A toast notification system that integrates Sonner with the application's styling.
 * Provides a consistent way to display toast notifications throughout the application.
 *
 * Features:
 * - Consistent styling with the application theme
 * - Multiple positions (top, bottom, left, right, center)
 * - Rich colors for different notification types (success, error, info)
 * - Supports actions and cancel buttons
 * - Customizable duration and animation
 * - Accessible toast notifications
 *
 * Based on Sonner: {@link https://sonner.emilkowal.ski/ Sonner Documentation}
 *
 * @example
 * ```tsx
 * // Basic usage (add this once in your app)
 * import { Toaster } from '@/components/ui/sonner';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       {children}
 *       <Toaster />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Displaying toasts in components
 * import { toast } from 'sonner';
 *
 * function SuccessButton() {
 *   return (
 *     <button onClick={() => toast.success('Operation completed successfully')}>
 *       Submit
 *     </button>
 *   );
 * }
 * ```
 */

import Toaster from './sonner';
export * from './sonner';
export * from './sonner.types';

// For backwards compatibility
export default Toaster;
