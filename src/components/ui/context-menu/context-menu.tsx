'use client';

/**
 * Context Menu component
 * 
 * A context menu component built on Radix UI's primitives
 */

import { cn } from '@/utils/app.utils';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import * as React from 'react';
import { memo } from 'react';

import styles from './context-menu.module.css';
import {
  ContextMenuCheckboxItemRef,
  ContextMenuCheckboxItemProps,
  ContextMenuContentProps,
  ContextMenuContentRef,
  ContextMenuItemProps,
  ContextMenuItemRef,
  ContextMenuLabelProps,
  ContextMenuLabelRef,
  ContextMenuRadioItemProps,
  ContextMenuRadioItemRef,
  ContextMenuSeparatorProps,
  ContextMenuSeparatorRef,
  ContextMenuShortcutProps,
  ContextMenuSubContentProps,
  ContextMenuSubContentRef,
  ContextMenuSubTriggerProps,
  ContextMenuSubTriggerRef
} from './context-menu.types';

/**
 * Root Context Menu component
 * 
 * @example
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>Right click on me</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Profile</ContextMenuItem>
 *     <ContextMenuItem>Settings</ContextMenuItem>
 *     <ContextMenuSeparator />
 *     <ContextMenuItem>Logout</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
const ContextMenu = ContextMenuPrimitive.Root;

/**
 * Context Menu Trigger component
 * 
 * The area that opens the context menu on right click.
 */
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

/**
 * Context Menu Group component
 * 
 * Used to group related items.
 */
const ContextMenuGroup = ContextMenuPrimitive.Group;

/**
 * Context Menu Portal component
 * 
 * Portals the content into the body.
 */
const ContextMenuPortal = ContextMenuPrimitive.Portal;

/**
 * Context Menu Sub component
 * 
 * Used to create a submenu.
 */
const ContextMenuSub = ContextMenuPrimitive.Sub;

/**
 * Context Menu Radio Group component
 * 
 * Used to group radio items.
 */
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

/**
 * Context Menu Sub Trigger component
 * 
 * The trigger for a submenu.
 * 
 * @example
 * ```tsx
 * <ContextMenuSub>
 *   <ContextMenuSubTrigger>More Options</ContextMenuSubTrigger>
 *   <ContextMenuSubContent>
 *     <ContextMenuItem>Option 1</ContextMenuItem>
 *     <ContextMenuItem>Option 2</ContextMenuItem>
 *   </ContextMenuSubContent>
 * </ContextMenuSub>
 * ```
 */
const ContextMenuSubTrigger = memo(React.forwardRef<
  ContextMenuSubTriggerRef,
  ContextMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      styles['sub-trigger'],
      inset && styles['sub-trigger-inset'],
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className={styles['sub-trigger-icon']} />
  </ContextMenuPrimitive.SubTrigger>
)));

ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

/**
 * Context Menu Sub Content component
 * 
 * The content for a submenu.
 */
const ContextMenuSubContent = memo(React.forwardRef<
  ContextMenuSubContentRef,
  ContextMenuSubContentProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(styles['sub-content'], className)}
    {...props}
  />
)));

ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

/**
 * Context Menu Content component
 * 
 * The content that appears when the context menu is triggered.
 * 
 * @example
 * ```tsx
 * <ContextMenuContent>
 *   <ContextMenuItem>Profile</ContextMenuItem>
 *   <ContextMenuItem>Settings</ContextMenuItem>
 * </ContextMenuContent>
 * ```
 */
const ContextMenuContent = memo(React.forwardRef<
  ContextMenuContentRef,
  ContextMenuContentProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(styles.content, className)}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
)));

ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

/**
 * Context Menu Item component
 * 
 * An actionable item in the context menu.
 * 
 * @example
 * ```tsx
 * <ContextMenuItem onSelect={() => console.log('Selected')}>
 *   Profile
 * </ContextMenuItem>
 * ```
 */
const ContextMenuItem = memo(React.forwardRef<
  ContextMenuItemRef,
  ContextMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      styles.item,
      inset && styles['item-inset'],
      className
    )}
    {...props}
  />
)));

ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

/**
 * Context Menu Checkbox Item component
 * 
 * A checkbox item in the context menu.
 * 
 * @example
 * ```tsx
 * <ContextMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
 *   Show Hidden Files
 * </ContextMenuCheckboxItem>
 * ```
 */
const ContextMenuCheckboxItem = memo(React.forwardRef<
  ContextMenuCheckboxItemRef,
  ContextMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(styles['checkbox-item'], className)}
    checked={checked}
    {...props}
  >
    <span className={styles['item-indicator-wrapper']}>
      <ContextMenuPrimitive.ItemIndicator>
        <Check className={styles['icon-check']} />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
)));

ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

/**
 * Context Menu Radio Item component
 * 
 * A radio item in the context menu.
 * 
 * @example
 * ```tsx
 * <ContextMenuRadioGroup value={position} onValueChange={setPosition}>
 *   <ContextMenuRadioItem value="left">Left</ContextMenuRadioItem>
 *   <ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
 * </ContextMenuRadioGroup>
 * ```
 */
const ContextMenuRadioItem = memo(React.forwardRef<
  ContextMenuRadioItemRef,
  ContextMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(styles['radio-item'], className)}
    {...props}
  >
    <span className={styles['item-indicator-wrapper']}>
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className={styles['icon-circle']} />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
)));

ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

/**
 * Context Menu Label component
 * 
 * A label for a section in the context menu.
 * 
 * @example
 * ```tsx
 * <ContextMenuLabel>Account</ContextMenuLabel>
 * ```
 */
const ContextMenuLabel = memo(React.forwardRef<
  ContextMenuLabelRef,
  ContextMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      styles.label,
      inset && styles['label-inset'],
      className
    )}
    {...props}
  />
)));

ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

/**
 * Context Menu Separator component
 * 
 * A visual separator in the context menu.
 * 
 * @example
 * ```tsx
 * <ContextMenuItem>Profile</ContextMenuItem>
 * <ContextMenuSeparator />
 * <ContextMenuItem>Logout</ContextMenuItem>
 * ```
 */
const ContextMenuSeparator = memo(React.forwardRef<
  ContextMenuSeparatorRef,
  ContextMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn(styles.separator, className)}
    {...props}
  />
)));

ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

/**
 * Context Menu Shortcut component
 * 
 * Displays a keyboard shortcut in a context menu item.
 * 
 * @example
 * ```tsx
 * <ContextMenuItem>
 *   New Tab <ContextMenuShortcut>⌘T</ContextMenuShortcut>
 * </ContextMenuItem>
 * ```
 */
const ContextMenuShortcut = memo(({ className, ...props }: ContextMenuShortcutProps) => {
  return (
    <span
      className={cn(styles.shortcut, className)}
      {...props}
    />
  );
});

ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
};

export default ContextMenu;
