import { fetchEducation } from '../database/portfolioServices';
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
            isError: true,
          };
        }

        return {
          content: `My Education:

${education
  .map(
    edu => `${edu.degree}
${edu.institution}, ${edu.year}
${edu.details ? edu.details : ''}`
  )
  .join('\n')}`,
          isError: false,
        };
      },
    };
  },
};
