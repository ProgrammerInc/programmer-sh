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
  // Regex to match URLs - updated to consume the entire URL in one match
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9][\w.-]+\.(com|org|net|edu|io|sh|to|dev|me|app)(?:\/[^\s]*)?)/g;
  
  // Split the text into parts by URLs and non-URL text
  const parts = [];
  let lastIndex = 0;
  let match;
  
  // Using exec() to iterate through all matches while keeping track of indices
  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // Add the URL as a link
    const url = match[0];
    const href = url.startsWith('http') ? url : `https://${url}`;
    parts.push(
      <a 
        key={`link-${match.index}`} 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
      >
        {url}
      </a>
    );
    
    lastIndex = match.index + url.length;
  }
  
  // Add any remaining text after the last URL
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts;
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
