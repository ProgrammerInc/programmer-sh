'use client';

import { RefObject } from 'react';
import { HistoryItem } from '@/components/ui/terminal-history';

/**
 * Save command history to localStorage
 * @param commands Array of command strings to save
 */
export const saveCommandHistory = (commands: string[]): void => {
  try {
    localStorage.setItem('terminal_history', JSON.stringify(commands));
  } catch (error) {
    console.error('Error saving command history:', error);
  }
};

/**
 * Load command history from localStorage
 * @returns Array of command strings, or empty array if none found
 */
export const loadCommandHistory = (): string[] => {
  try {
    const historyJson = localStorage.getItem('terminal_history');
    if (historyJson) {
      return JSON.parse(historyJson);
    }
  } catch (error) {
    console.error('Error loading command history:', error);
  }
  return [];
};

/**
 * Parse a command string into its components
 * @param commandString The full command string to parse
 * @returns Object containing the command name and arguments
 */
export const parseCommand = (commandString: string): { command: string; args: string[] } => {
  const trimmed = commandString.trim();
  const parts = trimmed.split(/\s+/);
  const command = parts[0] || '';
  const args = parts.slice(1);
  
  return { command, args };
};

/**
 * Scroll the terminal content to the bottom
 * @param contentRef Reference to the content container element
 */
export const scrollToBottom = (contentRef: RefObject<HTMLDivElement>): void => {
  if (contentRef.current) {
    contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }
};

/**
 * Sanitize HTML to prevent XSS attacks
 * @param html HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHtml = (html: string): string => {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Render command output as HTML
 * @param output Command output object
 * @returns HTML string representation of the output
 */
export const renderCommandOutput = (historyItem: HistoryItem): string => {
  if (!historyItem.output) return '';
  
  // If output is already HTML, return it directly
  if (historyItem.html) {
    return historyItem.output;
  }
  
  // Otherwise sanitize and format plain text
  const sanitized = sanitizeHtml(historyItem.output);
  const formatted = sanitized.replace(/\n/g, '<br>');
  
  // Apply error styling if needed
  return historyItem.error ? `<span class="error">${formatted}</span>` : formatted;
};
