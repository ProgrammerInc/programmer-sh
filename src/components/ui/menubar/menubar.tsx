'use client';

import { cn } from '@/utils/app.utils';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { Check, ChevronRight, Circle } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './menubar.module.css';
import {
  MenubarCheckboxItemProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarLabelProps,
  MenubarProps,
  MenubarRadioItemProps,
  MenubarSeparatorProps,
  MenubarShortcutProps,
  MenubarSubContentProps,
  MenubarSubTriggerProps,
  MenubarTriggerProps
} from './menubar.types';

/**
 * Menu group for organizing menu items
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#menu Radix UI Menubar Menu}
 */
const MenubarMenu = memo(MenubarPrimitive.Menu);
MenubarMenu.displayName = MenubarPrimitive.Menu.displayName;

/**
 * Group component for organizing related menu items
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#group Radix UI Menubar Group}
 */
const MenubarGroup = memo(MenubarPrimitive.Group);
MenubarGroup.displayName = MenubarPrimitive.Group.displayName;

/**
 * Portal component for rendering menu content outside the DOM hierarchy
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#portal Radix UI Menubar Portal}
 */
const MenubarPortal = memo(MenubarPrimitive.Portal);
MenubarPortal.displayName = MenubarPrimitive.Portal.displayName;

/**
 * Sub menu component for nested menu items
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#sub Radix UI Menubar Sub}
 */
const MenubarSub = memo(MenubarPrimitive.Sub);
MenubarSub.displayName = MenubarPrimitive.Sub.displayName;

/**
 * Radio group for mutually exclusive menu items
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#radiogroup Radix UI Menubar RadioGroup}
 */
const MenubarRadioGroup = memo(MenubarPrimitive.RadioGroup);
MenubarRadioGroup.displayName = MenubarPrimitive.RadioGroup.displayName;

/**
 * Main menubar component that contains menu items
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#root Radix UI Menubar Root}
 */
const Menubar = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>(({ className, ...props }, ref) => {
  const menubarClassName = useMemo(() => {
    return cn(styles['menubar'], className);
  }, [className]);

  return (
    <MenubarPrimitive.Root
      className={menubarClassName}
      ref={ref}
      {...props}
    />
  );
}));

Menubar.displayName = MenubarPrimitive.Root.displayName;

/**
 * Menubar trigger component that opens a menu when clicked
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#trigger Radix UI Menubar Trigger}
 */
const MenubarTrigger = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  MenubarTriggerProps
>(({ className, ...props }, ref) => {
  const triggerClassName = useMemo(() => {
    return cn(styles['menubar-trigger'], className);
  }, [className]);

  return (
    <MenubarPrimitive.Trigger
      className={triggerClassName}
      ref={ref}
      {...props}
    />
  );
}));

MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

/**
 * Sub-menu trigger component that opens a sub-menu when clicked or hovered
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#subtrigger Radix UI Menubar SubTrigger}
 */
const MenubarSubTrigger = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>(({ className, inset, children, ...props }, ref) => {
  const subTriggerClassName = useMemo(() => {
    return cn(
      styles['menubar-sub-trigger'],
      inset && styles['menubar-sub-trigger-inset'],
      className
    );
  }, [className, inset]);

  return (
    <MenubarPrimitive.SubTrigger
      className={subTriggerClassName}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronRight className={styles['menubar-sub-trigger-icon']} />
    </MenubarPrimitive.SubTrigger>
  );
}));

MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

/**
 * Sub-menu content container component
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#subcontent Radix UI Menubar SubContent}
 */
const MenubarSubContent = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  MenubarSubContentProps
>(({ className, ...props }, ref) => {
  const subContentClassName = useMemo(() => {
    return cn(styles['menubar-sub-content'], className);
  }, [className]);

  return (
    <MenubarPrimitive.SubContent
      className={subContentClassName}
      ref={ref}
      {...props}
    />
  );
}));

MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

/**
 * Menubar content container component
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#content Radix UI Menubar Content}
 */
const MenubarContent = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(({ className, align = 'start', alignOffset = -4, sideOffset = 8, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(styles['menubar-content'], className);
  }, [className]);

  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        align={align}
        alignOffset={alignOffset}
        className={contentClassName}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
}));

MenubarContent.displayName = MenubarPrimitive.Content.displayName;

/**
 * Menubar item component
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#item Radix UI Menubar Item}
 */
const MenubarItem = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(({ className, inset, ...props }, ref) => {
  const itemClassName = useMemo(() => {
    return cn(
      styles['menubar-item'],
      inset && styles['menubar-item-inset'],
      className
    );
  }, [className, inset]);

  return (
    <MenubarPrimitive.Item
      className={itemClassName}
      ref={ref}
      {...props}
    />
  );
}));

MenubarItem.displayName = MenubarPrimitive.Item.displayName;

/**
 * Menubar checkbox item component with a checkmark indicator
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#checkboxitem Radix UI Menubar CheckboxItem}
 */
const MenubarCheckboxItem = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  MenubarCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => {
  const checkboxItemClassName = useMemo(() => {
    return cn(styles['menubar-checkbox-item'], className);
  }, [className]);

  return (
    <MenubarPrimitive.CheckboxItem
      checked={checked}
      className={checkboxItemClassName}
      ref={ref}
      {...props}
    >
      <span className={styles['menubar-item-indicator']}>
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}));

MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

/**
 * Menubar radio item component with a circle indicator
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#radioitem Radix UI Menubar RadioItem}
 */
const MenubarRadioItem = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  MenubarRadioItemProps
>(({ className, children, ...props }, ref) => {
  const radioItemClassName = useMemo(() => {
    return cn(styles['menubar-radio-item'], className);
  }, [className]);

  return (
    <MenubarPrimitive.RadioItem
      className={radioItemClassName}
      ref={ref}
      {...props}
    >
      <span className={styles['menubar-item-indicator']}>
        <MenubarPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}));

MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

/**
 * Menubar label component for section headers
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#label Radix UI Menubar Label}
 */
const MenubarLabel = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  MenubarLabelProps
>(({ className, inset, ...props }, ref) => {
  const labelClassName = useMemo(() => {
    return cn(
      styles['menubar-label'],
      inset && styles['menubar-label-inset'],
      className
    );
  }, [className, inset]);

  return (
    <MenubarPrimitive.Label
      className={labelClassName}
      ref={ref}
      {...props}
    />
  );
}));

MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

/**
 * Menubar separator component for visual grouping
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/menubar#separator Radix UI Menubar Separator}
 */
const MenubarSeparator = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  MenubarSeparatorProps
>(({ className, ...props }, ref) => {
  const separatorClassName = useMemo(() => {
    return cn(styles['menubar-separator'], className);
  }, [className]);

  return (
    <MenubarPrimitive.Separator
      className={separatorClassName}
      ref={ref}
      {...props}
    />
  );
}));

MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

/**
 * Menubar shortcut component for displaying keyboard shortcuts
 * 
 * This is a custom component, not part of Radix UI Menubar primitives.
 */
const MenubarShortcut = memo(({ className, ...props }: MenubarShortcutProps) => {
  const shortcutClassName = useMemo(() => {
    return cn(styles['menubar-shortcut'], className);
  }, [className]);

  return (
    <span
      className={shortcutClassName}
      {...props}
    />
  );
});

MenubarShortcut.displayName = 'MenubarShortcut';

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
};

export default Menubar;
