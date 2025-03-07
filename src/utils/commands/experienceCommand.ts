import { Command, CommandResult } from './types';

export const experienceCommand: Command = {
  name: 'experience',
  description: 'View work experience',
  execute: (): CommandResult => {
    return {
      content: ``,
      isError: false,
      rawHTML: true
    };
  }
};
