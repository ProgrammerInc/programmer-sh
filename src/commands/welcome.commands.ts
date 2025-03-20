import { createFeatureLogger } from '@/services/logger/logger.utils';
import { Command, CommandResult } from './command.types';

// Create a dedicated logger for welcome commands
const welcomeLogger = createFeatureLogger('WelcomeCommands');

/**
 * ASCII art for the welcome message
 */
const ASCIIArt = [
  ' ____                                                          ____  _   _ ',
  '|  _ \\ _ __ ___   __ _ _ __ __ _ _ __ ___  _ __ ___   ___ _ __/ ___|| | | |',
  "| |_) | '__/ _ \\ / _` | '__/ _` | '_ ` _ \\| '_ ` _ \\ / _ \\ '__\\___ \\| |_| |",
  '|  __/| | | (_) | (_| | | | (_| | | | | | | | | | | |  __/ |_  ___) |  _  |',
  '|_|   |_|  \\___/ \\__,_|_|  \\__,_|_| |_| |_|_| |_| |_|\\___|_(_)|____/|_| |_|',
  '                 |___/                                                   '
];

/**
 * Command to display the welcome message
 */
export const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Display the welcome message',
  execute: (): CommandResult => {
    try {
      welcomeLogger.info('Displaying welcome message');

      return {
        content: `<div class="ascii-art font-mono text-xs md:text-sm mt-2"><pre><span class="text-terminal-prompt">${ASCIIArt.join('\n')}</span></pre></div>
      <div class="font-mono text-xs md:text-sm m-0 p-0 leading-tight">Welcome to the <span class="text-terminal-prompt">&lt;programmer&gt;</span><span class="text-terminal-prompt">.</span><span class="text-terminal-prompt animate-cursor-blink">_</span> portfolio.\n
This is an interactive terminal portfolio app designed and developed by <span class="text-terminal-prompt">James A. Black Jr.</span>\n
Type <span class="command-link" data-command="help">help</span> to see available commands, or try one of these:
<div class="m-0 p-0 leading-tight">
<span>- <span class="command-link" data-command="about">about</span>: To learn about me</span>
<span>- <span class="command-link" data-command="experience">experience</span>: To see my work experience</span>
<span>- <span class="command-link" data-command="education">education</span>: To see my educational background</span>
<span>- <span class="command-link" data-command="projects">projects</span>: To view my portfolio</span>
<span>- <span class="command-link" data-command="skills">skills</span>: To see my technical skills</span>
<span>- <span class="command-link" data-command="resume">resume</span>: To view my resume</span>
<span>- <span class="command-link" data-command="contact">contact</span>: For my contact information</span>
</div>
Feel free to explore and get in touch!</div>`,
        isError: false,
        rawHTML: true,
        noHistory: true // Prevents storing large ASCII art in localStorage
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      welcomeLogger.error('Error displaying welcome message', { error: errorMessage });

      return {
        content: `Error displaying welcome message: ${errorMessage}`,
        isError: true,
        rawHTML: false
      };
    }
  }
};
