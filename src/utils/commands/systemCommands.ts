
import { Command, CommandResult } from './types';
import { welcomeCommand } from './welcomeCommand';

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal',
  execute: () => {
    // Return a special command result that signals to clear the terminal
    // and then follows with the welcome command output
    return {
      content: 'CLEAR_TERMINAL',
      isError: false,
      runAfterClear: welcomeCommand.execute(),
    };
  },
};

export const echoCommand: Command = {
  name: 'echo',
  description: 'Echo a message back to the terminal',
  usage: 'echo [message]',
  execute: (args?: string) => {
    if (!args || args.trim() === '') {
      return {
        content: '',
        isError: false,
      };
    }
    return {
      content: args,
      isError: false,
    };
  },
};

export const dateCommand: Command = {
  name: 'date',
  description: 'Display the current date and time',
  execute: () => {
    const now = new Date();
    
    // Format the date in the specified format: Sun Mar  2 12:15:17 CST 2025
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const year = now.getFullYear();
    
    // Get timezone abbreviation
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneParts = timezone.split('/');
    const timezoneAbbr = timezoneParts[timezoneParts.length - 1]
      .slice(0, 3)
      .toUpperCase();
    
    const formattedDate = `${day} ${month} ${date < 10 ? ' ' : ''}${date} ${hours}:${minutes}:${seconds} ${timezoneAbbr} ${year}`;

    return {
      content: formattedDate,
      isError: false,
    };
  },
};

export const historyCommand: Command = {
  name: 'history',
  description: 'Show command history',
  execute: () => {
    // This is a placeholder - the actual implementation happens in the hook
    return {
      content: '<HISTORY_PLACEHOLDER>',
      isError: false,
    };
  },
};
