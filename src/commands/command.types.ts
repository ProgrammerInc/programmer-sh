export interface CommandResult {
  content: string;
  isError: boolean;
  isAsync?: boolean;
  asyncResolver?: () => Promise<CommandResult>;
  rawHTML?: boolean;
  clearHistory?: boolean;
  noHistory?: boolean;
  runAfterClear?: CommandResult;
  metadata?: Record<string, string | number | boolean | string[] | number[] | null | undefined>; // Using specific types instead of 'any'
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
  'signup',
  'privacy',
  'terms'
] as const;

export type CommandName = (typeof commandNames)[number];
