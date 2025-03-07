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

  useEffect(() => {
    const handleExecuteCommand = (event: Event) => {
      const { command } = (event as CustomEvent).detail;
      if (command) {
        setCommandInput(command);
        executeCommand(command);
      }
    };

    const handleExecuteCommandFromLink = (event: Event) => {
      const { command } = (event as CustomEvent).detail;
      if (command) {
        setCommandInput(command);
        executeCommand(command);
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

    setCommandInput('');
    executeCommand(trimmedCommand);
  };

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
