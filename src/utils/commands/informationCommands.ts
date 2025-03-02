
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
      asyncResolver: async (): Promise<CommandResult> => {
        const profile = await fetchProfile();
        
        if (!profile) {
          return {
            content: 'Error: Could not fetch profile information.\nPlease try again later or contact the administrator.',
            isError: true
          };
        }

        return {
          content: `
${profile.name} - ${profile.title}
${profile.location}

${profile.summary}

Contact:
- Email: ${profile.contact.email}
${profile.contact.github ? `- GitHub: ${profile.contact.github}` : ''}
${profile.contact.linkedin ? `- LinkedIn: ${profile.contact.linkedin}` : ''}
${profile.contact.twitter ? `- X/Twitter: ${profile.contact.twitter}` : ''}
${profile.contact.website ? `- Website: ${profile.contact.website}` : ''}
`,
        };
      }
    };
  },
};

// Skills command implementation
export const skillsCommand: Command = {
  name: 'skills',
  description: 'List my technical skills',
  execute: () => {
    return {
      content: 'Fetching skills...',
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        const profile = await fetchProfile();
        
        if (!profile || !profile.skills.length) {
          return {
            content: 'Error: Could not fetch skills information.\nPlease try again later or contact the administrator.',
            isError: true
          };
        }

        return {
          content: `
Skills:

${profile.skills
  .map(
    skillCategory => `
${skillCategory.category}:
${skillCategory.items.map(skill => `- ${skill}`).join('\n')}
`
  )
  .join('\n')}
`,
        };
      }
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
      asyncResolver: async (): Promise<CommandResult> => {
        const profile = await fetchProfile();
        
        if (!profile) {
          return {
            content: 'Error: Could not fetch contact information.\nPlease try again later or contact the administrator.',
            isError: true
          };
        }

        return {
          content: `
Contact Information:

Email: ${profile.contact.email}
${profile.contact.phone ? `Phone: ${profile.contact.phone}` : ''}
${profile.contact.linkedin ? `LinkedIn: ${profile.contact.linkedin}` : ''}
${profile.contact.github ? `GitHub: ${profile.contact.github}` : ''}
${profile.contact.twitter ? `X/Twitter: ${profile.contact.twitter}` : ''}
${profile.contact.website ? `Website: ${profile.contact.website}` : ''}
`,
        };
      }
    };
  },
};
