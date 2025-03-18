/**
 * Input Component
 *
 * A reusable, accessible form input component that can be used for
 * various types of text input, email, password, number, etc.
 *
 * Features:
 * - Consistent styling with other UI components
 * - Support for all HTML input attributes
 * - Accessibility-friendly
 * - Customizable through className prop
 * - Automatic responsive text size
 * - CSS module styling for isolation
 *
 * @example
 * ```tsx
 * import { Input } from '@/components/ui/input';
 *
 * export function LoginForm() {
 *   return (
 *     <form>
 *       <Input 
 *         type="email" 
 *         placeholder="Email address" 
 *         required 
 *       />
 *       <Input 
 *         type="password" 
 *         placeholder="Password" 
 *         required 
 *       />
 *       <button type="submit">Log in</button>
 *     </form>
 *   );
 * }
 * ```
 *
 * @module
 */

// Export the Input component
import { Input } from './input';

// Export types for external usage
export type { InputProps } from './input.types';
export { Input };

// For backwards compatibility
export default Input;
