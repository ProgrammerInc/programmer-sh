import { processCommand } from '@/commands';
import { getSpecificCommandHelp } from '@/commands/help.commands';
import { HistoryItem } from '@/components/ui/terminal-history';
import { createFeatureLogger } from '@/services/logger/logger.utils';
import { useCallback, useEffect, useState } from 'react';

// Create a dedicated logger for command processor
const commandProcessorLogger = createFeatureLogger('CommandProcessor');

/**
 * Interface for the command processor hook return values
 */
interface CommandProcessorHook {
  isInitializing: boolean;
  isProcessingAsync: boolean;
  processCommand: (commandString: string) => Promise<void>;
  addCommandToQueue: (commandString: string) => void;
}

/**
 * Hook for processing terminal commands and managing command history
 * @param initialCommands Initial commands to process
 * @param setHistory Function to update the history state
 * @param setLastExecutedCommand Function to update the last executed command
 * @param commandHistory Array of command history strings
 * @returns Command processor state and functions
 */
export const useCommandProcessor = (
  initialCommands: string[] = [],
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>,
  setLastExecutedCommand: (command: string) => void,
  commandHistory: string[] = []
): CommandProcessorHook => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initialCommandsProcessed, setInitialCommandsProcessed] = useState(false);
  const [isProcessingAsync, setIsProcessingAsync] = useState(false);
  const [commandsToProcess, setCommandsToProcess] = useState<string[]>([]);

  /**
   * Add a command to the queue for processing
   * @param commandString The command to add to the queue
   */
  const addCommandToQueue = useCallback((commandString: string): void => {
    commandProcessorLogger.debug('Adding command to queue', { command: commandString });
    setCommandsToProcess(prev => [...prev, commandString]);
  }, []);

  /**
   * Format history item for display
   * @param cmd The command to format
   * @param index The index in the history
   * @returns Formatted HTML string
   */
  const formatHistoryItem = useCallback((cmd: string, index: number): string => {
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
      const errorMessage = error instanceof Error ? error.message : String(error);
      commandProcessorLogger.error('Error formatting history item', {
        command: cmd,
        error: errorMessage
      });
      return `  ${index + 1}. <strong><span class="command-link" data-command="${cmd}">${cmd}</span>: </strong>Command information unavailable`;
    }
  }, []);

  /**
   * Process a single command and update history
   * @param commandString The command to process
   */
  const processCommandWithHistory = useCallback(
    async (commandString: string): Promise<void> => {
      try {
        // Always update the last executed command first
        setLastExecutedCommand(commandString);

        // Dispatch event for the command execution
        const commandExecutedEvent = new CustomEvent('commandExecuted', {
          detail: { command: commandString }
        });

        document.dispatchEvent(commandExecutedEvent);

        setIsProcessingAsync(true);

        // Process the command and get the result
        let result = processCommand(commandString);

        // Special handling for history command
        if (commandString.trim().toLowerCase() === 'history') {
          commandProcessorLogger.debug('Processing special history command');
          // Format history items
          const historyOutput =
            Array.isArray(commandHistory) && commandHistory.length > 0
              ? commandHistory.map((cmd, index) => formatHistoryItem(cmd, index)).join('\n')
              : '';

          result = {
            content:
              historyOutput.length > 0
                ? `Command History:\n\n${historyOutput}`
                : 'No command history available.',
            isError: false
          };
        }

        // Handle clear terminal command
        if (result.content === 'CLEAR_TERMINAL') {
          commandProcessorLogger.info('Clearing terminal history');
          // Clear history from state
          setHistory([]);
          // Don't clear command history from localStorage - this would break command history navigation
          setIsProcessingAsync(false);

          // Process any commands to run after clearing
          if (result.runAfterClear) {
            const welcomeHistoryItem: HistoryItem = {
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

        // Create history item for the command
        const historyItem: HistoryItem = {
          command: commandString,
          timestamp: new Date()
          // No longer storing result - will re-execute command when needed
        };

        setHistory(prev => [...prev, historyItem]);

        // Handle async commands
        if (result.isAsync && result.asyncResolver) {
          try {
            commandProcessorLogger.debug('Processing async command', { command: commandString });
            const asyncResult = await result.asyncResolver();

            setHistory(prev =>
              prev.map(item => (item === historyItem ? { ...item, result: asyncResult } : item))
            );
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            commandProcessorLogger.error('Error processing async command', {
              command: commandString,
              error: errorMessage
            });

            setHistory(prev =>
              prev.map(item =>
                item === historyItem
                  ? {
                      ...item,
                      result: {
                        content: `Error: ${errorMessage}`,
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
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        commandProcessorLogger.error('Error in processCommandWithHistory', {
          command: commandString,
          error: errorMessage
        });
        setIsProcessingAsync(false);
      }
    },
    [commandHistory, setHistory, setLastExecutedCommand, formatHistoryItem]
  );

  // Process initial commands
  useEffect(() => {
    if (commandsToProcess.length > 0 && isInitializing && !initialCommandsProcessed) {
      setInitialCommandsProcessed(true);

      commandProcessorLogger.info('Processing initial commands', {
        count: commandsToProcess.length
      });

      let i = 0;

      const processNextCommand = () => {
        if (i < commandsToProcess.length) {
          const command = commandsToProcess[i];

          commandProcessorLogger.debug('Processing command', {
            command,
            index: i + 1,
            total: commandsToProcess.length
          });

          processCommandWithHistory(command);

          // Set last executed command to be the very last command in the queue
          if (i === commandsToProcess.length - 1) {
            commandProcessorLogger.debug('Setting final command as last executed', { command });

            setLastExecutedCommand(command);

            // Finish initialization after processing all commands
            setIsInitializing(false);
          }

          i++;

          setTimeout(processNextCommand, 300);
        }
      };

      processNextCommand();
    }
  }, [
    commandsToProcess,
    isInitializing,
    initialCommandsProcessed,
    processCommandWithHistory,
    setLastExecutedCommand
  ]);

  // Set up initial commands
  useEffect(() => {
    if (initialCommands && initialCommands.length > 0) {
      // Log initial command setup
      commandProcessorLogger.debug('Setting up initial commands', {
        count: initialCommands.length
      });
      setCommandsToProcess(initialCommands);
    } else {
      // Don't set welcome as initial command - it will be triggered by ASCII art
      setCommandsToProcess([]);
    }
  }, [initialCommands]);

  return {
    isInitializing,
    isProcessingAsync,
    processCommand: processCommandWithHistory,
    addCommandToQueue
  };
};

export default useCommandProcessor;
