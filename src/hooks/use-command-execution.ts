
import { useState, useCallback } from 'react';
import { Command, CommandResult } from '@/utils/commands/types';
import { renderCommandOutput } from '@/components/ui/terminal/terminal-utils';

export const useCommandExecution = (commands: Record<string, Command>) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandOutput, setCommandOutput] = useState<string>('');
  const [isAwaitingAsync, setIsAwaitingAsync] = useState<boolean>(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  const executeCommand = useCallback((commandStr: string) => {
    setCommandHistory(prevHistory => [...prevHistory, commandStr]);
    setLastCommand(commandStr);

    const [commandName, ...args] = commandStr.split(' ');
    const cmdArgs = args.join(' ');

    if (commandName in commands) {
      const command = commands[commandName];
      const result = command.execute(cmdArgs);
      
      if (result?.isAsync) {
        setIsAwaitingAsync(true);
        result.asyncResolver!()
          .then(output => {
            setIsAwaitingAsync(false);
            setCommandOutput(prevOutput => 
              prevOutput ? `${prevOutput}\n${renderCommandOutput(commandStr, output.content, output.rawHTML)}` 
                        : renderCommandOutput(commandStr, output.content, output.rawHTML)
            );
            
            const event = new CustomEvent('commandExecuted', { detail: { command: commandName } });
            document.dispatchEvent(event);
          })
          .catch(error => {
            setIsAwaitingAsync(false);
            setCommandOutput(prevOutput => 
              prevOutput ? `${prevOutput}\n${renderCommandOutput(commandStr, `Error executing command: ${error.message}`)}` 
                        : renderCommandOutput(commandStr, `Error executing command: ${error.message}`)
            );
          });
      } else {
        if (commandName === 'clear') {
          setCommandOutput('');
          if (result.runAfterClear) {
            setTimeout(() => {
              setCommandOutput(renderCommandOutput('welcome', result.runAfterClear.content, result.runAfterClear.rawHTML));
              
              const welcomeEvent = new CustomEvent('commandExecuted', { detail: { command: 'welcome' } });
              document.dispatchEvent(welcomeEvent);
            }, 100);
          }
        } else {
          setCommandOutput(prevOutput => 
            prevOutput ? `${prevOutput}\n${renderCommandOutput(commandStr, result.content, result.rawHTML)}` 
                      : renderCommandOutput(commandStr, result.content, result.rawHTML)
          );
          
          const event = new CustomEvent('commandExecuted', { detail: { command: commandName } });
          document.dispatchEvent(event);
        }
      }
    } else {
      setCommandOutput(prevOutput => 
        prevOutput ? `${prevOutput}\n${renderCommandOutput(commandStr, `Command not found: ${commandName}`)}` 
                  : renderCommandOutput(commandStr, `Command not found: ${commandName}`)
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
