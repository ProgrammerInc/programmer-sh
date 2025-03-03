import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface CommandLineProps {
  prompt?: string;
  onSubmit: (command: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  showPrompt?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  history?: string[];
  initialValue?: string;
  onInputChange?: (value: string) => void;
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
  initialValue = '',
  onInputChange
}) => {
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
    <form onSubmit={handleSubmit} className={cn('flex items-center', className)}>
      {showPrompt && <span className="text-terminal-prompt font-mono mr-2">{prompt}</span>}
      <input
        ref={actualInputRef}
        type="text"
        value={command}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'bg-transparent outline-none border-none text-terminal-foreground font-mono w-full',
          'focus:ring-0 focus:outline-none',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        )}
        aria-label="Terminal command input"
        placeholder={command.includes('[') && command.includes(']') ? '(Enter parameters)' : ''}
      />
    </form>
  );
};

export default CommandLine;
