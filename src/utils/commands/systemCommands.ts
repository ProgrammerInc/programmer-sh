
import { Command } from './types';

// Clear command implementation
export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal screen',
  execute: () => {
    return {
      content: 'CLEAR_TERMINAL',
    };
  }
};

export const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Display welcome message',
  hidden: true,
  execute: () => {
    return {
      content: `
Welcome to Programmer.SH Terminal Portfolio!
======================================================

Type 'help' to see available commands.
Try 'about' to learn more about me.
`,
    };
  }
};
