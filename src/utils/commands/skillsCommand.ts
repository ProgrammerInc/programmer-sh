import { fetchProfile } from '../database/portfolioServices';
import { Command, CommandResult } from './types';
// Skills command implementation
export const skillsCommand: Command = {
  name: 'skills',
  description: 'List my technical skills',
  execute: () => {
    return {
      content: 'Fetching skills...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        const profile = await fetchProfile();

        if (!profile || !profile.skills.length) {
          return {
            content: 'Error: Could not fetch skills information.',
            isError: true
          };
        }

        return {
          content: `\nMy Skills:\n
${profile.skills
  .sort()
  .map(
    skillCategory =>
      `<span class="text-terminal-prompt font-normal">${skillCategory.category} Skills</span>\n${skillCategory.items
        .sort()
        .map(
          skill =>
            `&nbsp;&nbsp;- <a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${skill}" target="_blank">${skill}</a>`
        )
        .join('\n')}`
  )
  .join('\n\n')}\n\n`,
          isError: false
        };
      }
    };
  }
};
