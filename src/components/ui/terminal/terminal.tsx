
import { loginCommand, logoutCommand, profileCommand, signupCommand, whoamiCommand } from '@/utils/commands/authCommands';
import { clearCommand, echoCommand, helpCommand } from '@/utils/commands/helpCommand';
import { themeCommand } from '@/utils/commands/themeCommand';
import { cursorCommand } from '@/utils/commands/cursorCommand';
import { wallpaperCommand } from '@/utils/commands/wallpaperCommand';
import { welcomeCommand } from '@/utils/commands/welcomeCommand';
import { aboutCommand, contactCommand } from '@/utils/commands/informationCommands';
import { skillsCommand } from '@/utils/commands/skillsCommand';
import { experienceCommand } from '@/utils/commands/experienceCommand';
import { projectsCommand } from '@/utils/commands/projectsCommand';
import { resumeCommand } from '@/utils/commands/resumeCommand';
import { educationCommand } from '@/utils/commands/educationCommand';
import { Command } from '@/utils/commands/types';
import { SocialLink } from '@/types/socialLinks';
import { TerminalHeader } from '@/components/ui/terminal-header';
import { useEffect, useRef, useState } from 'react';
import { useTerminalAuth } from '@/hooks/use-terminal-auth';
import { useCommandExecution } from '@/hooks/use-command-execution';
import { scrollToBottom } from './terminal-utils';
import TerminalContent from './terminal-content';
import TerminalFooter from './terminal-footer';

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

  const { 
    commandOutput, 
    lastCommand,
    executeCommand 
  } = useCommandExecution(commands);

  const handleScrollToBottom = () => {
    scrollToBottom(terminalContentRef);
  };

  useEffect(() => {
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
      terminalInput.focus();
    }

    if (initialCommands.length === 0) {
      executeCommand('welcome');
    } else {
      initialCommands.forEach(command => {
        executeCommand(command);
      });
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

      <TerminalContent 
        commandOutput={commandOutput} 
        setScrollToBottom={handleScrollToBottom} 
      />

      <TerminalFooter
        commandInput={commandInput}
        setCommandInput={setCommandInput}
        handleCommandSubmit={handleCommandSubmit}
      />
    </div>
  );
};

export default Terminal;
