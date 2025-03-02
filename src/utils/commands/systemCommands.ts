
import { Command, CommandResult } from './types';

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal',
  execute: () => {
    return {
      content: 'CLEAR_TERMINAL',
      isError: false,
    };
  },
};

// Remove the old whoami command since we've replaced it with a more advanced one in authCommands.ts
