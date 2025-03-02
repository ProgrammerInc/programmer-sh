// Re-export all commands
export * from './helpCommand';
export * from './systemCommands';
export * from './informationCommands';
export * from './experienceCommand';
export * from './educationCommand';
export * from './projectsCommand';
export * from './resumeCommand';
export * from './messageCommands';
export * from './types';

// Command processor
import { CommandResult, Command } from './types';
import { helpCommand } from './helpCommand';
import { clearCommand, whoamiCommand } from './systemCommands';
import { contactCommand, aboutCommand, skillsCommand } from './informationCommands';
import { experienceCommand } from './experienceCommand';
import { educationCommand } from './educationCommand';
import { projectsCommand } from './projectsCommand';
import { resumeCommand } from './resumeCommand';
import { saveMessage, getMessages } from './messageCommands';

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
      return clearCommand.execute();
    case 'whoami':
      return whoamiCommand.execute();
    case 'contact':
      return contactCommand.execute();
    case 'about':
      return aboutCommand.execute();
    case 'skills':
      return skillsCommand.execute();
    case 'experience':
      return experienceCommand.execute();
    case 'education':
      return educationCommand.execute();
    case 'projects':
      return projectsCommand.execute(args);
    case 'resume':
      return resumeCommand.execute();
    case 'welcome':
      return {
        content: `Welcome to Programmer.SH Terminal Portfolio!
      
======================================================
 
Type 'help' to see available commands.
Try 'about' to learn more about me.
`,
        isError: false,
      };
    case 'save':
      if (!args) {
        return {
          content: 'Usage: save [your message]',
          isError: true,
        };
      }
      // This returns a Promise, so we need to handle it specially
      return {
        content: 'Saving message...',
        isAsync: true,
        asyncResolver: () => saveMessage(args),
      };
    case 'messages':
      // This returns a Promise, so we need to handle it specially
      return {
        content: 'Fetching messages...',
        isAsync: true,
        asyncResolver: () => getMessages(),
      };
    default:
      return {
        content: `Command not found: ${command}. Type 'help' to see available commands.`,
        isError: true,
      };
  }
};
