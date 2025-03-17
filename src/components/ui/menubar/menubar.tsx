'use client';

import { cn } from '@/utils/app.utils';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { Check, ChevronRight, Circle } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

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
 */
const MenubarMenu = memo(MenubarPrimitive.Menu);
MenubarMenu.displayName = MenubarPrimitive.Menu.displayName;

/**
 * Group component for organizing related menu items
 */
const MenubarGroup = memo(MenubarPrimitive.Group);
MenubarGroup.displayName = MenubarPrimitive.Group.displayName;

/**
 * Portal component for rendering menu content outside the DOM hierarchy
 */
const MenubarPortal = memo(MenubarPrimitive.Portal);
MenubarPortal.displayName = MenubarPrimitive.Portal.displayName;

/**
 * Sub menu component for nested menu items
 */
const MenubarSub = memo(MenubarPrimitive.Sub);
MenubarSub.displayName = MenubarPrimitive.Sub.displayName;

/**
 * Radio group for mutually exclusive menu items
 */
const MenubarRadioGroup = memo(MenubarPrimitive.RadioGroup);
MenubarRadioGroup.displayName = MenubarPrimitive.RadioGroup.displayName;

/**
 * Main menubar component that contains menu items
 * 
 * @example
 * ```tsx
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem>New Tab</MenubarItem>
 *       <MenubarItem>New Window</MenubarItem>
 *       <MenubarSeparator />
 *       <MenubarItem>Close Window</MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 * ```
 */
const Menubar = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>(({ className, ...props }, ref) => {
  const menubarClassName = useMemo(() => {
    return cn(
      'flex h-10 items-center space-x-1 rounded-md border bg-background p-1',
      className
    );
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
 */
const MenubarTrigger = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  MenubarTriggerProps
>(({ className, ...props }, ref) => {
  const triggerClassName = useMemo(() => {
    return cn(
      'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      className
    );
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
 */
const MenubarSubTrigger = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>(({ className, inset, children, ...props }, ref) => {
  const subTriggerClassName = useMemo(() => {
    return cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      inset && 'pl-8',
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
      <ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}));

MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

/**
 * Sub-menu content container component
 */
const MenubarSubContent = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  MenubarSubContentProps
>(({ className, ...props }, ref) => {
  const subContentClassName = useMemo(() => {
    return cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    );
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
 */
const MenubarContent = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(({ className, align = 'start', alignOffset = -4, sideOffset = 8, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(
      'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    );
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
 */
const MenubarItem = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(({ className, inset, ...props }, ref) => {
  const itemClassName = useMemo(() => {
    return cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
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
 */
const MenubarCheckboxItem = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  MenubarCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => {
  const checkboxItemClassName = useMemo(() => {
    return cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    );
  }, [className]);

  return (
    <MenubarPrimitive.CheckboxItem
      checked={checked}
      className={checkboxItemClassName}
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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
 */
const MenubarRadioItem = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  MenubarRadioItemProps
>(({ className, children, ...props }, ref) => {
  const radioItemClassName = useMemo(() => {
    return cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    );
  }, [className]);

  return (
    <MenubarPrimitive.RadioItem
      className={radioItemClassName}
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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
 */
const MenubarLabel = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  MenubarLabelProps
>(({ className, inset, ...props }, ref) => {
  const labelClassName = useMemo(() => {
    return cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
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
 */
const MenubarSeparator = memo(React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  MenubarSeparatorProps
>(({ className, ...props }, ref) => {
  const separatorClassName = useMemo(() => {
    return cn('-mx-1 my-1 h-px bg-muted', className);
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
 */
const MenubarShortcut = memo(({ className, ...props }: MenubarShortcutProps) => {
  const shortcutClassName = useMemo(() => {
    return cn('ml-auto text-xs tracking-widest text-muted-foreground', className);
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
