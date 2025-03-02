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
            isError: true,
          };
        }

        return {
          content: `My Skills:

${profile.skills.map(skillCategory => `${skillCategory.category}:\n${skillCategory.items.map(skill => `- ${skill}`).join('\n')}`).join('\n\n')}`,
          isError: false,
        };
      },
    };
  },
};
