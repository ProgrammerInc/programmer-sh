import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

/**
 * DropdownMenu root component props
 */
export type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

/**
 * DropdownMenuTrigger component props
 */
export type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>;

/**
 * DropdownMenuGroup component props
 */
export type DropdownMenuGroupProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>;

/**
 * DropdownMenuPortal component props
 */
export type DropdownMenuPortalProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>;

/**
 * DropdownMenuSub component props
 */
export type DropdownMenuSubProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>;

/**
 * DropdownMenuRadioGroup component props
 */
export type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>;

/**
 * DropdownMenuSubTrigger component props
 */
export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
};

/**
 * DropdownMenuSubContent component props
 */
export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>;

/**
 * DropdownMenuContent component props
 */
export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>;

/**
 * DropdownMenuItem component props
 */
export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
};

/**
 * DropdownMenuCheckboxItem component props
 */
export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>;

/**
 * DropdownMenuRadioItem component props
 */
export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>;

/**
 * DropdownMenuLabel component props
 */
export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
};

/**
 * DropdownMenuSeparator component props
 */
export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>;

/**
 * DropdownMenuShortcut component props
 */
export type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;
