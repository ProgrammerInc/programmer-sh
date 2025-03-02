// List of valid commands that can be executed via URL
export const validUrlCommands = [
  'welcome',
  'about',
  'skills',
  'experience',
  'education',
  'projects',
  'resume',
  'contact',
  'help',
];

// Generate help text for URL commands
export const urlCommandsHelpText = (): string => {
  const baseUrl = window.location.origin;
  return `
URL Commands:
  You can access commands directly via URL:
  ${validUrlCommands.map(cmd => `${baseUrl}/${cmd}`).join('\n  ')}
  `;
};
