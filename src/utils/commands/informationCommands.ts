
import { fetchProfile } from '../database/portfolioServices';
import { Command, CommandResult } from './types';

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

- E-mail: <a href="mailto:${profile.contact.email}" target="_blank">${profile.contact.email}</a>
- Phone: ${profile.contact.phone}
${profile.contact.github ? `- GitHub: <a href="${profile.contact.github}" target="_blank">${profile.contact.github}</a>` : ''}
${profile.contact.linkedin ? `- LinkedIn: <a href="${profile.contact.linkedin}" target="_blank">${profile.contact.linkedin}</a>` : ''}
${profile.contact.twitter ? `- X/Twitter: <a href="${profile.contact.twitter}" target="_blank">${profile.contact.twitter}</a>` : ''}
${profile.contact.website ? `- Website: <a href="${profile.contact.website}" target="_blank">${profile.contact.website}</a>` : ''}
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

E-mail: <a href="mailto:${profile.contact.email}" target="_blank">${profile.contact.email}</a>
${profile.contact.phone ? `Phone: ${profile.contact.phone}` : ''}
${profile.contact.linkedin ? `LinkedIn: <a href="${profile.contact.linkedin}" target="_blank">${profile.contact.linkedin}</a>` : ''}
${profile.contact.github ? `GitHub: <a href="${profile.contact.github}" target="_blank">${profile.contact.github}</a>` : ''}
${profile.contact.twitter ? `X/Twitter: <a href="${profile.contact.twitter}" target="_blank">${profile.contact.twitter}</a>` : ''}
${profile.contact.website ? `Website: <a href="${profile.contact.website}" target="_blank">${profile.contact.website}</a>` : ''}
`,
          isError: false,
        };
      },
    };
  },
};
