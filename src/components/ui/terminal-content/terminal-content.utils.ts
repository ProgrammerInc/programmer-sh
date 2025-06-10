'use client';

import { HistoryItem } from '@/components/ui/terminal-history/index';

/**
 * Converts special characters to their HTML entity equivalents.
 *
 * @param text - The text to sanitize
 * @returns The sanitized text
 */
export const sanitizeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Convert plain text with command links to interactive elements.
 * Command links are identified by their format: {{command}} or {{command:placeholder}}
 *
 * @param text - The text content to process
 * @returns The processed text with command links
 */
export const processCommandLinks = (text: string): string => {
  // Pattern to match command links: {{command}} or {{command:placeholder}}
  const linkPattern = /\{\{([^}]+)\}\}/g;

  return text.replace(linkPattern, (match, content) => {
    let command = content.trim();
    let placeholder = '';

    // Check if it includes a placeholder (format: command:placeholder)
    if (content.includes(':')) {
      const [cmd, ph] = content.split(':', 2);
      command = cmd.trim();
      placeholder = ph.trim();
    }

    const sanitizedCommand = sanitizeHtml(command);
    const displayText = placeholder || sanitizedCommand;

    // Create a visually distinct command link with hover effects
    return `<a href="#" class="command-link" data-command="${sanitizedCommand}" data-placeholder="${sanitizeHtml(placeholder || '')}">${displayText}</a>`;
  });
};

/**
 * Format command output for display in the terminal.
 *
 * @param historyItem - The history item containing command output to process
 * @returns The formatted command output as HTML string
 */
export const formatCommandOutput = (historyItem: HistoryItem): string => {
  const { command } = historyItem;

  // First sanitize the HTML to prevent XSS
  let processedText = sanitizeHtml(command);

  // Convert command links
  processedText = processCommandLinks(processedText);

  // Replace newlines with <br> for proper HTML rendering
  processedText = processedText.replace(/\n/g, '<br>');

  return processedText;
};

/**
 * Scroll a container element to the bottom.
 *
 * @param containerRef - React ref for the container element
 */
export const scrollToBottom = (containerRef: React.RefObject<HTMLElement>): void => {
  if (containerRef.current) {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }
};
