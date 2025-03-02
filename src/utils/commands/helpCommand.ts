
import { CommandResult } from './types';

export const helpCommand = (): CommandResult => {
  const commandList = [
    { name: 'help', description: 'Shows this help menu' },
    { name: 'about', description: 'About James Black' },
    { name: 'skills', description: 'View technical skills' },
    { name: 'experience', description: 'View work experience' },
    { name: 'education', description: 'View educational background' },
    { name: 'projects', description: 'View notable projects' },
    { name: 'contact', description: 'Display contact information' },
    { name: 'resume', description: 'View or download resume' },
    { name: 'clear', description: 'Clear the terminal' },
    { name: 'save [message]', description: 'Save a message to the database' },
    { name: 'messages', description: 'View all saved messages' },
  ];

  const helpText = commandList
    .map(cmd => `  ${cmd.name.padEnd(20)} ${cmd.description}`)
    .join('\n');

  return {
    content: `Available commands:\n\n${helpText}`,
    isError: false,
  };
};
