/* eslint-disable no-secrets/no-secrets */
'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './dropdown-menu.module.css';
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
 *
 * @example
 * ```tsx
 * <DropdownMenuTrigger asChild>
 *   <Button>Open Menu</Button>
 * </DropdownMenuTrigger>
 * ```
 */
const DropdownMenuTrigger = memo(
  DropdownMenuPrimitive.Trigger
) as typeof DropdownMenuPrimitive.Trigger;
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

/**
 * DropdownMenuGroup Component
 *
 * Groups related menu items together
 *
 * @example
 * ```tsx
 * <DropdownMenuGroup>
 *   <DropdownMenuItem>Profile</DropdownMenuItem>
 *   <DropdownMenuItem>Settings</DropdownMenuItem>
 * </DropdownMenuGroup>
 * ```
 */
const DropdownMenuGroup = memo(DropdownMenuPrimitive.Group) as typeof DropdownMenuPrimitive.Group;
DropdownMenuGroup.displayName = DropdownMenuPrimitive.Group.displayName;

/**
 * DropdownMenuPortal Component
 *
 * Portals its children into the document.body
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
const DropdownMenuPortal = memo(function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
  return <DropdownMenuPrimitive.Portal {...props} />;
});
DropdownMenuPortal.displayName = 'DropdownMenuPortal';

/**
 * DropdownMenuSub Component
 *
 * Creates a submenu within a dropdown menu
 *
 * @example
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
const DropdownMenuSub = memo(DropdownMenuPrimitive.Sub) as typeof DropdownMenuPrimitive.Sub;
DropdownMenuSub.displayName = DropdownMenuPrimitive.Sub.displayName;

/**
 * DropdownMenuRadioGroup Component
 *
 * Groups radio items together, allowing only one to be checked at a time
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
 *   <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
const DropdownMenuRadioGroup = memo(
  DropdownMenuPrimitive.RadioGroup
) as typeof DropdownMenuPrimitive.RadioGroup;
DropdownMenuRadioGroup.displayName = DropdownMenuPrimitive.RadioGroup.displayName;

/**
 * DropdownMenuSubTrigger Component
 *
 * Button that opens a submenu when clicked or hovered
 *
 * @example
 * ```tsx
 * <DropdownMenuSubTrigger>
 *   <span>More Options</span>
 * </DropdownMenuSubTrigger>
 * ```
 */
const DropdownMenuSubTrigger = memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    DropdownMenuSubTriggerProps
  >(function DropdownMenuSubTrigger({ className, inset, children, ...props }, ref) {
    const subTriggerClassName = useMemo(() => {
      return cn(
        styles['dropdown-sub-trigger'],
        inset && styles['dropdown-sub-trigger-inset'],
        className
      );
    }, [className, inset]);

    return (
      <DropdownMenuPrimitive.SubTrigger ref={ref} className={subTriggerClassName} {...props}>
        {children}
        <ChevronRight className={styles['dropdown-chevron']} />
      </DropdownMenuPrimitive.SubTrigger>
    );
  })
);

DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

/**
 * DropdownMenuSubContent Component
 *
 * Container for submenu items
 *
 * @example
 * ```tsx
 * <DropdownMenuSubContent>
 *   <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
 *   <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
 * </DropdownMenuSubContent>
 * ```
 */
const DropdownMenuSubContent = memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    DropdownMenuSubContentProps
  >(function DropdownMenuSubContent({ className, ...props }, ref) {
    const subContentClassName = useMemo(() => {
      return cn(styles['dropdown-sub-content'], className);
    }, [className]);

    return (
      <DropdownMenuPrimitive.SubContent ref={ref} className={subContentClassName} {...props} />
    );
  })
);

DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

/**
 * DropdownMenuContent Component
 *
 * Container for the dropdown menu items
 *
 * @example
 * ```tsx
 * <DropdownMenuContent>
 *   <DropdownMenuItem>Profile</DropdownMenuItem>
 *   <DropdownMenuItem>Settings</DropdownMenuItem>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem>Logout</DropdownMenuItem>
 * </DropdownMenuContent>
 * ```
 */
