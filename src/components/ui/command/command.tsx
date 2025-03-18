'use client';

/**
 * Command component
 * 
 * A command menu powered by cmdk that can be used for command palettes, search overlays, etc.
 */

import { Dialog, DialogContent } from '@/components/ui/dialog/dialog';
import { cn } from '@/utils/app.utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './command.module.css';
import {
  CommandDialogProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandSeparatorProps,
  CommandShortcutProps
} from './command.types';

/**
 * Command component
 * 
 * A command menu powered by cmdk that can be used for command palettes, search overlays, etc.
 * 
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Type a command or search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *       <CommandItem>Search</CommandItem>
 *       <CommandItem>Settings</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
const Command = memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const commandClassName = useMemo(() => {
    return cn(styles.command, className);
  }, [className]);

  return <CommandPrimitive ref={ref} className={commandClassName} {...props} />;
}));

Command.displayName = CommandPrimitive.displayName;

/**
 * CommandDialog component
 * 
 * A dialog that contains a command menu.
 * 
 * @example
 * ```tsx
 * <CommandDialog open={open} onOpenChange={setOpen}>
 *   <CommandInput placeholder="Type a command or search..." />
 *   <CommandList>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </CommandDialog>
 * ```
 */
const CommandDialog = memo(({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className={styles['command-dialog']}>
        <Command className={styles['command-dialog-selectors']}>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
});

CommandDialog.displayName = 'CommandDialog';

/**
 * CommandInput component
 * 
 * The input field for the command menu.
 * 
 * @example
 * ```tsx
 * <CommandInput placeholder="Type a command or search..." />
 * ```
 */
const CommandInput = memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const inputClassName = useMemo(() => {
    return cn(styles['command-input'], className);
  }, [className]);

  return (
    <div className={styles['command-input-wrapper']} cmdk-input-wrapper="">
      <Search className={styles['command-input-icon']} />
      <CommandPrimitive.Input ref={ref} className={inputClassName} {...props} />
    </div>
  );
}));

CommandInput.displayName = CommandPrimitive.Input.displayName;

/**
 * CommandList component
 * 
 * The list of items displayed in the command menu.
 * 
 * @example
 * ```tsx
 * <CommandList>
 *   <CommandEmpty>No results found.</CommandEmpty>
 *   <CommandGroup heading="Suggestions">
 *     <CommandItem>Calendar</CommandItem>
 *   </CommandGroup>
 * </CommandList>
 * ```
 */
const CommandList = memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const listClassName = useMemo(() => {
    return cn(styles['command-list'], className);
  }, [className]);

  return <CommandPrimitive.List ref={ref} className={listClassName} {...props} />;
}));

CommandList.displayName = CommandPrimitive.List.displayName;

/**
 * CommandEmpty component
 * 
 * Displayed when the command menu has no results.
 * 
 * @example
 * ```tsx
 * <CommandEmpty>No results found.</CommandEmpty>
 * ```
 */
const CommandEmpty = memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>((props, ref) => {
  return <CommandPrimitive.Empty ref={ref} className={styles['command-empty']} {...props} />;
}));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

/**
 * CommandGroup component
 * 
 * Used to group related items in the command menu.
 * 
 * @example
 * ```tsx
 * <CommandGroup heading="Suggestions">
 *   <CommandItem>Calendar</CommandItem>
 *   <CommandItem>Search</CommandItem>
 * </CommandGroup>
 * ```
 */
const CommandGroup = memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const groupClassName = useMemo(() => {
    return cn(styles['command-group'], className);
  }, [className]);

  return <CommandPrimitive.Group ref={ref} className={groupClassName} {...props} />;
}));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

/**
 * CommandSeparator component
 * 
 * A visual separator for the command menu.
 * 
 * @example
 * ```tsx
 * <CommandGroup>
 *   <CommandItem>Item 1</CommandItem>
 *   <CommandSeparator />
 *   <CommandItem>Item 2</CommandItem>
 * </CommandGroup>
 * ```
 */
const CommandSeparator = memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const separatorClassName = useMemo(() => {
    return cn(styles['command-separator'], className);
  }, [className]);

  return <CommandPrimitive.Separator ref={ref} className={separatorClassName} {...props} />;
}));

CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

/**
 * CommandItem component
 * 
 * An item in the command menu, can be selected and triggered.
 * 
 * @example
 * ```tsx
 * <CommandItem onSelect={() => console.log('selected')}>
 *   <Calendar className="mr-2 h-4 w-4" />
 *   <span>Calendar</span>
 * </CommandItem>
 * ```
 */
const CommandItem = memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const itemClassName = useMemo(() => {
    return cn(styles['command-item'], className);
  }, [className]);

  return <CommandPrimitive.Item ref={ref} className={itemClassName} {...props} />;
}));

CommandItem.displayName = CommandPrimitive.Item.displayName;

/**
 * CommandShortcut component
 * 
 * Used to display keyboard shortcuts in command items.
 * 
 * @example
 * ```tsx
 * <CommandItem>
 *   <span>Search</span>
 *   <CommandShortcut>⌘K</CommandShortcut>
 * </CommandItem>
 * ```
 */
const CommandShortcut = memo(({ className, ...props }: CommandShortcutProps) => {
  // Memoize the className calculation
  const shortcutClassName = useMemo(() => {
    return cn(styles['command-shortcut'], className);
  }, [className]);

  return <span className={shortcutClassName} {...props} />;
});

CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
};

export default Command;
