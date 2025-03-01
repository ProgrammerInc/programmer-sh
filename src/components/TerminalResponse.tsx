
import React from 'react';
import { CommandResult } from '../utils/terminalCommands';
import { useTypingEffect } from '../utils/typingEffect';
import { cn } from '@/lib/utils';

interface TerminalResponseProps {
  response: CommandResult;
  animate?: boolean;
  className?: string;
}

const TerminalResponse: React.FC<TerminalResponseProps> = ({
  response,
  animate = false,
  className
}) => {
  const { displayText, isDone } = useTypingEffect(
    typeof response.content === 'string' ? response.content : '',
    { speed: 1, delay: 0, cursor: false }
  );

  // If content is not a string or animation is disabled, render directly
  if (typeof response.content !== 'string' || !animate) {
    return (
      <div 
        className={cn(
          'whitespace-pre-wrap font-mono text-sm mb-4',
          response.isError ? 'text-terminal-error' : 'text-terminal-foreground',
          className
        )}
      >
        {response.content}
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'whitespace-pre-wrap font-mono text-sm mb-4',
        response.isError ? 'text-terminal-error' : 'text-terminal-foreground',
        animate && !isDone ? 'animate-pulse' : '',
        className
      )}
    >
      {displayText}
    </div>
  );
};

export default TerminalResponse;
