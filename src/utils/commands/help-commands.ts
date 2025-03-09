import { Command, CommandResult } from './types';
import { welcomeCommand } from './welcome-commands';

export interface CommandHelp {
  name: string;
  description: string;
  placeholder?: string;
}

// Define command categories for better organization
export interface CommandCategory {
  name: string;
  description: string;
  commands: Record<string, CommandHelp>;
}

export const commandCategories: CommandCategory[] = [
  {
    name: 'System',
    description: 'Commands for terminal operation',
    commands: {
      help: {
        name: 'Help',
        description: 'Show available commands',
        placeholder: '[command]'
      },
      welcome: {
        name: 'Welcome',
        description: 'Show the welcome message'
      },
      echo: {
        name: 'Echo',
        description: 'Echo a message back to the terminal',
        placeholder: '[message]'
      },
      clear: {
        name: 'Clear',
        description: 'Clear the terminal'
      }
    }
  },
  {
    name: 'Authentication',
    description: 'User account management',
    commands: {
      signup: {
        name: 'Signup',
        description: 'Create a new account'
      },
      login: {
        name: 'Login',
        description: 'Log in to your account'
      },
      logout: {
        name: 'Logout',
        description: 'Log out of your account'
      },
      profile: {
        name: 'Profile',
        description: 'Show user profile',
        placeholder: '[username]'
      },
      whoami: {
        name: 'Whoami',
        description: 'Show the current user'
      }
    }
  },
  {
    name: 'Portfolio',
    description: 'Information about me and my work',
    commands: {
      about: {
        name: 'About',
        description: 'Learn about me'
      },
      experience: {
        name: 'Experience',
        description: 'View my work experience'
      },
      education: {
        name: 'Education',
        description: 'View my educational background'
      },
      projects: {
        name: 'Projects',
        description: 'Browse my portfolio projects'
      },
      skills: {
        name: 'Skills',
        description: 'View my technical skills'
      },
      resume: {
        name: 'Resume',
        description: 'View or download my resume'
      },
      contact: {
        name: 'Contact',
        description: 'Get my contact information'
      }
    }
  },
  {
    name: 'Personalization',
    description: 'Customize your terminal experience',
    commands: {
      cursor: {
        name: 'Cursor',
        description: 'Change the cursor style',
        placeholder: '[name]'
      },
      wallpaper: {
        name: 'Wallpaper',
        description: 'Change the terminal wallpaper',
        placeholder: '[name]'
      },
      theme: {
        name: 'Theme',
        description: 'Change the terminal theme',
        placeholder: '[dark|light]'
      }
    }
  }
];

// Flat mapping of all commands for quick lookups
export const allCommands: Record<string, CommandHelp> = commandCategories.reduce(
  (acc, category) => {
    return { ...acc, ...category.commands };
  },
  {}
);

export const getSpecificCommandHelp = (commandName: string): string => {
  // Find which category the command belongs to
  const category = commandCategories.find(cat => Object.keys(cat.commands).includes(commandName));

  if (commandName in allCommands) {
    if (allCommands[commandName].placeholder) {
      return `\n<span class="text-terminal-prompt command-link" data-command="${commandName}" data-placeholder="${allCommands[commandName].placeholder}">${commandName}</span>: ${allCommands[commandName].description}${category ? ` (Category: ${category.name})` : ''}\n\n`;
    } else {
      return `\n<span class="text-terminal-prompt command-link" data-command="${commandName}">${commandName}</span>: ${allCommands[commandName].description}${category ? ` (Category: ${category.name})` : ''}\n\n`;
    }
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
    let helpContent = `<div class="font-mono text-xs md:text-sm mt-4 mb-4">Available Commands:</div>`;

    // List commands by category
    commandCategories.forEach((category, index) => {
      helpContent += `<div class="mb-4"><div class="text-terminal-prompt font-normal">${category.name} Commands</div>`;

      // List all commands in this category in a compact format
      const commandEntries = Object.entries(category.commands);
      const commandsHtml = commandEntries
        .map(([name, command], index) => {
          return `&nbsp;- <span class="command-link text-terminal-prompt" data-command="${name}">${name}</span>: ${command.description}${index < commandEntries.length - 1 ? '\n' : ''}`;
        })
        .join('');

      helpContent += `<div class="ml-2">${commandsHtml}</div></div>`;
    });

    helpContent += `<div class="mb-4"><span class="text-terminal-prompt">Tip:</span> Type <span class="command-link" data-command="help" data-placeholder="[command]">help [command]</span> for more information about a specific command.</div></div>`;

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
