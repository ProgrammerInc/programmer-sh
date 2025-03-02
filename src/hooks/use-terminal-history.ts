import { HistoryItem } from '@/components/ui/terminal';
import { useEffect, useState } from 'react';

const HISTORY_STORAGE_KEY = 'terminal_command_history';

export const useTerminalHistory = (isInitializing: boolean) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastExecutedCommand, setLastExecutedCommand] = useState('welcome');

  // Load history from localStorage on initialization
  useEffect(() => {
    if (isInitializing) {
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          if (Array.isArray(parsedHistory)) {
            const formattedHistory = parsedHistory.map(
              (item: Omit<HistoryItem, 'timestamp'> & { timestamp: string }) => ({
                ...item,
                timestamp: new Date(item.timestamp),
              })
            );
            setHistory(formattedHistory);
            if (formattedHistory.length > 0) {
              setLastExecutedCommand(formattedHistory[formattedHistory.length - 1].command);
            }
          }
        } catch (e) {
          console.error('Error parsing command history:', e);
        }
      }
    }
  }, [isInitializing]);

  // Save history to localStorage when it changes
  useEffect(() => {
    if (history.length > 0 && !isInitializing) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    }
  }, [history, isInitializing]);

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