const DropdownMenuContent = memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    DropdownMenuContentProps
  >(function DropdownMenuContent({ className, sideOffset = 4, ...props }, ref) {
    const contentClassName = useMemo(() => {
      return cn(styles['dropdown-content'], className);
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
  })
);

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/**
 * DropdownMenuItem Component
 *
 * A selectable item in the dropdown menu
 *
 * @example
 * ```tsx
 * <DropdownMenuItem onSelect={() => console.log('Profile selected')}>
 *   Profile
 *   <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
const DropdownMenuItem = memo(
  React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Item>, DropdownMenuItemProps>(
    function DropdownMenuItem({ className, inset, ...props }, ref) {
      const itemClassName = useMemo(() => {
        return cn(styles['dropdown-item'], inset && styles['dropdown-item-inset'], className);
      }, [className, inset]);

      return <DropdownMenuPrimitive.Item ref={ref} className={itemClassName} {...props} />;
    }
  )
);

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/**
 * DropdownMenuCheckboxItem Component
 *
 * A checkbox item in the dropdown menu
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
const DropdownMenuCheckboxItem = memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    DropdownMenuCheckboxItemProps
  >(function DropdownMenuCheckboxItem({ className, children, checked, ...props }, ref) {
    const checkboxItemClassName = useMemo(() => {
      return cn(styles['dropdown-checkbox-item'], className);
    }, [className]);

    return (
      <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={checkboxItemClassName}
        checked={checked}
        {...props}
      >
        <span className={styles['dropdown-item-indicator-wrapper']}>
          <DropdownMenuPrimitive.ItemIndicator>
            <Check className="h-4 w-4" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.CheckboxItem>
    );
  })
);

DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

/**
 * DropdownMenuRadioItem Component
 *
 * A radio item in the dropdown menu
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
 *   <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
const DropdownMenuRadioItem = memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    DropdownMenuRadioItemProps
  >(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
    const radioItemClassName = useMemo(() => {
      return cn(styles['dropdown-radio-item'], className);
    }, [className]);

    return (
      <DropdownMenuPrimitive.RadioItem ref={ref} className={radioItemClassName} {...props}>
        <span className={styles['dropdown-item-indicator-wrapper']}>
          <DropdownMenuPrimitive.ItemIndicator>
            <Circle className={styles['dropdown-item-circle']} />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.RadioItem>
    );
  })
);

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

/**
 * DropdownMenuLabel Component
 *
 * A label for a group of menu items
 *
 * @example
 * ```tsx
 * <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
 * <DropdownMenuItem>Profile</DropdownMenuItem>
 * <DropdownMenuItem>Password</DropdownMenuItem>
 * ```
 */
const DropdownMenuLabel = memo(
  React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Label>, DropdownMenuLabelProps>(
    function DropdownMenuLabel({ className, inset, ...props }, ref) {
      const labelClassName = useMemo(() => {
        return cn(styles['dropdown-label'], inset && styles['dropdown-label-inset'], className);
      }, [className, inset]);

      return <DropdownMenuPrimitive.Label ref={ref} className={labelClassName} {...props} />;
    }
  )
);

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/**
 * DropdownMenuSeparator Component
 *
 * A separator for groups of menu items
 *
 * @example
 * ```tsx
 * <DropdownMenuItem>Profile</DropdownMenuItem>
 * <DropdownMenuSeparator />
 * <DropdownMenuItem>Logout</DropdownMenuItem>
 * ```
 */
const DropdownMenuSeparator = memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    DropdownMenuSeparatorProps
  >(function DropdownMenuSeparator({ className, ...props }, ref) {
    const separatorClassName = useMemo(() => {
      return cn(styles['dropdown-separator'], className);
    }, [className]);

    return <DropdownMenuPrimitive.Separator ref={ref} className={separatorClassName} {...props} />;
  })
);

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/**
 * DropdownMenuShortcut Component
 *
 * Display keyboard shortcuts in the dropdown menu items
 *
 * @example
 * ```tsx
 * <DropdownMenuItem>
 *   New Tab
 *   <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
const DropdownMenuShortcut = memo(function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  const shortcutClassName = useMemo(() => {
    return cn(styles['dropdown-shortcut'], className);
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
