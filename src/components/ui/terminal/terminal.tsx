import { useCommandProcessor } from '@/hooks/use-command-processor';
import { useSocialLinks } from '@/hooks/use-social-links';
import { useTerminalAuth } from '@/hooks/use-terminal-auth';
import { useTerminalHistory } from '@/hooks/use-terminal-history';
import { cn } from '@/lib/utils';
import { CommandResult } from '@/utils/commands/types';
import React, { useEffect, useRef, useState } from 'react';
import { TerminalContent } from '../terminal-content';
import TerminalHeader from '../terminal-header';

export interface HistoryItem {
  command: string;
  result: {
    content: string;
    isError: boolean;
    isAsync?: boolean;
    asyncResolver?: () => Promise<CommandResult>;
    rawHTML?: boolean;
    runAfterClear?: CommandResult;
  };
  timestamp: Date;
}

export interface TerminalProps {
  className?: string;
  initialCommands?: string[];
}

export const Terminal: React.FC<TerminalProps> = ({ className, initialCommands = [] }) => {
  const [showAsciiArt, setShowAsciiArt] = useState(true);
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Use custom hooks
  const { userEmail } = useTerminalAuth();
  const { socialLinks } = useSocialLinks();

  const { history, setHistory, lastExecutedCommand, setLastExecutedCommand, commandHistory } =
    useTerminalHistory(true);

  const { isInitializing, isProcessingAsync, processCommandWithHistory } = useCommandProcessor(
    initialCommands,
    setHistory,
    setLastExecutedCommand,
    commandHistory
  );

  const handleTerminalClick = () => {
    if (!isInitializing && commandInputRef.current) {
      commandInputRef.current.focus();
    }
  };

  const handleCommandSubmit = (command: string) => {
    if (command.trim()) {
      processCommandWithHistory(command);
      commandInputRef.current?.focus();

      // Dispatch event to update page title
      const commandExecutedEvent = new CustomEvent('commandExecuted', {
        detail: { command }
      });
      document.dispatchEvent(commandExecutedEvent);
    }
  };

  // Listen for welcome command event from ASCII art component
  useEffect(() => {
    const handleWelcomeCommand = () => {
      if (!isInitializing && commandHistory.length === 0) {
        processCommandWithHistory('welcome');
      }
    };

    document.addEventListener('runWelcomeCommand', handleWelcomeCommand);

    return () => {
      document.removeEventListener('runWelcomeCommand', handleWelcomeCommand);
    };
  }, [isInitializing, commandHistory, processCommandWithHistory]);

  return (
    <div
      className={cn('terminal-glass rounded-md overflow-hidden flex flex-col h-full', className)}
      onClick={handleTerminalClick}
    >
      <TerminalHeader lastCommand={lastExecutedCommand} socialLinks={socialLinks} />

      <TerminalContent
        history={history}
        isInitializing={isInitializing}
        isProcessingAsync={isProcessingAsync}
        showAsciiArt={showAsciiArt}
        commandHistory={commandHistory}
        onCommandSubmit={handleCommandSubmit}
        inputRef={commandInputRef}
      />
    </div>
  );
};

export default Terminal;
