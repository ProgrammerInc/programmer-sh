/**
 * Flowing Menu Component Module
 *
 * A navigation menu with flowing animations when items are hovered.
 * Each menu item reveals a marquee animation with text and images.
 */

// Import components first
import { FlowingMenu } from './flowing-menu';

// Named exports for components and types (with renamed exports to avoid conflicts)

// Export components with explicit names
export { FlowingMenu, MenuItem as FlowingMenuItem } from './flowing-menu';

// Export types with explicit names to avoid conflicts
export type { 
  MenuItemProps as FlowingMenuItemProps,
  FlowingMenuProps 
} from './flowing-menu.types';

// Default export for backward compatibility
export default FlowingMenu;
