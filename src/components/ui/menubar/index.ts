/**
 * Menubar Component
 * 
 * A Radix UI based menubar component for creating accessible, keyboard navigable menu interfaces.
 * This component provides a set of primitives for building custom menubars with advanced features
 * like keyboard navigation, submenu support, and accessibility.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar Radix UI Menubar}
 */

// Export all individual components for granular usage
export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from './menubar';

// Export all types
export type {
  MenubarProps,
  MenubarMenuProps,
  MenubarGroupProps,
  MenubarPortalProps,
  MenubarSubProps,
  MenubarRadioGroupProps,
  MenubarTriggerProps,
  MenubarSubTriggerProps,
  MenubarSubContentProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarCheckboxItemProps,
  MenubarRadioItemProps,
  MenubarLabelProps,
  MenubarSeparatorProps,
  MenubarShortcutProps
} from './menubar.types';

// For backwards compatibility
import { Menubar } from './menubar';
export default Menubar;
