import { useState, useCallback } from 'react';
import { Command, CommandResult } from '@/utils/commands/types';
import { renderCommandOutput } from '@/components/ui/terminal/terminal-utils';

export const useCommandExecution = (commands: Record<string, Command>) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandOutput, setCommandOutput] = useState<string>('');
  const [isAwaitingAsync, setIsAwaitingAsync] = useState<boolean>(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  const executeCommand = useCallback((commandStr: string) => {
    console.log('Execute command called with:', commandStr);
    
    if (!commandStr) {
      console.warn('Attempted to execute empty command');
      return;
    }

    // Process special command prefixes
    const isInitCommand = commandStr.startsWith('__init_');
    const isEventCommand = commandStr.startsWith('__event_');
    let isUrlCommand = commandStr.startsWith('__url_');
    
    // Clean the command for display purposes (remove any special prefixes)
    const actualCommand = commandStr.replace(/^(__init_|__event_|__url_)/, '');
    
    // If we're executing a command from a URL, mark it as a URL command
    // if it's not already marked
    if (!isInitCommand && !isEventCommand && !isUrlCommand && window.location.pathname.length > 1) {
      const pathCommand = window.location.pathname.substring(1).split('/')[0].toLowerCase();
      if (pathCommand && pathCommand === commandStr.toLowerCase()) {
        console.log('Detected URL navigation command:', commandStr);
        // This is likely a command from URL navigation
        isUrlCommand = true;
      }
    }

    // Extract command name to check if it should be added to history
    let cleanCommand = actualCommand;
    if (cleanCommand.startsWith('__event_') || cleanCommand.startsWith('__init_') || cleanCommand.startsWith('__url_')) {
      cleanCommand = cleanCommand.replace(/^(__event_|__init_|__url_)/, '');
    }
    const commandParts = cleanCommand.split(' ');
    const commandName = commandParts[0].toLowerCase(); // Force lowercase for consistent matching
    
    console.log('Attempting to execute command:', commandName, 'from original:', commandStr);
    console.log('Available commands:', Object.keys(commands));
    
    // Only add commands to history if:
    // 1. Not an initialization command
    // 2. Not a URL command (these come from URL navigation)
    // 3. Not marked with noHistory flag
    const command = commands[commandName];
    
    // Special handling for unknown commands
    if (!command) {
      console.warn(`Command not found: '${commandName}', available commands: ${Object.keys(commands).join(', ')}`);
      
      // For URL commands that aren't recognized, try showing help
      if (isUrlCommand) {
        console.log('URL command not found, will show error and redirect to help');
        // Display error message for unknown command
        setCommandOutput(prev => `${prev}

<span class="text-red-500">Command '${commandName}' not found. Try 'help' to see available commands.</span>
`);
        
        // Then execute help after a short delay
        setTimeout(() => {
          executeCommand('help');
        }, 500);
        return;
      }
      
      // For regular commands, just show the error
      setCommandOutput(prev => `${prev}

<span class="text-red-500">Command '${commandName}' not found. Try 'help' to see available commands.</span>
`);
      return;
    }
    
    const result = command.execute(commandParts.slice(1).join(' '));
    
    // Determine if we should skip adding to history:
    // - Initial commands (with __init_ prefix) should be skipped
    // - URL commands (with __url_ prefix) should be skipped
    // - Commands that return noHistory flag should be skipped
    const skipHistory = isInitCommand || isUrlCommand || (result && result.noHistory === true);
    
    // Add to command history only if not skipped
    if (!skipHistory) {
      setCommandHistory(prevHistory => [...prevHistory, actualCommand]);
    }
    
    // Always update last command
    setLastCommand(actualCommand);
    
    // For URL commands, explicitly trigger any side effects (like wallpaper changes)
    if (isUrlCommand) {
      console.log('Processing URL command side effects for:', commandName);
      // Dispatch the command executed event to ensure proper side effects
      const event = new CustomEvent('commandExecuted', { detail: { command: commandName } });
      document.dispatchEvent(event);
    }

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
            // URL commands (__url_) should still dispatch events for side effects
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
          // URL commands (__url_) should still dispatch events for side effects
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
