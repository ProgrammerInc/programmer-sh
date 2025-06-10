'use client';

/**
 * CommandLine component
 *
 * A terminal-like command input interface with history navigation support
 */

import { cn } from '@/utils/app.utils';
import React, { forwardRef, memo, useEffect, useRef, useState } from 'react';

import styles from './command-line.module.css';
import { CommandLineProps } from './command-line.types';

/**
 * CommandLine component
 *
 * A terminal-like command line input with history navigation via arrow keys.
 *
 * @example
 * ```tsx
 * <CommandLine
 *   prompt="$"
 *   onSubmit={(command) => console.log(`Executing: ${command}`)}
 *   history={commandHistory}
 * />
 * ```
 */
export const CommandLine = memo(
  forwardRef<HTMLFormElement, CommandLineProps>(
    (
      {
        prompt = '~$',
        onSubmit,
        disabled = false,
        autoFocus = true,
        className,
        showPrompt = true,
        inputRef,
        history = [],
        initialValue = '',
        onInputChange
      },
      ref
    ) => {
      const [command, setCommand] = useState(initialValue);
      const [historyIndex, setHistoryIndex] = useState(-1);
      const internalInputRef = useRef<HTMLInputElement>(null);
      const actualInputRef = inputRef || internalInputRef;

      // Update command state when initialValue changes
      useEffect(() => {
        if (initialValue !== command) {
          setCommand(initialValue);
        }
      }, [initialValue, command]);

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (command.trim() && !disabled) {
          onSubmit(command);
          setCommand('');
          setHistoryIndex(-1);

          if (onInputChange) {
            onInputChange('');
          }
        }
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();

          if (history.length > 0) {
            // Move back through history, but don't go past the beginning
            const newIndex = Math.min(historyIndex + 1, history.length - 1);
            setHistoryIndex(newIndex);
            const newCommand = history[history.length - 1 - newIndex];
            setCommand(newCommand); // Access history in reverse order

            if (onInputChange) {
              onInputChange(newCommand);
            }
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();

          if (historyIndex > 0) {
            // Move forward through history
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            const newCommand = history[history.length - 1 - newIndex];
            setCommand(newCommand); // Access history in reverse order

            if (onInputChange) {
              onInputChange(newCommand);
            }
          } else if (historyIndex === 0) {
            // Reached the most recent command, clear the input
            setHistoryIndex(-1);
            setCommand('');

            if (onInputChange) {
              onInputChange('');
            }
          }
        }
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCommand(newValue);

        if (onInputChange) {
          onInputChange(newValue);
        }
      };

      useEffect(() => {
        if (autoFocus && actualInputRef.current) {
          actualInputRef.current.focus();
        }
      }, [autoFocus, disabled, actualInputRef]);

      return (
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className={cn(styles['command-line-container'], className)}
        >
          {showPrompt && <span className={styles['command-line-prompt']}>{prompt}</span>}
          <input
            ref={actualInputRef}
            type="text"
            value={command}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={cn(
              styles['command-line-input'],
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            )}
            aria-label="Terminal command input"
            placeholder={command.includes('[') && command.includes(']') ? '(Enter parameters)' : ''}
          />
        </form>
      );
    }
  )
);

CommandLine.displayName = 'CommandLine';

export default CommandLine;
