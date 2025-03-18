'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './terminal-footer.module.css';
import { TerminalFooterProps, TerminalFooterRef } from './terminal-footer.types';

/**
 * Terminal Footer Component
 * 
 * Provides the command input interface for the terminal, handling command
 * submission and history navigation via keyboard shortcuts.
 * 
 * Features:
 * - Command input with history navigation (up/down arrows)
 * - Custom prompt support
 * - Accessibility enhancements
 * - Loading state indication
 * - Keyboard navigation
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TerminalFooter 
 *   commandInput={commandInput}
 *   setCommandInput={setCommandInput}
 *   handleCommandSubmit={handleCommandSubmit}
 *   onHistoryNavigation={handleHistoryNavigation}
 * />
 * 
 * // With custom prompt
 * <TerminalFooter
 *   commandInput={commandInput}
 *   setCommandInput={setCommandInput}
 *   handleCommandSubmit={handleCommandSubmit}
 *   onHistoryNavigation={handleHistoryNavigation}
 *   prompt="root@server:~#"
 * />
 * ```
 */
export const TerminalFooter = forwardRef<TerminalFooterRef, TerminalFooterProps>((
  { 
    commandInput, 
    setCommandInput, 
    handleCommandSubmit, 
    onHistoryNavigation,
    prompt = "guest@programmer.sh:~$",
    isProcessing = false,
    className = ''
  }, 
  ref
) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Connect the forwarded ref to our inner refs
  useImperativeHandle(ref, () => ({
    form: formRef.current,
    input: inputRef.current,
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  // Handle keyboard events for command history navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent cursor from moving to start of input
      onHistoryNavigation('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent cursor from moving to end of input
      onHistoryNavigation('down');
    }
  };

  // Handle form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCommandSubmit(e);
    // Focus the input field after submission
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className={`${styles['terminal-footer']} ${className}`}>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className={styles['terminal-form']}
        aria-label="Terminal command form"
      >
        <span 
          className={styles['terminal-prompt']} 
          aria-hidden="true"
        >
          {prompt}
        </span>
        
        <div className={styles['input-wrapper']}>
          <input
            ref={inputRef}
            id="terminal-input"
            type="text"
            value={commandInput}
            onChange={e => setCommandInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles['terminal-input']}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal command input"
            placeholder="Type a command..."
            disabled={isProcessing}
          />
          
          {isProcessing && (
            <span 
              className={styles['loading-indicator']} 
              aria-hidden="true"
            >
              ●
            </span>
          )}
        </div>
      </form>
    </div>
  );
});

TerminalFooter.displayName = 'TerminalFooter';

export default TerminalFooter;
