/**
 * Skeleton Component
 * 
 * A placeholder UI component that animates while content is loading.
 * 
 * Features:
 * - Customizable dimensions and shape through className prop
 * - Multiple preset variants (default, circle, avatar, text, button, card)
 * - Optional pulsing animation
 * - Polymorphic component (can render as any HTML element)
 * - Accessible loading state indicators
 * - Can be composed to create complex loading UI patterns
 * 
 * Usage examples:
 * ```tsx
 * // Basic usage
 * <Skeleton className="h-12 w-full" />
 * 
 * // With variant
 * <Skeleton variant="avatar" />
 * 
 * // With custom element
 * <Skeleton as="span" className="h-4 w-[250px]" />
 * 
 * // Disable animation
 * <Skeleton pulse={false} className="h-4 w-full" />
 * 
 * // Card skeleton with composition
 * <div className="space-y-2">
 *   <Skeleton variant="card" className="h-40" />
 *   <Skeleton variant="text" className="w-full" />
 *   <Skeleton variant="text" className="w-3/4" />
 * </div>
 * ```
 */

// Export skeleton components
export * from './skeleton';

// Export skeleton types
export * from './skeleton.types';
