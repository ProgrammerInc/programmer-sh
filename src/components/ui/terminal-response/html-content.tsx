import { cn } from '@/lib/utils';
import React from 'react';
import { containsHtmlTags, createMarkup } from './html-utils';
import { convertLinksToAnchors } from './link-utils';
import { HtmlContentProps } from './types';

export const HtmlContent: React.FC<HtmlContentProps> = ({
  content,
  isError,
  className,
  onCommandClick
}) => {
  // Check for HTML tags and command links
  const hasHtmlTags = containsHtmlTags(content);
  const hasCommandLinks = content.includes('command-link') || content.includes('[[');

  // Debug logs to help troubleshoot
  // console.log('Content contains HTML tags:', hasHtmlTags);
  // console.log('Content contains command links:', hasCommandLinks);
  // console.log('Content sample:', content.substring(0, 100));

  if (hasHtmlTags || hasCommandLinks) {
    // For content with HTML tags, use dangerouslySetInnerHTML
    return (
      <div
        className={cn(
          'whitespace-pre-wrap font-mono text-sm mb-4',
          isError ? 'text-terminal-error' : 'text-terminal-foreground',
          className
        )}
        dangerouslySetInnerHTML={createMarkup(content)}
        onClick={e => {
          // Handle clicks on any links to ensure they open in a new tab
          const target = e.target as HTMLElement;

          if (target.tagName === 'A') {
            if (target.classList.contains('command-link')) {
              e.preventDefault();
              e.stopPropagation();

              // Extract command and execute it
              const command = target.getAttribute('data-command') || target.textContent;

              if (command && onCommandClick) {
                onCommandClick(command);
              }
            } else {
              e.preventDefault(); // Prevent default navigation in case it's not properly set up
              e.stopPropagation(); // Prevent terminal focus

              // Extract href and open in new tab
              const href = target.getAttribute('href');

              if (href && !href.startsWith('javascript:')) {
                window.open(href, '_blank', 'noopener,noreferrer');
              }
            }
          } else if (target.classList.contains('command-link')) {
            e.preventDefault();
            e.stopPropagation();

            // Extract command and execute it
            const command = target.getAttribute('data-command') || target.textContent;

            if (command && onCommandClick) {
              onCommandClick(command);
            }
          }
        }}
      />
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
