/* eslint-disable no-secrets/no-secrets */
'use client';

import { CommandResult } from '@/commands/command.types';
import { SocialLink } from '@/types/social-links.types';
import { ReactNode, RefObject } from 'react';

/**
 * Terminal component props interface.
 *
 * @interface TerminalProps
 * @property {RefObject<HTMLDivElement>} [containerRef] - Reference to the terminal container div
 * @property {RefObject<HTMLDivElement>} [contentRef] - Reference to the terminal content div
 * @property {RefObject<HTMLDivElement>} [headerRef] - Reference to the terminal header div
 * @property {RefObject<HTMLFormElement>} [footerRef] - Reference to the terminal footer form
 * @property {string[]} [initialCommands] - Commands to run on initial render
 * @property {SocialLink[]} [socialLinks] - Social media links to display in the header
 * @property {string} [prompt] - Custom prompt text to display in the terminal (default: 'guest@programmer.sh:~$')
 * @property {string} [className] - Additional CSS class name
 * @property {ReactNode} [children] - Optional children elements
 */
export interface TerminalProps {
  containerRef?: RefObject<HTMLDivElement> | null;
  contentRef?: RefObject<HTMLDivElement> | null;
  headerRef?: RefObject<HTMLDivElement> | null;
  footerRef?: RefObject<HTMLFormElement> | null;
  initialCommands?: string[];
  socialLinks?: SocialLink[];
  prompt?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Terminal component's local state interface.
 *
 * @interface TerminalState
 * @property {string} commandInput - Current command input value
 * @property {CommandResult[]} commandOutput - Array of command execution results
 * @property {string[]} commandHistory - Array of previously executed commands
 * @property {number} historyIndex - Current index in the command history
 * @property {string} tempInput - Temporary storage for input when navigating history
 * @property {string} lastCommand - The last executed command
 * @property {boolean} isScrolledToBottom - Whether the terminal is scrolled to bottom
 */
export interface TerminalState {
  commandInput: string;
  commandOutput: CommandResult[];
  commandHistory: string[];
  historyIndex: number;
  tempInput: string;
  lastCommand: string;
  isScrolledToBottom: boolean;
}

/**
 * History navigation direction type.
 *
 * @typedef {'up' | 'down'} HistoryDirection
 */
export type HistoryDirection = 'up' | 'down';

/**
 * Terminal utility functions interface.
 *
 * @interface TerminalUtils
 * @property {(command: string, output: string, rawHTML?: boolean) => string} renderCommandOutput - Renders command output with formatting
 * @property {(ref: RefObject<HTMLDivElement>) => void} scrollToBottom - Scrolls the terminal content to the bottom
 */
export interface TerminalUtils {
  renderCommandOutput: (command: string, output: string, rawHTML?: boolean) => string;
  scrollToBottom: (ref: RefObject<HTMLDivElement>) => void;
}

/**
 * Terminal command handler type.
 *
 * @typedef {(args: string[]) => Promise<CommandResult>} CommandHandler
 */
export type CommandHandler = (args: string[]) => Promise<CommandResult>;

/**
 * Terminal command mapping interface.
 *
 * @interface CommandMapping
 */
export interface CommandMapping {
  [key: string]: CommandHandler;
}

/**
 * Terminal theme options.
 *
 * @typedef {'dark' | 'light'} TerminalTheme
 */
export type TerminalTheme = 'dark' | 'light';
