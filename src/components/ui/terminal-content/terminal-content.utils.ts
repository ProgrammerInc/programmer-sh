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
 * Command links are identified by their format: {{command}}
 * 
 * @param text - The text content to process
 * @param onCommandClick - Optional callback for when a command link is clicked
 * @returns The processed text with command links
 */
export const processCommandLinks = (text: string, onCommandClick?: (command: string) => void): string => {
  // Pattern to match command links: {{command}}
  const linkPattern = /\{\{([^}]+)\}\}/g;
  
  return text.replace(linkPattern, (match, command) => {
    const sanitizedCommand = sanitizeHtml(command.trim());
    return `<a href="#" class="command-link" data-command="${sanitizedCommand}">${sanitizedCommand}</a>`;
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
  
  // Process any command links in the output
  return processCommandLinks(command);
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
