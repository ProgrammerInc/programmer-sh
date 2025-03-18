/**
 * Context Menu component types
 */

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes } from 'react';

/**
 * Base context menu props from Radix UI
 */
export type ContextMenuProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>;

/**
 * Context menu trigger props
 */
export type ContextMenuTriggerProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>;

/**
 * Context menu group props
 */
export type ContextMenuGroupProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group>;

/**
 * Context menu portal props
 */
export type ContextMenuPortalProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Portal>;

/**
 * Context menu sub props
 */
export type ContextMenuSubProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub>;

/**
 * Context menu radio group props
 */
export type ContextMenuRadioGroupProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup>;

/**
 * Context menu sub trigger props with optional inset property
 */
export type ContextMenuSubTriggerProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
  /**
   * Whether the trigger should be inset (adds padding on the left)
   */
  inset?: boolean;
};

/**
 * Context menu sub content props
 */
export type ContextMenuSubContentProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>;

/**
 * Context menu content props
 */
export type ContextMenuContentProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>;

/**
 * Context menu item props with optional inset property
 */
export type ContextMenuItemProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
  /**
   * Whether the item should be inset (adds padding on the left)
   */
  inset?: boolean;
};

/**
 * Context menu checkbox item props
 */
export type ContextMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>;

/**
 * Context menu radio item props
 */
export type ContextMenuRadioItemProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>;

/**
 * Context menu label props with optional inset property
 */
export type ContextMenuLabelProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
  /**
   * Whether the label should be inset (adds padding on the left)
   */
  inset?: boolean;
};

/**
 * Context menu separator props
 */
export type ContextMenuSeparatorProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>;

/**
 * Context menu shortcut props
 */
export type ContextMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;

/**
 * Types for ref forwarding
 */
export type ContextMenuSubTriggerRef = ElementRef<typeof ContextMenuPrimitive.SubTrigger>;
export type ContextMenuSubContentRef = ElementRef<typeof ContextMenuPrimitive.SubContent>;
export type ContextMenuContentRef = ElementRef<typeof ContextMenuPrimitive.Content>;
export type ContextMenuItemRef = ElementRef<typeof ContextMenuPrimitive.Item>;
export type ContextMenuCheckboxItemRef = ElementRef<typeof ContextMenuPrimitive.CheckboxItem>;
export type ContextMenuRadioItemRef = ElementRef<typeof ContextMenuPrimitive.RadioItem>;
export type ContextMenuLabelRef = ElementRef<typeof ContextMenuPrimitive.Label>;
export type ContextMenuSeparatorRef = ElementRef<typeof ContextMenuPrimitive.Separator>;
