
import React from 'react';
import { cn } from '@/lib/utils';
import { useTypingEffect } from '../../utils/typingEffect';
import { TerminalResponseProps } from './types';
import { convertLinksToAnchors } from './linkUtils';
import { containsHtmlTags } from './htmlUtils';
import HtmlContent from './HtmlContent';
import AnimatedContent from './AnimatedContent';

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

  // Check if content is HTML that needs to be rendered
  const isHtmlContent = 
    typeof response.content === 'string' && 
    containsHtmlTags(response.content);

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

  // For HTML content that should be rendered as actual HTML
  if (isHtmlContent && !animate) {
    return (
      <HtmlContent 
        content={response.content}
        isError={response.isError}
        className={className}
        onCommandClick={onCommandClick}
      />
    );
  }

  // For animated or plain text content
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

  // For non-animated plain text content
  return (
    <div
      className={cn(
        'whitespace-pre-wrap font-mono text-sm mb-4',
        response.isError ? 'text-terminal-error' : 'text-terminal-foreground',
        className
      )}
    >
      {convertLinksToAnchors(response.content, onCommandClick)}
    </div>
  );
};

export default TerminalResponse;
