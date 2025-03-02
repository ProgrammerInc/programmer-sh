
import { helpCommand } from './helpCommand';

// List of valid commands that can be executed from URL
const VALID_URL_COMMANDS = [
  'about',
  'contact',
  'skills',
  'experience',
  'education',
  'projects',
  'resume',
  'welcome',
  'help',
];

// Check if a command is valid for URL execution
export const isValidCommand = (command: string): boolean => {
  return VALID_URL_COMMANDS.includes(command.toLowerCase());
};

// Get the list of valid URL commands
export const getValidUrlCommands = (): string[] => {
  return [...VALID_URL_COMMANDS];
};

// Get help text for URL commands
export const urlCommandsHelpText = (): string => {
  const baseUrl = window.location.origin;
  return `
You can also access commands directly through URLs:

${VALID_URL_COMMANDS.map(cmd => `  ${baseUrl}/${cmd}`).join('\n')}
`;
};
