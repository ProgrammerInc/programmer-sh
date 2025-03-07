import { TerminalContent } from '@/components/ui/terminal-content';
import { TerminalFooter } from '@/components/ui/terminal-footer';
import { TerminalHeader } from '@/components/ui/terminal-header';
import { useCommandExecution } from '@/hooks/use-command-execution';
import { useTerminalAuth } from '@/hooks/use-terminal-auth';
import { SocialLink } from '@/types/socialLinks';
import {
  loginCommand,
  logoutCommand,
  profileCommand,
  signupCommand,
  whoamiCommand
} from '@/utils/commands/authCommands';
import { cursorCommand } from '@/utils/commands/cursorCommand';
import { educationCommand } from '@/utils/commands/educationCommand';
import { experienceCommand } from '@/utils/commands/experienceCommand';
import { clearCommand, echoCommand, helpCommand } from '@/utils/commands/helpCommand';
import { aboutCommand, contactCommand } from '@/utils/commands/informationCommands';
import { projectsCommand } from '@/utils/commands/projectsCommand';
import { resumeCommand } from '@/utils/commands/resumeCommand';
import { skillsCommand } from '@/utils/commands/skillsCommand';
import { themeCommand } from '@/utils/commands/themeCommand';
import { Command } from '@/utils/commands/types';
import { wallpaperCommand } from '@/utils/commands/wallpaperCommand';
import { welcomeCommand } from '@/utils/commands/welcomeCommand';
import { useEffect, useRef, useState } from 'react';
import { scrollToBottom } from './terminal-utils';

export interface TerminalProps {
  socialLinks?: SocialLink[];
  initialCommands?: string[];
}

const Terminal: React.FC<TerminalProps> = ({ socialLinks = [], initialCommands = [] }) => {
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

  const terminalContentRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useTerminalAuth();

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
    welcome: welcomeCommand,
    about: aboutCommand,
    contact: contactCommand,
    skills: skillsCommand,
    experience: experienceCommand,
    projects: projectsCommand,
    resume: resumeCommand,
    education: educationCommand
  };

  const { commandOutput, lastCommand, executeCommand } = useCommandExecution(commands);

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
    if (!initialCommandsExecuted.current) {
      initialCommandsExecuted.current = true;

      if (initialCommands.length === 0) {
        executeCommand('welcome');
      } else {
        initialCommands.forEach(command => {
          executeCommand(command);
        });
      }
    }
  }, [initialCommands, executeCommand]);

  // Store the executeCommand function in a ref to prevent it from causing re-renders
  const executeCommandRef = useRef(executeCommand);

  // Update the ref when executeCommand changes
  useEffect(() => {
    executeCommandRef.current = executeCommand;
  }, [executeCommand]);

  // Set up event listeners only once on mount
  useEffect(() => {
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
      const { command, addToHistory } = (event as CustomEvent).detail;
      if (command) {
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
    };

    document.addEventListener('executeCommand', handleExecuteCommand);
    document.addEventListener('executeCommandFromLink', handleExecuteCommandFromLink);

    return () => {
      document.removeEventListener('executeCommand', handleExecuteCommand);
      document.removeEventListener('executeCommandFromLink', handleExecuteCommandFromLink);
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
    <div className="flex flex-col h-full bg-terminal-background rounded-lg overflow-hidden terminal-glass">
      <TerminalHeader lastCommand={lastCommand} socialLinks={socialLinks} />

      <TerminalContent
        ref={terminalContentRef}
        commandOutput={commandOutput}
        setScrollToBottom={handleScrollToBottom}
      />

      <TerminalFooter
        commandInput={commandInput}
        setCommandInput={setCommandInput}
        handleCommandSubmit={handleCommandSubmit}
        onHistoryNavigation={handleHistoryNavigation}
      />
    </div>
  );
};

export default Terminal;
