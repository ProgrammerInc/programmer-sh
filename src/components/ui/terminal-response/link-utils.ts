'use client';

import { createComponentLogger } from '@/services/logger/logger.utils';
import React from 'react';
import { LinkMatch } from './terminal-response.types';

// Create a dedicated logger for link utilities
const linkLogger = createComponentLogger('TerminalLinkUtils');

// Process URL links
export function processUrlLinks(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];

  if (!text) {
    return matches;
  }

  // URL regex pattern
  const urlPattern = /https?:\/\/[^\s<>"']+/g;
  let match;

  while ((match = urlPattern.exec(text)) !== null) {
    if (match && match.index !== undefined && match[0]) {
      matches.push({
        index: match.index,
        length: match[0].length,
        content: React.createElement(
          'a',
          {
            href: match[0],
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'text-terminal-link hover:underline'
          },
          match[0]
        ),
        type: 'url'
      });
    }
  }

  return matches;
}

// Process email links
export function processEmailLinks(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];

  if (!text) {
    return matches;
  }

  // Email regex pattern
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  let match;

  while ((match = emailPattern.exec(text)) !== null) {
    if (match && match.index !== undefined && match[0]) {
      matches.push({
        index: match.index,
        length: match[0].length,
        content: React.createElement(
          'a',
          {
            href: `mailto:${match[0]}`,
            className: 'text-terminal-link hover:underline'
          },
          match[0]
        ),
        type: 'email'
      });
    }
  }

  return matches;
}

// Process command links (any text surrounded by [[command]] or with class="command-link")
export function processCommandLinks(
  text: string,
  onCommandClick?: (command: string) => void
): LinkMatch[] {
  const matches: LinkMatch[] = [];

  if (!text) {
    return matches;
  }

  // Command link pattern: [[command]]
  const commandPattern = /\[\[(.*?)\]\]/g;
  let match;

  while ((match = commandPattern.exec(text)) !== null) {
    if (match && match.index !== undefined && match[1]) {
      const command = match[1];

      matches.push({
        index: match.index,
        length: match[0].length,
        content: React.createElement(
          'a',
          {
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              onCommandClick?.(command);
              linkLogger.debug('Command link clicked', { command });
            },
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCommandClick?.(command);
                linkLogger.debug('Command link activated via keyboard', { command, key: e.key });
              }
            },
            href: '#',
            role: 'button',
            tabIndex: 0,
            'data-command': command,
            className: 'command-link text-terminal-command cursor-pointer hover:underline'
          },
          command
        ),
        type: 'command'
      });
    }
  }

  // Also process HTML links with class="command-link"
  const htmlCommandLinkPattern = /<span\s+class="command-link"\s+data-command="([^"]+)"[^>]*>([^<]+)<\/span>/g;

  while ((match = htmlCommandLinkPattern.exec(text)) !== null) {
    if (match && match.index !== undefined && match[1] && match[2]) {
      const command = match[1];
      const label = match[2];

      matches.push({
        index: match.index,
        length: match[0].length,
        content: React.createElement(
          'a',
          {
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              onCommandClick?.(command);
              linkLogger.debug('HTML command link clicked', { command });
            },
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCommandClick?.(command);
                linkLogger.debug('HTML command link activated via keyboard', { command, key: e.key });
              }
            },
            href: '#',
            role: 'button',
            tabIndex: 0,
            'data-command': command,
            className: 'command-link text-terminal-command cursor-pointer hover:underline'
          },
          label
        ),
        type: 'command'
      });
    }
  }

  return matches;
}

// Process phone number links
export function processPhoneLinks(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];

  if (!text) {
    return matches;
  }

  // Phone number pattern (basic international format)
  const phonePattern = /\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}/g;
  let match;

  while ((match = phonePattern.exec(text)) !== null) {
    if (match && match.index !== undefined && match[0]) {
      // Clean the phone number for the href
      const cleanPhone = match[0].replace(/[^\d+]/g, '');
      
      matches.push({
        index: match.index,
        length: match[0].length,
        content: React.createElement(
          'a',
          {
            href: `tel:${cleanPhone}`,
            className: 'text-terminal-link hover:underline'
          },
          match[0]
        ),
        type: 'phone'
      });
    }
  }

  return matches;
}

// Main function to process all links
export function processLinks(
  text: string,
  onCommandClick?: (command: string) => void
): React.ReactNode[] {
  if (!text) {
    linkLogger.debug('No text provided to process links');
    return [text];
  }

  try {
    // Collect all matches from different link types
    const urlMatches = processUrlLinks(text);
    const emailMatches = processEmailLinks(text);
    const commandMatches = processCommandLinks(text, onCommandClick);
    const phoneMatches = processPhoneLinks(text);

    // Combine all matches
    const allMatches = [...urlMatches, ...emailMatches, ...commandMatches, ...phoneMatches].sort(
      (a, b) => a.index - b.index
    );

    linkLogger.debug('Processed links', { 
      total: allMatches.length,
      urls: urlMatches.length,
      emails: emailMatches.length,
      commands: commandMatches.length,
      phones: phoneMatches.length
    });

    // If no matches, return the original text
    if (allMatches.length === 0) {
      return [text];
    }

    // Build result with links
    const result: React.ReactNode[] = [];
    let lastIndex = 0;

    allMatches.forEach((match, i) => {
      // Type guard to ensure match has all required properties
      if (typeof match.index !== 'number' || match.content === undefined) {
        linkLogger.warn('Invalid match found, skipping', { matchIndex: i });
        return;
      }

      // Add text before the match
      if (match.index > lastIndex) {
        result.push(text.substring(lastIndex, match.index));
      }

      // Add the link component with a key
      const element = match.content as React.ReactElement;
      if (React.isValidElement(element)) {
        result.push(React.cloneElement(element, { key: `link-${i}` }));
      } else {
        linkLogger.warn('Invalid React element in match content', { matchIndex: i });
        result.push(text.substring(match.index, match.index + match.length));
      }

      // Update last index
      lastIndex = match.index + match.length;
    });

    // Add any remaining text after the last match
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }

    return result;
  } catch (error) {
    linkLogger.error('Error processing links', { error });
    return [text]; // Return original text in case of error
  }
}

// Utility function to convert text with links to React elements
export function convertLinksToAnchors(
  text: string,
  onCommandClick?: (command: string) => void
): React.ReactNode[] {
  return processLinks(text, onCommandClick);
}

export default processLinks;
