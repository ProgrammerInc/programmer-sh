
import { Command, CommandResult } from './types';
import { fetchProfile } from '../database/portfolioServices';

// About command implementation
export const aboutCommand: Command = {
  name: 'about',
  description: 'Display information about me',
  execute: () => {
    return {
      content: 'Fetching about information...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        const profile = await fetchProfile();

        if (!profile) {
          return {
            content: 'Error: Could not fetch profile information.',
            isError: true,
          };
        }

        return {
          content: `About Me:

Name: ${profile.full_name}
Title: ${profile.title} @ ${profile.company}
Location: ${profile.location}

${profile.summary}

Contact:

- E-mail: ${profile.contact.email}
- Phone: ${profile.contact.phone}
${profile.contact.github ? `- GitHub: ${profile.contact.github}` : ''}
${profile.contact.linkedin ? `- LinkedIn: ${profile.contact.linkedin}` : ''}
${profile.contact.twitter ? `- X/Twitter: ${profile.contact.twitter}` : ''}
${profile.contact.website ? `- Website: ${profile.contact.website}` : ''}
`,
          isError: false,
        };
      },
    };
  },
};

// Contact command implementation
export const contactCommand: Command = {
  name: 'contact',
  description: 'Display my contact information',
  execute: () => {
    return {
      content: 'Fetching contact information...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        const profile = await fetchProfile();

        if (!profile) {
          return {
            content: 'Error: Could not fetch contact information.',
            isError: true,
          };
        }

        return {
          content: `My Contact Information:

E-mail: ${profile.contact.email}
${profile.contact.phone ? `Phone: ${profile.contact.phone}` : ''}
${profile.contact.linkedin ? `LinkedIn: ${profile.contact.linkedin}` : ''}
${profile.contact.github ? `GitHub: ${profile.contact.github}` : ''}
${profile.contact.twitter ? `X/Twitter: ${profile.contact.twitter}` : ''}
${profile.contact.website ? `Website: ${profile.contact.website}` : ''}
`,
          isError: false,
        };
      },
    };
  },
};
