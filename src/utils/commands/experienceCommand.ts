import { Command, CommandResult } from './types';
import { fetchExperience } from '../database/portfolioServices';

export const experienceCommand: Command = {
  name: 'experience',
  description: 'Display my work experience',
  execute: () => {
    return {
      content: 'Fetching experience...',
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        const experience = await fetchExperience();

        if (!experience || !experience.length) {
          return {
            content: 'Error: Could not fetch experience information.',
            isError: true,
          };
        }

        return {
          content: `My Work Experience:
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
  .join('\n')}
`,
        };
      },
    };
  },
};
