/**
 * Dropdown Menu Component Module
 * 
 * A dropdown menu displays a list of options when triggered.
 * Based on the Radix UI dropdown menu primitive.
 * 
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu for the original Radix UI documentation
 */

// Named exports for all dropdown menu components and types
export * from './dropdown-menu';
export * from './dropdown-menu.types';

// Default export for backward compatibility
import { DropdownMenu } from './dropdown-menu';
export default DropdownMenu;
