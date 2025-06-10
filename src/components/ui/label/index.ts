/**
 * Label Component
 *
 * A form label with styling based on Radix UI's Label primitive.
 * Provides accessible labeling for form controls with customizable styling.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/label Label primitive documentation}
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 * ```
 */

// Export label components and types
export { Label } from './label';
export type { LabelProps } from './label.types';
export { labelVariants } from './label.variants';

// For backwards compatibility
import { Label } from './label';
export default Label;
