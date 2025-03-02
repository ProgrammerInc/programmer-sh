
import React from 'react';
import { cn } from '@/lib/utils';
import { createMarkup, containsHtmlTags } from './htmlUtils';
import { convertLinksToAnchors } from './linkUtils';

interface HtmlContentProps {
  content: string;
  isError: boolean;
  className?: string;
  onCommandClick?: (command: string) => void;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ 
  content, 
  isError, 
  className,
  onCommandClick 
}) => {
  // Check if content contains HTML tags and command links
  const hasCommandLinks = content.includes('command-link');
  const hasHtmlTags = containsHtmlTags(content);
  
  // If content has command links, process them to make them clickable
  if (onCommandClick && hasCommandLinks) {
    return (
      <div
        className={cn(
          'whitespace-pre-wrap font-mono text-sm mb-4',
          isError ? 'text-terminal-error' : 'text-terminal-foreground',
          className
        )}
      >
        {convertLinksToAnchors(content, onCommandClick)}
      </div>
    );
  }
  
  // Use dangerouslySetInnerHTML for pure HTML content
  if (hasHtmlTags) {
    return (
      <div
        className={cn(
          'whitespace-pre-wrap font-mono text-sm mb-4',
          isError ? 'text-terminal-error' : 'text-terminal-foreground',
          className
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
  
  // For plain text content
  return (
    <div
      className={cn(
        'whitespace-pre-wrap font-mono text-sm mb-4',
        isError ? 'text-terminal-error' : 'text-terminal-foreground',
        className
      )}
    >
      {content}
    </div>
  );
};

export default HtmlContent;
