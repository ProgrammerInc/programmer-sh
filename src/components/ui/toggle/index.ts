/**
 * Toggle UI Component
 *
 * A two-state button that can be either on or off, built on Radix UI's Toggle primitive.
 * Used for toggling a single option on or off, like formatting options in a text editor.
 *
 * Features:
 * - Multiple style variants (default, outline)
 * - Multiple size options (sm, default, lg)
 * - Accessible keyboard navigation
 * - Focus management
 * - ARIA support
 * - Controlled and uncontrolled modes
 * - CSS module styling for improved maintainability
 *
 * @example
 * ```tsx
 * import { Toggle } from '@/components/ui/toggle';
 * import { Bold } from 'lucide-react';
 *
 * // Basic usage
 * <Toggle aria-label="Toggle bold">
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 *
 * // With variant and size
 * <Toggle
 *   variant="outline"
 *   size="lg"
 *   aria-label="Toggle bold"
 * >
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 *
 * // Controlled usage
 * const [pressed, setPressed] = useState(false);
 *
 * <Toggle
 *   pressed={pressed}
 *   onPressedChange={setPressed}
 *   aria-label="Toggle bold"
 * >
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 * ```
 */

// Export toggle components
export * from './toggle';
export * from './toggle.types';
export * from './toggle.variants';

// For backwards compatibility
import { Toggle } from './toggle';
export default Toggle;
