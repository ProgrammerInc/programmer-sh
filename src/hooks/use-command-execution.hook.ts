import { Command, CommandResult } from '@/commands/command.types';
import { HistoryItem } from '@/components/ui/terminal-history/terminal-history.types';
import { createFeatureLogger } from '@/services/logger/logger.utils';
import { renderCommandOutput } from '@/utils/terminal.utils';
import { useCallback, useState } from 'react';

// Create a dedicated logger for command execution
const commandExecutionLogger = createFeatureLogger('CommandExecution');

/**
 * Interface for command execution hook return values
 */
interface CommandExecutionHook {
  commandHistory: string[];
  setCommandHistory: React.Dispatch<React.SetStateAction<string[]>>;
  commandOutput: HistoryItem[];
  setCommandOutput: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
  isAwaitingAsync: boolean;
  asyncCommandName: string | undefined;
  setAsyncCommandName: React.Dispatch<React.SetStateAction<string | undefined>>;
  lastCommand: string;
  executeCommand: (commandStr: string) => void;
}

/**
 * Enum for command types to improve code readability
 */
enum CommandType {
  NORMAL = 'normal',
  INIT = 'init',
  EVENT = 'event',
  URL = 'url'
}

/**
 * Custom hook for executing terminal commands and managing command state
 * @param commands Record of available command objects
 * @returns Command execution state and functions
 */
