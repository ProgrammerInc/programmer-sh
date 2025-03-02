import { Command } from './types';

// Update the helpCommand to include auth commands
export const helpCommand: Command = {
  name: 'help',
  description: 'Display available commands and their descriptions',
  execute: () => {
    return {
      content: `Available commands:

Authentication:
  login <email> <password>     - Log in to your account
  signup <email> <password>    - Create a new account
  logout                       - Log out of your account
  whoami                       - Show current user information
  profile set <field> <value>  - Update your profile information

Information:
  about          - Display information about me
  contact        - Display my contact information
  skills         - Display my skills and technologies
  experience     - Display my work experience
  projects       - Display my projects
  project <id>   - Display details about a specific project
  education      - Display my educational background

System:
  help           - Display this help message
  clear          - Clear the terminal
  theme <theme>  - Change the terminal theme (dark/light)`,
      isError: false,
    };
  },
};
