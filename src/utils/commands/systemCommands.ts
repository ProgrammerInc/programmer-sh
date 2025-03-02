import { Command } from './types';

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
