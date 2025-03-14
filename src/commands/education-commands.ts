import { fetchEducation } from '../services/database/portfolio-services';
import { Command, CommandResult } from './types';

export const educationCommand: Command = {
  name: 'education',
  description: 'Display my education background',
  execute: () => {
    return {
      content: 'Fetching education...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        const education = await fetchEducation();

        if (!education || !education.length) {
          return {
            content: 'Error: Could not fetch education information.',
            isError: true
          };
        }

        return {
          content: `\nMy Education:\n
${education
  .sort(
    (a, b) =>
      new Date(b.duration.split(' - ')[0]).getTime() -
      new Date(a.duration.split(' - ')[0]).getTime()
  )
  .map(
    edu => `Degree/Major: <span class="text-terminal-prompt">${edu.degree}</span>
Institution: <span class="institution"><span class="text-terminal-prompt">${edu.institution}</span> (${edu.duration})</span>

${edu.details ? `Details: <span class="details">${edu.details}</span>` : ''}`
  )
  .join('\n<hr class="terminal-divider" />\n')}\n\n`,
          isError: false
        };
      }
    };
  }
};
