import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as React from 'react';

/**
 * Base Menubar component props
 */
export type MenubarProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>;

/**
 * Menubar menu component props
 */
export type MenubarMenuProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu>;

/**
 * Menubar group component props
 */
export type MenubarGroupProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Group>;

/**
 * Menubar portal component props
 */
export type MenubarPortalProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Portal>;

/**
 * Menubar sub component props
 */
export type MenubarSubProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub>;

/**
 * Menubar radio group component props
 */
export type MenubarRadioGroupProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup>;

/**
 * Menubar trigger component props
 */
export type MenubarTriggerProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>;

/**
 * Menubar sub trigger component props with optional inset
 */
export interface MenubarSubTriggerProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> {
  /**
   * Whether the item should have padding left
   */
  inset?: boolean;
}

/**
 * Menubar sub content component props
 */
export type MenubarSubContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>;

/**
 * Menubar content component props
 */
export type MenubarContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>;

/**
 * Menubar item component props with optional inset
 */
export interface MenubarItemProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
  /**
   * Whether the item should have padding left
   */
  inset?: boolean;
}

/**
 * Menubar checkbox item component props
 */
export type MenubarCheckboxItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>;

/**
 * Menubar radio item component props
 */
export type MenubarRadioItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>;

/**
 * Menubar label component props with optional inset
 */
export interface MenubarLabelProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> {
  /**
   * Whether the label should have padding left
   */
  inset?: boolean;
}

/**
 * Menubar separator component props
 */
export type MenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>;

/**
 * Menubar shortcut component props
 */
export type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>;
