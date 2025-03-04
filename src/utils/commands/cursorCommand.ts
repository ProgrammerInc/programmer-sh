import { Command, CommandResult } from './types';

// Predefined cursors
export const cursors = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Default cursor',
    type: 'cursor'
  },
  splash: {
    id: 'splash',
    name: 'Splash',
    description: 'Splash cursor',
    type: 'animation'
  }
};

// Cursor types
export type CursorType = 'cursor' | 'animation';

// Cursor definition
export interface Cursor {
  id: string;
  name: string;
  description: string;
  type: CursorType;
  url?: string;
}

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

// Initialize cursor on load
export const initializeCursor = (): void => {
  const currentCursor = getCurrentCursor();
  setCursor(currentCursor);
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
            `\n  - <span class="command-link" data-command="cursor ${cursor.id}">${cursor.id}</span>: ${cursor.description}`
        )
        .join('');

      return {
        content: `Current cursor: <span class="text-terminal-prompt">${cursors[currentCursor].id}</span>\n\nAvailable cursors:\n${availableCursors}\n\nUsage: cursor [name]`,
        isError: false
      };
    }

    const requestedCursor = args.trim().toLowerCase();

    if (!Object.keys(cursors).includes(requestedCursor)) {
      return {
        content: `Cursor <span class="text-terminal-prompt">${requestedCursor}</span> not found. Use <span class="command-link" data-command="cursor">cursor</span> to see available options.`,
        isError: true
      };
    }

    if (requestedCursor === currentCursor) {
      return {
        content: `Cursor is already set to <span class="text-terminal-prompt">${cursors[currentCursor].id}</span>.`,
        isError: false
      };
    }

    setCursor(requestedCursor);

    return {
      content: `Cursor changed to <span class="text-terminal-prompt">${cursors[requestedCursor].id}</span>.`,
      isError: false
    };
  }
};
