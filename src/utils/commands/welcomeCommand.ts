
import { Command } from './types';

export const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Display the welcome message',
  execute: () => {
    return {
      content: `Welcome to <programmer>._

This is the interactive terminal portfolio of James A. Black Jr.
Type 'help' to see available commands, or try one of these:
- 'about' to learn about me
- 'skills' to see my technical skills
- 'projects' to view my portfolio
- 'contact' for my contact information

Feel free to explore and get in touch!`,
      isError: false,
    };
  },
};
