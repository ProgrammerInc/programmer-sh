import { processCommand } from './commands';
import type { CommandResult } from './commands/types';

// This file re-exports from the commands directory for backward compatibility
export { processCommand };
export type { CommandResult };
