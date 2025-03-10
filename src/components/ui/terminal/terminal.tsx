import { TerminalContent } from '@/components/ui/terminal-content';
import { TerminalFooter } from '@/components/ui/terminal-footer';
import { TerminalHeader } from '@/components/ui/terminal-header';
import { useCommandExecution } from '@/hooks/use-command-execution';
import { useTerminalAuth } from '@/hooks/use-terminal-auth';
import { SocialLink } from '@/types/social-links';
import {
  loginCommand,
  logoutCommand,
  profileCommand,
  signupCommand,
  whoamiCommand
} from '@/utils/commands/auth-commands';
import { cursorCommand } from '@/utils/commands/cursor-commands';
import { educationCommand } from '@/utils/commands/education-commands';
import { experienceCommand } from '@/utils/commands/experience-commands';
import { clearCommand, echoCommand, helpCommand } from '@/utils/commands/help-commands';
import { aboutCommand, contactCommand } from '@/utils/commands/information-commands';
import { projectsCommand } from '@/utils/commands/projects-commands';
import { resumeCommand } from '@/utils/commands/resume-commands';
import { skillsCommand } from '@/utils/commands/skills-commands';
import { themeCommand } from '@/utils/commands/theme-commands';
import { wallpaperCommand } from '@/utils/commands/wallpaper-commands';
import { welcomeCommand } from '@/utils/commands/welcome-commands';
import { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { scrollToBottom } from './terminal-utils';

export interface TerminalProps {
  containerRef?: React.RefObject<HTMLDivElement> | null;
  contentRef?: React.RefObject<HTMLDivElement> | null;
  headerRef?: React.RefObject<HTMLDivElement> | null;
  footerRef?: React.RefObject<HTMLFormElement> | null;
  initialCommands?: string[];
  socialLinks?: SocialLink[];
}

const Terminal: React.FC<TerminalProps> = ({
  containerRef = null,
  contentRef = null,
  headerRef = null,
  footerRef = null,
  initialCommands = [],
  socialLinks = []
}) => {
  const [commandInput, setCommandInput] = useState<string>('');

  // Keep command history in localStorage to persist between page refreshes
  const loadCommandHistory = () => {
    try {
      const savedHistory = localStorage.getItem('terminal_history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error('Error loading command history:', error);
      return [];
    }
  };

  const [commandHistory, setCommandHistory] = useState<string[]>(loadCommandHistory);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [tempInput, setTempInput] = useState<string>(''); // Store original input when navigating

  // Store command history in ref to avoid closure issues
  const commandHistoryRef = useRef<string[]>(commandHistory);
  const historyIndexRef = useRef<number>(historyIndex);

  // Keep the ref values in sync with state
  useEffect(() => {
    commandHistoryRef.current = commandHistory;
    // Also save to localStorage for persistence
    localStorage.setItem('terminal_history', JSON.stringify(commandHistory));
    console.log('Command history updated:', commandHistory);
  }, [commandHistory]);

  useEffect(() => {
    historyIndexRef.current = historyIndex;
    console.log('History index updated:', historyIndex);
  }, [historyIndex]);

  const terminalContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
  const terminalContentRef = useRef<HTMLDivElement>(contentRef?.current || null);
  const terminalHeaderRef = useRef<HTMLDivElement>(headerRef?.current || null);
  const terminalFooterRef = useRef<HTMLFormElement>(footerRef?.current || null);

  useImperativeHandle(containerRef, () => terminalContainerRef.current!);

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
      education: educationCommand
    }),
    []
  );

  const { commandOutput, lastCommand, executeCommand, setCommandOutput } =
    useCommandExecution(commands);

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

      // To ensure URL commands execute properly, we use a different approach
      // First clear the terminal
      setCommandOutput('');

      // Then execute each command with a fixed delay between them
      initialCommands.forEach((cmd, index) => {
        // Normalize command and mark URL commands to ensure proper handling
        const command = cmd.trim().toLowerCase();
        const prefixedCommand = command.startsWith('__url_') ? command : `__url_${command}`;

        // Use longer delays to ensure commands execute in order
        setTimeout(
          () => {
            console.log(`Executing URL command ${index}:`, prefixedCommand);
            try {
              // Use the prefixed command to ensure proper URL command handling
              executeCommand(prefixedCommand);
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
          // Format the command with the placeholder
          const commandWithPlaceholder = `${command} ${placeholder}`;

          // Set the input field to show the command with placeholder
          setCommandInput(commandWithPlaceholder);

          // Select just the placeholder part for easy replacement
          setTimeout(() => {
            const terminalInput = document.getElementById('terminal-input');
            if (terminalInput instanceof HTMLInputElement) {
              const startPos = command.length + 1; // +1 for the space
              terminalInput.setSelectionRange(startPos, commandWithPlaceholder.length);
              terminalInput.focus();
            }
          }, 50);
        } else {
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
    document.addEventListener('executeCommandFromLink', handleExecuteCommandFromLink);
    document.addEventListener('clearCommandHistory', handleClearHistory);

    return () => {
      document.removeEventListener('executeCommand', handleExecuteCommand);
      document.removeEventListener('executeCommandFromLink', handleExecuteCommandFromLink);
      document.removeEventListener('clearCommandHistory', handleClearHistory);
    };
  }, [executeCommand]);

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
    executeCommand(trimmedCommand);
    // Ensure terminal scrolls to bottom after manually submitting a command
    setTimeout(() => handleScrollToBottom(), 200);
    // Focus the input field after execution
    setTimeout(() => focusInputField(), 250);
  };

  // Add event handler for keyboard accessibility of command links (Enter or Space)
  useEffect(() => {
    const handleCommandLinkKeyboard = (e: KeyboardEvent) => {
      // Only handle keyboard events
      const keyEvent = e as KeyboardEvent;
      if ((keyEvent.key === 'Enter' || keyEvent.key === ' ') && document.activeElement) {
        const target = document.activeElement as HTMLElement;
        if (target.classList.contains('command-link')) {
          e.preventDefault();
          const command = target.getAttribute('data-command');
          if (command) {
            // Execute the command with the __event_ prefix to prevent loops
            executeCommandRef.current(`__event_${command}`);
            // Clear the input field after executing the command
            setCommandInput('');
            // Focus the input field after execution
            setTimeout(() => focusInputField(), 250);
          }
        }
      }
    };

    // Add only keyboard event listener (click is handled in terminal-content.tsx)
    const terminalContent = terminalContentRef.current;
    if (terminalContent) {
      terminalContent.addEventListener('keydown', handleCommandLinkKeyboard);
    }

    return () => {
      if (terminalContent) {
        terminalContent.removeEventListener('keydown', handleCommandLinkKeyboard);
      }
    };
  }, []);

  // Handle arrow key navigation through command history
  const handleHistoryNavigation = (direction: 'up' | 'down') => {
    // Use refs to get the latest values
    const history = commandHistoryRef.current;
    let currentIndex = historyIndexRef.current;

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
        // Access history in reverse order (newest to oldest)
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
  };

  return (
    <div
      ref={terminalContainerRef}
      className="flex flex-col h-full bg-terminal-background rounded-lg overflow-hidden terminal-glass"
    >
      <TerminalHeader ref={terminalHeaderRef} lastCommand={lastCommand} socialLinks={socialLinks} />

      <TerminalContent
        ref={terminalContentRef}
        commandOutput={commandOutput}
        setScrollToBottom={handleScrollToBottom}
      />

      <TerminalFooter
        ref={terminalFooterRef}
        commandInput={commandInput}
        setCommandInput={setCommandInput}
        handleCommandSubmit={handleCommandSubmit}
        onHistoryNavigation={handleHistoryNavigation}
      />
    </div>
  );
};

export default Terminal;
