
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
  // Check if content contains command links
  if (onCommandClick && content.includes('command-link')) {
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
  
  // Use dangerouslySetInnerHTML for HTML content
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
};

export default HtmlContent;
