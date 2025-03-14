'use client';

import { useTypingEffect } from '@/lib/typing-effect';
import { cn } from '@/lib/utils';
import React from 'react';
import AnimatedContent from './animated-content';
import HtmlContent from './html-content';
import { TerminalResponseProps } from './terminal-response.types';

export const TerminalResponse: React.FC<TerminalResponseProps> = ({
  response,
  animate = false,
  className,
  onCommandClick
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

  // For animated content
  if (animate) {
    return (
      <AnimatedContent
        content={response.content}
        displayText={displayText}
        isDone={isDone}
        isError={response.isError}
        className={className}
        onCommandClick={onCommandClick}
      />
    );
  }

  // For non-animated content, use HtmlContent component
  return (
    <HtmlContent
      content={response.content}
      isError={response.isError}
      className={className}
      onCommandClick={onCommandClick}
    />
  );
};

export default TerminalResponse;
