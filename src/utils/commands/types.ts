export interface CommandResult {
  content: string;
  isError: boolean;
  isAsync?: boolean;
  asyncResolver?: () => Promise<CommandResult>;
  rawHTML?: boolean;
  runAfterClear?: CommandResult;
  noHistory?: boolean; // When true, command will not be added to history (for large outputs)
}

// Command interface
export interface Command {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  execute: (args?: string) => CommandResult;
}

// Add wallpaper to the list of valid commands
export const commandNames = [
  'help',
  'about',
  'skills',
  'experience',
  'education',
  'projects',
  'contact',
  'resume',
  'email',
  'social',
  'message',
  'clear',
  'welcome',
  'theme',
  'date',
  'whoami',
  'history',
  'login',
  'logout',
  'echo',
  'wallpaper',
  'cursor',
  'profile',
  'signup'
] as const;

export type CommandName = (typeof commandNames)[number];
