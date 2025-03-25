/**
 * URL Command Handler
 * 
 * Handles command extraction from URLs and provides utility functions
 * for working with URL-based commands.
 */

// Import getCommands function from the main commands file
import { getCommands } from '../commands';
import { CommandName } from '../commands/command.types';

/**
 * Result interface for URL parameter extraction
 */
export interface UrlParameters {
  /** Command extracted from URL, empty string if none found */
  command: string;
  /** Theme parameter extracted from URL, empty string if none found */
  theme: string;
}

// Get all commands and log them for debugging
const allCommands = getCommands();
console.log('All available commands:', Object.keys(allCommands));

/**
 * List of valid commands that can be executed via URL
 * This is dynamically generated from all available commands
 */
const baseCommands = Object.keys(allCommands) as ReadonlyArray<CommandName>;

// Add any known command aliases to the valid commands list
const aliasCommands = ['support'];

// Combine base commands with alias commands for a complete list
export const validUrlCommands = [...baseCommands, ...aliasCommands] as ReadonlyArray<CommandName>;

// Log the valid commands to verify they are correctly populated
console.log('Valid URL commands:', validUrlCommands);

/**
 * Extract command and theme from URL
 * 
 * @param url - The URL to extract parameters from
 * @returns Object containing the extracted command and theme
 * @throws Will not throw errors, returns empty strings instead
 */
export const extractUrlParameters = (url: string): UrlParameters => {
  // Default values
  const result: UrlParameters = {
    command: '',
    theme: ''
  };

  // Check if URL has a path component
  if (!url || url === '/' || url === '') {
    return result;
  }

  try {
    // Parse URL to extract path and query parameters
    const urlObj = new URL(url, window.location.origin);

    // Extract command from path (remove leading slash)
    const path = urlObj.pathname;
    // Clean up the path to extract just the command
    // Remove leading slash and split on any additional slashes
    // to get just the first path segment
    let command = '';
    if (path && path !== '/') {
      const pathWithoutLeadingSlash = path.startsWith('/') ? path.substring(1) : path;
      // Split by slash and take only the first segment
      const pathSegments = pathWithoutLeadingSlash.split('/');
      command = pathSegments.length > 0 ? pathSegments[0] : '';
    }

    // Extract theme parameter if present
    const theme = urlObj.searchParams.get('theme') || '';

    return {
      command: command,
      theme: theme
    };
  } catch (error) {
    const typedError = error as Error;
    console.error(`Error parsing URL ${url}:`, typedError.message);
    return result;
  }
};

/**
 * Validates if a command is a valid URL command
 *
 * @param command The command to validate
 * @returns boolean indicating if command is valid
 */
export const isValidUrlCommand = (command: string): boolean => {
  const commandParts = command.split('/');
  const commandName = commandParts.length > 1 ? commandParts[1].toLowerCase() : '';

  console.log(`URL command validation: ${commandName}`, { 
    command, 
    commandName,
    commandParts,
    validationResult: validUrlCommands.includes(commandName as CommandName) 
  });

  // Special case for support alias
  if (commandName === 'support') {
    console.log('URL handler recognizing support command directly');
    return true;
  }

  // Standard validation logic
  return validUrlCommands.includes(commandName as CommandName);
};

/**
 * Creates a URL string for a specific command with optional theme
 * 
 * @param command - The command to generate a URL for
 * @param theme - Optional theme parameter
 * @returns Full URL string for the command
 */
export const createCommandUrl = (command: CommandName, theme?: string): string => {
  let url = `/${command}`;
  
  if (theme && theme.trim() !== '') {
    url += `?theme=${encodeURIComponent(theme)}`;
  }
  
  return url;
};
