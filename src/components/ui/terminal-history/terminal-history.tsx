'use client';

import { getCommands } from '@/commands';
import { Command, CommandResult as CommandResultType } from '@/commands/command.types';
import { forwardRef, memo, useImperativeHandle, useMemo, useRef } from 'react';
import TerminalResponse from '../terminal-response';
import styles from './terminal-history.module.css';
import { TerminalHistoryProps, TerminalHistoryRef } from './terminal-history.types';

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
 * ```
 */
export const TerminalHistory = memo(
  forwardRef<TerminalHistoryRef, TerminalHistoryProps>(
    (
      { history, onCommandClick, prompt = '~$', animate = false, className = '', ...props },
      ref
    ) => {
      // Create refs
      const containerRef = useRef<HTMLDivElement>(null);

      // Expose methods via ref
      useImperativeHandle(ref, () => ({
        scrollToBottom: () => {
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        },
        focusLastItem: () => {
          if (containerRef.current) {
            const items = containerRef.current.querySelectorAll(`.${styles['history-item']}`);
            if (items.length > 0) {
              const lastItem = items[items.length - 1] as HTMLElement;
              lastItem.focus();
            }
          }
        }
      }));

      // Get all available commands
      const commands = useMemo(() => {
        try {
          return getCommands();
        } catch (error) {
          console.error('Error getting commands:', error);
          return {};
        }
      }, []);

      // Helper function to execute a command and get its result
      const executeCommand = (commandStr: string): CommandResultType => {
        try {
          // Handle empty commands
          if (!commandStr || commandStr.trim() === '') {
            return { content: '', isError: false };
          }

          const commandParts = commandStr.split(' ');
          const commandName = commandParts[0];
          const args = commandParts.slice(1).join(' ');

          // Special handling for clear command - don't actually clear when viewing history
          if (commandName.toLowerCase() === 'clear') {
            return {
              content: '<i>Terminal was cleared</i>',
              isError: false
            };
          }

          if (commandName in commands) {
            const command: Command = commands[commandName];
            return command.execute(args);
          }

          // Return error for unknown commands
          return {
            content: `Command not found: ${commandName}`,
            isError: true
          };
        } catch (error) {
          console.error('Error executing command:', error);
          return {
            content: `Error executing command: ${error instanceof Error ? error.message : String(error)}`,
            isError: true
          };
        }
      };

      // Format timestamp for display
      const formatTimestamp = (timestamp: Date | string): string => {
        const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };

      return (
        <div
          ref={containerRef}
          className={`${styles.container} ${className}`}
          aria-label="Terminal command history"
          role="log"
          {...props}
        >
          {history.map((item, index) => {
            // Check if we need to re-execute the command
            let result;
            if (item.output !== undefined) {
              // Use existing output if available
              result = {
                content: item.output,
                isError: item.error || false,
                html: item.html || false
              };
            } else {
              // Execute the command to get its result
              result = executeCommand(item.command);
            }

            return (
              <div
                key={index}
                className={styles['history-item']}
                tabIndex={0}
                aria-label={`Command: ${item.command}`}
              >
                <div className={styles['command-row']}>
                  <span className={styles.prompt}>{prompt}</span>
                  <span className={styles['command-text']}>{item.command}</span>
                  <span className={styles.timestamp}>{formatTimestamp(item.timestamp)}</span>
                </div>
                <div className={styles['command-output']} aria-live="polite">
                  <TerminalResponse
                    response={result}
                    animate={animate}
                    onCommandClick={onCommandClick}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  )
);

TerminalHistory.displayName = 'TerminalHistory';

export default TerminalHistory;
