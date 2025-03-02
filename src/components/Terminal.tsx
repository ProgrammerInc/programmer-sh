
import React, { useState, useEffect, useRef } from 'react';
import TerminalHeader from './TerminalHeader';
import TerminalContent from './TerminalContent';
import { processCommand } from '../utils/commands';
import { CommandResult } from '../utils/commands/types';
import { cn } from '@/lib/utils';

interface TerminalProps {
  className?: string;
  initialCommands?: string[];
}

interface HistoryItem {
  command: string;
  result: CommandResult;
  timestamp: Date;
}

const HISTORY_STORAGE_KEY = 'terminal_command_history';

const Terminal: React.FC<TerminalProps> = ({ className, initialCommands = ['welcome'] }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initialCommandsProcessed, setInitialCommandsProcessed] = useState(false);
  const [isProcessingAsync, setIsProcessingAsync] = useState(false);
  const [lastCommand, setLastCommand] = useState('welcome');
  const [showAsciiArt, setShowAsciiArt] = useState(true);
  const commandInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        const formattedHistory = parsedHistory.map((item: Omit<HistoryItem, 'timestamp'> & { timestamp: string }) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(formattedHistory);
        if (formattedHistory.length > 0) {
          setLastCommand(formattedHistory[formattedHistory.length - 1].command);
        }
      } catch (error) {
        console.error('Error parsing saved history:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (history.length > 0 && !isInitializing) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    }
  }, [history, isInitializing]);

  useEffect(() => {
    // Check for URL command in session storage
    const urlCommand = sessionStorage.getItem('urlCommand');
    
    if (urlCommand) {
      // Clear the session storage
      sessionStorage.removeItem('urlCommand');
      
      // Add the URL command to our initial commands
      initialCommands = [...initialCommands, urlCommand];
    }
    
    if (isInitializing && !initialCommandsProcessed) {
      setInitialCommandsProcessed(true);
      let i = 0;
      const processNextCommand = () => {
        if (i < initialCommands.length) {
          const command = initialCommands[i++];
          processCommandWithHistory(command);
          setTimeout(processNextCommand, 200);
        } else {
          setIsInitializing(false);
        }
      };
      processNextCommand();
    }
  }, [initialCommands, isInitializing, initialCommandsProcessed]);

  const processCommandWithHistory = async (commandString: string) => {
    setLastCommand(commandString);
    const result = processCommand(commandString);

    if (result.content === 'CLEAR_TERMINAL') {
      setHistory([]);
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      return;
    }

    const historyItem = {
      command: commandString,
      result,
      timestamp: new Date(),
    };

    setHistory(prev => [...prev, historyItem]);

    if (result.isAsync && result.asyncResolver) {
      setIsProcessingAsync(true);
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
                    isError: true,
                  },
                }
              : item
          )
        );
      } finally {
        setIsProcessingAsync(false);
      }
    }
  };

  const commandHistory = history.map(item => item.command);

  const handleTerminalClick = () => {
    if (!isInitializing && commandInputRef.current) {
      commandInputRef.current.focus();
    }
  };

  return (
    <div
      className={cn('terminal-glass rounded-md overflow-hidden flex flex-col h-full', className)}
      onClick={handleTerminalClick}
    >
      <TerminalHeader lastCommand={lastCommand} />
      
      <TerminalContent
        history={history}
        isInitializing={isInitializing}
        isProcessingAsync={isProcessingAsync}
        showAsciiArt={showAsciiArt}
        commandHistory={commandHistory}
        onCommandSubmit={processCommandWithHistory}
        inputRef={commandInputRef}
      />
    </div>
  );
};

export default Terminal;
