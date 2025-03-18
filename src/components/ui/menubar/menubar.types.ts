import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as React from 'react';

/**
 * Base Menubar component props
 * 
 * Props for the root Menubar component that contains menu items.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#root Radix UI Menubar Root}
 * 
 * Creates a basic menubar with a file menu containing menu items like New Tab and New Window.
 */
export type MenubarProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>;

/**
 * Menubar menu component props
 * 
 * Props for the Menu component that represents a top-level menu item.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#menu Radix UI Menubar Menu}
 * 
 * Creates an Edit menu containing items like Cut, Copy, and Paste.
 */
export type MenubarMenuProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu>;

/**
 * Menubar group component props
 * 
 * Props for the Group component that visually groups related menu items.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#group Radix UI Menubar Group}
 * 
 * Groups related menu items like Cut/Copy/Paste in one section and Find/Replace in another,
 * separated by a MenubarSeparator.
 */
export type MenubarGroupProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Group>;

/**
 * Menubar portal component props
 * 
 * Props for the Portal component that renders menu content in a portal.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#portal Radix UI Menubar Portal}
 * 
 * Renders MenubarContent inside a portal to ensure proper stacking context for menu items.
 */
export type MenubarPortalProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Portal>;

/**
 * Menubar sub component props
 * 
 * Props for the Sub component that creates a submenu.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#sub Radix UI Menubar Sub}
 * 
 * Creates a submenu with a trigger labeled "More Tools" containing additional menu items.
 */
export type MenubarSubProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub>;

/**
 * Menubar radio group component props
 * 
 * Props for the RadioGroup component that manages radio items.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#radiogroup Radix UI Menubar RadioGroup}
 * 
 * Creates a radio group with options for Desktop, Tablet, and Mobile views where only one option can be selected.
 */
export type MenubarRadioGroupProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup>;

/**
 * Menubar trigger component props
 * 
 * Props for the Trigger component that opens a menu when clicked.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#trigger Radix UI Menubar Trigger}
 * 
 * Creates a button labeled "File" that opens a menu when clicked.
 */
export type MenubarTriggerProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>;

/**
 * Menubar sub trigger component props with optional inset
 * 
 * Props for the SubTrigger component that opens a submenu when clicked or hovered.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#subtrigger Radix UI Menubar SubTrigger}
 * 
 * Creates a submenu trigger labeled "More Tools". Can be styled with optional inset padding.
 */
export interface MenubarSubTriggerProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> {
  /**
   * Whether the item should have padding left
   * 
   * @default false
   */
  inset?: boolean;
}

/**
 * Menubar sub content component props
 * 
 * Props for the SubContent component that contains submenu items.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#subcontent Radix UI Menubar SubContent}
 * 
 * Contains submenu items that appear when a submenu trigger is activated.
 */
export type MenubarSubContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>;

/**
 * Menubar content component props
 * 
 * Props for the Content component that contains menu items.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#content Radix UI Menubar Content}
 * 
 * Contains menu items like "New Tab", "New Window" and "Close Window" with a separator between them.
 */
export type MenubarContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>;

/**
 * Menubar item component props with optional inset
 * 
 * Props for the Item component that represents a clickable menu item.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#item Radix UI Menubar Item}
 * 
 * Creates a clickable menu item labeled "New Tab". Can be styled with optional inset padding or include
 * a keyboard shortcut like ⌘T.
 */
export interface MenubarItemProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
  /**
   * Whether the item should have padding left
   * 
   * @default false
   */
  inset?: boolean;
}

/**
 * Menubar checkbox item component props
 * 
 * Props for the CheckboxItem component that represents a toggleable menu item.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#checkboxitem Radix UI Menubar CheckboxItem}
 * 
 * Creates a toggleable checkbox menu item labeled "Show Toolbar" that can be checked or unchecked.
 */
export type MenubarCheckboxItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>;

/**
 * Menubar radio item component props
 * 
 * Props for the RadioItem component that represents a selectable menu item within a RadioGroup.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#radioitem Radix UI Menubar RadioItem}
 * 
 * Creates a selectable radio item within a radio group. Used for mutually exclusive options like
 * selecting between Desktop, Tablet, or Mobile views.
 */
export type MenubarRadioItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>;

/**
 * Menubar label component props with optional inset
 * 
 * Props for the Label component that represents a non-interactive label or heading.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#label Radix UI Menubar Label}
 * 
 * Creates a non-interactive label in a menu, like "View Options". Can be styled with optional inset padding.
 */
export interface MenubarLabelProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> {
  /**
   * Whether the label should have padding left
   * 
   * @default false
   */
  inset?: boolean;
}

/**
 * Menubar separator component props
 * 
 * Props for the Separator component that visually separates menu items.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#separator Radix UI Menubar Separator}
 * 
 * Creates a visual separator between groups of menu items, such as between "Cut/Copy/Paste" and "Find".
 */
export type MenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>;

/**
 * Menubar shortcut component props
 * 
 * Props for the custom Shortcut component that displays keyboard shortcuts.
 * This is not part of Radix UI but a custom extension.
 * 
 * Adds a keyboard shortcut indicator like "⌘T" to a menu item labeled "New Tab" or "⌘," for "Preferences".
 */
export type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>;
