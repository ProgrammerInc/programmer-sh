/**
 * Popover Component
 *
 * A popover is a non-modal dialog that floats around its disclosure element.
 * It's commonly used for displaying additional information or actions when users
 * click or hover over a trigger element.
 *
 * This component is built on top of Radix UI's Popover primitive and provides
 * a styled, accessible implementation with animations and proper positioning.
 *
 * Features:
 * - Accessible: Follows WAI-ARIA Popover/Dialog pattern
 * - Animation: Smooth entry/exit animations
 * - Positioning: Smart positioning to ensure it stays in view
 * - Keyboard Support: Fully keyboard navigable
 * - Focus Management: Proper focus management for accessibility
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>
 *     <h3>Popover Title</h3>
 *     <p>This is some popover content</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * With custom trigger:
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">Open Menu</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <div className="grid gap-4">
 *       <div className="space-y-2">
 *         <h4 className="font-medium leading-none">Settings</h4>
 *         <p className="text-sm text-muted-foreground">
 *           Configure your notification preferences
 *         </p>
 *       </div>
 *     </div>
 *   </PopoverContent>
 * </Popover>
 * ```
 */

// Export all components and types
export * from './popover';
export * from './popover.types';

// For backwards compatibility
import { Popover } from './popover';
export default Popover;
