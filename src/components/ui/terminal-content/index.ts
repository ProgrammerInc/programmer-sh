'use client';

/**
 * TerminalContent Component
 * 
 * Displays the command output in a scrollable container with support for interactive
 * command links that can be clicked or activated via keyboard.
 * 
 * Features:
 * - Automatic scrolling to bottom when new content is added
 * - Interactive command links with keyboard accessibility
 * - Support for custom styling through CSS modules
 * - Mutation observer to handle dynamically added content
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TerminalContent 
 *   commandOutput={commandHistory} 
 *   setScrollToBottom={handleScrollToBottom} 
 * />
 * 
 * // With custom class name
 * <TerminalContent 
 *   commandOutput={commandHistory} 
 *   setScrollToBottom={handleScrollToBottom} 
 *   className="custom-terminal-content"
 * />
 * ```
 */

import { TerminalContent } from './terminal-content';
import {
  formatCommandOutput,
  processCommandLinks,
  sanitizeHtml,
  scrollToBottom
} from './terminal-content.utils';

export * from './terminal-content';
export * from './terminal-content.types';
export {
  formatCommandOutput,
  processCommandLinks,
  sanitizeHtml,
  scrollToBottom
};

export default TerminalContent;
