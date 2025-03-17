/**
 * Command Types
 * 
 * Type definitions for the command system
 */

/**
 * Interface for command execution results
 */
export interface CommandResult {
  /** Content returned by the command */
  content: string;
  /** Whether the command resulted in an error */
  isError: boolean;
  /** Whether the command will be resolved asynchronously */
  isAsync?: boolean;
  /** Function to resolve async commands */
  asyncResolver?: () => Promise<CommandResult>;
  /** Whether to render content as raw HTML */
  rawHTML?: boolean;
  /** Whether to clear command history */
  clearHistory?: boolean;
  /** Whether to add this command to history */
  noHistory?: boolean;
  /** Command to run after clearing */
  runAfterClear?: CommandResult;
  /** Additional metadata for the command */
  metadata?: Record<string, string | number | boolean | string[] | number[] | null | undefined>;
}

/**
 * Interface for command definitions
 */
export interface Command {
  /** Command name */
  name: string;
  /** Command description */
  description: string;
  /** Usage instructions */
  usage?: string;
  /** Alternative command names */
  aliases?: string[];
  /**
   * Execute the command
   * @param args Optional arguments string
   * @returns Command execution result
   */
  execute: (args?: string) => CommandResult;
}

/**
 * Valid command names
 */
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

/**
 * Command name type - ensures only valid command names can be used
 */
export type CommandName = (typeof commandNames)[number];

/**
 * Type for a command map, mapping command names to Command objects
 */
export type CommandMap = Record<CommandName, Command>;

/**
 * Function type for command handlers
 */
export type CommandHandler = (command: string) => CommandResult | Promise<CommandResult>;
