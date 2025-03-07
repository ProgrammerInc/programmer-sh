
import { useState, useCallback } from 'react';
import { Command, CommandResult } from '@/utils/commands/types';
import { renderCommandOutput } from '@/components/ui/terminal/terminal-utils';

export const useCommandExecution = (commands: Record<string, Command>) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandOutput, setCommandOutput] = useState<string>('');
  const [isAwaitingAsync, setIsAwaitingAsync] = useState<boolean>(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  const executeCommand = useCallback((commandStr: string) => {
    // Process special command prefixes
    const isInitCommand = commandStr.startsWith('__init_');
    const isEventCommand = commandStr.startsWith('__event_');
    
    // Clean the command for display purposes (remove any special prefixes)
    const actualCommand = commandStr.replace(/^(__init_|__event_)/, '');
    
    // Extract command name to check if it should be added to history
    let cleanCommand = actualCommand;
    if (cleanCommand.startsWith('__event_') || cleanCommand.startsWith('__init_')) {
      cleanCommand = cleanCommand.replace(/^(__event_|__init_)/, '');
    }
    const commandParts = cleanCommand.split(' ');
    const commandName = commandParts[0];
    
    // Only add commands to history if:
    // 1. Not an initialization command
    // 2. Not marked with noHistory flag
    const command = commands[commandName];
    const result = command ? command.execute(commandParts.slice(1).join(' ')) : null;
    const skipHistory = isInitCommand || (result && result.noHistory === true);
    
    if (!skipHistory) {
      setCommandHistory(prevHistory => [...prevHistory, actualCommand]);
    }
    setLastCommand(actualCommand);

    // We've already extracted the command name above, so use the same values
    const cmdArgs = commandParts.slice(1).join(' ');

    if (commandName in commands) {
      // We've already executed the command once to check for noHistory
      // Use the cached result if available
      const command = commands[commandName];
      const cmdResult = result || command.execute(cmdArgs);
      
      if (cmdResult?.isAsync) {
        setIsAwaitingAsync(true);
        cmdResult.asyncResolver!()
          .then(output => {
            setIsAwaitingAsync(false);
            setCommandOutput(prevOutput => 
              prevOutput ? `${prevOutput}\n${renderCommandOutput(actualCommand, output.content, output.rawHTML)}` 
                        : renderCommandOutput(actualCommand, output.content, output.rawHTML)
            );
            
            // Only dispatch event if it's not a special command (to prevent loops)
            if (!commandStr.startsWith('__event_') && !commandStr.startsWith('__init_')) {
              const event = new CustomEvent('commandExecuted', { detail: { command: commandName } });
              document.dispatchEvent(event);
            }
          })
          .catch(error => {
            setIsAwaitingAsync(false);
            setCommandOutput(prevOutput => 
              prevOutput ? `${prevOutput}\n${renderCommandOutput(actualCommand, `Error executing command: ${error.message}`)}` 
                        : renderCommandOutput(actualCommand, `Error executing command: ${error.message}`)
            );
          });
      } else {
        if (commandName === 'clear') {
          // For clear command, just clear output
          setCommandOutput('');
          if (cmdResult.runAfterClear) {
            setTimeout(() => {
              // Always show welcome without any prefixes
              setCommandOutput(renderCommandOutput('welcome', cmdResult.runAfterClear.content, cmdResult.runAfterClear.rawHTML));
              
              // Only dispatch welcome event if not a special command
              if (!commandStr.startsWith('__event_') && !commandStr.startsWith('__init_')) {
                const welcomeEvent = new CustomEvent('commandExecuted', { detail: { command: 'welcome' } });
                document.dispatchEvent(welcomeEvent);
              }
            }, 100);
          }
        } else {
          setCommandOutput(prevOutput => 
            prevOutput ? `${prevOutput}\n${renderCommandOutput(actualCommand, cmdResult.content, cmdResult.rawHTML)}` 
                      : renderCommandOutput(actualCommand, cmdResult.content, cmdResult.rawHTML)
          );
          
          // Only dispatch event if it's not a special command (to prevent loops)
          if (!commandStr.startsWith('__event_') && !commandStr.startsWith('__init_')) {
            const event = new CustomEvent('commandExecuted', { detail: { command: commandName } });
            document.dispatchEvent(event);
          }
        }
      }
    } else {
      setCommandOutput(prevOutput => 
        prevOutput ? `${prevOutput}\n${renderCommandOutput(actualCommand, `Command not found: ${commandName}`)}` 
                  : renderCommandOutput(actualCommand, `Command not found: ${commandName}`)
      );
    }
  }, [commands]);

  return {
    commandHistory,
    setCommandHistory,
    commandOutput,
    setCommandOutput,
    isAwaitingAsync,
    lastCommand,
    executeCommand
  };
};
