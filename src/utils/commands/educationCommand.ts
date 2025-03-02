import { Command, CommandResult } from './types';
import { fetchEducation } from '../database/portfolioServices';

export const educationCommand: Command = {
  name: 'education',
  description: 'Display my education background',
  execute: () => {
    return {
      content: 'Fetching education...',
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        const education = await fetchEducation();

        if (!education || !education.length) {
          return {
            content: 'Error: Could not fetch education information.',
            isError: true,
          };
        }

        return {
          content: `
Education:
${education
  .map(
    edu => `
${edu.degree}
${edu.institution}, ${edu.year}
${edu.details ? edu.details : ''}
`
  )
  .join('\n')}
`,
        };
      },
    };
  },
};
