
import {
  loginCommand,
  logoutCommand,
  profileCommand,
  signupCommand,
  whoamiCommand
} from '@/utils/commands/authCommands';
import { clearCommand, echoCommand, helpCommand } from '@/utils/commands/helpCommand';
import { themeCommand } from '@/utils/commands/themeCommand';
import { cursorCommand } from '@/utils/commands/cursorCommand';
import { wallpaperCommand } from '@/utils/commands/wallpaperCommand';
import { Command, CommandResult } from '@/utils/commands/types';
import { SocialLink } from '@/types/socialLinks';
import { TerminalHeader } from '@/components/ui/terminal-header';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTerminalAuth } from '@/hooks/use-terminal-auth';
import { toast } from 'sonner';

// Create the terminal footer component
const TerminalFooter = ({ 
  commandInput, 
  setCommandInput, 
  handleCommandSubmit 
}: { 
  commandInput: string; 
  setCommandInput: (value: string) => void; 
  handleCommandSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form onSubmit={handleCommandSubmit} className="px-4 py-2 border-t border-terminal-border">
      <div className="flex items-center">
        <span className="text-terminal-prompt mr-2">guest@programmer:~$</span>
        <input
          id="terminal-input"
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          className="flex-grow bg-transparent border-none outline-none text-terminal-command"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </form>
  );
};

export interface TerminalProps {
  socialLinks?: SocialLink[];
  initialCommands?: string[];
}

const Terminal: React.FC<TerminalProps> = ({ socialLinks = [], initialCommands = [] }) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandInput, setCommandInput] = useState<string>('');
  const [commandOutput, setCommandOutput] = useState<string>('');
  const [isAwaitingAsync, setIsAwaitingAsync] = useState<boolean>(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useTerminalAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Command list
  const commands: Record<string, Command> = {
    help: helpCommand,
    echo: echoCommand,
    login: loginCommand,
    signup: signupCommand,
    logout: logoutCommand,
    whoami: whoamiCommand,
    profile: profileCommand,
    theme: themeCommand,
    clear: clearCommand,
    cursor: cursorCommand,
    wallpaper: wallpaperCommand,
    setwallpaper: wallpaperCommand,
    welcome: {
      name: 'welcome',
      description: 'Display welcome message',
      execute: (): CommandResult => {
        return {
          content: `Welcome to the <span class="text-terminal-prompt">&lt;programmer&gt;</span><span class="text-terminal-prompt">.</span><span class="text-terminal-prompt animate-cursor-blink">_</span> portfolio.

This is an interactive terminal portfolio app designed and developed by <span class="text-terminal-prompt">James A. Black Jr.</span>

Type <span class="command-link" data-command="help">help</span> to see available commands, or try one of these:

  - <span class="command-link" data-command="about">about</span>: To learn about me
  - <span class="command-link" data-command="contact">contact</span>: For my contact information
  - <span class="command-link" data-command="education">education</span>: To see my educational background
  - <span class="command-link" data-command="experience">experience</span>: To see my work experience
  - <span class="command-link" data-command="projects">projects</span>: To view my portfolio
  - <span class="command-link" data-command="resume">resume</span>: To view my resume
  - <span class="command-link" data-command="skills">skills</span>: To see my technical skills
  - <span class="command-link" data-command="theme">theme</span>: To change the terminal theme

Feel free to explore and get in touch!`,
          isError: false
        };
      }
    }
  };

  // Scroll to bottom on output change
  useEffect(() => {
    scrollToBottom();
  }, [commandOutput]);

  // Scroll to bottom function
  const scrollToBottom = () => {
    terminalContentRef.current?.scrollTo({
      top: terminalContentRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  // Focus on mount and execute welcome command
  useEffect(() => {
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
      terminalInput.focus();
    }

    // Auto-run welcome command on initial load if no other commands are specified
    if (initialCommands.length === 0) {
      executeCommand('welcome');
    } else {
      // Execute initial commands
      initialCommands.forEach(command => {
        executeCommand(command);
      });
    }
  }, []);

  // Handle command link clicks
  useEffect(() => {
    const handleCommandLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.classList.contains('command-link')) {
        e.preventDefault();
        const command = target.getAttribute('data-command');
        
        if (command) {
          // Set the command in the input field
          setCommandInput(command);
          // Execute it
          executeCommand(command);
        }
      }
    };

    // Add event listener to the terminal content div
    terminalContentRef.current?.addEventListener('click', handleCommandLinkClick);

    // Clean up
    return () => {
      terminalContentRef.current?.removeEventListener('click', handleCommandLinkClick);
    };
  }, []);

  // Execute a command programmatically
  const executeCommand = (commandStr: string) => {
    // Add command to history
    setCommandHistory(prevHistory => [...prevHistory, commandStr]);
    
    // Set last command
    setLastCommand(commandStr);

    // Process command
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
              prevOutput ? `${prevOutput}\n${renderCommandOutput(commandStr, output.content)}` 
                         : renderCommandOutput(commandStr, output.content)
            );
            
            // Dispatch event
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
            setCommandOutput(renderCommandOutput(commandStr, result.runAfterClear.content));
          }
        } else {
          setCommandOutput(prevOutput => 
            prevOutput ? `${prevOutput}\n${renderCommandOutput(commandStr, result.content)}` 
                      : renderCommandOutput(commandStr, result.content)
          );
        }
        
        // Dispatch event
        const event = new CustomEvent('commandExecuted', { detail: { command: commandName } });
        document.dispatchEvent(event);
      }
    } else {
      setCommandOutput(prevOutput => 
        prevOutput ? `${prevOutput}\n${renderCommandOutput(commandStr, `Command not found: ${commandName}`)}` 
                   : renderCommandOutput(commandStr, `Command not found: ${commandName}`)
      );
    }
  };

  // Helper function to render command output
  const renderCommandOutput = (command: string, output: string) => {
    const commandHeader = `<div class="mb-1"><span class="text-terminal-prompt">guest@programmer:~$&nbsp;</span><span class="text-terminal-command">${command}</span></div>`;
    return `${commandHeader}<div class="whitespace-pre-line">${output}</div>`;
  };

  // Handle command submission from form
  const handleCommandSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Trim the command input
    const trimmedCommand = commandInput.trim();

    // If the command is empty, do nothing
    if (!trimmedCommand) {
      return;
    }

    // Clear command input
    setCommandInput('');

    // Process command
    executeCommand(trimmedCommand);
  };

  useEffect(() => {
    const handleExecuteCommand = (event: Event) => {
      const { command } = (event as CustomEvent).detail;
      if (command) {
        setCommandInput(command);
        executeCommand(command);
      }
    };

    document.addEventListener('executeCommand', handleExecuteCommand);

    return () => {
      document.removeEventListener('executeCommand', handleExecuteCommand);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-terminal-background rounded-lg overflow-hidden terminal-glass">
      <TerminalHeader lastCommand={lastCommand} socialLinks={socialLinks} />

      <div
        ref={terminalContentRef}
        className="flex-grow overflow-y-scroll terminal-content-height terminal-scrollbar px-4 py-2 font-mono text-sm bg-terminal-background"
        dangerouslySetInnerHTML={{ __html: commandOutput }}
      />

      <TerminalFooter
        commandInput={commandInput}
        setCommandInput={setCommandInput}
        handleCommandSubmit={handleCommandSubmit}
      />
    </div>
  );
};

export default Terminal;
