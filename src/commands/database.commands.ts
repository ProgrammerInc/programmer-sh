'use client';

import { Command, CommandResult } from './command.types';

/**
 * Formats the output content with sections for better readability
 */
const formatQueryOutput = (title: string, lines: string[]): string => {
  const header = `<div class="command-section">${title}</div>`;
  const content = lines.map(line => `<div>${line}</div>`).join('');
  return `${header}${content}`;
};

/**
 * Database commands for demonstration purposes
 */

/**
 * Mock database query that simulates an async operation
 * @param duration Time in ms to simulate the operation
 * @returns A promise that resolves after the specified duration
 */
const mockDatabaseQuery = (duration: number = 1500): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Query completed successfully!');
    }, duration);
  });
};

/**
 * Simulates a database query with a delay to demonstrate the loading animation
 */
export const queryCommand: Command = {
  name: 'query',
  description: 'Demonstrates a database query with loading animation',
  usage: 'query [time]',
  execute: (args: string): CommandResult => {
    // Add debug logging
    console.log('QUERY COMMAND EXECUTED', { args });
    console.log('%c DATABASE QUERY - COMMAND STARTED', 'background: #222; color: #bada55');
    
    // Parse the time argument or use default
    const time = args ? parseInt(args, 10) : 1500;
    const validTime = !isNaN(time) ? time : 1500;
    
    console.log('QUERY COMMAND TIME', { validTime });
    
    // Log to verify we're returning an async command
    const result = {
      content: `Starting database query (will take ${validTime}ms)...`,
      isError: false,
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        console.log('QUERY COMMAND ASYNC RESOLVER STARTED');
        console.log('%c DATABASE QUERY - RESOLVER RUNNING', 'background: #222; color: #bada55');
        try {
          // Simulate database query
          const queryResult = await mockDatabaseQuery(validTime);
          
          console.log('QUERY COMMAND COMPLETED', { queryResult });
          
          return {
            content: formatQueryOutput(
              'Database Query Results',
              [
                `${queryResult}`,
                '',
                `Query completed in: ${validTime}ms`,
                '',
                'This command demonstrates the terminal loading animation',
                'for async operations like database queries.',
              ]
            ),
            isError: false,
            rawHTML: true
          };
        } catch (error) {
          console.error('QUERY COMMAND ERROR', error);
          return {
            content: `Error executing query: ${error instanceof Error ? error.message : String(error)}`,
            isError: true,
            rawHTML: false
          };
        }
      }
    };
    console.log('RETURNING COMMAND RESULT', result);
    return result;
  }
};

/**
 * Database commands collection
 */
export const databaseCommands: Record<string, Command> = {
  query: queryCommand
};
