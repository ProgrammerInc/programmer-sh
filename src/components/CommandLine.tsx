
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CommandLineProps {
  prompt?: string;
  onSubmit: (command: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  showPrompt?: boolean;
}

const CommandLine: React.FC<CommandLineProps> = ({
  prompt = '~$',
  onSubmit,
  disabled = false,
  autoFocus = true,
  className,
  showPrompt = true
}) => {
  const [command, setCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() && !disabled) {
      onSubmit(command);
      setCommand('');
    }
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, disabled]);

  return (
    <form onSubmit={handleSubmit} className={cn('flex items-center', className)}>
      {showPrompt && (
        <span className="text-terminal-prompt font-mono mr-2">{prompt}</span>
      )}
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        disabled={disabled}
        className={cn(
          'bg-transparent outline-none border-none text-terminal-foreground font-mono w-full',
          'focus:ring-0 focus:outline-none',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        )}
        aria-label="Terminal command input"
      />
      {/* Removed the extra cursor that was here */}
    </form>
  );
};

export default CommandLine;
