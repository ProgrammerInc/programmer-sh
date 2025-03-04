import {
  loginCommand,
  logoutCommand,
  profileCommand,
  signupCommand,
  whoamiCommand
} from './authCommands';
import { educationCommand } from './educationCommand';
import { experienceCommand } from './experienceCommand';
import { helpCommand } from './helpCommand';
import { aboutCommand, contactCommand } from './informationCommands';
import { projectsCommand } from './projectsCommand';
import { resumeCommand } from './resumeCommand';
import { skillsCommand } from './skillsCommand';
import { socialCommand } from './socialCommand';
import { clearCommand, dateCommand, echoCommand, historyCommand } from './systemCommands';
import { initializeTheme, themeCommand } from './themeCommand';
import { initializeWallpaper, wallpaperCommand } from './wallpaperCommand';
import { welcomeCommand } from './welcomeCommand';

// Initialize settings
initializeTheme();
initializeWallpaper();

export const processCommand = (commandString: string) => {
  if (commandString.trim() === '') {
    return {
      content: '',
      isError: false
    };
  }

  if (commandString.trim().toLowerCase() === 'clear') {
    return clearCommand.execute();
  }

  // Extract the command name and any arguments
  const tokens = commandString.trim().split(/\s+/);
  const commandName = tokens[0].toLowerCase();
  const args = tokens.slice(1).join(' ');

  // Welcome command
  if (commandName === welcomeCommand.name) {
    return welcomeCommand.execute();
  }

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

  if (commandName === resumeCommand.name) {
    return resumeCommand.execute();
  }

  if (commandName === educationCommand.name) {
    return educationCommand.execute();
  }

  if (commandName === socialCommand.name) {
    return socialCommand.execute();
  }

  // System commands
  if (commandName === helpCommand.name) {
    return helpCommand.execute();
  }

  if (commandName === 'theme') {
    return themeCommand.execute(args);
  }

  if (commandName === 'echo') {
    return echoCommand.execute(args);
  }

  if (commandName === 'date') {
    return dateCommand.execute();
  }

  if (commandName === 'history') {
    return historyCommand.execute();
  }

  // Add wallpaperCommand to commands object
  if (commandName === 'wallpaper') {
    return wallpaperCommand.execute(args);
  }

  // Handle project command - this needs to be fixed since projectCommand doesn't exist
  if (commandName === 'project') {
    if (args.length === 0) {
      return {
        content: 'Usage: project <id>',
        isError: true
      };
    }
    // Use projectsCommand for now or implement a separate project command
    return projectsCommand.execute(args);
  }

  // Unknown command
  return {
    content: `Unknown command: ${commandName}. Type 'help' to see available commands.`,
    isError: true
  };
};
