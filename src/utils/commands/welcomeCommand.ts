
import { Command } from './types';

export const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Display the welcome message',
  execute: () => {
    return {
      content: `Welcome to the <span class="text-terminal-prompt">&lt;programmer&gt;</span><span class="text-terminal-prompt">.</span><span class="text-terminal-prompt animate-cursor-blink">_</span> portfolio.

This is an interactive terminal portfolio of James A. Black Jr.

Type 'help' to see available commands, or try one of these:

- [[about]] to learn about me
- [[contact]] for my contact information
- [[education]] to see my educational background
- [[experience]] to see my work experience
- [[projects]] to view my portfolio
- [[resume]] to view my resume
- [[skills]] to see my technical skills
- [[theme]] to change the terminal theme

Feel free to explore and get in touch!`,
      isError: false,
    };
  },
};
