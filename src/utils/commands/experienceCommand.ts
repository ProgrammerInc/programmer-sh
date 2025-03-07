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
            isError: true
          };
        }

        return {
          content: `<strong>My Experience:</strong>
${experience
  .map(
    exp => `
<strong>Position:</strong> <span class="text-terminal-prompt">${exp.position}</span> @ <span class="text-terminal-prompt">${exp.company}</span>
<strong>Duration:</strong> ${exp.duration}

<strong>Description:</strong> ${exp.description}

<strong>Achievements:</strong>
${exp.achievements.map(achievement => `- ${achievement}`).join('\n')}

<strong>Technologies:</strong> ${exp.technologies.map(tech => `<a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${tech}" target="_blank">${tech}</a>`).join(', ')}
`
  )
  .join('\n')}`,
          isError: false
        };
      }
    };
  }
};
