'use client';

import { cn } from '@/utils/app.utils';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { parseHtml } from '../terminal-response/html-parser';

export interface TerminalContentProps {
  commandOutput: string;
  setScrollToBottom: () => void;
  className?: string;
}

export const TerminalContent = forwardRef<HTMLDivElement, TerminalContentProps>(
  ({ commandOutput, setScrollToBottom, className }, ref) => {
    // Local ref for event handlers
    const contentRef = useRef<HTMLDivElement>(null);

    // Connect the forwarded ref to our inner ref
    useImperativeHandle(ref, () => contentRef.current!);

    // Call setScrollToBottom when output changes
    useEffect(() => {
      setScrollToBottom();
    }, [commandOutput, setScrollToBottom]);

    useEffect(() => {
      // Interface for elements with processing state
      interface ProcessableElement extends HTMLElement {
        __processing?: boolean;
      }

      // Handle command link clicks
      const handleCommandLinkClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (target.classList.contains('command-link')) {
          // Stop event propagation to prevent double execution
          e.stopPropagation();
          e.preventDefault();

          // Use the same processing state mechanism as keyboard handler
          const processableTarget = target as ProcessableElement;
          if (processableTarget.__processing) return;
          processableTarget.__processing = true;

          const command = target.getAttribute('data-command');
          const placeholder = target.getAttribute('data-placeholder');

          if (command) {
            const event = new CustomEvent('executeCommandFromLink', {
              detail: {
                command,
                addToHistory: !placeholder, // Only add to history if it's not a placeholder command
                placeholder: placeholder
              }
            });
            document.dispatchEvent(event);

            // Reset processing state after a short delay
            setTimeout(() => {
              processableTarget.__processing = false;
            }, 300);
          }
        }
      };

      // Handle keyboard events for accessibility
      const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;

        if (target.classList.contains('command-link') && (e.key === 'Enter' || e.key === ' ')) {
          // Stop event propagation to prevent double execution
          e.stopPropagation();
          e.preventDefault();

          // Use the interface defined above

          // Keep track of processing state to prevent double execution
          const processableTarget = target as ProcessableElement;
          if (processableTarget.__processing) return;
          processableTarget.__processing = true;

          const command = target.getAttribute('data-command');
          const placeholder = target.getAttribute('data-placeholder');

          if (command) {
            const event = new CustomEvent('executeCommandFromLink', {
              detail: {
                command,
                addToHistory: !placeholder,
                placeholder: placeholder
              }
            });
            document.dispatchEvent(event);

            // Reset processing state after a short delay
            setTimeout(() => {
              processableTarget.__processing = false;
            }, 300);
          }
        }
      };

      // Process terminal content to make all command links keyboard accessible
      const makeCommandLinksAccessible = () => {
        if (!contentRef.current) return;

        // Find all command links that don't have tabindex attributes yet
        const commandLinks = contentRef.current.querySelectorAll('.command-link:not([tabindex])');
        commandLinks.forEach(link => {
          // Make link focusable with tab key
          link.setAttribute('tabindex', '0');

          // Add proper ARIA attributes for accessibility
          link.setAttribute('role', 'button');
          const commandText = link.getAttribute('data-command');
          link.setAttribute('aria-label', `Execute command: ${commandText}`);

          // Add visual indication of focus
          link.classList.add(
            'focus:outline-dashed',
            'focus:outline-1',
            'focus:outline-terminal-prompt'
          );
        });
      };

      const currentTerminalContent = contentRef.current;

      if (currentTerminalContent) {
        // Set up event listeners
        currentTerminalContent.addEventListener('click', handleCommandLinkClick);
        currentTerminalContent.addEventListener('keydown', handleKeyDown);

        // Initial processing of existing links
        makeCommandLinksAccessible();

        // Set up MutationObserver to process new links added dynamically
        const observer = new MutationObserver(makeCommandLinksAccessible);
        observer.observe(currentTerminalContent, { childList: true, subtree: true });

        return () => {
          currentTerminalContent.removeEventListener('click', handleCommandLinkClick);
          currentTerminalContent.removeEventListener('keydown', handleKeyDown);
          observer.disconnect();
        };
      }

      return undefined;
    }, []);

    return (
      <div
        ref={contentRef}
        className={cn(
          'flex-grow overflow-y-scroll terminal-content-height terminal-scrollbar px-4 py-2 font-mono text-sm bg-terminal-background',
          'terminal-command-result', // Add animation for smoother transitions
          className
        )}
      >
        {parseHtml(commandOutput)}
      </div>
    );
  }
);

export default TerminalContent;
