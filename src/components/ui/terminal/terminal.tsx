'use client';

import {
  loginCommand,
  logoutCommand,
  profileCommand,
  signupCommand,
  whoamiCommand
} from '@/commands/auth.commands';
import { cursorCommand } from '@/commands/cursor.commands';
import { queryCommand } from '@/commands/database.commands';
import { debugCommand } from '@/commands/debug.commands'; // Import the debug command
import { educationCommand } from '@/commands/education.commands';
import { experienceCommand } from '@/commands/experience.commands';
import { clearCommand, echoCommand, helpCommand } from '@/commands/help.commands';
import { aboutCommand, contactCommand } from '@/commands/information.commands';
import { projectsCommand } from '@/commands/projects.commands';
import { resumeCommand } from '@/commands/resume.commands';
import { skillsCommand } from '@/commands/skills.commands';
import { privacyCommand, termsCommand } from '@/commands/system.commands';
import { themeCommand } from '@/commands/theme.commands';
import { wallpaperCommand } from '@/commands/wallpaper.commands';
import { welcomeCommand } from '@/commands/welcome.commands';
import { TerminalContent } from '@/components/ui/terminal-content';
import { TerminalFooter } from '@/components/ui/terminal-footer';
import { TerminalFooterRef } from '@/components/ui/terminal-footer/terminal-footer.types';
import { TerminalHeader } from '@/components/ui/terminal-header';
import { TerminalHeaderRef } from '@/components/ui/terminal-header/terminal-header.types';
import { useCommandExecution } from '@/hooks/use-command-execution.hook';
import { useTerminalAuth } from '@/hooks/use-terminal-auth.hook';
import { SocialLink } from '@/types/social-links.types';
import { scrollToBottom } from '@/utils/terminal.utils';
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

export interface TerminalProps {
  containerRef?: React.RefObject<HTMLDivElement> | null;
  contentRef?: React.RefObject<HTMLDivElement> | null;
  headerRef?: React.RefObject<TerminalHeaderRef> | null;
  footerRef?: React.RefObject<TerminalFooterRef> | null;
  initialCommands?: string[];
  socialLinks?: SocialLink[];
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({
  containerRef = null,
  contentRef = null,
  headerRef = null,
  footerRef = null,
  initialCommands = [],
  socialLinks = [],
  className = ''
}) => {
  const [commandInput, setCommandInput] = useState<string>('');

  // Function to load command history from localStorage
  const loadHistoryFromStorage = useCallback(() => {
    try {
      const savedHistory = localStorage.getItem('terminal_history');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        console.log('Loaded command history from localStorage:', parsedHistory);
        return parsedHistory;
      }
    } catch (error) {
      console.error('Error loading command history from localStorage:', error);
    }
    return [];
  }, []);

  // Keep command history in localStorage to persist between page refreshes
  const [commandHistory, setCommandHistory] = useState<string[]>(loadHistoryFromStorage());
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [tempInput, setTempInput] = useState<string>(''); // Store original input when navigating

  const commandHistoryRef = useRef<string[]>(commandHistory);
  const historyIndexRef = useRef<number>(-1);

  // Initialize command history from localStorage on mount
  useEffect(() => {
    const history = loadHistoryFromStorage();
    if (history.length > 0) {
      setCommandHistory(history);
      commandHistoryRef.current = history;
      console.log('Initialized command history from localStorage:', history);
    }
  }, [loadHistoryFromStorage]);

  // Update localStorage whenever command history changes
  useEffect(() => {
    if (commandHistory.length > 0) {
      try {
        localStorage.setItem('terminal_history', JSON.stringify(commandHistory));
        console.log('Saved command history to localStorage:', commandHistory);
      } catch (error) {
        console.error('Error saving command history to localStorage:', error);
      }
    }
  }, [commandHistory]);

  // Keep the ref values in sync with state
  useEffect(() => {
    commandHistoryRef.current = commandHistory;
  }, [commandHistory]);

  useEffect(() => {
    historyIndexRef.current = historyIndex;
  }, [historyIndex]);

  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const terminalHeaderRef = useRef<TerminalHeaderRef>(null);
  const terminalFooterRef = useRef<TerminalFooterRef>(null);

  useImperativeHandle(containerRef, () => terminalContainerRef.current!);
  useImperativeHandle(contentRef, () => terminalContentRef.current!);
  useImperativeHandle(headerRef, () => terminalHeaderRef.current!);
  useImperativeHandle(footerRef, () => terminalFooterRef.current!);

