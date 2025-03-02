
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CommandLineProps {
  prompt?: string;
  onSubmit: (command: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  showPrompt?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  history?: string[];
}

const CommandLine: React.FC<CommandLineProps> = ({
  prompt = '~$',
  onSubmit,
  disabled = false,
  autoFocus = true,
  className,
  showPrompt = true,
  inputRef,
  history = [],
}) => {
  const [command, setCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const internalInputRef = useRef<HTMLInputElement>(null);
  const actualInputRef = inputRef || internalInputRef;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() && !disabled) {
      onSubmit(command);
      setCommand('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        // Move back through history, but don't go past the beginning
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]); // Access history in reverse order
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        // Move forward through history
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]); // Access history in reverse order
      } else if (historyIndex === 0) {
        // Reached the most recent command, clear the input
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  useEffect(() => {
    if (autoFocus && actualInputRef.current) {
      actualInputRef.current.focus();
    }
  }, [autoFocus, disabled, actualInputRef]);

  return (
    <form onSubmit={handleSubmit} className={cn('flex items-center', className)}>
      {showPrompt && <span className="text-terminal-prompt font-mono mr-2">{prompt}</span>}
      <input
        ref={actualInputRef}
        type="text"
        value={command}
        onChange={e => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'bg-transparent outline-none border-none text-terminal-foreground font-mono w-full',
          'focus:ring-0 focus:outline-none',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        )}
        aria-label="Terminal command input"
      />
    </form>
  );
};

export default CommandLine;
