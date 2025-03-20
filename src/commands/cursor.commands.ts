import { cursorPresets } from '@/presets/cursor.presets';
import { createFeatureLogger } from '@/services/logger/logger.utils';
import { Command, CommandResult } from './command.types';

// Create a dedicated logger for cursor commands
const cursorLogger = createFeatureLogger('CursorCommands');

/**
 * Local storage key for storing the current cursor selection
 */
export const CURSOR_STORAGE_KEY = 'terminal_cursor';

/**
 * Interface for cursor preset item
 */
interface CursorPreset {
  id: string;
  name: string;
  description: string;
  cursor: string;
}

/**
 * Get the currently active cursor ID from localStorage or return the default
 * @returns The ID of the current cursor
 */
export const getCurrentCursor = (): string => {
  try {
    const savedCursor = localStorage.getItem(CURSOR_STORAGE_KEY);
    const cursorId = savedCursor || 'default';

    // Verify the cursor exists in presets
    if (!Object.keys(cursorPresets).includes(cursorId)) {
      cursorLogger.warn('Saved cursor not found in presets, using default', { cursorId });
      return 'default';
    }

    return cursorId;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    cursorLogger.error('Error getting current cursor', { error: errorMessage });
    return 'default'; // Fallback to default
  }
};

/**
 * Set the active cursor and store in localStorage
 * @param id - The ID of the cursor to set
 */
export const setCursor = (id: string): void => {
  try {
    // Verify the cursor exists in presets
    if (!cursorPresets[id]) {
      throw new Error(`Cursor with ID '${id}' not found in presets`);
    }

    localStorage.setItem(CURSOR_STORAGE_KEY, id);

    // Dispatch custom event for components to respond to cursor change
    document.dispatchEvent(
      new CustomEvent('cursorChange', {
        detail: { cursorId: id, cursor: cursorPresets[id] }
      })
    );

    cursorLogger.info('Cursor set successfully', { cursorId: id });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    cursorLogger.error('Error setting cursor', { id, error: errorMessage });
    // Re-throw to allow calling code to handle the error
    throw error;
  }
};

// Flag to track initialization status
let cursorInitialized = false;

/**
 * Initialize cursor on application load
 * Only initializes once to prevent multiple initializations
 */
export const initializeCursor = (): void => {
  try {
    // Only initialize once
    if (cursorInitialized) {
      cursorLogger.debug('Cursor already initialized, skipping');
      return;
    }

    const currentCursor = getCurrentCursor();
    setCursor(currentCursor);

    // Mark as initialized
    cursorInitialized = true;
    cursorLogger.info('Cursor initialized', { cursor: currentCursor });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    cursorLogger.error('Error initializing cursor', { error: errorMessage });
    // Don't re-throw as this is called during initialization
  }
};

/**
 * Format cursor list for display
 * @returns Formatted HTML string of cursors
 */
const formatCursorList = (): string => {
  try {
    return Object.entries(cursorPresets)
      .map(
        ([id, cursor]) =>
          `\n&nbsp;&nbsp;- <span class="command-link" data-command="cursor ${cursor.id}">${cursor.id}</span>: ${cursor.description}`
      )
      .join('');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    cursorLogger.error('Error formatting cursor list', { error: errorMessage });
    return 'Error formatting cursor list. Please try again.';
  }
};

/**
 * Command to change or list available terminal cursors
 */
export const cursorCommand: Command = {
  name: 'cursor',
  description: 'Change the terminal cursor',
  usage: 'cursor [name]',
  execute: (args?: string): CommandResult => {
    try {
      const currentCursor = getCurrentCursor();

      if (!args) {
        const availableCursors = formatCursorList();

        cursorLogger.debug('Listed available cursors', {
          current: currentCursor,
          totalAvailable: Object.keys(cursorPresets).length
        });

        return {
          content: `Current cursor: <span class="text-terminal-prompt">${cursorPresets[currentCursor].id}</span>\n\nAvailable Cursors:${availableCursors}\n\nUsage: <span class="command-link" data-command="cursor" data-placeholder="[name]">cursor [name]</span>`,
          isError: false,
          rawHTML: true
        };
      }

      const requestedCursor = args.trim().toLowerCase();

      if (!Object.keys(cursorPresets).includes(requestedCursor)) {
        cursorLogger.warn('Cursor not found', { requested: requestedCursor });
        return {
          content: `Cursor <span class="text-terminal-prompt">${requestedCursor}</span> not found. Use <span class="command-link" data-command="cursor">cursor</span> to see available options.`,
          isError: true,
          rawHTML: true
        };
      }

      if (requestedCursor === currentCursor) {
        cursorLogger.debug('Cursor already set', { cursor: currentCursor });
        return {
          content: `Cursor is already set to <span class="text-terminal-prompt">${cursorPresets[currentCursor].id}</span>.`,
          isError: false,
          rawHTML: true
        };
      }

      setCursor(requestedCursor);

      cursorLogger.info('Cursor changed', {
        from: currentCursor,
        to: requestedCursor
      });

      return {
        content: `Cursor changed to <span class="text-terminal-prompt">${cursorPresets[requestedCursor].id}</span>.`,
        isError: false,
        rawHTML: true,
        metadata: {
          previousCursor: currentCursor,
          newCursor: requestedCursor
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      cursorLogger.error('Error executing cursor command', { error: errorMessage });
      return {
        content: `Error changing cursor: ${errorMessage}`,
        isError: true
      };
    }
  }
};
