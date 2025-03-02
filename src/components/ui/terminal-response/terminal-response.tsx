import React from 'react';
import { cn } from '@/lib/utils';
import { useTypingEffect } from '@/utils/typingEffect';
import { TerminalResponseProps } from './types';
import { containsHtmlTags } from './html-utils';
import HtmlContent from './html-content';
import AnimatedContent from './animated-content';

const TerminalResponse: React.FC<TerminalResponseProps> = ({
  response,
  animate = false,
  className,
  onCommandClick,
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

  // Add debug log to check content
  console.log('Response content type:', typeof response.content);
  console.log('Has HTML:', containsHtmlTags(response.content));

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
  // which will handle HTML tags, command links, or plain text appropriately
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
