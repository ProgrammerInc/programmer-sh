
import { Command } from './types';
import { getAllCommands } from './index';

export const helpCommand: Command = {
  name: 'help',
  description: 'Display available commands',
  execute: (args: string[]) => {
    const commands = getAllCommands();
    const specificCommand = args[0];
    
    if (specificCommand) {
      const command = commands.find(cmd => cmd.name === specificCommand && !cmd.hidden);
      if (command) {
        return {
          content: `
Command: ${command.name}
Description: ${command.description}
${command.usage ? `Usage: ${command.usage}` : ''}
`
        };
      } else {
        return {
          content: `Command '${specificCommand}' not found. Type 'help' to see available commands.`,
          isError: true
        };
      }
    }
    
    return {
      content: `
Available commands:

${commands
  .filter(cmd => !cmd.hidden)
  .map(cmd => `- ${cmd.name}: ${cmd.description}`)
  .join('\n')}

Type 'help [command]' for more information about a specific command.
`
    };
  }
};
