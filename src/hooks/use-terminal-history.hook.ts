import { HistoryItem } from '@/components/ui/terminal-history';
import { createFeatureLogger } from '@/services/logger/logger.utils';
import { useCallback, useEffect, useState } from 'react';

// Create a dedicated logger for terminal history
const terminalHistoryLogger = createFeatureLogger('TerminalHistory');

const HISTORY_STORAGE_KEY = 'terminal_command_history';
const LAST_COMMAND_KEY = 'terminal_last_command';
const MAX_HISTORY_LENGTH = 15; // More aggressively limit history to prevent quota issues
const MAX_COMMAND_LENGTH = 200; // Limit size of individual commands

/**
 * Custom hook for managing terminal command history
 * @param isInitializing Whether the terminal is initializing
 * @returns History state and functions
 */
export const useTerminalHistory = (isInitializing: boolean) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastExecutedCommand, setLastExecutedCommand] = useState<string>('welcome');
  const [historyLoaded, setHistoryLoaded] = useState(false);

  // Clear history
  const clearHistory = useCallback(() => {
    terminalHistoryLogger.info('Clearing terminal history');
    setHistory([]);
    // Clear all terminal-related storage to free up space
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      // Only keep the last command
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      terminalHistoryLogger.error('Error clearing history', { error: errorMessage });
      // If we can't even remove items, we have a more serious issue
      // Try clearing all terminal-related storage as a last resort
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('terminal_')) {
          try {
            localStorage.removeItem(key);
          } catch (e) {
            // Can't do much if this fails
            terminalHistoryLogger.warn('Failed to remove terminal storage item', { key });
          }
        }
      }
    }
  }, []);

  // Load history from localStorage on initialization
  useEffect(() => {
    if (isInitializing && !historyLoaded) {
      terminalHistoryLogger.debug('Loading terminal history from storage');
      // First, try to get the specific last command
      const savedLastCommand = localStorage.getItem(LAST_COMMAND_KEY);

      if (savedLastCommand) {
        terminalHistoryLogger.debug('Found saved last command', { command: savedLastCommand });
        setLastExecutedCommand(savedLastCommand);
      }

      // Then load the full history
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);

      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);

          if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
            const formattedHistory = parsedHistory.map(
              (item: { command: string; timestamp: string }) => ({
                command: item.command,
                timestamp: new Date(item.timestamp)
                // No result property - we're only storing commands now
              })
            );

            terminalHistoryLogger.debug('Loaded history from storage', { count: formattedHistory.length });
            setHistory(formattedHistory);

            // Set the last command from history only if we didn't already get it from storage
            if (!savedLastCommand) {
              const lastItem = formattedHistory[formattedHistory.length - 1];

              if (lastItem && lastItem.command) {
                terminalHistoryLogger.debug('Setting last command from history', { command: lastItem.command });
                setLastExecutedCommand(lastItem.command);
              }
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          terminalHistoryLogger.error('Error parsing command history', { error: errorMessage });
        }
      }
      setHistoryLoaded(true);
    }
  }, [isInitializing, historyLoaded]);

  // Custom setter for lastExecutedCommand that also updates localStorage
  const updateLastCommand = useCallback(
    (command: string) => {
      if (command !== lastExecutedCommand) {
        terminalHistoryLogger.debug('Updating last command', { command });
        setLastExecutedCommand(command);

        localStorage.setItem(LAST_COMMAND_KEY, command);
      }
    },
    [lastExecutedCommand]
  );

  // Save history to localStorage when it changes
  useEffect(() => {
    if (history.length > 0 && historyLoaded) {
      // Limit history size before saving to localStorage
      const limitedHistory =
        history.length > MAX_HISTORY_LENGTH
          ? history.slice(history.length - MAX_HISTORY_LENGTH)
          : history;

      try {
        // Prepare history for storage - only save command and timestamp
        const storableHistory = limitedHistory.map(item => ({
          command: item.command,
          timestamp: item.timestamp
        }));
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(storableHistory));
        terminalHistoryLogger.debug('Saved history to localStorage', { count: storableHistory.length });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        terminalHistoryLogger.error('Error saving history to localStorage', { error: errorMessage });
        
        // If we still have an error, try to save a smaller portion of the history
        if (limitedHistory.length > 10) {
          try {
            const reducedHistory = limitedHistory.slice(limitedHistory.length - 10);
            // Prepare reduced history for storage - only command and timestamp
            const storableReducedHistory = reducedHistory.map(item => ({
              command: item.command,
              timestamp: item.timestamp
            }));
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(storableReducedHistory));
            setHistory(reducedHistory);
            terminalHistoryLogger.info('Saved reduced history to localStorage', { count: reducedHistory.length });
          } catch (fallbackError) {
            const fallbackErrorMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
            terminalHistoryLogger.error('Error saving reduced history', { error: fallbackErrorMessage });
            // Last resort: clear history
            clearHistory();
          }
        }
      }

      // Update last executed command whenever history changes if we're not initializing
      if (!isInitializing) {
        const lastItem = history[history.length - 1];

        if (lastItem && lastItem.command) {
          updateLastCommand(lastItem.command);
        }
      }
    }
  }, [history, isInitializing, historyLoaded, updateLastCommand, clearHistory]);

  return {
    history,
    setHistory: (newHistory: HistoryItem[]) => {
      // Ensure we never exceed max length when setting history
      // Also trim any oversized commands
      const trimmedHistory = newHistory.map(item => ({
        ...item,
        command:
          item.command.length > MAX_COMMAND_LENGTH
            ? item.command.substring(0, MAX_COMMAND_LENGTH) + '...'
            : item.command,
        // No longer storing output - we'll re-execute the command when needed
        timestamp: item.timestamp || new Date()
      }));

      if (trimmedHistory.length > MAX_HISTORY_LENGTH) {
        setHistory(trimmedHistory.slice(trimmedHistory.length - MAX_HISTORY_LENGTH));
      } else {
        setHistory(trimmedHistory);
      }
    },
    lastExecutedCommand,
    setLastExecutedCommand: updateLastCommand,
    clearHistory,
    commandHistory: history.map(item => item.command)
  };
};

export default useTerminalHistory;
