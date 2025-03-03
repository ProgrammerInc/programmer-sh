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
          content: `<strong>My Work Experience:</strong>
${experience
  .map(
    exp => `
<strong>Position:</strong> <span class="text-terminal-prompt">${exp.position}</span> &amp; <span class="text-terminal-prompt">${exp.company}</span>
<strong>Duration:</strong> ${exp.duration}

<strong>Description:</strong> ${exp.description}
<strong>Technologies:</strong> ${exp.technologies.map(tech => `<a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${tech}" target="_blank">${tech}</a>`).join(', ')}

<strong>Achievements:</strong>
${exp.achievements.map(achievement => `- ${achievement}`).join('\n')}
`
  )
  .join('\n')}`,
          isError: false
        };
      }
    };
  }
};
