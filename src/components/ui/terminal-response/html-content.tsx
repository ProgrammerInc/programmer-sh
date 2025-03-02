
import React from 'react';
import { cn } from '@/lib/utils';
import { createMarkup, containsHtmlTags } from './html-utils';
import { convertLinksToAnchors } from './link-utils';
import { HtmlContentProps } from './types';

const HtmlContent: React.FC<HtmlContentProps> = ({
  content,
  isError,
  className,
  onCommandClick,
}) => {
  // Check for HTML tags and command links
  const hasHtmlTags = containsHtmlTags(content);
  const hasCommandLinks = content.includes('command-link') || content.includes('[[');
  
  // Debug logs to help troubleshoot
  console.log('Content contains HTML tags:', hasHtmlTags);
  console.log('Content contains command links:', hasCommandLinks);
  
  if (hasHtmlTags) {
    // For content with HTML tags, use dangerouslySetInnerHTML
    // This will lose interactivity for command links, but that's okay for HTML-rich content
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

  // For content with only command links or other special links
  if (hasCommandLinks || content.includes('http') || content.includes('@') || content.includes('+1')) {
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
