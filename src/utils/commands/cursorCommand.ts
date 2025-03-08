import { cursors } from '@/components/ui/cursor/cursor.presets';
import { Command, CommandResult } from './types';

// Current cursor key in localStorage
export const CURSOR_STORAGE_KEY = 'terminal_cursor';

// Get current cursor from localStorage or default cursor
export const getCurrentCursor = (): string => {
  const savedCursor = localStorage.getItem(CURSOR_STORAGE_KEY);
  return savedCursor || 'default';
};

// Set cursor in localStorage and dispatch event
export const setCursor = (id: string): void => {
  localStorage.setItem(CURSOR_STORAGE_KEY, id);

  // Dispatch custom event for components to respond to cursor change
  document.dispatchEvent(
    new CustomEvent('cursorChange', {
      detail: { cursorId: id, cursor: cursors[id] }
    })
  );
};

// Flag to track initialization status
let cursorInitialized = false;

// Initialize cursor on load - with safeguard to prevent multiple initializations
export const initializeCursor = (): void => {
  // Only initialize once
  if (cursorInitialized) {
    return;
  }

  const currentCursor = getCurrentCursor();
  setCursor(currentCursor);

  // Mark as initialized
  cursorInitialized = true;
  console.log('Cursor initialized');
};

// Cursor command
export const cursorCommand: Command = {
  name: 'cursor',
  description: 'Change the terminal cursor',
  execute: (args?: string): CommandResult => {
    const currentCursor = getCurrentCursor();

    if (!args) {
      const availableCursors = Object.entries(cursors)
        .map(
          ([id, cursor]) =>
            `\n&nbsp;&nbsp;- <span class="command-link" data-command="cursor ${cursor.id}">${cursor.id}</span>: ${cursor.description}`
        )
        .join('');

      return {
        content: `\nCurrent cursor: <span class="text-terminal-prompt">${cursors[currentCursor].id}</span>\n\nAvailable cursors:\n${availableCursors}\n\nUsage: <span class="command-link" data-command="cursor" data-placeholder="[name]">cursor [name]</span>\n\n`,
        isError: false
      };
    }

    const requestedCursor = args.trim().toLowerCase();

    if (!Object.keys(cursors).includes(requestedCursor)) {
      return {
        content: `\nCursor <span class="text-terminal-prompt">${requestedCursor}</span> not found. Use <span class="command-link" data-command="cursor">cursor</span> to see available options.\n\n`,
        isError: true
      };
    }

    if (requestedCursor === currentCursor) {
      return {
        content: `\nCursor is already set to <span class="text-terminal-prompt">${cursors[currentCursor].id}</span>.\n\n`,
        isError: false
      };
    }

    setCursor(requestedCursor);

    return {
      content: `\nCursor changed to <span class="text-terminal-prompt">${cursors[requestedCursor].id}</span>.\n\n`,
      isError: false
    };
  }
};
