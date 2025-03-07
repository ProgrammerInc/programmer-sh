import { Command, CommandResult } from './types';
import { welcomeCommand } from './welcomeCommand';

export const helpCommand: Command = {
  name: 'help',
  description: 'Show available commands',
  execute: (): CommandResult => {
    return {
      content: `Available commands:
        - help: Show available commands
        - echo [message]: Echo a message back to the terminal
        - login: Log in to your account
        - signup: Create a new account
        - logout: Log out of your account
        - whoami: Show the current user
        - profile: Show your profile
        - theme: Change the terminal theme
        - clear: Clear the terminal
        - cursor: Change the cursor style
        - wallpaper: Change the terminal wallpaper
        - welcome: Display the welcome message
        - about: Learn about me
        - contact: Get my contact information
        - skills: View technical skills
        - experience: View work experience
        - projects: Browse portfolio projects
        - resume: View my resume
        - education: See educational background`,
      isError: false
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
