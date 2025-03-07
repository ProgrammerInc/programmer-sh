
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
      { name: 'wallpaper', description: 'Change the terminal background wallpaper' },
      { name: 'about', description: 'Learn about James A. Black Jr.' },
      { name: 'contact', description: 'View contact information' },
      { name: 'education', description: 'See educational background' },
      { name: 'experience', description: 'View work experience' },
      { name: 'projects', description: 'Browse portfolio projects' },
      { name: 'resume', description: 'View resume' },
      { name: 'skills', description: 'View technical skills' },
      { name: 'welcome', description: 'Display welcome message' }
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

// This is the function that's used to get help for a specific command
export const getSpecificCommandHelp = (commandName: string): string => {
  const commands: Record<string, { description: string, usage?: string }> = {
    'help': { description: 'Show available commands' },
    'clear': { description: 'Clear the terminal screen' },
    'echo': { description: 'Echo a message to the terminal', usage: 'echo [message]' },
    'login': { description: 'Log in to your account', usage: 'login [email] [password]' },
    'signup': { description: 'Create a new account', usage: 'signup [email] [password]' },
    'logout': { description: 'Log out of your account' },
    'whoami': { description: 'Show current user information' },
    'profile': { description: 'View or update your profile' },
    'theme': { description: 'Change the terminal theme', usage: 'theme [dark/light]' },
    'cursor': { description: 'Change the cursor style', usage: 'cursor [style]' },
    'wallpaper': { description: 'Change the terminal background', usage: 'wallpaper [name]' },
    'about': { description: 'Learn about James A. Black Jr.' },
    'contact': { description: 'View contact information' },
    'education': { description: 'See educational background' },
    'experience': { description: 'View work experience' },
    'projects': { description: 'Browse portfolio projects' },
    'resume': { description: 'View resume' },
    'skills': { description: 'View technical skills' },
    'welcome': { description: 'Display welcome message' }
  };

  const command = commands[commandName.toLowerCase()];
  
  if (!command) {
    return `Unknown command: ${commandName}`;
  }

  let helpText = `<strong class="text-terminal-prompt">${commandName}</strong>: ${command.description}`;
  
  if (command.usage) {
    helpText += `\nUsage: ${command.usage}`;
  }
  
  return helpText;
};
