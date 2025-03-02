
import { useState, useEffect } from 'react';
import { processCommand } from '@/utils/commands';
import { CommandResult } from '@/utils/commands/types';
import { HistoryItem } from '@/components/ui/terminal';

export const useCommandProcessor = (
  initialCommands: string[] = [],
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>,
  setLastExecutedCommand: (command: string) => void
) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initialCommandsProcessed, setInitialCommandsProcessed] = useState(false);
  const [isProcessingAsync, setIsProcessingAsync] = useState(false);
  const [commandsToProcess, setCommandsToProcess] = useState<string[]>([]);

  // Set up initial commands
  useEffect(() => {
    if (initialCommands && initialCommands.length > 0) {
      console.log('Setting initial commands:', initialCommands);
      setCommandsToProcess(initialCommands);
    } else {
      setCommandsToProcess(['welcome']);
    }
  }, [initialCommands]);

  // Process initial commands
  useEffect(() => {
    if (commandsToProcess.length > 0 && isInitializing && !initialCommandsProcessed) {
      setInitialCommandsProcessed(true);

      console.log('Processing initial commands:', commandsToProcess);

      let i = 0;
      const processNextCommand = () => {
        if (i < commandsToProcess.length) {
          const command = commandsToProcess[i++];
          console.log('Processing command:', command);
          processCommandWithHistory(command);
          setTimeout(processNextCommand, 300);
        } else {
          setIsInitializing(false);
        }
      };
      processNextCommand();
    } else if (isInitializing && commandsToProcess.length === 0) {
      setIsInitializing(false);
    }
  }, [commandsToProcess, isInitializing, initialCommandsProcessed]);

  const processCommandWithHistory = async (commandString: string) => {
    setIsProcessingAsync(true);
    setLastExecutedCommand(commandString);
    const result = processCommand(commandString);

    if (result.content === 'CLEAR_TERMINAL') {
      setHistory([]);
      setIsProcessingAsync(false);
      
      if (result.runAfterClear) {
        const welcomeHistoryItem = {
          command: 'welcome',
          result: result.runAfterClear,
          timestamp: new Date(),
        };
        setHistory([welcomeHistoryItem]);
      }
      return;
    }

    const historyItem = {
      command: commandString,
      result,
      timestamp: new Date(),
    };

    setHistory(prev => [...prev, historyItem]);

    if (result.isAsync && result.asyncResolver) {
      try {
        const asyncResult = await result.asyncResolver();
        setHistory(prev =>
          prev.map(item => (item === historyItem ? { ...item, result: asyncResult } : item))
        );
      } catch (error) {
        console.error('Error processing async command:', error);
        setHistory(prev =>
          prev.map(item =>
            item === historyItem
              ? {
                  ...item,
                  result: {
                    content: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    isError: true,
                  },
                }
              : item
          )
        );
      } finally {
        setIsProcessingAsync(false);
      }
    } else {
      setIsProcessingAsync(false);
    }
  };

  return {
    isInitializing,
    isProcessingAsync,
    processCommandWithHistory,
  };
};
