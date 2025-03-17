'use client';

import { cn } from '@/utils/app.utils';
import { containsHtmlTags } from '@/utils/html.utils';
import { convertLinksToAnchors } from '@/utils/link.utils';
import React, { memo, useMemo } from 'react';
import { parseHtml } from './html-parser';
import { HtmlContentProps } from './terminal-response.types';

/**
 * HtmlContent component for displaying content that may contain HTML
 */
export const HtmlContent = memo(({ 
  className,
  content,
  isError = false,
  onCommandClick 
}: HtmlContentProps) => {
  // Process content based on whether it contains HTML tags
  const processedContent = useMemo(() => {
    if (containsHtmlTags(content)) {
      return parseHtml(content, onCommandClick);
    }
    return convertLinksToAnchors(content, onCommandClick);
  }, [content, onCommandClick]);

  // Calculate container className only when dependencies change
  const containerClassName = useMemo(() => {
    return cn(
      'whitespace-pre-wrap font-mono text-sm mb-4',
      isError ? 'text-terminal-error' : 'text-terminal-foreground',
      className
    );
  }, [className, isError]);

  return (
    <div
      className={containerClassName}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
});

HtmlContent.displayName = 'HtmlContent';

export default HtmlContent;
