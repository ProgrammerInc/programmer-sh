/**
 * Button Component
 *
 * A flexible button component with various visual styles and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="default" size="default">Click me</Button>
 * <Button variant="outline" size="sm">Small outline button</Button>
 * <Button variant="ghost" asChild><a href="/">Link styled as button</a></Button>
 * ```
 */

// Export button components and types
export * from './button';
export * from './button.types';
export * from './button.variants';

// For backwards compatibility
import { Button } from './button';
export default Button;
