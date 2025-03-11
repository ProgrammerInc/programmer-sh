import { Command } from './types';
import { welcomeCommand } from './welcome-commands';

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal',
  execute: () => {
    // Return a special command result that signals to clear the terminal
    // and then follows with the welcome command output
    return {
      content: 'CLEAR_TERMINAL',
      isError: false,
      runAfterClear: welcomeCommand.execute()
    };
  }
};

export const echoCommand: Command = {
  name: 'echo',
  description: 'Echo a message back to the terminal',
  usage: 'echo [message]',
  execute: (args?: string) => {
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

export const dateCommand: Command = {
  name: 'date',
  description: 'Display the current date and time',
  execute: () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };

    return {
      content: `Current Date and Time: ${now.toLocaleString('en-US', options)}`,
      isError: false
    };
  }
};

export const historyCommand: Command = {
  name: 'history',
  description: 'Show command history',
  execute: () => {
    // Try to get command history from localStorage
    try {
      const savedHistory = localStorage.getItem('terminal_command_history');
      
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          // Format the history display
          const historyDisplay = parsedHistory
            .map((item, index) => {
              const cmd = item.command || 'unknown';
              return `  ${index + 1}. <strong><span class="command-link" data-command="${cmd}">${cmd}</span></strong>`;
            })
            .join('\n');
          
          return {
            content: historyDisplay.length > 0 
              ? `Command History:\n\n${historyDisplay}` 
              : 'No command history available.',
            isError: false
          };
        }
      }
      
      // If we got here, there's no history or it couldn't be parsed
      return {
        content: 'No command history available.',
        isError: false
      };
    } catch (error) {
      console.error('Error fetching command history:', error);
      return {
        content: 'Error fetching command history. Please try again later.',
        isError: true
      };
    }
  }
};
