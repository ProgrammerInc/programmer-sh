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

export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Display user information',
  execute: () => {
    return {
      content: 'James A. Black Jr. - Full Stack Developer @ Programmer Inc.',
      isError: false,
    };
  },
};
