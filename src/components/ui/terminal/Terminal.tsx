
import React, { useState, useEffect, useRef } from 'react';
import TerminalHeader from '../terminal-header';
import { TerminalContent } from '../terminal-content';
import { processCommand } from '@/utils/commands';
import { CommandResult } from '@/utils/commands/types';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { fetchSocialLinks } from '@/utils/database/socialLinksService';
import type { SocialLink } from '@/types/socialLinks';

interface TerminalProps {
  className?: string;
  initialCommands?: string[];
}

export interface HistoryItem {
  command: string;
  result: CommandResult;
  timestamp: Date;
}

const HISTORY_STORAGE_KEY = 'terminal_command_history';

const Terminal: React.FC<TerminalProps> = ({ className, initialCommands = [] }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initialCommandsProcessed, setInitialCommandsProcessed] = useState(false);
  const [isProcessingAsync, setIsProcessingAsync] = useState(false);
  const [lastExecutedCommand, setLastExecutedCommand] = useState('welcome');
  const [commandsToProcess, setCommandsToProcess] = useState<string[]>([]);
  const [showAsciiArt, setShowAsciiArt] = useState(true);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    if (initialCommands && initialCommands.length > 0) {
      console.log('Setting initial commands:', initialCommands);
      setCommandsToProcess(initialCommands);
    }
  }, [initialCommands]);

  useEffect(() => {
    if (isInitializing) {
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          if (Array.isArray(parsedHistory)) {
            const formattedHistory = parsedHistory.map(
              (item: Omit<HistoryItem, 'timestamp'> & { timestamp: string }) => ({
                ...item,
                timestamp: new Date(item.timestamp),
              })
            );
            setHistory(formattedHistory);
            if (formattedHistory.length > 0) {
              setLastExecutedCommand(formattedHistory[formattedHistory.length - 1].command);
            }
          }
        } catch (e) {
          console.error('Error parsing command history:', e);
        }
      }
    }
  }, [isInitializing]);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data.session) {
        setUserEmail(data.session.user.email);
        console.log('User is logged in:', data.session.user.email);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserEmail(session?.user?.email);
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user.email);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Load social links
  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        console.log('Fetching social links...');
        const links = await fetchSocialLinks();
        console.log('Social links loaded:', links);
        setSocialLinks(links);
      } catch (error) {
        console.error('Failed to load social links:', error);
      }
    };

    loadSocialLinks();
  }, []);

  useEffect(() => {
    if (commandsToProcess.length > 0 && isInitializing && !initialCommandsProcessed) {
      setInitialCommandsProcessed(true);

      console.log('Processing initial commands:', commandsToProcess);

      let i = 0;
      const processNextCommand = () => {
        if (i < commandsToProcess.length) {
          const command = commandsToProcess[i++];
          console.log('Processing command:', command);
          processCommandWithHistory(command);
          setTimeout(processNextCommand, 300);
        } else {
          setIsInitializing(false);
        }
      };
      processNextCommand();
    } else if (isInitializing && commandsToProcess.length === 0) {
      setIsInitializing(false);
    }
  }, [commandsToProcess, isInitializing, initialCommandsProcessed]);

  useEffect(() => {
    if (history.length > 0 && !isInitializing) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    }
  }, [history, isInitializing]);

  const processCommandWithHistory = async (commandString: string) => {
    setIsProcessingAsync(true);
    setLastExecutedCommand(commandString);
    const result = processCommand(commandString);

    if (result.content === 'CLEAR_TERMINAL') {
      setHistory([]);
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      setIsProcessingAsync(false);
      return;
    }

    const historyItem = {
      command: commandString,
      result,
      timestamp: new Date(),
    };

    setHistory(prev => [...prev, historyItem]);

    if (result.isAsync && result.asyncResolver) {
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
    } else {
      setIsProcessingAsync(false);
    }
  };

  const commandHistory = history.map(item => item.command);

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
