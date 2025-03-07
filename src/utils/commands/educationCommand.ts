import { Command, CommandResult } from './types';

export const educationCommand: Command = {
  name: 'education',
  description: 'See educational background',
  execute: (): CommandResult => {
    return {
      content: ``,
      isError: false,
      rawHTML: true
    };
  }
};
