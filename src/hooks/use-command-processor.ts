import { processCommand } from '@/commands';
import { getSpecificCommandHelp } from '@/commands/help-commands';
import { HistoryItem } from '@/components/ui/terminal-history';
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
      // Don't set welcome as initial command - it will be triggered by ASCII art
      setCommandsToProcess([]);
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
        const historyOutput =
          Array.isArray(commandHistory) && commandHistory.length > 0
            ? commandHistory
                .map((cmd, index) => {
                  try {
                    const helpText = getSpecificCommandHelp(cmd);
                    const helpLines = helpText ? helpText.split('\n') : [];
                    const description =
                      helpLines.length > 1
                        ? helpLines[1]
                            .trim()
                            .replace(`<strong class="text-terminal-prompt">${cmd}</strong>: `, '')
                        : 'No description available';

                    return `  ${index + 1}. <strong><span class="command-link" data-command="${cmd}">${cmd}</span>: </strong>${description}`;
                  } catch (error) {
                    console.error(`Error processing history item for command ${cmd}:`, error);
                    return `  ${index + 1}. <strong><span class="command-link" data-command="${cmd}">${cmd}</span>: </strong>Command information unavailable`;
                  }
                })
                .join('\n')
            : '';

        result = {
          content:
            historyOutput.length > 0
              ? `Command History:\n\n${historyOutput}`
              : 'No command history available.',
          isError: false
        };
      }

      if (result.content === 'CLEAR_TERMINAL') {
        // Clear history from state
        setHistory([]);
        // Clear history from localStorage
        localStorage.removeItem('terminal_history');
        setIsProcessingAsync(false);

        if (result.runAfterClear) {
          const welcomeHistoryItem = {
            command: 'welcome',
            timestamp: new Date()
            // No longer storing result - will re-execute command when needed
          };

          setHistory([welcomeHistoryItem]);
          setLastExecutedCommand('welcome');

          // Update page title for the welcome command
          const welcomeEvent = new CustomEvent('commandExecuted', {
            detail: { command: 'welcome' }
          });

          document.dispatchEvent(welcomeEvent);
        }
        return;
      }

      const historyItem = {
        command: commandString,
        timestamp: new Date()
        // No longer storing result - will re-execute command when needed
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
        }
      } else {
        setIsProcessingAsync(false);
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

            // Finish initialization after processing all commands
            setIsInitializing(false);
          }

          i++;

          setTimeout(processNextCommand, 300);
        } else {
          setIsInitializing(false);
        }
      };
      processNextCommand();
    } else if (isInitializing && commandsToProcess.length === 0) {
      // No initial commands to process - finish initialization quickly
      // to allow welcome command from ASCII art
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

export default useCommandProcessor;
