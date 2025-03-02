
// Define the interface for command results
export interface CommandResult {
  content: React.ReactNode | string;
  isError?: boolean;
  isAsync?: boolean;
  asyncResolver?: () => Promise<CommandResult>;
}

// Define the interface for a command
export interface Command {
  name: string;
  description: string;
  usage?: string;
  examples?: string[];
  execute: (args?: string) => CommandResult;
}
