import React from 'react';
import { cn } from '@/lib/utils';
import { convertLinksToAnchors } from './link-utils';
import { AnimatedContentProps } from './types';

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  displayText,
  isDone,
  isError,
  className,
  onCommandClick,
}) => {
  // For animated content, we can't easily make links clickable during animation
  // so we only apply link conversion when animation is done
  const renderedContent = !isDone
    ? displayText
    : convertLinksToAnchors(displayText, onCommandClick);

  return (
    <div
      className={cn(
        'whitespace-pre-wrap font-mono text-sm mb-4',
        isError ? 'text-terminal-error' : 'text-terminal-foreground',
        !isDone ? 'animate-pulse' : '',
        className
      )}
    >
      {renderedContent}
    </div>
  );
};

export default AnimatedContent;
