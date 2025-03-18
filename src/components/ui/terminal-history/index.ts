'use client';

/**
 * TerminalHistory Component
 * 
 * Displays a list of previously executed commands and their outputs in a terminal-like
 * interface. Re-executes commands on render to ensure consistent output.
 * 
 * Features:
 * - Command history display with timestamps
 * - Re-execution of commands for consistent output
 * - Special handling for the 'clear' command
 * - Error handling for command execution
 * - Support for clickable command links
 * - Customizable prompt
 * - Optional animation for command outputs
 * - Scrollable history with auto-scroll functionality
 * - Keyboard navigation support
 * - Accessibility support with ARIA attributes
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TerminalHistory history={commandHistory} />
 * 
 * // With command click handler
 * <TerminalHistory 
 *   history={commandHistory} 
 *   onCommandClick={(cmd) => console.log(`Clicked on command: ${cmd}`)} 
 * />
 *
 * // With custom prompt
 * <TerminalHistory 
 *   history={commandHistory}
 *   prompt="user@website:~$" 
 * />
 *
 * // With ref for controlling scroll
 * const historyRef = useRef<TerminalHistoryRef>(null);
 * <TerminalHistory 
 *   ref={historyRef}
 *   history={commandHistory} 
 * />
 * // Later: historyRef.current?.scrollToBottom();
 * ```
 */

import { TerminalHistory } from './terminal-history';

export * from './terminal-history';
export * from './terminal-history.types';

export default TerminalHistory;
