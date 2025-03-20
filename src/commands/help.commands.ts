import { createFeatureLogger } from '../services/logger/logger.utils';
import { Command, CommandResult } from './command.types';
import { welcomeCommand } from './welcome.commands';

// Create a dedicated logger for help commands
const helpLogger = createFeatureLogger('HelpCommands');

/**
 * Interface representing help information for a command
 */
export interface CommandHelp {
  name: string;
  description: string;
  placeholder?: string;
}

/**
 * Interface representing a category of commands with related functionality
 */
export interface CommandCategory {
  name: string;
  description: string;
  commands: Record<string, CommandHelp>;
}

/**
 * Categorized command information for better organization
 */
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
      // echo: {
      //   name: 'Echo',
      //   description: 'Echo a message back to the terminal',
      //   placeholder: '[message]'
      // },
      // clear: {
      //   name: 'Clear',
      //   description: 'Clear the terminal history'
      // },
      history: {
        name: 'History',
        description: 'Show the terminal history'
      },
      privacy: {
        name: 'Privacy',
        description: 'Display the privacy policy'
      },
      terms: {
        name: 'Terms',
        description: 'Display terms and conditions'
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
        description: 'Browse my technical skills'
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
      theme: {
        name: 'Theme',
        description: 'Change the terminal theme',
        placeholder: '[dark|light]'
      },
      cursor: {
        name: 'Cursor',
        description: 'Change the cursor style',
        placeholder: '[name]'
      },
      wallpaper: {
        name: 'Wallpaper',
        description: 'Change the background wallpaper',
        placeholder: '[name]'
      }
    }
  }
];

/**
 * Flat mapping of all commands for quick lookups
 */
export const allCommands: Record<string, CommandHelp> = commandCategories.reduce(
  (acc, category) => {
    return { ...acc, ...category.commands };
  },
  {}
);

/**
 * Generate detailed help information for a specific command
 * @param commandName - Name of the command to get help for
 * @returns HTML-formatted help content for the specified command
 */
