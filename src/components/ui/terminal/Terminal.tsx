
import React, { useRef, useState } from 'react';
import TerminalHeader from '../terminal-header';
import { TerminalContent } from '../terminal-content';
import { cn } from '@/lib/utils';
import { useTerminalHistory } from '@/hooks/use-terminal-history';
import { useTerminalAuth } from '@/hooks/use-terminal-auth';
import { useSocialLinks } from '@/hooks/use-social-links';
import { useCommandProcessor } from '@/hooks/use-command-processor';

export interface HistoryItem {
  command: string;
  result: {
    content: string;
    isError: boolean;
    isAsync?: boolean;
    asyncResolver?: () => Promise<any>;
    rawHTML?: boolean;
    runAfterClear?: any;
  };
  timestamp: Date;
}

interface TerminalProps {
  className?: string;
  initialCommands?: string[];
}

const Terminal: React.FC<TerminalProps> = ({ className, initialCommands = [] }) => {
  const [showAsciiArt, setShowAsciiArt] = useState(true);
  const commandInputRef = useRef<HTMLInputElement>(null);
  
  // Use custom hooks
  const { userEmail } = useTerminalAuth();
  const { socialLinks } = useSocialLinks();
  
  const {
    history, 
    setHistory, 
    lastExecutedCommand, 
    setLastExecutedCommand,
    commandHistory
  } = useTerminalHistory(true);
  
  const { 
    isInitializing, 
    isProcessingAsync, 
    processCommandWithHistory 
  } = useCommandProcessor(
    initialCommands, 
    setHistory, 
    setLastExecutedCommand,
    commandHistory // Pass commandHistory to processor
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
    }
  };

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
