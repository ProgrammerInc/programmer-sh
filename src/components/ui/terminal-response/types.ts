import { CommandResult } from '../../../utils/commands/types';

export interface AnimatedContentProps {
  content: string;
  displayText: string;
  isDone: boolean;
  isError: boolean;
  className?: string;
  onCommandClick?: (command: string) => void;
}

export interface HtmlContentProps {
  content: string;
  isError: boolean;
  className?: string;
  onCommandClick?: (command: string) => void;
}

export interface LinkMatch {
  index: number;
  length: number;
  content: React.ReactNode;
  type: string;
}

export interface TerminalResponseProps {
  response: CommandResult;
  animate?: boolean;
  className?: string;
  onCommandClick?: (command: string) => void;
}
