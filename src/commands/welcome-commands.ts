import { Command, CommandResult } from './types';

const ASCIIArt = [
  ' ____                                                          ____  _   _ ',
  '|  _ \\ _ __ ___   __ _ _ __ __ _ _ __ ___  _ __ ___   ___ _ __/ ___|| | | |',
  "| |_) | '__/ _ \\ / _` | '__/ _` | '_ ` _ \\| '_ ` _ \\ / _ \\ '__\\___ \\| |_| |",
  '|  __/| | | (_) | (_| | | | (_| | | | | | | | | | | |  __/ |_  ___) |  _  |',
  '|_|   |_|  \\___/ \\__, |_|  \\__,_|_| |_| |_|_| |_| |_|\\___|_(_)|____/|_| |_|',
  '                 |___/                                                   '
];

export const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Display the welcome message',
  execute: (): CommandResult => {
    return {
      content: `<div class="ascii-art font-mono text-xs md:text-sm mt-4"><pre><span class="text-terminal-prompt">${ASCIIArt.join('\n')}</span></pre></div>
      <div class="font-mono text-xs md:text-sm mb-4">
        Welcome to the <span class="text-terminal-prompt">&lt;programmer&gt;</span><span class="text-terminal-prompt">.</span><span class="text-terminal-prompt animate-cursor-blink">_</span> portfolio.

        This is an interactive terminal portfolio app designed and developed by <span class="text-terminal-prompt">James A. Black Jr.</span>

        Type <span class="command-link" data-command="help">help</span> to see available commands, or try one of these:
        <div class="ml-2">
          <span>&nbsp;- <span class="command-link" data-command="about">about</span>: To learn about me</span>
          <span>&nbsp;- <span class="command-link" data-command="experience">experience</span>: To see my work experience</span>
          <span>&nbsp;- <span class="command-link" data-command="education">education</span>: To see my educational background</span>
          <span>&nbsp;- <span class="command-link" data-command="projects">projects</span>: To view my portfolio</span>
          <span>&nbsp;- <span class="command-link" data-command="skills">skills</span>: To see my technical skills</span>
          <span>&nbsp;- <span class="command-link" data-command="resume">resume</span>: To view my resume</span>
          <span>&nbsp;- <span class="command-link" data-command="contact">contact</span>: For my contact information</span>
        </div>
        Feel free to explore and get in touch!
      </div>`,
      isError: false,
      rawHTML: true,
      noHistory: true // Prevents storing large ASCII art in localStorage
    };
  }
};
