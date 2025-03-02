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
          content: `<strong>My Education:</strong>

${education
  .map(
    edu => `<strong>Degree/Major:</strong> ${edu.degree}
<strong>Institution:</strong> ${edu.institution}, ${edu.year}
${edu.details ? `<strong>Details:</strong> ${edu.details}` : ''}`
  )
  .join('\n')}`,
          isError: false,
        };
      },
    };
  },
};
