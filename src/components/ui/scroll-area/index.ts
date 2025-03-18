/**
 * ScrollArea Component
 * 
 * A customizable scrollable area with stylized scrollbars that integrates with the OS.
 * Built on top of Radix UI's ScrollArea primitive for accessibility and customization.
 * 
 * Features:
 * - Custom styled scrollbars that appear when content overflows
 * - Automatically hides scrollbars when not in use
 * - Supports both vertical and horizontal scrolling
 * - Fully accessible with keyboard navigation
 * - Smooth scrolling animations
 * - Optimized performance with React.memo
 * 
 * @example
 * ```tsx
 * import { ScrollArea } from '@/components/ui/scroll-area';
 * 
 * export function Example() {
 *   return (
 *     <ScrollArea className="h-72 w-48 rounded-md border p-4">
 *       <div>Long content that needs scrolling</div>
 *     </ScrollArea>
 *   );
 * }
 * ```
 */

// Export scroll-area components
export * from './scroll-area';
export * from './scroll-area.types';

// For backwards compatibility
import { ScrollArea } from './scroll-area';
export default ScrollArea;