export const getSpecificCommandHelp = (commandName: string): string => {
  try {
    // Find which category the command belongs to
    const category = commandCategories.find(cat => Object.keys(cat.commands).includes(commandName));

    if (!(commandName in allCommands)) {
      helpLogger.warn('Command not found in help', { commandName });
      return `Command not found: ${commandName}`;
    }

    // Start building a detailed help display for the command
    let helpContent = `<div class="command-help">\n`;

    // Command title and basic information
    helpContent += `<div>Command: <span class="text-terminal-prompt">${commandName}</span></div>`;
    helpContent += `<div>Description: ${allCommands[commandName].description}</div>`;

    // Category information
    if (category) {
      helpContent += `<div>Category: <span class="text-terminal-prompt">${category.name}</span></div>`;
    }

    // Usage section
    if (allCommands[commandName].placeholder) {
      helpContent += `<div>Usage: <span class="text-terminal-prompt">${commandName} ${allCommands[commandName].placeholder}</span></div>
`;
    } else {
      helpContent += `<div>Usage: <span class="text-terminal-prompt">${commandName}</span></div>
`;
    }

    // Examples section - tailored for each command
    helpContent += `<div>Examples:</div>`;

    // Add command-specific examples
    switch (commandName) {
      case 'help':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="help">help</span> - Show all available commands</div><div><span class="command-link" data-command="help projects">help projects</span> - Show detailed help for the 'projects' command</div></div>`;
        break;
      case 'history':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="history">history</span> - Display your command history</div></div>`;
        break;
      case 'projects':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="projects">projects</span> - List all projects</div><div><span class="command-link" data-command="projects programmer-news">projects programmer-news</span> - Show details for project with name 'programmer-news'</div></div>`;
        break;
      case 'echo':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="echo Hello World">echo Hello World</span> - Display 'Hello World' in the terminal</div></div>`;
        break;
      case 'cursor':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="cursor">cursor</span> - Show available cursor styles</div><div><span class="command-link" data-command="cursor pointer">cursor pointer</span> - Change to pointer cursor</div></div>`;
        break;
      case 'wallpaper':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="wallpaper">wallpaper</span> - Show available wallpapers</div><div><span class="command-link" data-command="wallpaper space">wallpaper space</span> - Change to space wallpaper</div></div>`;
        break;
      case 'theme':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="theme dark">theme dark</span> - Switch to dark theme</div><div><span class="command-link" data-command="theme light">theme light</span> - Switch to light theme</div></div>`;
        break;
      case 'about':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="about">about</span> - Display information about me</div></div>`;
        break;
      case 'clear':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="clear">clear</span> - Clear the terminal output and history</div></div>`;
        break;
      case 'privacy':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="privacy">privacy</span> - Display the privacy policy</div></div>`;
        break;
      case 'terms':
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="terms">terms</span> - Display terms and conditions</div></div>`;
        break;
      default:
        helpContent += `<div class="ml-4"><div><span class="command-link" data-command="${commandName}">${commandName}</span> - Execute the ${commandName} command</div></div>`;
    }

    // Close the command-help div
    helpContent += `</div>\n`;

    helpLogger.debug('Generated specific command help', { commandName });
    return helpContent;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helpLogger.error('Error generating command help', { commandName, error: errorMessage });
    return `Error generating help for command: ${commandName}`;
  }
};

/**
 * Command to display help information about available commands
 */
export const helpCommand: Command = {
  name: 'help',
  description: 'Show available commands',
  usage: 'help [command]',
  execute: (args?: string): CommandResult => {
    try {
      helpLogger.info('Executing help command', args ? { commandArg: args } : {});

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
      commandCategories.forEach(category => {
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

      helpContent += `<div><span class="text-terminal-prompt">Tip:</span> Type <span class="command-link" data-command="help" data-placeholder="[command]">help [command]</span> for more information about a specific command.</div></div>`;

      helpLogger.debug('Generated general help content');
      return {
        content: helpContent,
        isError: false,
        rawHTML: true
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      helpLogger.error('Error executing help command', { error: errorMessage });
      return {
        content: `Error displaying help: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Command to clear the terminal and command history
 */
export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal and command history',
  execute: (): CommandResult => {
    try {
      helpLogger.info('Executing clear command');
      // Return a special command result that signals to clear the terminal and history
      // and then follows with the welcome command output
      return {
        content: '',
        isError: false,
        clearHistory: true, // Signal to also clear command history
        runAfterClear: welcomeCommand.execute()
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      helpLogger.error('Error executing clear command', { error: errorMessage });
      return {
        content: `Error clearing terminal: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Command to echo back a message to the terminal
 */
export const echoCommand: Command = {
  name: 'echo',
  description: 'Echo a message back to the terminal',
  usage: 'echo [message]',
  execute: (args?: string): CommandResult => {
    try {
      helpLogger.info('Executing echo command', args ? { message: args } : {});

      if (!args || args.trim() === '') {
        helpLogger.debug('Echo command received empty input');
        return {
          content: '',
          isError: false
        };
      }

      return {
        content: args,
        isError: false
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      helpLogger.error('Error executing echo command', { error: errorMessage });
      return {
        content: `Error echoing message: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Command to display command history from localStorage
 */
export const historyCommand: Command = {
  name: 'history',
  description: 'Show command history',
  execute: (): CommandResult => {
    try {
      helpLogger.info('Executing history command');
      // Try to get command history from localStorage
      const savedHistory = localStorage.getItem('terminal_command_history');

      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory) as Array<{ command: string }>;

        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          // Format the history display
          const historyDisplay = parsedHistory
            .map((item, index) => {
              const cmd = item.command || 'unknown';
              return `  ${index + 1}. <strong><span class="command-link" data-command="${cmd}">${cmd}</span></strong>`;
            })
            .join('\n');

          helpLogger.info('Command history retrieved successfully', {
            count: parsedHistory.length
          });
          return {
            content:
              historyDisplay.length > 0
                ? `Command History:\n\n${historyDisplay}`
                : 'No command history available.',
            isError: false,
            rawHTML: true
          };
        }
      }

      // If we got here, there's no history or it couldn't be parsed
      helpLogger.info('No command history available');
      return {
        content: 'No command history available.',
        isError: false
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      helpLogger.error('Error fetching command history', { error: errorMessage });
      return {
        content: `Error fetching command history: ${errorMessage}`,
        isError: true
      };
    }
  }
};
