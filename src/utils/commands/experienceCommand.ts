import { fetchExperience } from '../database/portfolioServices';
import { Command, CommandResult } from './types';

export const experienceCommand: Command = {
  name: 'experience',
  description: 'Display my work experience',
  execute: () => {
    return {
      content: 'Fetching experience...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        const experience = await fetchExperience();

        if (!experience || !experience.length) {
          return {
            content: 'Error: Could not fetch experience information.',
            isError: true,
          };
        }

        return {
          content: `<strong>My Work Experience:</strong>
${experience
  .map(
    exp => `
${exp.position} at ${exp.company}
${exp.duration}

${exp.description}

Technologies: ${exp.technologies.join(', ')}

Achievements:
${exp.achievements.map(achievement => `- ${achievement}`).join('\n')}
`
  )
  .join('\n')}`,
          isError: false,
        };
      },
    };
  },
};
