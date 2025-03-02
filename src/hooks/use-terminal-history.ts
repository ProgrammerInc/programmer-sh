
import { HistoryItem } from '@/components/ui/terminal';
import { useEffect, useState } from 'react';

const HISTORY_STORAGE_KEY = 'terminal_command_history';

export const useTerminalHistory = (isInitializing: boolean) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastExecutedCommand, setLastExecutedCommand] = useState('welcome');
  const [historyLoaded, setHistoryLoaded] = useState(false);

  // Load history from localStorage on initialization
  useEffect(() => {
    if (isInitializing && !historyLoaded) {
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
            
            // Explicitly set the last command from the last history item
            const lastItem = formattedHistory[formattedHistory.length - 1];
            if (lastItem && lastItem.command) {
              setLastExecutedCommand(lastItem.command);
            }
          }
        } catch (e) {
          console.error('Error parsing command history:', e);
        }
      }
      setHistoryLoaded(true);
    }
  }, [isInitializing, historyLoaded]);

  // Save history to localStorage when it changes
  useEffect(() => {
    if (history.length > 0 && !isInitializing && historyLoaded) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
      
      // Update last executed command whenever history changes
      const lastItem = history[history.length - 1];
      if (lastItem && lastItem.command) {
        setLastExecutedCommand(lastItem.command);
      }
    }
  }, [history, isInitializing, historyLoaded]);

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  return {
    history,
    setHistory,
    lastExecutedCommand,
    setLastExecutedCommand,
    clearHistory,
    commandHistory: history.map(item => item.command),
  };
};
