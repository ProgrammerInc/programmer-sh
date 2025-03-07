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
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
      terminalInput.focus();
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

    setCommandInput('');
    executeCommand(trimmedCommand);
    // Ensure terminal scrolls to bottom after manually submitting a command
    setTimeout(() => handleScrollToBottom(), 200);
    // Focus the input field after execution
    setTimeout(() => focusInputField(), 250);
  };

  // Add event handler for command links (both click and keyboard)
  useEffect(() => {
    const handleCommandLinkInteraction = (e: MouseEvent | KeyboardEvent) => {
      // For click events
      if (e.type === 'click') {
        const target = e.target as HTMLElement;
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
      // For keyboard events (Enter or Space)
      else if (e.type === 'keydown') {
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
      }
    };

    // Add both click and keyboard event listeners
    const terminalContent = terminalContentRef.current;
    if (terminalContent) {
      terminalContent.addEventListener('click', handleCommandLinkInteraction);
      terminalContent.addEventListener('keydown', handleCommandLinkInteraction);
    }

    return () => {
      if (terminalContent) {
        terminalContent.removeEventListener('click', handleCommandLinkInteraction);
        terminalContent.removeEventListener('keydown', handleCommandLinkInteraction);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-terminal-background rounded-lg overflow-hidden terminal-glass">
      <TerminalHeader lastCommand={lastCommand} socialLinks={socialLinks} />

      <TerminalContent commandOutput={commandOutput} setScrollToBottom={handleScrollToBottom} />

      <TerminalFooter
        commandInput={commandInput}
        setCommandInput={setCommandInput}
        handleCommandSubmit={handleCommandSubmit}
      />
    </div>
  );
};

export default Terminal;
