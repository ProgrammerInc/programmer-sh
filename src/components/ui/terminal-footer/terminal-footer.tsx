'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export interface TerminalFooterProps {
  commandInput: string;
  setCommandInput: (value: string) => void;
  handleCommandSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onHistoryNavigation: (direction: 'up' | 'down') => void;
}

export const TerminalFooter = forwardRef<HTMLFormElement, TerminalFooterProps>(
  ({ commandInput, setCommandInput, handleCommandSubmit, onHistoryNavigation }, ref) => {
    const footerRef = useRef<HTMLFormElement>(null);

    // Connect the forwarded ref to our inner ref
    useImperativeHandle(ref, () => footerRef.current!);

    // This will output to browser console when component mounts
    React.useEffect(() => {
      console.log(
        '%c Terminal Footer Mounted - History Navigation Enabled',
        'background: #222; color: #bada55; padding: 5px'
      );

      // For debugging: Add global handler to check if key events are being captured at document level
      const debugKeyHandler = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          console.log('Document level key detected:', e.key, 'Target:', e.target);
        }
      };

      document.addEventListener('keydown', debugKeyHandler);
      return () => {
        document.removeEventListener('keydown', debugKeyHandler);
      };
    }, []);

    // Handle keyboard events for command history navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      console.log(`%c Key pressed in input: ${e.key}`, 'color: yellow; background: blue');

      if (e.key === 'ArrowUp') {
        console.log(
          '%c ↑ UP ARROW DETECTED - Navigating history up',
          'color: white; background: green; font-weight: bold'
        );
        e.preventDefault(); // Prevent cursor from moving to start of input
        e.stopPropagation(); // Stop event bubbling
        onHistoryNavigation('up');
        return false;
      }

      if (e.key === 'ArrowDown') {
        console.log(
          '%c ↓ DOWN ARROW DETECTED - Navigating history down',
          'color: white; background: green; font-weight: bold'
        );
        e.preventDefault(); // Prevent cursor from moving to end of input
        e.stopPropagation(); // Stop event bubbling
        onHistoryNavigation('down');
        return false;
      }
    };
    return (
      <form
        ref={footerRef}
        onSubmit={handleCommandSubmit}
        className="px-4 py-2 border-t border-terminal-border text-sm"
      >
        <div className="flex items-center">
          <span className="text-terminal-prompt mr-2">guest@programmer.sh:~$</span>
          <input
            id="terminal-input"
            type="text"
            value={commandInput}
            onChange={e => setCommandInput(e.target.value)}
            onKeyDown={handleKeyDown}
            // Use separate props for each arrow key - some browsers may need this explicit handling
            onKeyUp={e => {
              // Additional safeguard to capture key events
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                console.log('Key caught in onKeyUp:', e.key);
                e.preventDefault();
              }
            }}
            className="flex-grow bg-transparent border-none outline-none"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal command input"
            placeholder="Type a command..."
          />
        </div>
      </form>
    );
  }
);

export default TerminalFooter;
