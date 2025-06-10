'use client';

import { cn } from '@/utils/app.utils';
import { convertLinksToAnchors } from '@/utils/link.utils';
import { memo, useMemo } from 'react';
import { AnimatedContentProps } from './terminal-response.types';

/**
 * AnimatedContent component for displaying terminal content with typing animation
 */
export const AnimatedContent = memo(
  ({ className, displayText, isDone, isError = false, onCommandClick }: AnimatedContentProps) => {
    // Convert links to anchors when animation is complete
    const processedContent = useMemo(() => {
      if (!isDone) return displayText;
      return convertLinksToAnchors(displayText, onCommandClick);
    }, [displayText, isDone, onCommandClick]);

    // Calculate container className only when dependencies change
    const containerClassName = useMemo(() => {
      return cn(
        'whitespace-pre-wrap font-mono text-sm mb-4',
        isError ? 'text-terminal-error' : 'text-terminal-foreground',
        !isDone ? 'animate-pulse' : '',
        className
      );
    }, [className, isError, isDone]);

    return (
      <div className={containerClassName} dangerouslySetInnerHTML={{ __html: processedContent }} />
    );
  }
);

AnimatedContent.displayName = 'AnimatedContent';
