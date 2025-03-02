
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
  // Determine content type - explicitly check for both conditions
  const hasCommandLinks = content.includes('command-link') || content.includes('[[');
  const hasHtmlTags = containsHtmlTags(content);
  
  // Debug logs to help troubleshoot
  console.log('Content contains HTML tags:', hasHtmlTags);
  console.log('Content contains command links:', hasCommandLinks);
  console.log('Content sample:', content.substring(0, 100));
  
  // For content with both HTML and command links, prioritize HTML rendering
  if (hasHtmlTags) {
    console.log('Rendering as HTML');
    return (
      <div
        className={cn(
          'whitespace-pre-wrap font-mono text-sm mb-4',
          isError ? 'text-terminal-error' : 'text-terminal-foreground',
          className
        )}
        dangerouslySetInnerHTML={createMarkup(content)}
      />
    );
  }
  
  // For content with only command links
  if (hasCommandLinks && onCommandClick) {
    console.log('Rendering with command links');
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
  
  // For plain text content
  console.log('Rendering as plain text');
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
