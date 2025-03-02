import { Command } from './types';

export const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Display the welcome message',
  execute: () => {
    return {
      content: `Welcome to the <span class="text-terminal-prompt">&lt;programmer&gt;</span><span class="text-terminal-prompt">.</span><span class="text-terminal-prompt animate-cursor-blink">_</span> portfolio.

This is an interactive portfolio app designed and developed by <span class="text-terminal-prompt">James A. Black Jr.</span>

Type <span class="command-link" data-command="help">help</span> to see available commands, or try one of these:

  - <span class="command-link" data-command="about">about</span>: To learn about me
  - <span class="command-link" data-command="contact">contact</span>: For my contact information
  - <span class="command-link" data-command="education">education</span>: To see my educational background
  - <span class="command-link" data-command="experience">experience</span>: To see my work experience
  - <span class="command-link" data-command="projects">projects</span>: To view my portfolio
  - <span class="command-link" data-command="resume">resume</span>: To view my resume
  - <span class="command-link" data-command="skills">skills</span>: To see my technical skills
  - <span class="command-link" data-command="theme">theme</span>: To change the terminal theme

Feel free to explore and get in touch!`,
      isError: false,
    };
  },
};
