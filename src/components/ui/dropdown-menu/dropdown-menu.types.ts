/* eslint-disable no-secrets/no-secrets */
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

/**
 * DropdownMenu Root Component Props
 *
 * Props for the root DropdownMenu component that manages the state of the dropdown.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#root For more information about the Radix UI DropdownMenu Root
 *
 * @example
 * ```tsx
 * <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
 *   <DropdownMenuTrigger>Options</DropdownMenuTrigger>
 *   <DropdownMenuContent>...</DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

/**
 * DropdownMenuTrigger Component Props
 *
 * Props for the button that opens the dropdown menu when clicked.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#trigger For more information about the Radix UI DropdownMenu Trigger
 *
 * @example
 * ```tsx
 * <DropdownMenuTrigger asChild>
 *   <Button variant="outline">Open Menu</Button>
 * </DropdownMenuTrigger>
 * ```
 */
export type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>;

/**
 * DropdownMenuGroup Component Props
 *
 * Props for grouping related menu items together.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#group For more information about the Radix UI DropdownMenu Group
 *
 * @example
 * ```tsx
 * <DropdownMenuGroup>
 *   <DropdownMenuItem>Profile</DropdownMenuItem>
 *   <DropdownMenuItem>Settings</DropdownMenuItem>
 *   <DropdownMenuItem>Logout</DropdownMenuItem>
 * </DropdownMenuGroup>
 * ```
 */
export type DropdownMenuGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Group
>;

/**
 * DropdownMenuPortal Component Props
 *
 * Props for portaling the dropdown menu content into the document.body.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#portal For more information about the Radix UI DropdownMenu Portal
 *
 * @example
 * ```tsx
 * <DropdownMenuPortal>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenuPortal>
 * ```
 */
export type DropdownMenuPortalProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Portal
>;

/**
 * DropdownMenuSub Component Props
 *
 * Props for creating nested dropdown menus.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#sub For more information about the Radix UI DropdownMenu Sub
 *
 * @example
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
export type DropdownMenuSubProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>;

/**
 * DropdownMenuRadioGroup Component Props
 *
 * Props for grouping radio items together, allowing only one to be checked at a time.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#radiogroup For more information about the Radix UI DropdownMenu RadioGroup
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
 *   <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
export type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioGroup
>;

/**
 * DropdownMenuSubTrigger Component Props
 *
 * Props for the button that opens a nested dropdown menu when clicked or hovered.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#subtrigger For more information about the Radix UI DropdownMenu SubTrigger
 *
 * @example
 * ```tsx
 * <DropdownMenuSubTrigger>
 *   <span>More Options</span>
 *   <ChevronRightIcon className="ml-auto h-4 w-4" />
 * </DropdownMenuSubTrigger>
 * ```
 */
export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  /**
   * When true, indents the item to the right, typically used for nested items
   */
  inset?: boolean;
};

/**
 * DropdownMenuSubContent Component Props
 *
 * Props for the container of a nested dropdown menu's items.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#subcontent For more information about the Radix UI DropdownMenu SubContent
 *
 * @example
 * ```tsx
 * <DropdownMenuSubContent className="p-1 bg-white shadow-lg rounded-md">
 *   <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
 *   <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
 * </DropdownMenuSubContent>
 * ```
 */
export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>;

/**
 * DropdownMenuContent Component Props
 *
 * Props for the main container of dropdown menu items.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#content For more information about the Radix UI DropdownMenu Content
 *
 * @example
 * ```tsx
 * <DropdownMenuContent className="w-56 p-1 bg-white shadow-lg rounded-md" sideOffset={5}>
 *   <DropdownMenuItem>Profile</DropdownMenuItem>
 *   <DropdownMenuItem>Settings</DropdownMenuItem>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem>Logout</DropdownMenuItem>
 * </DropdownMenuContent>
 * ```
 */
export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

/**
 * DropdownMenuItem Component Props
 *
 * Props for a selectable item in the dropdown menu.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#item For more information about the Radix UI DropdownMenu Item
 *
 * @example
 * ```tsx
 * <DropdownMenuItem onSelect={() => console.log('Profile selected')}>
 *   Profile
 *   <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> & {
  /**
   * When true, indents the item to the right, typically used for nested items
   */
  inset?: boolean;
};

/**
 * DropdownMenuCheckboxItem Component Props
 *
 * Props for a checkbox item in the dropdown menu. Can be used to toggle options.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#checkboxitem For more information about the Radix UI DropdownMenu CheckboxItem
 *
 * @example
 * ```tsx
 * <DropdownMenuCheckboxItem
 *   checked={showStatus}
 *   onCheckedChange={setShowStatus}
 * >
 *   Show status
 * </DropdownMenuCheckboxItem>
 * ```
 */
export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

/**
 * DropdownMenuRadioItem Component Props
 *
 * Props for a radio item in the dropdown menu. Should be used within a RadioGroup.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#radioitem For more information about the Radix UI DropdownMenu RadioItem
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
 *   <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>;

/**
 * DropdownMenuLabel Component Props
 *
 * Props for a non-interactive label for a group of menu items.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#label For more information about the Radix UI DropdownMenu Label
 *
 * @example
 * ```tsx
 * <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
 * <DropdownMenuItem>Profile</DropdownMenuItem>
 * <DropdownMenuItem>Password</DropdownMenuItem>
 * ```
 */
export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> & {
  /**
   * When true, indents the label to the right, typically used for nested labels
   */
  inset?: boolean;
};

/**
 * DropdownMenuSeparator Component Props
 *
 * Props for a visual separator between groups of menu items.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu#separator For more information about the Radix UI DropdownMenu Separator
 *
 * @example
 * ```tsx
 * <DropdownMenuItem>Profile</DropdownMenuItem>
 * <DropdownMenuItem>Settings</DropdownMenuItem>
 * <DropdownMenuSeparator />
 * <DropdownMenuItem>Logout</DropdownMenuItem>
 * ```
 */
export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;

/**
 * DropdownMenuShortcut Component Props
 *
 * Props for displaying keyboard shortcuts next to dropdown menu items.
 * This is a custom component, not part of Radix UI Primitives.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem>
 *   New Tab
 *   <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
export type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;
