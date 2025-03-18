'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { TerminalContentProps, ProcessableElement, CommandLinkEventDetail } from './terminal-content.types';
import { formatCommandOutput } from './terminal-content.utils';
import styles from './terminal-content.module.css';

/**
 * TerminalContent Component
 * 
 * Displays the command output in a scrollable container with support for interactive
 * command links that can be clicked or activated via keyboard.
 * 
 * Features:
 * - Automatic scrolling to bottom when new content is added
 * - Interactive command links with keyboard accessibility
 * - Support for custom styling through CSS modules
 * - Mutation observer to handle dynamically added content
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TerminalContent 
 *   commandOutput={commandHistory} 
 *   setScrollToBottom={handleScrollToBottom} 
 * />
 * 
 * // With custom class name
 * <TerminalContent 
 *   commandOutput={commandHistory} 
 *   setScrollToBottom={handleScrollToBottom} 
 *   className="custom-terminal-content"
 * />
 * ```
 */
export const TerminalContent = forwardRef<HTMLDivElement, TerminalContentProps>(
  ({ commandOutput, setScrollToBottom, className = '' }, ref) => {
    // Local ref for event handlers
    const contentRef = useRef<HTMLDivElement>(null);

    // Connect the forwarded ref to our inner ref
    useImperativeHandle(ref, () => contentRef.current!);

    // Call setScrollToBottom when output changes
    useEffect(() => {
      setScrollToBottom();
    }, [commandOutput, setScrollToBottom]);

    useEffect(() => {
      // Handle command link clicks
      const handleCommandLinkClick = (e: MouseEvent) => {
        const target = e.target as ProcessableElement;
        
        // Determine if it's a command link
        if (!target || !target.classList || !target.classList.contains('command-link')) {
          return;
        }
        
        // Prevent double execution
        if (target.__processing) return;
        
        // Mark as processing
        target.__processing = true;
        
        // Prevent default action (e.g., href navigation)
        e.preventDefault();
        
        // Get command from data attribute
        const command = target.getAttribute('data-command');
        if (!command) {
          target.__processing = false;
          return;
        }
        
        // Get additional options
        const addToHistory = target.getAttribute('data-add-to-history') !== 'false';
        const placeholder = target.getAttribute('data-placeholder') || '';
        
        // Dispatch command link click event
        const commandLinkEvent = new CustomEvent<CommandLinkEventDetail>('commandLinkClick', {
          detail: {
            command,
            addToHistory,
            placeholder
          }
        });
        
        document.dispatchEvent(commandLinkEvent);
        
        // Reset processing state after a short delay
        setTimeout(() => {
          if (target) target.__processing = false;
        }, 500); // Prevent double-clicks
      };
      
      // Handle keyboard events for accessibility
      const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as ProcessableElement;
        
        // Only handle keyboard events on command links
        if (!target || !target.classList || !target.classList.contains('command-link')) {
          return;
        }
        
        // Determine if it's an activation key (Enter or Space)
        if (e.key === 'Enter' || e.key === ' ') {
          // Prevent default action (e.g., scroll on space)
          e.preventDefault();
          
          // Prevent double execution
          if (target.__processing) return;
          
          // Mark as processing
          target.__processing = true;
          
          // Get command from data attribute
          const command = target.getAttribute('data-command');
          if (!command) {
            target.__processing = false;
            return;
          }
          
          // Get additional options
          const addToHistory = target.getAttribute('data-add-to-history') !== 'false';
          const placeholder = target.getAttribute('data-placeholder') || '';
          
          // Dispatch command link click event
          const commandLinkEvent = new CustomEvent<CommandLinkEventDetail>('commandLinkClick', {
            detail: {
              command,
              addToHistory,
              placeholder
            }
          });
          
          document.dispatchEvent(commandLinkEvent);
          
          // Reset processing state after a short delay
          setTimeout(() => {
            if (target) target.__processing = false;
          }, 500); // Prevent double activations
        }
      };
      
      // Process terminal content to make all command links keyboard accessible
      const makeCommandLinksAccessible = () => {
        if (contentRef.current) {
          const links = contentRef.current.querySelectorAll('.command-link');
          
          links.forEach(link => {
            // Add tabindex if not already present
            if (!link.hasAttribute('tabindex')) {
              link.setAttribute('tabindex', '0');
            }
            
            // Add role if not already present
            if (!link.hasAttribute('role')) {
              link.setAttribute('role', 'button');
            }
          });
        }
      };

      const currentTerminalContent = contentRef.current;

      if (currentTerminalContent) {
        // Set up event listeners
        currentTerminalContent.addEventListener('click', handleCommandLinkClick);
        currentTerminalContent.addEventListener('keydown', handleKeyDown as EventListener);
        
        // Process existing command links
        makeCommandLinksAccessible();
        
        // Set up mutation observer to handle dynamically added content
        const observer = new MutationObserver(mutations => {
          // Check if we need to process new command links
          const needsProcessing = mutations.some(mutation => {
            // If nodes were added
            if (mutation.addedNodes.length > 0) {
              return Array.from(mutation.addedNodes).some(node => {
                // If HTML element was added
                if (node.nodeType === Node.ELEMENT_NODE) {
                  // Check if it contains command links
                  const element = node as HTMLElement;
                  return element.querySelector('.command-link') !== null;
                }
                return false;
              });
            }
            return false;
          });
          
          if (needsProcessing) {
            makeCommandLinksAccessible();
          }
        });
        
        // Start observing changes
        observer.observe(currentTerminalContent, {
          childList: true,
          subtree: true
        });
        
        // Clean up on unmount
        return () => {
          currentTerminalContent.removeEventListener('click', handleCommandLinkClick);
          currentTerminalContent.removeEventListener('keydown', handleKeyDown as EventListener);
          observer.disconnect();
        };
      }
    }, []);

    // Console log the commandOutput to debug
    useEffect(() => {
      console.log('Terminal Content - Command Output:', commandOutput);
    }, [commandOutput]);

    return (
      <div 
        ref={contentRef} 
        className={`${styles['terminal-content']} ${className}`}
        role="log"
        aria-live="polite"
      >
        {commandOutput && commandOutput.map((item, index) => (
          <div key={`history-${index}`} className={styles['history-item']}>
            <div className={styles['command-prompt']}>
              <span className={styles['prompt']}>guest@programmer.sh:~$</span>
              <span className={styles['command']}>{item.command}</span>
            </div>
            {item.output && (
              <div 
                className={`${styles['output']} ${item.error ? styles['error'] : ''}`} 
                dangerouslySetInnerHTML={{ __html: item.output }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
);

TerminalContent.displayName = 'TerminalContent';
