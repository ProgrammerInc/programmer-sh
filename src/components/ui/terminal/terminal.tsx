
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
import { 
  wallpaperCommand,
  setWallpaper as setWallpaperCommand
} from '@/utils/commands/wallpaperCommand';
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

  // Command list - fix the issue by making a proper command object instead of a function
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
    setwallpaper: wallpaperCommand // Changed from setWallpaperCommand to just use wallpaperCommand
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

  // Focus on mount
  useEffect(() => {
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
      terminalInput.focus();
    }

    // Execute initial commands
    if (initialCommands.length > 0) {
      initialCommands.forEach(command => {
        setCommandInput(command);
        handleCommandSubmit(new Event('initial') as unknown as React.FormEvent<HTMLFormElement>);
      });
    }
  }, []);

  // Handle command submission
  const handleCommandSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Trim the command input
    const trimmedCommand = commandInput.trim();

    // If the command is empty, do nothing
    if (!trimmedCommand) {
      return;
    }

    // Add command to history
    setCommandHistory(prevHistory => [...prevHistory, trimmedCommand]);

    // Clear command input
    setCommandInput('');

    // Set last command
    setLastCommand(trimmedCommand);

    // Split command into command name and arguments
    const [commandName, ...commandArgs] = trimmedCommand.split(' ');
    const args = commandArgs.join(' ');

    // Process command
    let result: CommandResult | null = null;
    
    if (commandName in commands) {
      result = commands[commandName].execute(args);
    } else {
      // If the command is not found, set the output to command not found
      result = {
        content: `Command not found: ${commandName}`,
        isError: true
      };
    }

    // If the command is async, set the loading state
    if (result?.isAsync) {
      setIsAwaitingAsync(true);

      // Resolve the promise and set the output
      result
        .asyncResolver!()
        .then(output => {
          setIsAwaitingAsync(false);
          setCommandOutput(prevOutput => `${prevOutput}\n${output.content}`);

          // Dispatch a custom event to notify of command execution
          const event = new CustomEvent('commandExecuted', { detail: { command: commandName } });
          document.dispatchEvent(event);
        })
        .catch(error => {
          setIsAwaitingAsync(false);
          setCommandOutput(
            prevOutput => `${prevOutput}\nError executing command: ${error.message}`
          );
        });
    } else if (result) {
      // If the command is not async, set the output immediately
      setCommandOutput(prevOutput => `${prevOutput}\n${result!.content}`);

      // Dispatch a custom event to notify of command execution
      const event = new CustomEvent('commandExecuted', { detail: { command: commandName } });
      document.dispatchEvent(event);
    }
  };

  useEffect(() => {
    const handleExecuteCommand = (event: Event) => {
      const { command } = (event as CustomEvent).detail;
      if (command) {
        setCommandInput(command);
        handleCommandSubmit(new Event('custom') as unknown as React.FormEvent<HTMLFormElement>);
      }
    };

    document.addEventListener('executeCommand', handleExecuteCommand);

    return () => {
      document.removeEventListener('executeCommand', handleExecuteCommand);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <TerminalHeader lastCommand={lastCommand} socialLinks={socialLinks} />

      <div
        ref={terminalContentRef}
        className="flex-grow overflow-y-scroll terminal-content-height terminal-scrollbar px-4 py-2 font-mono text-sm"
      >
        {commandHistory.map((command, index) => (
          <div key={index} className="mb-1">
            <span className="text-terminal-prompt">guest@programmer:~$&nbsp;</span>
            <span className="text-terminal-command">{command}</span>
          </div>
        ))}
        {commandOutput && (
          <div className="whitespace-pre-line">
            <span className="text-terminal-prompt">
              guest@programmer:~$&nbsp;
            </span>
            <span className="text-terminal-foreground">{commandOutput}</span>
          </div>
        )}
        {isAwaitingAsync && (
          <div className="mb-1">
            <span className="text-terminal-prompt">guest@programmer:~$&nbsp;</span>
            <span className="text-terminal-command">{commandInput}</span>
            <span className="text-terminal-foreground">&nbsp;Loading...</span>
          </div>
        )}
      </div>

      <TerminalFooter
        commandInput={commandInput}
        setCommandInput={setCommandInput}
        handleCommandSubmit={handleCommandSubmit}
      />
    </div>
  );
};

export default Terminal;
