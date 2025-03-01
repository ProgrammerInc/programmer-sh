
import React from 'react';
import { CommandResult } from '../utils/terminalCommands';
import { useTypingEffect } from '../utils/typingEffect';
import { cn } from '@/lib/utils';

interface TerminalResponseProps {
  response: CommandResult;
  animate?: boolean;
  className?: string;
}

// Function to convert plain text URLs to clickable links
const convertLinksToAnchors = (text: string): React.ReactNode => {
  // Regex to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([\w.-]+\.(com|org|net|edu|io|sh|to|dev|me|app)\/[^\s]*)/g;
  
  // Split text by URLs and map each part
  const parts = text.split(urlRegex);
  
  return parts.filter(Boolean).map((part, index) => {
    // Check if this part is a URL
    if (part.match(urlRegex)) {
      // Make sure URL has protocol
      const href = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a 
          key={index} 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const TerminalResponse: React.FC<TerminalResponseProps> = ({
  response,
  animate = false,
  className
}) => {
  const { displayText, isDone } = useTypingEffect(
    typeof response.content === 'string' ? response.content : '',
    { speed: 1, delay: 0, cursor: false }
  );

  // If content is not a string, render directly
  if (typeof response.content !== 'string') {
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

  // For animated content, we can't easily make links clickable during animation
  // so we only apply link conversion when animation is done or animation is disabled
  const content = (animate && !isDone) 
    ? displayText 
    : convertLinksToAnchors(animate ? displayText : response.content as string);

  return (
    <div 
      className={cn(
        'whitespace-pre-wrap font-mono text-sm mb-4',
        response.isError ? 'text-terminal-error' : 'text-terminal-foreground',
        animate && !isDone ? 'animate-pulse' : '',
        className
      )}
    >
      {content}
    </div>
  );
};

export default TerminalResponse;
