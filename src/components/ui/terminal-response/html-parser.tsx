'use client';

import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  Text,
  domToReact
} from 'html-react-parser';
import React from 'react';

/**
 * Convert HTML string to React elements safely, probably.
 * @param htmlContent - HTML string to convert to React elements
 * @param onCommandClick - Optional callback for command links
 */
export const parseHtml = (htmlContent: string, onCommandClick?: (command: string) => void) => {
  if (!htmlContent) return null;

  const options: HTMLReactParserOptions = {
    // Handle special cases for specific tags
    replace: domNode => {
      if (domNode instanceof Element) {
        // Handle anchor tags
        if (domNode.name === 'a') {
          const href = domNode.attribs.href || '#';
          const isCommandLink = domNode.attribs.class?.includes('command-link');

          // Get command text using a type-safe approach
          let command: string | undefined;
          if (domNode.attribs['data-command']) {
            command = domNode.attribs['data-command'];
          } else if (domNode.children[0] instanceof Text) {
            command = domNode.children[0].data;
          }

          if (isCommandLink && command && onCommandClick) {
            return (
              <a
                href="#"
                role="button"
                tabIndex={0}
                data-command={command}
                className="command-link text-terminal-command cursor-pointer hover:underline"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCommandClick(command as string);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCommandClick(command as string);
                  }
                }}
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </a>
            );
          } else {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={domNode.attribs.class || 'text-terminal-link hover:underline'}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();

                  // Only open non-javascript URLs
                  if (href && !href.startsWith('javascript:')) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </a>
            );
          }
        }

        // Handle span with command-link class
        if (domNode.name === 'span' && domNode.attribs.class?.includes('command-link')) {
          // Get command text using a type-safe approach
          let command: string | undefined;
          if (domNode.attribs['data-command']) {
            command = domNode.attribs['data-command'];
          } else if (domNode.children[0] instanceof Text) {
            command = domNode.children[0].data;
          }

          if (command && onCommandClick) {
            return (
              <a
                href="#"
                role="button"
                tabIndex={0}
                data-command={command}
                className="command-link text-terminal-command cursor-pointer hover:underline"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCommandClick(command as string);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCommandClick(command as string);
                  }
                }}
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </a>
            );
          }
        }
      }

      // Default: return the node unchanged
      return undefined;
    }
  };

  // Check for command-link format like [[command]]
  if (htmlContent.includes('[[') && htmlContent.includes(']]')) {
    // Handle [[command]] syntax by converting to React elements directly
    const commandPattern = /\[\[(.*?)\]\]/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = commandPattern.exec(htmlContent)) !== null) {
      const command = match[1];

      // Add text before the match
      if (match.index > lastIndex) {
        const textBefore = htmlContent.substring(lastIndex, match.index);
        parts.push(parse(textBefore, options));
      }

      // Add the command link
      parts.push(
        <a
          key={`cmd-${match.index}`}
          href="#"
          role="button"
          tabIndex={0}
          data-command={command}
          className="command-link text-terminal-command cursor-pointer hover:underline"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onCommandClick?.(command);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCommandClick?.(command);
            }
          }}
        >
          {command}
        </a>
      );

      // Update last index
      lastIndex = match.index + match[0].length;
    }

    // Add any remaining text
    if (lastIndex < htmlContent.length) {
      const textAfter = htmlContent.substring(lastIndex);
      parts.push(parse(textAfter, options));
    }

    return <>{parts}</>;
  }

  // Process regular HTML content
  return parse(htmlContent, options);
};

export default parseHtml;
