'use client';

import { Command, CommandResult } from './command.types';

/**
 * Debug command to show all registered commands
 */
export const debugCommand: Command = {
  name: 'debug',
  description: 'Debugging information',
  usage: 'debug [option]',
  execute: (args: string): CommandResult => {
    if (args === 'commands') {
      // Manually log predefined command names
      const commandNames = [
        'about',
        'clear',
        'contact',
        'cursor',
        'date',
        'debug',
        'echo',
        'education',
        'experience',
        'help',
        'history',
        'login',
        'logout',
        'privacy',
        'profile',
        'projects',
        'query',
        'resume',
        'skills',
        'social',
        'terms',
        'theme',
        'wallpaper',
        'welcome',
        'whoami'
      ].sort();

      console.log('Available commands:', commandNames);

      return {
        content:
          `<div class="command-section">Available Commands (${commandNames.length})</div>` +
          commandNames.map(name => `<div>${name}</div>`).join(''),
        isError: false,
        rawHTML: true
      };
    }

    return {
      content: 'Available debug options: commands',
      isError: false
    };
  }
};

export const debugCommands: Record<string, Command> = {
  debug: debugCommand
};
