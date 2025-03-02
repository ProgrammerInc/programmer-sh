
// Re-export all commands
export * from './helpCommand';
export * from './systemCommands';
export * from './informationCommands';
export * from './experienceCommand';
export * from './educationCommand';
export * from './projectsCommand';
export * from './resumeCommand';
export * from './messageCommands';

// Command processor
import { CommandResult } from './types';
import {
  helpCommand,
  clearCommand,
  whoamiCommand,
  contactCommand,
  aboutCommand,
  skillsCommand,
  experienceCommand,
  educationCommand,
  projectsCommand,
  resumeCommand,
  saveMessage,
  getMessages
} from './';

export const processCommand = (input: string): CommandResult => {
  // Trim input and convert to lowercase for easier comparison
  const trimmedInput = input.trim();
  
  // Split the input into command and arguments
  const parts = trimmedInput.split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ');

  // Process commands
  switch (command) {
    case 'help':
      return helpCommand();
    case 'clear':
      return clearCommand();
    case 'whoami':
      return whoamiCommand();
    case 'contact':
      return contactCommand();
    case 'about':
      return aboutCommand();
    case 'skills':
      return skillsCommand();
    case 'experience':
      return experienceCommand();
    case 'education':
      return educationCommand();
    case 'projects':
      return projectsCommand();
    case 'resume':
      return resumeCommand();
    case 'welcome':
      return {
        content: "Welcome to my portfolio terminal. Type 'help' to see available commands.",
        isError: false
      };
    case 'save':
      if (!args) {
        return {
          content: "Usage: save [your message]",
          isError: true
        };
      }
      // This returns a Promise, so we need to handle it specially
      return {
        content: "Saving message...",
        isAsync: true,
        asyncResolver: () => saveMessage(args)
      };
    case 'messages':
      // This returns a Promise, so we need to handle it specially
      return {
        content: "Fetching messages...",
        isAsync: true,
        asyncResolver: () => getMessages()
      };
    default:
      return {
        content: `Command not found: ${command}. Type 'help' to see available commands.`,
        isError: true
      };
  }
};
