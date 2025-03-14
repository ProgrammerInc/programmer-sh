import { fetchExperience } from '../services/database/portfolio-services';
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
          content: `\nMy Experience:\n
${experience
  .sort(
    (a, b) =>
      new Date(b.duration.split(' - ')[0]).getTime() -
      new Date(a.duration.split(' - ')[0]).getTime()
  )
  .map(
    exp => `Position: <span class="text-terminal-prompt">${exp.position}</span> @ <span class="text-terminal-prompt">${exp.company}</span>
Duration: ${exp.duration}

Description: ${exp.description}

Achievements:
${exp.achievements.map(achievement => `&nbsp;&nbsp;- ${achievement}`).join('\n')}

Technologies: ${exp.technologies
      .sort()
      .map(
        tech =>
          `<a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${tech}" target="_blank">${tech}</a>`
      )
      .join(', ')}`
  )
  .join('\n\n<hr class="terminal-divider" />\n')}\n\n`,
          isError: false
        };
      }
    };
  }
};