export const useCommandExecution = (commands: Record<string, Command>): CommandExecutionHook => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandOutput, setCommandOutput] = useState<HistoryItem[]>([]);
  const [isAwaitingAsync, setIsAwaitingAsync] = useState(false);
  const [asyncCommandName, setAsyncCommandName] = useState<string | undefined>(undefined);
  const [lastCommand, setLastCommand] = useState<string>('');

  /**
   * Determines the type of command based on prefixes and context
   * @param commandStr The command string to analyze
   * @returns The determined command type
   */
  const determineCommandType = useCallback((commandStr: string): CommandType => {
    if (commandStr.startsWith('__init_')) return CommandType.INIT;
    if (commandStr.startsWith('__event_')) return CommandType.EVENT;
    if (commandStr.startsWith('__url_')) return CommandType.URL;

    // Check if this might be a URL navigation command
    if (window.location.pathname.length > 1) {
      const pathCommand = window.location.pathname.substring(1).split('/')[0].toLowerCase();
      if (pathCommand && pathCommand === commandStr.toLowerCase()) {
        return CommandType.URL;
      }
    }

    return CommandType.NORMAL;
  }, []);

  /**
   * Removes special prefixes from command strings
   * @param commandStr The command string to clean
   * @returns The cleaned command string
   */
  const cleanCommandString = useCallback((commandStr: string): string => {
    return commandStr.replace(/^(__init_|__event_|__url_)/, '');
  }, []);

  /**
   * Handles asynchronous command execution
   * @param actualCommand The cleaned command string
   * @param commandName The command name
   * @param result The command result with async resolver
   * @param originalCommand The original command string with prefixes
   */
  const handleAsyncCommand = useCallback(
    (
      actualCommand: string,
      commandName: string,
      result: CommandResult,
      originalCommand: string
    ) => {
      setIsAwaitingAsync(true);
      setAsyncCommandName(commandName);
      result.asyncResolver!()
        .then(output => {
          setIsAwaitingAsync(false);
          setAsyncCommandName(undefined);
          setCommandOutput(prevOutput =>
            prevOutput
              ? [...prevOutput, renderCommandOutput(actualCommand, output.content, output.rawHTML)]
              : [renderCommandOutput(actualCommand, output.content, output.rawHTML)]
          );

          // Only dispatch event if it's not a special command (to prevent loops)
          if (!originalCommand.startsWith('__event_') && !originalCommand.startsWith('__init_')) {
            const event = new CustomEvent('commandExecuted', {
              detail: { command: commandName }
            });
            document.dispatchEvent(event);
          }
        })
        .catch(error => {
          const errorMessage = error instanceof Error ? error.message : String(error);
          commandExecutionLogger.error('Async command error', {
            command: commandName,
            error: errorMessage
          });
          setIsAwaitingAsync(false);
          setAsyncCommandName(undefined);
          setCommandOutput(prevOutput =>
            prevOutput
              ? [...prevOutput, renderCommandOutput(actualCommand, `Error executing command: ${errorMessage}`)]
              : [renderCommandOutput(actualCommand, `Error executing command: ${errorMessage}`)]
          );
        });
    },
    []
  );

  /**
   * Handles the clear command special case
   * @param cmdResult The command result
   * @param originalCommand The original command string with prefixes
   */
  const handleClearCommand = useCallback((cmdResult: CommandResult, originalCommand: string) => {
    // Clear the terminal output
    setCommandOutput([]);

    // Check if we should also clear command history
    if (cmdResult.clearHistory) {
      // Dispatch an event to notify the Terminal component to clear history
      const clearHistoryEvent = new CustomEvent('clearCommandHistory');
      document.dispatchEvent(clearHistoryEvent);
    }

    // Handle any post-clear commands
    if (cmdResult.runAfterClear) {
      setTimeout(() => {
        // Always show welcome without any prefixes
        setCommandOutput(
          [renderCommandOutput(
            'welcome',
            cmdResult.runAfterClear?.content || '',
            cmdResult.runAfterClear?.rawHTML
          )]
        );

        // Only dispatch welcome event if not a special command
        if (!originalCommand.startsWith('__event_') && !originalCommand.startsWith('__init_')) {
          const welcomeEvent = new CustomEvent('commandExecuted', {
            detail: { command: 'welcome' }
          });
          document.dispatchEvent(welcomeEvent);
        }
      }, 100);
    }
  }, []);

  /**
   * Handles standard command execution
   * @param actualCommand The cleaned command string
   * @param commandName The command name
   * @param cmdResult The command result
   * @param originalCommand The original command string with prefixes
   */
  const handleStandardCommand = useCallback(
    (
      actualCommand: string,
      commandName: string,
      cmdResult: CommandResult,
      originalCommand: string
    ) => {
      setCommandOutput(prevOutput =>
        prevOutput
          ? [...prevOutput, renderCommandOutput(actualCommand, cmdResult.content, cmdResult.rawHTML !== undefined ? cmdResult.rawHTML : false)]
          : [renderCommandOutput(actualCommand, cmdResult.content, cmdResult.rawHTML !== undefined ? cmdResult.rawHTML : false)]
      );

      // Only dispatch event if it's not a special command (to prevent loops)
      // URL commands (__url_) should still dispatch events for side effects
      if (!originalCommand.startsWith('__event_') && !originalCommand.startsWith('__init_')) {
        const event = new CustomEvent('commandExecuted', {
          detail: { command: commandName }
        });
        document.dispatchEvent(event);
      }
    },
    []
  );

  /**
   * Main function to execute a command
   * @param commandStr The command string to execute
   */
  const executeCommand = useCallback(
    (commandStr: string) => {
      try {
        if (!commandStr) {
          commandExecutionLogger.warn('Attempted to execute empty command');
          return;
        }

        // Determine command type and clean for processing
        const commandType = determineCommandType(commandStr);
        const isInitCommand = commandType === CommandType.INIT;
        const isEventCommand = commandType === CommandType.EVENT;
        const isUrlCommand = commandType === CommandType.URL;
        const actualCommand = cleanCommandString(commandStr);

        // Display name for logging (without prefixes)
        const displayCommand = cleanCommandString(commandStr);
        commandExecutionLogger.info('Execute command called', { command: displayCommand });

        // Extract command name and arguments
        const commandParts = actualCommand.split(' ');
        const commandName = commandParts[0].toLowerCase(); // Force lowercase for consistent matching
        const cmdArgs = commandParts.slice(1).join(' ');

        commandExecutionLogger.debug('Processing command', {
          commandName,
          availableCommands: Object.keys(commands).length
        });

        // Check if command exists
        const command = commands[commandName];

        // Add detailed debugging to check what's happening
        commandExecutionLogger.debug('Command lookup details', {
          commandName,
          commandExists: !!command,
          registeredCommands: Object.keys(commands),
          supportRegistered: !!commands['support'],
          contactRegistered: !!commands['contact'],
          supportAlias: commands['contact']?.aliases?.includes('support')
        });

        // Check if this is an alias command
        if (!command) {
          // Try to find a command where this is an alias
          const commandWithAlias = Object.values(commands).find(cmd =>
            cmd.aliases && cmd.aliases.includes(commandName)
          );

          if (commandWithAlias) {
            commandExecutionLogger.info('Found command via alias lookup', {
              commandName,
              aliasOf: commandWithAlias.name
            });

            // Update lastCommand to show this is an alias
            setLastCommand(`${commandName} (${commandWithAlias.name})`);

            // Use the found command
            const result = commandWithAlias.execute(cmdArgs);

            // Process the result
            if (result.isAsync && result.asyncResolver) {
              handleAsyncCommand(actualCommand, commandWithAlias.name, result, commandStr);
            } else {
              setCommandOutput(prevOutput => [
                ...prevOutput,
                renderCommandOutput(actualCommand, result.content, result.rawHTML)
              ]);
            }
            return;
          }

          // Special case for the support command (direct hardcoded fallback)
          if (commandName === 'support' && commands['contact']) {
            commandExecutionLogger.info('Using hardcoded support->contact fallback');
            const result = commands['contact'].execute(cmdArgs);
            
            // Update lastCommand to show this is an alias of 'contact'
            setLastCommand(`support (contact)`);

            // Process the result
            if (result.isAsync && result.asyncResolver) {
              handleAsyncCommand(actualCommand, 'contact', result, commandStr);
            } else {
              setCommandOutput(prevOutput => [
                ...prevOutput,
                renderCommandOutput(actualCommand, result.content, result.rawHTML)
              ]);
            }
            return;
          }

          // Special handling for URL commands that don't exist
          if (isUrlCommand) {
            commandExecutionLogger.info(
              'URL command not found, showing error and redirecting to help'
            );

            // Display error message
            setCommandOutput(prevOutput => [
              ...prevOutput,
              renderCommandOutput(
                'error',
                `Command '${commandName}' not found. Try 'help' to see available commands.`,
                false
              )
            ]);

            // Execute help command after a short delay
            setTimeout(() => {
              executeCommand('help');
            }, 500);
            return;
          }

          // For regular commands, just show the error
          setCommandOutput(
            prev =>
              [...prev, renderCommandOutput(
                'error',
                `Command '${commandName}' not found. Try 'help' to see available commands.`,
                false
              )]
          );
          return;
        }

        // Execute the command
        const result = command.execute(cmdArgs);

        // Determine if we should skip adding to history
        const skipHistory = isInitCommand || isUrlCommand || (result && result.noHistory === true);

        // Add to command history only if not skipped
        if (!skipHistory) {
          setCommandHistory(prevHistory => [...prevHistory, actualCommand]);
        }

        // Always update last command
        setLastCommand(actualCommand);

        // For URL commands, explicitly trigger any side effects
        if (isUrlCommand) {
          commandExecutionLogger.debug('Processing URL command side effects', {
            command: commandName
          });
          const event = new CustomEvent('commandExecuted', { detail: { command: commandName } });
          document.dispatchEvent(event);
        }

        // Handle different types of command results
        if (result?.isAsync && result.asyncResolver) {
          handleAsyncCommand(actualCommand, commandName, result, commandStr);
        } else if (commandName === 'clear') {
          handleClearCommand(result, commandStr);
        } else {
          handleStandardCommand(actualCommand, commandName, result, commandStr);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const commandParts = commandStr.replace(/^(__init_|__event_|__url_)/, '').split(' ');
        const commandName = commandParts[0].toLowerCase();

        commandExecutionLogger.error('Error executing command', {
          command: commandName,
          error: errorMessage
        });

        setCommandOutput(prevOutput =>
          [...prevOutput, renderCommandOutput(commandName, `Error executing command: ${errorMessage}`, false)]
        );
      }
    },
    [
      commands,
      determineCommandType,
      cleanCommandString,
      handleAsyncCommand,
      handleClearCommand,
      handleStandardCommand
    ]
  );

  return {
    commandHistory,
    setCommandHistory,
    commandOutput,
    setCommandOutput,
    isAwaitingAsync,
    asyncCommandName,
    setAsyncCommandName,
    lastCommand,
    executeCommand
  };
};
