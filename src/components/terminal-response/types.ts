
import { CommandResult } from '../../utils/commands/types';

export interface TerminalResponseProps {
  response: CommandResult;
  animate?: boolean;
  className?: string;
  onCommandClick?: (command: string) => void;
}

export interface LinkMatch {
  index: number;
  length: number;
  content: React.ReactNode;
  type: string;
}
