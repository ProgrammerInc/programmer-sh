'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog/dialog';
import { cn } from '@/utils/app.utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

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
    return cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      className
    );
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
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
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
    return cn(
      'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
      className
    );
  }, [className]);

  return (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
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
    return cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className);
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
  return <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />;
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
    return cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      className
    );
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
    return cn('-mx-1 h-px bg-border', className);
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
    return cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    );
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
    return cn('ml-auto text-xs tracking-widest text-muted-foreground', className);
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
