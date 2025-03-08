import React from 'react';
import { LinkMatch } from './types';

// Process URL links
export function processUrlLinks(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];

  // URL regex pattern
  const urlPattern = /https?:\/\/[^\s<>"']+/g;
  let match;

  while ((match = urlPattern.exec(text)) !== null) {
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

  return matches;
}

// Process email links
export function processEmailLinks(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];

  // Email regex pattern
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  let match;

  while ((match = emailPattern.exec(text)) !== null) {
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

  return matches;
}

// Process command links (any text surrounded by [[command]] or with class="command-link")
export function processCommandLinks(
  text: string,
  onCommandClick?: (command: string) => void
): LinkMatch[] {
  const matches: LinkMatch[] = [];

  // Command link pattern: [[command]]
  const commandPattern = /\[\[(.*?)\]\]/g;
  let match;

  while ((match = commandPattern.exec(text)) !== null) {
    const command = match[1];

    matches.push({
      index: match.index,
      length: match[0].length,
      content: React.createElement(
        'a',
        {
          onClick: (e) => {
            e.preventDefault();
            onCommandClick?.(command);
          },
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCommandClick?.(command);
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

  // Also detect HTML command links like <span class="command-link" data-command="help">help</span>
  // Also handle a tags that might already be in the content
  const htmlCommandLinkRegex =
    /<(span|a) class="command-link"(?: data-command="(.*?)")?>([^<]+)<\/(span|a)>/g;

  while ((match = htmlCommandLinkRegex.exec(text)) !== null) {
    const command = match[2] || match[3]; // Use data-command if available, otherwise use the text content

    matches.push({
      index: match.index,
      length: match[0].length,
      content: React.createElement(
        'a',
        {
          onClick: (e) => {
            e.preventDefault();
            onCommandClick?.(command);
          },
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCommandClick?.(command);
            }
          },
          href: '#',
          role: 'button',
          tabIndex: 0,
          'data-command': command,
          className: 'command-link text-terminal-command cursor-pointer hover:underline'
        },
        match[3] // Use the text content for display
      ),
      type: 'command'
    });
  }

  return matches;
}

// Process phone number links
export function processPhoneLinks(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];

  // Phone number pattern (US format)
  // This handles formats like: +1 (123) 456-7890, 123-456-7890, (123) 456-7890
  const phonePattern = /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/g;
  let match;

  while ((match = phonePattern.exec(text)) !== null) {
    // Format phone number for tel: link (remove non-digit characters)
    const phoneForLink = match[0].replace(/\D/g, '');

    matches.push({
      index: match.index,
      length: match[0].length,
      content: React.createElement(
        'a',
        {
          href: `tel:${phoneForLink}`,
          className: 'text-terminal-link hover:underline'
        },
        match[0]
      ),
      type: 'phone'
    });
  }

  return matches;
}

// Main function to process all links
export function processLinks(
  text: string,
  onCommandClick?: (command: string) => void
): React.ReactNode[] {
  if (!text) return [text];

  // Collect all matches from different link types
  const urlMatches = processUrlLinks(text);
  const emailMatches = processEmailLinks(text);
  const commandMatches = processCommandLinks(text, onCommandClick);
  const phoneMatches = processPhoneLinks(text);

  // Combine all matches
  const allMatches = [...urlMatches, ...emailMatches, ...commandMatches, ...phoneMatches].sort(
    (a, b) => a.index - b.index
  );

  // If no matches, return the original text
  if (allMatches.length === 0) {
    return [text];
  }

  // Build result with links
  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  allMatches.forEach((match, i) => {
    // Add text before the match
    if (match.index > lastIndex) {
      result.push(text.substring(lastIndex, match.index));
    }

    // Add the link component with a key
    const element = match.content as React.ReactElement;
    result.push(React.cloneElement(element, { key: `link-${i}` }));

    // Update last index
    lastIndex = match.index + match.length;
  });

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }

  return result;
}

// Utility function to convert text with links to React elements
export function convertLinksToAnchors(
  text: string,
  onCommandClick?: (command: string) => void
): React.ReactNode[] {
  return processLinks(text, onCommandClick);
}

export default processLinks;
