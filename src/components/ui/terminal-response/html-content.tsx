'use client';

import { cn } from '@/utils/app.utils';
import React from 'react';
import { parseHtml } from './html-parser';
import { containsHtmlTags } from './html-utils';
import { convertLinksToAnchors } from './link-utils';
import { HtmlContentProps } from './terminal-response.types';

export const HtmlContent: React.FC<HtmlContentProps> = ({
  content,
  isError,
  className,
  onCommandClick
}) => {
  // Check for HTML tags and command links
  const hasHtmlTags = containsHtmlTags(content);
  const hasCommandLinks = content.includes('command-link') || content.includes('[[');

  if (hasHtmlTags || hasCommandLinks) {
    return (
      <div
        className={cn(
          'whitespace-pre-wrap font-mono text-sm mb-4',
          isError ? 'text-terminal-error' : 'text-terminal-foreground',
          className
        )}
      >
        {parseHtml(content, onCommandClick)}
      </div>
    );
  }

  // For content with only URLs or other special links that need to be converted
  if (content.includes('http') || content.includes('@') || content.includes('+1')) {
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
