
import { Command } from './types';
import { welcomeCommand } from './welcomeCommand';

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal',
  execute: () => {
    // Return a special command result that signals to clear the terminal
    // and then follows with the welcome command output
    return {
      content: 'CLEAR_TERMINAL',
      isError: false,
      runAfterClear: welcomeCommand.execute(),
    };
  },
};
