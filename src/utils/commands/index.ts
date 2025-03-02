import { Command, CommandResult } from './types';
import { helpCommand } from './helpCommand';
import { aboutCommand, skillsCommand, contactCommand } from './informationCommands';
import { projectsCommand } from './projectsCommand';
import { experienceCommand } from './experienceCommand';
import { educationCommand } from './educationCommand';
import { clearCommand, welcomeCommand } from './systemCommands';
import { resumeCommand } from './resumeCommand';

// List of all available commands
const commandsList: Command[] = [
  helpCommand,
  aboutCommand,
  skillsCommand,
  projectsCommand,
  experienceCommand,
  educationCommand,
  contactCommand,
  clearCommand,
  resumeCommand,
  welcomeCommand,
];

// Function to get all commands
export const getAllCommands = (): Command[] => commandsList;

// Process a command string and return the result
export function processCommand(commandString: string): CommandResult {
  // Trim leading/trailing whitespace and split into command and args
  const parts = commandString.trim().split(/\s+/);
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Find the matching command
  const command = commandsList.find(cmd => cmd.name === commandName);

  if (!command) {
    return {
      content: `Command not found: ${commandName}. Type 'help' to see available commands.`,
      isError: true,
    };
  }

  try {
    return command.execute(args);
  } catch (error) {
    return {
      content: `Error executing command: ${error instanceof Error ? error.message : String(error)}`,
      isError: true,
    };
  }
}

// Re-export types
export type { Command, CommandResult };
