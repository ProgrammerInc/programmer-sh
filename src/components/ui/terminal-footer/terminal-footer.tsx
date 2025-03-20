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
 *   inputRef={inputRef}
 * />
 * 
 * // With custom prompt
 * <TerminalFooter
 *   commandInput={commandInput}
 *   setCommandInput={setCommandInput}
 *   handleCommandSubmit={handleCommandSubmit}
 *   inputRef={inputRef}
 *   prompt="root@server:~#"
 * />
 * ```
 */
export const TerminalFooter = forwardRef<TerminalFooterRef, TerminalFooterProps>((
  { 
    commandInput, 
    setCommandInput, 
    handleCommandSubmit, 
    inputRef: externalInputRef,
    prompt = "guest@programmer.sh:~$",
    isProcessing = false,
    className = '',
    onHistoryNavigation, // Add onHistoryNavigation prop
    onKeyDown, // Add onKeyDown prop
  }, 
  ref
) => {
  const formRef = useRef<HTMLFormElement>(null);
  const internalInputRef = useRef<HTMLInputElement>(null);

  const actualInputRef = externalInputRef || internalInputRef;

  useImperativeHandle(ref, () => ({
    form: formRef.current,
    input: actualInputRef.current,
    focus: () => {
      if (actualInputRef.current) {
        actualInputRef.current.focus();
      }
    }
  }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCommandSubmit(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent default behavior for arrow keys to avoid cursor movement
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      // Call the history navigation function from parent component
      if (e.key === 'ArrowUp') {
        onHistoryNavigation?.('up');
      } else if (e.key === 'ArrowDown') {
        onHistoryNavigation?.('down');
      }
    }
  };

  return (
    <div className={`${styles['terminal-footer']} ${className}`}>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className={styles['terminal-form']}
        aria-label="Terminal command input"
      >
        <div className={styles['terminal-prompt']}>{prompt}</div>
        <input
          id="terminal-input"
          ref={actualInputRef}
          className={styles['terminal-input']}
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          disabled={isProcessing}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          aria-label="Terminal command input"
          onKeyDown={(e) => {
            handleKeyDown(e);
            onKeyDown?.(e);
          }}
        />
      </form>
    </div>
  );
});

TerminalFooter.displayName = 'TerminalFooter';

export default TerminalFooter;
