/**
 * Terminal Commands Module
 *
 * This is the main entry point for command processing in the terminal.
 * It re-exports all command-related functionality from the commands directory.
 */

import { processCommand } from '../commands';
import { CommandResult } from '../commands/command.types';

/**
 * Re-export all command functionality
 */
export * from '../commands';
export * from '../commands/command.types';

/**
 * Process a command string and return the result
 *
 * @param command - The command string to process
 * @returns The result of processing the command
 */
export const executeCommand = (command: string): CommandResult => {
  return processCommand(command);
};

// Default export for backward compatibility
export default processCommand;
