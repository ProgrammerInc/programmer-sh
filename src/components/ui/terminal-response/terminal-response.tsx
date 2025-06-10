'use client';

import { useTypingEffect } from '@/lib/typing-effect';
import { cn } from '@/utils/app.utils';
import { memo, useMemo } from 'react';
import { AnimatedContent } from './animated-content';
import { HtmlContent } from './html-content';
import { TerminalResponseProps } from './terminal-response.types';

/**
 * Terminal Response component for displaying terminal output with optional animation
 */
export const TerminalResponse = memo(
  ({ animate = false, className, onCommandClick, response }: TerminalResponseProps) => {
    const { displayText, isDone } = useTypingEffect(
      typeof response.content === 'string' ? response.content : '',
      { cursor: false, delay: 0, speed: 1 }
    );

    // Compute container class only when dependencies change
    const containerClass = useMemo(() => {
      return cn(
        'whitespace-pre-wrap font-mono text-sm mb-4',
        response.isError ? 'text-terminal-error' : 'text-terminal-foreground',
        className
      );
    }, [className, response.isError]);

    // If content is not a string, render directly
    if (typeof response.content !== 'string') {
      return <div className={containerClass}>{response.content}</div>;
    }

    // For animated content
    if (animate) {
      return (
        <AnimatedContent
          className={className}
          content={response.content}
          displayText={displayText}
          isDone={isDone}
          isError={response.isError}
          onCommandClick={onCommandClick}
        />
      );
    }

    // For non-animated content, use HtmlContent component
    return (
      <HtmlContent
        className={className}
        content={response.content}
        isError={response.isError}
        onCommandClick={onCommandClick}
      />
    );
  }
);

TerminalResponse.displayName = 'TerminalResponse';

export default TerminalResponse;
