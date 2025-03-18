'use client';

import { CommandResult as BaseCommandResult } from '@/commands/command.types';
import { HTMLAttributes } from 'react';

/**
 * HistoryItem interface represents a command entry in the terminal history.
 * 
 * @interface HistoryItem
 * @property {string} command - The command text that was executed
 * @property {string} [output] - Optional output text from the command
 * @property {boolean} [error] - Optional flag indicating if the command resulted in an error
 * @property {boolean} [html] - Optional flag indicating if the output contains HTML content
 * @property {Date | string} timestamp - When the command was executed (can be Date object or ISO string)
 */
export interface HistoryItem {
  command: string;
  output?: string;
  error?: boolean;
  html?: boolean;
  timestamp: Date | string;
}

/**
 * TerminalHistoryProps interface defines props for the TerminalHistory component.
 * 
 * @interface TerminalHistoryProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 * @property {HistoryItem[]} history - Array of command history items to display
 * @property {(command: string) => void} [onCommandClick] - Optional callback for when a command link is clicked
 * @property {string} [prompt] - Optional custom prompt to display (default: "~$")
 * @property {boolean} [animate] - Optional flag to enable animation of command outputs
 * @property {string} [className] - Optional additional CSS class name
 */
export interface TerminalHistoryProps extends HTMLAttributes<HTMLDivElement> {
  history: HistoryItem[];
  onCommandClick?: (command: string) => void;
  prompt?: string;
  animate?: boolean;
  className?: string;
}

/**
 * CommandResult interface matches the structure from command.types.ts, 
 * ensuring compatibility with the command system.
 * 
 * @interface CommandResult
 * @extends BaseCommandResult
 */
export type CommandResult = BaseCommandResult;
