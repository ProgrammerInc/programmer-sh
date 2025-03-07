import { HistoryItem } from '@/components/ui/terminal-history';
import { useCallback, useEffect, useState } from 'react';

const HISTORY_STORAGE_KEY = 'terminal_command_history';
const LAST_COMMAND_KEY = 'terminal_last_command';
const MAX_HISTORY_LENGTH = 15; // More aggressively limit history to prevent quota issues
const MAX_COMMAND_LENGTH = 200; // Limit size of individual commands

export const useTerminalHistory = (isInitializing: boolean) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastExecutedCommand, setLastExecutedCommand] = useState<string>('welcome');
  const [historyLoaded, setHistoryLoaded] = useState(false);

  // Load history from localStorage on initialization
  useEffect(() => {
    if (isInitializing && !historyLoaded) {
      // First, try to get the specific last command
      const savedLastCommand = localStorage.getItem(LAST_COMMAND_KEY);

      if (savedLastCommand) {
        setLastExecutedCommand(savedLastCommand);
      }

      // Then load the full history
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);

      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);

          if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
            const formattedHistory = parsedHistory.map(
              (item: { command: string, timestamp: string }) => ({
                command: item.command,
                timestamp: new Date(item.timestamp)
                // No result property - we're only storing commands now
              })
            );

            setHistory(formattedHistory);

            // Set the last command from history only if we didn't already get it from storage
            if (!savedLastCommand) {
              const lastItem = formattedHistory[formattedHistory.length - 1];

              if (lastItem && lastItem.command) {
                setLastExecutedCommand(lastItem.command);
              }
            }
          }
        } catch (e) {
          console.error('Error parsing command history:', e);
        }
      }
      setHistoryLoaded(true);
    }
  }, [isInitializing, historyLoaded]);

  // Custom setter for lastExecutedCommand that also updates localStorage
  const updateLastCommand = useCallback(
    (command: string) => {
      if (command !== lastExecutedCommand) {
        // console.log('Updating last command to:', command);
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
      const limitedHistory = history.length > MAX_HISTORY_LENGTH 
        ? history.slice(history.length - MAX_HISTORY_LENGTH) 
        : history;
      
      try {
        // Prepare history for storage - only save command and timestamp
        const storableHistory = limitedHistory.map(item => ({
          command: item.command,
          timestamp: item.timestamp
        }));
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(storableHistory));
      } catch (error) {
        console.error('Error saving history to localStorage:', error);
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
          } catch (fallbackError) {
            console.error('Error saving reduced history:', fallbackError);
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
  }, [history, isInitializing, historyLoaded, updateLastCommand]);

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    // Clear all terminal-related storage to free up space
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      // Only keep the last command
    } catch (error) {
      console.error('Error clearing history:', error);
      // If we can't even remove items, we have a more serious issue
      // Try clearing all terminal-related storage as a last resort
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('terminal_')) {
          try {
            localStorage.removeItem(key);
          } catch (e) {
            // Can't do much if this fails
          }
        }
      }
    }
  };

  return {
    history,
    setHistory: (newHistory: HistoryItem[]) => {
      // Ensure we never exceed max length when setting history
      // Also trim any oversized commands
      const trimmedHistory = newHistory.map(item => ({
        ...item,
        command: item.command.length > MAX_COMMAND_LENGTH 
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
