'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuPortalProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubTriggerProps
} from './dropdown-menu.types';

/**
 * DropdownMenu Root Component
 * 
 * Provides state for the dropdown menu and manages its open state
 * 
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Item 2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
const DropdownMenu = memo(DropdownMenuPrimitive.Root);
DropdownMenu.displayName = 'DropdownMenu';

/**
 * DropdownMenuTrigger Component
 * 
 * Button that opens the dropdown menu when clicked
 */
const DropdownMenuTrigger = memo(DropdownMenuPrimitive.Trigger) as typeof DropdownMenuPrimitive.Trigger;
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

/**
 * DropdownMenuGroup Component
 * 
 * Groups related menu items together
 */
const DropdownMenuGroup = memo(DropdownMenuPrimitive.Group) as typeof DropdownMenuPrimitive.Group;
DropdownMenuGroup.displayName = DropdownMenuPrimitive.Group.displayName;

/**
 * DropdownMenuPortal Component
 * 
 * Portals its children into the document.body
 */
const DropdownMenuPortal = memo(({ ...props }: DropdownMenuPortalProps) => (
  <DropdownMenuPrimitive.Portal {...props} />
));
DropdownMenuPortal.displayName = 'DropdownMenuPortal';

/**
 * DropdownMenuSub Component
 * 
 * Creates a submenu within a dropdown menu
 */
const DropdownMenuSub = memo(DropdownMenuPrimitive.Sub) as typeof DropdownMenuPrimitive.Sub;
DropdownMenuSub.displayName = DropdownMenuPrimitive.Sub.displayName;

/**
 * DropdownMenuRadioGroup Component
 * 
 * Groups radio items together, allowing only one to be checked at a time
 */
const DropdownMenuRadioGroup = memo(DropdownMenuPrimitive.RadioGroup) as typeof DropdownMenuPrimitive.RadioGroup;
DropdownMenuRadioGroup.displayName = DropdownMenuPrimitive.RadioGroup.displayName;

/**
 * DropdownMenuSubTrigger Component
 * 
 * Button that opens a submenu when clicked or hovered
 */
const DropdownMenuSubTrigger = memo(React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => {
  const subTriggerClassName = useMemo(() => {
    return cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className
    );
  }, [className, inset]);

  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={subTriggerClassName}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}));

DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

/**
 * DropdownMenuSubContent Component
 * 
 * Container for submenu items
 */
const DropdownMenuSubContent = memo(React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => {
  const subContentClassName = useMemo(() => {
    return cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    );
  }, [className]);

  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={subContentClassName}
      {...props}
    />
  );
}));

DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

/**
 * DropdownMenuContent Component
 * 
 * Container for the dropdown menu items
 */
const DropdownMenuContent = memo(React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    );
  }, [className]);

  return (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={contentClassName}
        {...props}
      />
    </DropdownMenuPortal>
  );
}));

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/**
 * DropdownMenuItem Component
 * 
 * A selectable item in the dropdown menu
 */
const DropdownMenuItem = memo(React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => {
  const itemClassName = useMemo(() => {
    return cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    );
  }, [className, inset]);

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={itemClassName}
      {...props}
    />
  );
}));

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/**
 * DropdownMenuCheckboxItem Component
 * 
 * A checkbox item in the dropdown menu
 */
const DropdownMenuCheckboxItem = memo(React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => {
  const checkboxItemClassName = useMemo(() => {
    return cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    );
  }, [className]);

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={checkboxItemClassName}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}));

DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

/**
 * DropdownMenuRadioItem Component
 * 
 * A radio item in the dropdown menu
 */
const DropdownMenuRadioItem = memo(React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => {
  const radioItemClassName = useMemo(() => {
    return cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    );
  }, [className]);

  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={radioItemClassName}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}));

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

/**
 * DropdownMenuLabel Component
 * 
 * A label for a group of menu items
 */
const DropdownMenuLabel = memo(React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => {
  const labelClassName = useMemo(() => {
    return cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    );
  }, [className, inset]);

  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={labelClassName}
      {...props}
    />
  );
}));

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/**
 * DropdownMenuSeparator Component
 * 
 * A separator for groups of menu items
 */
const DropdownMenuSeparator = memo(React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
  const separatorClassName = useMemo(() => {
    return cn('-mx-1 my-1 h-px bg-muted', className);
  }, [className]);

  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={separatorClassName}
      {...props}
    />
  );
}));

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/**
 * DropdownMenuShortcut Component
 * 
 * Display keyboard shortcuts in the dropdown menu items
 */
const DropdownMenuShortcut = memo(({ className, ...props }: DropdownMenuShortcutProps) => {
  const shortcutClassName = useMemo(() => {
    return cn('ml-auto text-xs tracking-widest opacity-60', className);
  }, [className]);

  return <span className={shortcutClassName} {...props} />;
});

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
};

export default DropdownMenu;
