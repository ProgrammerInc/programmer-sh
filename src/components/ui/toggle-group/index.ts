/**
 * ToggleGroup UI Component
 *
 * A set of two-state buttons that can be toggled on or off, built on Radix UI's ToggleGroup primitive.
 * Used for groups of related toggles, such as text alignment options or formatting controls.
 *
 * Features:
 * - Single or multiple selection modes
 * - Consistent styling across toggle items
 * - Horizontal or vertical orientation
 * - Keyboard navigation and accessibility support
 * - Focus management
 * - ARIA support
 * - CSS module styling for improved maintainability
 *
 * @example
 * ```tsx
 * import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
 * import { Bold, Italic, Underline } from 'lucide-react';
 *
 * // Single selection (radio-like behavior)
 * function TextAlignment() {
 *   return (
 *     <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
 *       <ToggleGroupItem value="left" aria-label="Left aligned">
 *         <AlignLeftIcon className="h-4 w-4" />
 *       </ToggleGroupItem>
 *       <ToggleGroupItem value="center" aria-label="Center aligned">
 *         <AlignCenterIcon className="h-4 w-4" />
 *       </ToggleGroupItem>
 *       <ToggleGroupItem value="right" aria-label="Right aligned">
 *         <AlignRightIcon className="h-4 w-4" />
 *       </ToggleGroupItem>
 *     </ToggleGroup>
 *   );
 * }
 *
 * // Multiple selection (checkbox-like behavior)
 * function TextFormatting() {
 *   return (
 *     <ToggleGroup type="multiple" aria-label="Text formatting">
 *       <ToggleGroupItem value="bold" aria-label="Bold">
 *         <Bold className="h-4 w-4" />
 *       </ToggleGroupItem>
 *       <ToggleGroupItem value="italic" aria-label="Italic">
 *         <Italic className="h-4 w-4" />
 *       </ToggleGroupItem>
 *       <ToggleGroupItem value="underline" aria-label="Underline">
 *         <Underline className="h-4 w-4" />
 *       </ToggleGroupItem>
 *     </ToggleGroup>
 *   );
 * }
 * ```
 */

// Export components
export * from './toggle-group';
export * from './toggle-group.types';

// For backwards compatibility
import ToggleGroup from './toggle-group';
export default ToggleGroup;
