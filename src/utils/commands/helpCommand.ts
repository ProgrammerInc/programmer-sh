import { Command, CommandResult } from './types';
import { welcomeCommand } from './welcomeCommand';

// Define command categories for better organization
export interface CommandCategory {
  name: string;
  description: string;
  commands: Record<string, string>;
}

export const commandCategories: CommandCategory[] = [
  {
    name: 'System',
    description: 'Commands for terminal operation',
    commands: {
      help: 'Show available commands',
      echo: 'Echo a message back to the terminal',
      clear: 'Clear the terminal',
      theme: 'Change the terminal theme',
      cursor: 'Change the cursor style',
      wallpaper: 'Change the terminal wallpaper',
      welcome: 'Display the welcome message'
    }
  },
  {
    name: 'Authentication',
    description: 'User account management',
    commands: {
      login: 'Log in to your account',
      signup: 'Create a new account',
      logout: 'Log out of your account',
      whoami: 'Show the current user',
      profile: 'Show your profile'
    }
  },
  {
    name: 'Portfolio',
    description: 'Information about me and my work',
    commands: {
      about: 'Learn about me',
      contact: 'Get my contact information',
      skills: 'View technical skills',
      experience: 'View work experience',
      projects: 'Browse portfolio projects',
      resume: 'View my resume',
      education: 'See educational background'
    }
  }
];

// Flat mapping of all commands for quick lookups
export const allCommands: Record<string, string> = commandCategories.reduce((acc, category) => {
  return { ...acc, ...category.commands };
}, {});

export const getSpecificCommandHelp = (commandName: string): string => {
  // Find which category the command belongs to
  const category = commandCategories.find(cat => Object.keys(cat.commands).includes(commandName));

  if (commandName in allCommands) {
    return `<strong class="text-terminal-prompt command-link" data-command="${commandName}">${commandName}</strong>: ${allCommands[commandName]}${category ? ` (Category: ${category.name})` : ''}`;
  }

  return `Command not found: ${commandName}`;
};

export const helpCommand: Command = {
  name: 'help',
  description: 'Show available commands',
  execute: (args?: string): CommandResult => {
    // If specific command help is requested
    if (args && args.trim() !== '') {
      const commandName = args.trim();
      return {
        content: getSpecificCommandHelp(commandName),
        isError: false,
        rawHTML: true
      };
    }

    // Generate help text with categories
    let helpContent = `<div class="font-mono text-xs md:text-sm mt-4 mb-4"><span class="font-bold">Available Commands:</span></div>`;

    // List commands by category
    commandCategories.forEach(category => {
      helpContent += `<div class="mb-4"><div class="text-terminal-prompt font-bold">${category.name} Commands</div>`;

      // List all commands in this category in a compact format
      const commandEntries = Object.entries(category.commands);
      const commandsHtml = commandEntries
        .map(([cmd, desc], index) => {
          return `- <span class="command-link text-terminal-prompt" data-command="${cmd}">${cmd}</span>: ${desc}${index < commandEntries.length - 1 ? '\n' : ''}`;
        })
        .join('');

      helpContent += `<div class="ml-2">${commandsHtml}</div></div>`;
    });

    helpContent += `<div class="mb-4"><span class="text-terminal-prompt">Tip:</span> Type <span class="command-link" data-command="help">help [command]</span> for more information about a specific command.</div></div>`;

    return {
      content: helpContent,
      isError: false,
      rawHTML: true
    };
  }
};

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal',
  execute: (): CommandResult => {
    // Return a special command result that signals to clear the terminal
    // and then follows with the welcome command output
    return {
      content: '',
      isError: false,
      runAfterClear: welcomeCommand.execute()
    };
  }
};

export const echoCommand: Command = {
  name: 'echo',
  description: 'Echo a message back to the terminal',
  usage: 'echo [message]',
  execute: (args?: string): CommandResult => {
    if (!args || args.trim() === '') {
      return {
        content: '',
        isError: false
      };
    }
    return {
      content: args,
      isError: false
    };
  }
};
