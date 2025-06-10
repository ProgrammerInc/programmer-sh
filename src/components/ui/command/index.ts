/**
 * Command component module
 *
 * A command menu powered by cmdk that can be used for command palettes, search overlays, and more.
 */

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from './command';

export * from './command';
export * from './command.types';

export default {
  Root: Command,
  Dialog: CommandDialog,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Input: CommandInput,
  Item: CommandItem,
  List: CommandList,
  Separator: CommandSeparator,
  Shortcut: CommandShortcut
};
