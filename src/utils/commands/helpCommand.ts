import { Command } from './types';

// Help command
export const helpCommand: Command = {
  name: 'help',
  description: 'Display available commands or help for a specific command',
  usage: 'help [command]',
  execute: (args?: string) => {
    if (!args) {
      return {
        content: getCommandHelp(),
        isError: false,
      };
    }

    const commandName = args.trim().toLowerCase();
    const commandHelp = getSpecificCommandHelp(commandName);

    if (commandHelp) {
      return {
        content: commandHelp,
        isError: false,
      };
    } else {
      return {
        content: `No help available for command: ${commandName}`,
        isError: true,
      };
    }
  },
};

// Get help for a specific command
const getSpecificCommandHelp = (commandName: string): string | undefined => {
  switch (commandName) {
    case 'help':
      return `
      <strong class="text-terminal-prompt">help</strong>: Display available commands or help for a specific command
      Usage: help [command]
      Example: help skills
      `;
    case 'welcome':
      return `
      <strong class="text-terminal-prompt">welcome</strong>: Display the welcome message
      Usage: welcome
      `;
    case 'about':
      return `
      <strong class="text-terminal-prompt">about</strong>: Show information about me
      Usage: about
      `;
    case 'clear':
      return `
      <strong class="text-terminal-prompt">clear</strong>: Clear the terminal screen
      Usage: clear
      `;
    case 'skills':
      return `
      <strong class="text-terminal-prompt">skills</strong>: Display my technical skills
      Usage: skills
      `;
    case 'experience':
      return `
      <strong class="text-terminal-prompt">experience</strong>: Show my work experience
      Usage: experience
      `;
    case 'education':
      return `
      <strong class="text-terminal-prompt">education</strong>: Show my educational background
      Usage: education
      `;
    case 'projects':
      return `
      <strong class="text-terminal-prompt">projects</strong>: Browse my projects
      Usage: projects
      `;
    case 'resume':
      return `
      <strong class="text-terminal-prompt">resume</strong>: View or download my resume
      Usage: resume
      `;
    case 'contact':
      return `
      <strong class="text-terminal-prompt">contact</strong>: Display contact information
      Usage: contact
      `;
    case 'email':
      return `
      <strong class="text-terminal-prompt">email</strong>: Send me an email
      Usage: email
      `;
    case 'social':
      return `
      <strong class="text-terminal-prompt">social</strong>: Show social media links
      Usage: social
      `;
    case 'message':
      return `
      <strong class="text-terminal-prompt">message</strong>: Leave me a message
      Usage: message
      `;
    case 'theme':
      return `
      <strong class="text-terminal-prompt">theme</strong>: Change the terminal theme
      Usage: theme [dark|light]
      `;
    case 'date':
      return `
      <strong class="text-terminal-prompt">date</strong>: Display the current date and time
      Usage: date
      `;
    case 'whoami':
      return `
      <strong class="text-terminal-prompt">whoami</strong>: Display current user
      Usage: whoami
      `;
    case 'history':
      return `
      <strong class="text-terminal-prompt">history</strong>: Show command history
      Usage: history
      `;
    case 'login':
      return `
      <strong class="text-terminal-prompt">login</strong>: Log in to access exclusive content
      Usage: login
      `;
    case 'logout':
      return `
      <strong class="text-terminal-prompt">logout</strong>: Log out from the current session
      Usage: logout
      `;
    case 'echo':
      return `
      <strong class="text-terminal-prompt">echo</strong>: Echo a message back to the terminal
      Usage: echo [message]
      Example: echo Hello, world!
      `;
    case 'wallpaper':
      return `
      <strong class="text-terminal-prompt">wallpaper</strong>: Change the background wallpaper
      Usage: wallpaper [name]
      `;
    default:
      return undefined;
  }
};

// Update getCommandHelp to include the wallpaper command
export const getCommandHelp = () => {
  return `<strong>Available Commands:</strong>

  <strong>Basic Commands:</strong>
  - <span class="command-link" data-command="help">help</span>: Display this help message
  - <span class="command-link" data-command="welcome">welcome</span>: Display the welcome message
  - <span class="command-link" data-command="about">about</span>: Show information about me
  - <span class="command-link" data-command="clear">clear</span>: Clear the terminal screen
  - <span class="command-link" data-command="echo [message]">echo</span>: Echo a message back to the terminal

  <strong>Portfolio Commands:</strong>
  - <span class="command-link" data-command="skills">skills</span>: Display my technical skills
  - <span class="command-link" data-command="experience">experience</span>: Show my work experience
  - <span class="command-link" data-command="education">education</span>: Show my educational background
  - <span class="command-link" data-command="projects">projects</span>: Browse my projects
  - <span class="command-link" data-command="resume">resume</span>: View or download my resume

  <strong>Contact Commands:</strong>
  - <span class="command-link" data-command="contact">contact</span>: Display contact information
  - <span class="command-link" data-command="email">email</span>: Send me an email
  - <span class="command-link" data-command="social">social</span>: Show social media links
  - <span class="command-link" data-command="message">message</span>: Leave me a message

  <strong>System Commands:</strong>
  - <span class="command-link" data-command="theme [dark|light]">theme</span>: Change the terminal theme
  - <span class="command-link" data-command="wallpaper">wallpaper</span>: Change the background wallpaper
  - <span class="command-link" data-command="date">date</span>: Display the current date and time
  - <span class="command-link" data-command="whoami">whoami</span>: Display current user
  - <span class="command-link" data-command="history">history</span>: Show command history
  - <span class="command-link" data-command="login">login</span>: Log in to access exclusive content
  - <span class="command-link" data-command="logout">logout</span>: Log out from the current session

  Type <span class="command-link" data-command="help [command]">help [command]</span> for more information about a specific command.`;
};
