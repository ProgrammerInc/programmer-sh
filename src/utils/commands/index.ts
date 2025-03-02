import { CommandResult } from './types';
import { aboutCommand, contactCommand } from './informationCommands';
import { skillsCommand } from './skillsCommand';
import { experienceCommand } from './experienceCommand';
import { projectsCommand, projectCommand } from './projectsCommand';
import { educationCommand } from './educationCommand';
import { helpCommand } from './helpCommand';
import { clearCommand } from './systemCommands';
import { loginCommand, logoutCommand, signupCommand, whoamiCommand, profileCommand } from './authCommands';

export const processCommand = (commandString: string) => {
  if (commandString.trim() === '') {
    return {
      content: '',
      isError: false,
    };
  }

  if (commandString.trim().toLowerCase() === 'clear') {
    return clearCommand.execute();
  }

  // Extract the command name and any arguments
  const tokens = commandString.trim().split(/\s+/);
  const commandName = tokens[0].toLowerCase();
  const args = tokens.slice(1);

  // Auth commands
  if (commandName === loginCommand.name) {
    return loginCommand.execute(args);
  }
  if (commandName === logoutCommand.name) {
    return logoutCommand.execute();
  }
  if (commandName === signupCommand.name) {
    return signupCommand.execute(args);
  }
  if (commandName === whoamiCommand.name) {
    return whoamiCommand.execute();
  }
  if (commandName === profileCommand.name) {
    return profileCommand.execute(args);
  }

  // Information commands
  if (commandName === aboutCommand.name) {
    return aboutCommand.execute();
  }
  if (commandName === contactCommand.name) {
    return contactCommand.execute();
  }
  if (commandName === skillsCommand.name) {
    return skillsCommand.execute();
  }
  if (commandName === experienceCommand.name) {
    return experienceCommand.execute();
  }
  if (commandName === projectsCommand.name) {
    return projectsCommand.execute();
  }
  if (commandName === projectCommand.name) {
    if (args.length === 0) {
      return {
        content: "Usage: project <id>",
        isError: true,
      };
    }
    return projectCommand.execute(args);
  }
  if (commandName === educationCommand.name) {
    return educationCommand.execute();
  }

  // System commands
  if (commandName === helpCommand.name) {
    return helpCommand.execute();
  }

  // Unknown command
  return {
    content: `Unknown command: ${commandName}. Type 'help' to see available commands.`,
    isError: true,
  };
};