  const { isAuthenticated } = useTerminalAuth();

  // Memoize the commands object to prevent unnecessary re-renders
  const commands = useMemo(
    () => ({
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
      welcome: welcomeCommand,
      about: aboutCommand,
      contact: contactCommand,
      skills: skillsCommand,
      experience: experienceCommand,
      projects: projectsCommand,
      resume: resumeCommand,
      education: educationCommand,
      query: queryCommand,
      debug: debugCommand, // Add the debug command to the commands object
      // Add history command with a direct implementation
      history: {
        name: 'history',
        description: 'Show command history',
        execute: () => {
          try {
            const savedHistory = localStorage.getItem('terminal_history');
            if (savedHistory) {
              const parsedHistory = JSON.parse(savedHistory);
              if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
                const historyDisplay = parsedHistory
                  .map(
                    (cmd, index) =>
                      `  ${index + 1}. <strong><span class="command-link" data-command="${cmd}">${cmd}</span></strong>`
                  )
                  .join('\n');

                return {
                  content: `Command History:\n\n${historyDisplay}`,
                  isError: false,
                  rawHTML: true
                };
              }
            }

            // No history available
            return {
              content: 'No command history available.',
              isError: false
            };
          } catch (error) {
            console.error('Error fetching command history:', error);
            return {
              content: 'Error fetching command history. Please try again later.',
              isError: true
            };
          }
        }
      },
      privacy: privacyCommand,
      terms: termsCommand
    }),
    []
  );

  const {
    commandOutput,
    lastCommand,
    executeCommand,
    setCommandOutput,
    isAwaitingAsync,
    asyncCommandName
  } = useCommandExecution(commands);

  const handleScrollToBottom = () => {
    scrollToBottom(terminalContentRef);
  };

  // Helper function to focus the input field
  const focusInputField = () => {
    console.log('%c Focusing input field', 'color: #8cf');
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
      terminalInput.focus();

      // Place cursor at the end of the input (better UX for history navigation)
      if (terminalInput instanceof HTMLInputElement) {
        const length = terminalInput.value.length;
        terminalInput.setSelectionRange(length, length);
      }
    } else {
      console.warn('Terminal input element not found');
    }
  };

  // Effect to scroll to bottom when command output changes
  useEffect(() => {
    if (commandOutput) {
      handleScrollToBottom();
    }
  }, [commandOutput]);

  // Use a ref to track initialization state
  const initializedRef = useRef(false);

  // Initialize once on mount with initial commands
  useEffect(() => {
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
      terminalInput.focus();
    }
  }, []);

  // Use a separate effect with a ref to prevent repeated execution of initial commands
  const initialCommandsExecuted = useRef(false);
  useEffect(() => {
    // Debug the initialization
    console.log('Terminal initialization check - executeCommand exists:', !!executeCommand);
    console.log('Terminal initialization check - initialCommands:', initialCommands);

    // Only run this effect when executeCommand is defined and we haven't executed the commands yet
    if (!executeCommand || initialCommandsExecuted.current) {
      return;
    }

    // Log the commands we're about to execute
    console.log('Terminal component received initialCommands:', initialCommands);

    // Mark as executed immediately to prevent multiple executions
    initialCommandsExecuted.current = true;

    // Ensure we have commands to execute
    if (initialCommands.length === 0) {
      console.log('No initial commands provided, executing welcome');
      // Small delay to ensure the terminal is ready
      setTimeout(() => executeCommand('welcome'), 100);
      return;
    }

    // Execute each command with a slight delay between them
    console.log('Will execute commands:', initialCommands);

    // Check if we have URL commands (non-welcome commands)
    const hasUrlCommand =
      initialCommands.length > 0 && initialCommands.some(cmd => cmd.toLowerCase() !== 'welcome');

    if (hasUrlCommand) {
      // If we have a URL command, make sure we execute it directly
      console.log('URL command detected - skipping welcome and executing directly');

      // Then execute each command with a fixed delay between them
      initialCommands.forEach((cmd, index) => {
        // Normalize command and mark URL commands to ensure proper handling
        const command = cmd.trim().toLowerCase();
        const prefixedCommand = command.startsWith('__url_') ? command : `__url_${command}`;

        // Use longer delays to ensure commands execute in order
        setTimeout(
          () => {
            console.log(`Executing URL command ${index}:`, command);
            try {
              // Use the prefixed command to ensure proper URL command handling
              executeCommand(prefixedCommand);

              // Add the command to history but strip the __url_ prefix
              // Using a functional update to ensure we have the latest state
              const commandToAdd = command.replace(/^__url_/, '');
              setCommandHistory(prevHistory => {
                // Make a copy of the previous history
                const newHistory = [...prevHistory];

                // Don't add if it's empty or the same as the last command
                if (
                  commandToAdd &&
                  (newHistory.length === 0 || newHistory[newHistory.length - 1] !== commandToAdd)
                ) {
                  newHistory.push(commandToAdd);
                  console.log('HISTORY UPDATE: Added URL command to history:', commandToAdd);

                  // Update localStorage
                  try {
                    localStorage.setItem('terminal_history', JSON.stringify(newHistory));
                  } catch (error) {
                    console.error('Error saving URL command to history:', error);
                  }
                }

                // Update our ref immediately for consistent access
                commandHistoryRef.current = newHistory;

                return newHistory;
              });
            } catch (error) {
              console.error('Error executing URL command:', prefixedCommand, error);
            }
          },
          300 + index * 500
        ); // Longer delays for URL commands to ensure proper execution
      });
    } else {
      // Standard execution for welcome or empty commands
      initialCommands.forEach((cmd, index) => {
        // Normalize command
        const command = cmd.trim().toLowerCase();

        setTimeout(
          () => {
            console.log(`Executing welcome command ${index}:`, command);
            try {
              executeCommand(command);

              // Add the command to history if it's not a special command
              // Skip welcome command and other system commands
              if (!command.startsWith('welcome') && !command.startsWith('__')) {
                setCommandHistory(prevHistory => {
                  // Make a copy of the previous history
                  const newHistory = [...prevHistory];

                  // Don't add if it's empty or the same as the last command
                  if (
                    command &&
                    (newHistory.length === 0 || newHistory[newHistory.length - 1] !== command)
                  ) {
                    newHistory.push(command);
                    console.log(
                      'HISTORY UPDATE: Added initialization command to history:',
                      command
                    );

                    // Update localStorage
                    try {
                      localStorage.setItem('terminal_history', JSON.stringify(newHistory));
                    } catch (error) {
                      console.error('Error saving initialization command to history:', error);
                    }
                  }

                  // Update our ref immediately for consistent access
                  commandHistoryRef.current = newHistory;

                  return newHistory;
                });
              }
            } catch (error) {
              console.error('Error executing command:', command, error);
            }
          },
          500 + index * 300
        ); // Standard delay for welcome command
      });
    }
  }, [initialCommands, executeCommand, setCommandOutput]); // Only depend on these two props

  // Store the executeCommand function in a ref to prevent it from causing re-renders
  const executeCommandRef = useRef(executeCommand);

  // Update the ref when executeCommand changes
  useEffect(() => {
    executeCommandRef.current = executeCommand;
  }, [executeCommand]);

  // Set up event listeners only once on mount
  useEffect(() => {
    // Create a debounce mechanism to prevent duplicate command executions
    let lastCommandExecution = {
      command: '',
      timestamp: 0
    };

    const isRecentlyExecuted = (command: string) => {
      const now = Date.now();
      const isDuplicate = lastCommandExecution.command === command;
      const isRecent = now - lastCommandExecution.timestamp < 500; // 500ms debounce window

      return isDuplicate && isRecent;
    };

    const updateCommandExecution = (command: string) => {
      lastCommandExecution = {
        command,
        timestamp: Date.now()
      };
    };

    // Handle the clearCommandHistory event to reset command history
    const handleClearHistory = () => {
      console.log('Clearing command history');
      // Clear the history state
      setCommandHistory([]);
      // Reset the history index and temp input
      setHistoryIndex(-1);
      setTempInput('');
      // Clear localStorage history too
      localStorage.removeItem('terminal_history');
      // Update refs
      commandHistoryRef.current = [];
      historyIndexRef.current = -1;
    };

    const handleExecuteCommand = (event: Event) => {
      const { command } = (event as CustomEvent).detail;
      if (command) {
        // Check if this command was recently executed to prevent duplicates
        if (isRecentlyExecuted(command)) {
          console.log('Preventing duplicate command execution:', command);
          return;
        }

        // Mark this command as executed
        updateCommandExecution(command);

        setCommandInput(command);
        executeCommand(command);
        // Clear input after execution
        setTimeout(() => setCommandInput(''), 100);
        // Scroll to bottom after command execution
        setTimeout(() => handleScrollToBottom(), 200);
        // Focus the input field after execution
        setTimeout(() => focusInputField(), 250);
      }
    };

    const handleExecuteCommandFromLink = (event: Event) => {
      const { command, addToHistory, placeholder } = (event as CustomEvent).detail;

      if (command) {
        // If there's a placeholder, we don't execute the command yet
        if (placeholder) {
          // Check if the command already includes the placeholder
          let commandToShow = command;

          // Only add the placeholder if it's not already in the command
          if (!command.includes(placeholder)) {
            commandToShow = `${command} ${placeholder}`;
          }

          // Set the input field to show the command with placeholder
          setCommandInput(commandToShow);

          // Select just the placeholder part for easy replacement
          setTimeout(() => {
            const terminalInput = document.getElementById('terminal-input');
            if (terminalInput instanceof HTMLInputElement) {
              // Find the placeholder position
              const placeholderPos = commandToShow.indexOf(placeholder);
              if (placeholderPos > -1) {
                // Select just the placeholder
                terminalInput.setSelectionRange(
                  placeholderPos,
                  placeholderPos + placeholder.length
                );
                terminalInput.focus();
              }
            }
          }, 50);
        } else {
          // Check if this command was recently executed to prevent duplicates
          if (isRecentlyExecuted(command)) {
            console.log('Preventing duplicate link command execution:', command);
            return;
          }

          // Mark this command as executed
          updateCommandExecution(command);

          // Set the input field to show the command
          setCommandInput(command);

          // Add command to history if flag is true
          if (addToHistory) {
            // Using functional update to ensure we have the latest state
            setCommandHistory(prevHistory => {
              // Make a copy of the previous history
              const newHistory = [...prevHistory];

              // Don't add if it's empty or the same as the last command
              if (
                command &&
                (newHistory.length === 0 || newHistory[newHistory.length - 1] !== command)
              ) {
                newHistory.push(command);
                console.log('HISTORY UPDATE: Added link command to history:', command);
                console.log('HISTORY UPDATE: New history state:', newHistory);
              }

              // Update our ref immediately for consistent access
              commandHistoryRef.current = newHistory;

              return newHistory;
            });

            // Reset history index and clear any temp input after adding new command
            setHistoryIndex(-1);
            setTempInput('');
            historyIndexRef.current = -1;
          }

          // Execute the command
          executeCommand(command);

          // Clear input after execution
          setTimeout(() => setCommandInput(''), 100);
          // Scroll to bottom after command execution
          setTimeout(() => handleScrollToBottom(), 200);
          // Focus the input field after execution
          setTimeout(() => focusInputField(), 250);
        }
      }
    };

    document.addEventListener('executeCommand', handleExecuteCommand);
    document.addEventListener('commandLinkClick', handleExecuteCommandFromLink);
    document.addEventListener('clearCommandHistory', handleClearHistory);

    return () => {
      document.removeEventListener('executeCommand', handleExecuteCommand);
      document.removeEventListener('commandLinkClick', handleExecuteCommandFromLink);
      document.removeEventListener('clearCommandHistory', handleClearHistory);
    };
  }, [executeCommand]);

  // Effect to handle terminal container clicks for auto-focusing the input
  useEffect(() => {
    const terminalContainer = terminalContainerRef.current;

    const handleContainerClick = (e: MouseEvent) => {
      // Skip if clicking on an input, button, or command link
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'INPUT' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.classList.contains('command-link') ||
        target.closest('input') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('textarea') ||
        target.closest('select');

      if (!isInteractive) {
        // Don't focus if user is selecting text
        const selection = window.getSelection();
        if (selection && selection.toString().length === 0) {
          e.preventDefault();
          focusInputField();
        }
      }
    };

    if (terminalContainer) {
      terminalContainer.addEventListener('click', handleContainerClick);
    }

    return () => {
      if (terminalContainer) {
        terminalContainer.removeEventListener('click', handleContainerClick);
      }
    };
  }, []);

  const navigateHistory = useCallback(
    (direction: 'up' | 'down') => {
      let currentIndex = historyIndexRef.current;
      const history = commandHistoryRef.current;

      console.log(
        `%c HISTORY NAVIGATION: ${direction}`,
        'background: #444; color: #ff8; padding: 2px 5px; border-radius: 3px'
      );
      console.log('%c History state:', 'color: #8cf', history);
      console.log('%c Current index:', 'color: #8cf', currentIndex);

      // Immediately return if we have no history
      if (!history || history.length === 0) {
        console.log('%c No command history available', 'color: #f88');
        return;
      }

      // When starting navigation, save the current input
      if (currentIndex === -1 && direction === 'up') {
        const currentInputValue = commandInput;
        setTempInput(currentInputValue);
        console.log('%c Saved current input:', 'color: #8f8', currentInputValue);
      }

      // Handle the index change based on direction
      if (direction === 'up') {
        // If we can go further back in history, increment the index
        if (currentIndex < history.length - 1) {
          currentIndex++;
          console.log('%c Moving UP in history, new index:', 'color: #fc8', currentIndex);
        }
      } else if (direction === 'down') {
        // If we're viewing history, decrement the index
        if (currentIndex > -1) {
          currentIndex--;
          console.log('%c Moving DOWN in history, new index:', 'color: #fc8', currentIndex);
        }
      }

      // Update the state and ref with the new index
      setHistoryIndex(currentIndex);
      historyIndexRef.current = currentIndex;

      // Important: Use setTimeout to break out of the event handler before React updates
      setTimeout(() => {
        // Set the command input based on the new index
        if (currentIndex >= 0 && history.length > 0) {
          // Access history in reverse order (newest first)
          const reverseIndex = history.length - 1 - currentIndex;

          if (reverseIndex >= 0 && reverseIndex < history.length) {
            const historyItem = history[reverseIndex];
            console.log('%c Setting input to history item:', 'color: #8f8', historyItem);

            // Use a function update to ensure we're working with the latest state
            setCommandInput(historyItem);
          }
        } else {
          // We've moved past the beginning of history, restore the original input
          console.log('%c Restoring original input:', 'color: #8f8', tempInput);
          setCommandInput(tempInput);
        }
      }, 0);

      // Always make sure focus is on the input field
      setTimeout(focusInputField, 10);
    },
    [commandInput, tempInput]
  );

  const handleCommandSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedCommand = commandInput.trim();

    if (!trimmedCommand) {
      return;
    }

    // Strip any special prefixes that might have been typed directly
    const cleanCommand = trimmedCommand.replace(/^(__event_|__init_)/, '');

    // Add command to history (avoid duplicates at the end)
    // Using functional update to ensure we have the latest state
    setCommandHistory(prevHistory => {
      // Make a copy of the previous history
      const newHistory = [...prevHistory];

      // Don't add if it's empty or the same as the last command
      if (
        trimmedCommand &&
        (newHistory.length === 0 || newHistory[newHistory.length - 1] !== trimmedCommand)
      ) {
        newHistory.push(trimmedCommand);
        console.log('HISTORY UPDATE: Added command to history:', trimmedCommand);
        console.log('HISTORY UPDATE: New history state:', newHistory);
      }

      // Update our ref immediately for consistent access
      commandHistoryRef.current = newHistory;

      return newHistory;
    });

    // Reset history index and clear any temp input
    setHistoryIndex(-1);
    setTempInput('');
    historyIndexRef.current = -1;
    console.log('HISTORY UPDATE: Reset history index after command execution');

    setCommandInput('');
    executeCommand(cleanCommand);
    // Ensure terminal scrolls to bottom after manually submitting a command
    setTimeout(() => handleScrollToBottom(), 200);
    // Focus the input field after execution
    setTimeout(() => focusInputField(), 250);
  };

  return (
    <div
      ref={terminalContainerRef}
      className={`flex flex-col h-full bg-terminal-background rounded-lg overflow-hidden terminal-glass ${className}`}
    >
      <TerminalHeader ref={terminalHeaderRef} lastCommand={lastCommand} socialLinks={socialLinks} />

      <TerminalContent
        ref={terminalContentRef}
        commandOutput={commandOutput}
        asyncCommandName={asyncCommandName}
        setScrollToBottom={handleScrollToBottom}
        isAwaitingAsync={isAwaitingAsync}
      />

      <TerminalFooter
        ref={terminalFooterRef}
        commandInput={commandInput}
        setCommandInput={setCommandInput}
        handleCommandSubmit={handleCommandSubmit}
        onHistoryNavigation={navigateHistory}
      />
    </div>
  );
};

export default Terminal;
