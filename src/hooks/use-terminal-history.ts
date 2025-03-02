
import { HistoryItem } from '@/components/ui/terminal';
import { useEffect, useState } from 'react';

const HISTORY_STORAGE_KEY = 'terminal_command_history';
const LAST_COMMAND_KEY = 'terminal_last_command';

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
              (item: Omit<HistoryItem, 'timestamp'> & { timestamp: string }) => ({
                ...item,
                timestamp: new Date(item.timestamp),
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
  const updateLastCommand = (command: string) => {
    setLastExecutedCommand(command);
    localStorage.setItem(LAST_COMMAND_KEY, command);
  };

  // Save history to localStorage when it changes
  useEffect(() => {
    if (history.length > 0 && !isInitializing && historyLoaded) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
      
      // Update last executed command whenever history changes
      const lastItem = history[history.length - 1];
      if (lastItem && lastItem.command) {
        updateLastCommand(lastItem.command);
      }
    }
  }, [history, isInitializing, historyLoaded]);

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    // We don't clear the last command when clearing history
  };

  return {
    history,
    setHistory,
    lastExecutedCommand,
    setLastExecutedCommand: updateLastCommand,
    clearHistory,
    commandHistory: history.map(item => item.command),
  };
};
