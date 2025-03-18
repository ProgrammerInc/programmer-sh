'use client';

import React, { 
  useState, 
  useRef, 
  useEffect, 
  FormEvent, 
  useCallback,
  memo,
  forwardRef,
  useImperativeHandle
} from 'react';
import { useTheme } from 'next-themes';

import { TerminalProps } from './terminal.types';
import { TerminalHeader, TerminalHeaderRef } from '../terminal-header';
import { TerminalFooter, TerminalFooterRef } from '../terminal-footer';
import { TerminalContent } from '../terminal-content';
import { CommandLinkEventDetail } from '../terminal-content/terminal-content.types';
import { HistoryItem } from '../terminal-history';
import { useCommandProcessor } from '@/hooks/use-command-processor.hook';
import { useTerminalAuth } from '@/hooks/use-terminal-auth.hook';
import { loadCommandHistory, saveCommandHistory, scrollToBottom } from './terminal.utils';

import styles from './terminal.module.css';

/**
 * Terminal Component
 * 
 * A customizable command-line interface for web applications that allows users
 * to execute commands and view outputs in a terminal-like environment.
 * 
 * Features:
 * - Command history with local storage persistence
 * - Custom command registration
 * - Theme-aware styling (light/dark mode)
 * - Animated command output
 * - Keyboard navigation through command history
 * - Social links integration
 * - Accessibility support
 * - Custom styling through CSS modules
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Terminal />
 * 
 * // With initial commands
 * <Terminal initialCommands={['help', 'about']} />
 * 
 * // With custom prompt
 * <Terminal prompt="user@website:~$" />
 * 
 * // With social links
 * <Terminal 
 *   socialLinks={[
 *     { name: 'GitHub', url: 'https://github.com/username', icon: 'github' },
 *     { name: 'Twitter', url: 'https://twitter.com/username', icon: 'twitter' },
 *   ]}
 * />
 * ```
 */
const Terminal = memo(forwardRef<HTMLDivElement, TerminalProps>(({ 
  initialCommands = [],
  className = '',
  prompt = "guest@programmer.sh:~$",
  socialLinks = [],
  children,
}, ref) => {
  const { resolvedTheme } = useTheme();
  const [commandInput, setCommandInput] = useState('');
  const [commandOutput, setCommandOutput] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [lastExecutedCommand, setLastExecutedCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lastCommand, setLastCommand] = useState('');
  
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const terminalHeaderRef = useRef<TerminalHeaderRef>(null);
  const terminalFooterRef = useRef<TerminalFooterRef>(null);
  
  // Combine external refs with internal refs
  useImperativeHandle(ref, () => terminalContainerRef.current!);

  // Authentication state
  const { userEmail, isAuthenticated, logout } = useTerminalAuth();
  
  // Load command history on component mount
  useEffect(() => {
    setCommandHistory(loadCommandHistory());
  }, []);

  // Set up initial command output
  useEffect(() => {
    // Add a welcome message if no output exists
    if (commandOutput.length === 0) {
      const welcomeMessage: HistoryItem = {
        command: 'welcome',
        output: 'Welcome to Programmer.sh Terminal! Type "help" to see available commands.',
        timestamp: new Date(),
        html: true
      };
      setCommandOutput([welcomeMessage]);
    }
  }, [commandOutput.length]);

  // Initialize command processor
  const { 
    isProcessingAsync, 
    processCommand, 
    addCommandToQueue 
  } = useCommandProcessor(
    initialCommands,
    setCommandOutput,
    setLastExecutedCommand,
    commandHistory
  );
  
  // Process initial commands
  useEffect(() => {
    if (initialCommands.length > 0) {
      initialCommands.forEach(cmd => {
        processCommand(cmd)
          .catch(err => console.error('Error processing initial command:', err));
      });
    }
  }, [initialCommands, processCommand]);
  
  // Handle command submission from the terminal input
  const handleCommandSubmit = useCallback(async (e: FormEvent<HTMLFormElement> | string) => {
    let commandString = '';
    
    if (typeof e === 'string') {
      commandString = e;
    } else {
      e.preventDefault();
      commandString = commandInput.trim();
      setCommandInput('');
    }
    
    if (commandString) {
      // Record command in history
      setLastCommand(commandString);
      setHistoryIndex(-1);
      
      // Process the command - removed appendCommandToOutput since the processor will add it
      try {
        await processCommand(commandString);
      } catch (err) {
        console.error('Error processing command:', err);
      }
    }
  }, [commandInput, setCommandInput, setLastCommand, processCommand]);
  
  // Handle history navigation using arrow keys
  const handleHistoryNavigation = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;
    
    let newIndex = historyIndex;
    
    if (direction === 'up') {
      // Navigate backward through history (newer to older)
      newIndex = historyIndex >= commandHistory.length - 1 ? commandHistory.length - 1 : historyIndex + 1;
    } else {
      // Navigate forward through history (older to newer)
      newIndex = historyIndex <= 0 ? -1 : historyIndex - 1;
    }
    
    setHistoryIndex(newIndex);
    
    if (newIndex === -1) {
      // At the "bottom" of history, show empty input
      setCommandInput('');
    } else {
      // Show the command from history
      setCommandInput(commandHistory[commandHistory.length - 1 - newIndex]);
    }
  };
  
  // Handle scroll to bottom when new content is added
  const handleScrollToBottom = () => {
    if (terminalContentRef.current) {
      scrollToBottom(terminalContentRef);
    }
  };
  
  // Scroll to bottom when command output changes
  useEffect(() => {
    handleScrollToBottom();
  }, [commandOutput]);
  
  // Focus the terminal input when clicked outside of input
  const handleTerminalClick = (e: React.MouseEvent) => {
    // Don't focus if clicking on a link or input
    if (
      e.target instanceof HTMLAnchorElement ||
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLButtonElement
    ) {
      return;
    }
    
    // Focus the input
    terminalFooterRef.current?.focus();
  };
  
  // Add command link event listener
  useEffect(() => {
    const handleCommandLinkClick = (e: CustomEvent<CommandLinkEventDetail>) => {
      console.log('Command link clicked:', e.detail);
      if (e.detail.command) {
        handleCommandSubmit(e.detail.command);
      }
    };
    
    // Add event listener
    document.addEventListener('commandLinkClick', handleCommandLinkClick as EventListener);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('commandLinkClick', handleCommandLinkClick as EventListener);
    };
  }, [handleCommandSubmit]);
  
  // Determine the theme-based class
  const themeClass = resolvedTheme === 'dark' ? styles['terminal-dark'] : styles['terminal-light'];
  
  return (
    <div 
      ref={terminalContainerRef}
      className={`${styles.terminal} ${themeClass} ${className}`}
      role="region"
      aria-roledescription="terminal"
      onClick={handleTerminalClick}
    >
      <TerminalHeader 
        ref={terminalHeaderRef} 
        lastCommand={lastCommand} 
        socialLinks={socialLinks}
      />
      
      <div 
        ref={terminalContentRef}
        className={styles['terminal-content']}
      >
        <TerminalContent 
          commandOutput={commandOutput}
          setScrollToBottom={handleScrollToBottom}
        />
      </div>

      <TerminalFooter
        ref={terminalFooterRef}
        commandInput={commandInput}
        setCommandInput={setCommandInput}
        handleCommandSubmit={handleCommandSubmit}
        onHistoryNavigation={handleHistoryNavigation}
        prompt={prompt}
        isProcessing={isProcessingAsync}
        className={styles['terminal-footer']}
      />
      
      {children}
    </div>
  );
}));

Terminal.displayName = 'Terminal';

export default Terminal;
