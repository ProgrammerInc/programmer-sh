'use client';

/**
 * Separator Component
 * 
 * A visual divider that separates content either horizontally or vertically.
 * Based on Radix UI's Separator primitive.
 * 
 * Features:
 * - Supports both horizontal and vertical orientations
 * - Can be set as decorative or semantic for accessibility
 * - Customizable with classes for styling and spacing
 * - Fully keyboard accessible and screen reader friendly
 * 
 * Usage examples:
 * ```
 * // Horizontal separator (default)
 * <Separator />
 * 
 * // Vertical separator
 * <Separator orientation="vertical" />
 * 
 * // With custom spacing
 * <Separator className="my-4" />
 * 
 * // Within a flex container with vertical separator
 * <div className="flex h-5 items-center space-x-4">
 *   <div>Content</div>
 *   <Separator orientation="vertical" />
 *   <div>Content</div>
 * </div>
 * 
 * // Non-decorative separator (semantic separator for screen readers)
 * <Separator decorative={false} />
 * ```
 */

// Export separator component
export * from './separator';
export * from './separator.types';

// For backwards compatibility
import { Separator } from './separator';
export default Separator;
