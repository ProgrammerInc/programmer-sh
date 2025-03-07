
import { Command, CommandResult } from './types';

// Clear command
export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal screen',
  execute: (): CommandResult => {
    return {
      content: '',
      isError: false,
      runAfterClear: {
        content: 'Terminal cleared',
        isError: false
      }
    };
  }
};

// Echo command
export const echoCommand: Command = {
  name: 'echo',
  description: 'Echo a message to the terminal',
  usage: 'echo [message]',
  execute: (args?: string): CommandResult => {
    if (!args) {
      return {
        content: 'Usage: echo [message]',
        isError: false
      };
    }

    return {
      content: args,
      isError: false
    };
  }
};

// Help command
export const helpCommand: Command = {
  name: 'help',
  description: 'Show available commands',
  execute: (): CommandResult => {
    const availableCommands = [
      { name: 'help', description: 'Show available commands' },
      { name: 'clear', description: 'Clear the terminal screen' },
      { name: 'echo', description: 'Echo a message to the terminal' },
      { name: 'login', description: 'Log in to your account' },
      { name: 'signup', description: 'Create a new account' },
      { name: 'logout', description: 'Log out of your account' },
      { name: 'whoami', description: 'Show current user information' },
      { name: 'profile', description: 'View or update your profile' },
      { name: 'theme', description: 'Change the terminal theme (dark/light)' },
      { name: 'cursor', description: 'Change the cursor style' },
      { name: 'wallpaper', description: 'Change the terminal background wallpaper' }
    ];

    const commandsList = availableCommands
      .map(cmd => `  <span class="command-link" data-command="${cmd.name}">${cmd.name}</span>: ${cmd.description}`)
      .join('\n');

    return {
      content: `Available commands:\n\n${commandsList}\n\nType a command and press Enter to execute.`,
      isError: false
    };
  }
};
