'use client';

import { HistoryItem } from '../terminal-history/index';

/**
 * TerminalContent component props interface.
 *
 * @interface TerminalContentProps
 * @property {HistoryItem[]} commandOutput - Array of command history items to display
 * @property {() => void} setScrollToBottom - Function to scroll the terminal content to the bottom
 * @property {string} [className] - Optional additional CSS class name
 * @property {boolean} [isAwaitingAsync] - Flag indicating if an async command is currently processing
 * @property {string} [asyncCommandName] - Optional name of the async command being processed
 */
export interface TerminalContentProps {
  commandOutput: HistoryItem[];
  setScrollToBottom: () => void;
  className?: string;
  isAwaitingAsync?: boolean;
  asyncCommandName?: string;
}

/**
 * Interface for HTML elements with processing state.
 * Used to prevent double execution of command links.
 *
 * @interface ProcessableElement
 * @extends HTMLElement
 * @property {boolean} [__processing] - Flag indicating whether the element is currently being processed
 */
export interface ProcessableElement extends HTMLElement {
  __processing?: boolean;
}

/**
 * Command link click event detail interface.
 *
 * @interface CommandLinkEventDetail
 * @property {string} command - The command to execute
 * @property {boolean} addToHistory - Whether to add the command to history
 * @property {string} [placeholder] - Optional placeholder text for the command
 */
export interface CommandLinkEventDetail {
  command: string;
  addToHistory: boolean;
  placeholder?: string;
}
