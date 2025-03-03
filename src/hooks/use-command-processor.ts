
import { HistoryItem } from '@/components/ui/terminal';
import { processCommand } from '@/utils/commands';
import { useCallback, useEffect, useState } from 'react';

export const useCommandProcessor = (
  initialCommands: string[] = [],
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>,
  setLastExecutedCommand: (command: string) => void,
  commandHistory: string[] = []
) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initialCommandsProcessed, setInitialCommandsProcessed] = useState(false);
  const [isProcessingAsync, setIsProcessingAsync] = useState(false);
  const [commandsToProcess, setCommandsToProcess] = useState<string[]>([]);

  // Set up initial commands
  useEffect(() => {
    if (initialCommands && initialCommands.length > 0) {
      // console.log('Setting initial commands:', initialCommands);
      setCommandsToProcess(initialCommands);
    } else {
      setCommandsToProcess(['welcome']);
    }
  }, [initialCommands]);

  const processCommandWithHistory = useCallback(
    async (commandString: string) => {
      // Always update the last executed command first
      setLastExecutedCommand(commandString);

      // Dispatch event for the command execution
      const commandExecutedEvent = new CustomEvent('commandExecuted', {
        detail: { command: commandString }
      });
      document.dispatchEvent(commandExecutedEvent);

      setIsProcessingAsync(true);
      let result = processCommand(commandString);

      // Special handling for history command
      if (commandString.trim().toLowerCase() === 'history') {
        // Replace placeholder with actual history
        const historyOutput = commandHistory
          .map(
            (cmd, index) =>
              `  ${index + 1}.  <span class="command-link" data-command="${cmd}">${cmd}</span>`
          )
          .join('\n');

        result = {
          content:
            historyOutput.length > 0
              ? `Command History:\n\n${historyOutput}`
              : 'No command history available.',
          isError: false
        };
      }

      if (result.content === 'CLEAR_TERMINAL') {
        setHistory([]);
        setIsProcessingAsync(false);

        if (result.runAfterClear) {
          const welcomeHistoryItem = {
            command: 'welcome',
            result: result.runAfterClear,
            timestamp: new Date()
          };
          setHistory([welcomeHistoryItem]);
          setLastExecutedCommand('welcome');

          // Update page title for the welcome command
          const welcomeEvent = new CustomEvent('commandExecuted', {
            detail: { command: 'welcome' }
          });
          document.dispatchEvent(welcomeEvent);
        }
        
        // Dispatch event to ensure scroll happens after clearing terminal
        const scrollEvent = new CustomEvent('terminalContentChanged');
        document.dispatchEvent(scrollEvent);
        return;
      }

      const historyItem = {
        command: commandString,
        result,
        timestamp: new Date()
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
                      isError: true
                    }
                  }
                : item
            )
          );
        } finally {
          setIsProcessingAsync(false);
          
          // After async processing is complete, dispatch an event to scroll
          const scrollEvent = new CustomEvent('terminalContentChanged');
          document.dispatchEvent(scrollEvent);
        }
      } else {
        setIsProcessingAsync(false);
        
        // Dispatch an event to ensure scroll after command is processed
        const scrollEvent = new CustomEvent('terminalContentChanged');
        document.dispatchEvent(scrollEvent);
      }
    },
    [commandHistory, setHistory, setLastExecutedCommand, setIsProcessingAsync]
  );

  // Process initial commands
  useEffect(() => {
    if (commandsToProcess.length > 0 && isInitializing && !initialCommandsProcessed) {
      setInitialCommandsProcessed(true);

      console.log('Processing initial commands:', commandsToProcess);

      let i = 0;
      const processNextCommand = () => {
        if (i < commandsToProcess.length) {
          const command = commandsToProcess[i];
          console.log('Processing command:', command);
          processCommandWithHistory(command);

          // Set last executed command to be the very last command in the queue
          if (i === commandsToProcess.length - 1) {
            console.log('Setting final command as last executed:', command);
            setLastExecutedCommand(command);
          }

          i++;
          setTimeout(processNextCommand, 300);
        } else {
          setIsInitializing(false);
        }
      };
      processNextCommand();
    } else if (isInitializing && commandsToProcess.length === 0) {
      setIsInitializing(false);
    }
  }, [
    commandsToProcess,
    isInitializing,
    initialCommandsProcessed,
    processCommandWithHistory,
    setLastExecutedCommand
  ]);

  return {
    isInitializing,
    isProcessingAsync,
    processCommandWithHistory
  };
};
