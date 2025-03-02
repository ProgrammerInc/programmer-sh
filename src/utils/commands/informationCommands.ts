
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

        // Ensure URLs have proper protocol for HTML anchors
        const github = profile.contact.github && !profile.contact.github.startsWith('http') 
          ? `https://${profile.contact.github}` 
          : profile.contact.github;
        
        const linkedin = profile.contact.linkedin && !profile.contact.linkedin.startsWith('http') 
          ? `https://${profile.contact.linkedin}` 
          : profile.contact.linkedin;
        
        const twitter = profile.contact.twitter && !profile.contact.twitter.startsWith('http') 
          ? `https://${profile.contact.twitter}` 
          : profile.contact.twitter;
        
        const website = profile.contact.website && !profile.contact.website.startsWith('http') 
          ? `https://${profile.contact.website}` 
          : profile.contact.website;

        return {
          content: `About Me:

Name: ${profile.full_name}
Title: ${profile.title} @ ${profile.company}
Location: ${profile.location}

${profile.summary}

Contact:

- E-mail: <a href="mailto:${profile.contact.email}" target="_blank">${profile.contact.email}</a>
- Phone: ${profile.contact.phone}
${github ? `- GitHub: <a href="${github}" target="_blank">${profile.contact.github}</a>` : ''}
${linkedin ? `- LinkedIn: <a href="${linkedin}" target="_blank">${profile.contact.linkedin}</a>` : ''}
${twitter ? `- X/Twitter: <a href="${twitter}" target="_blank">${profile.contact.twitter}</a>` : ''}
${website ? `- Website: <a href="${website}" target="_blank">${profile.contact.website}</a>` : ''}
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

        // Ensure URLs have proper protocol for HTML anchors
        const github = profile.contact.github && !profile.contact.github.startsWith('http') 
          ? `https://${profile.contact.github}` 
          : profile.contact.github;
        
        const linkedin = profile.contact.linkedin && !profile.contact.linkedin.startsWith('http') 
          ? `https://${profile.contact.linkedin}` 
          : profile.contact.linkedin;
        
        const twitter = profile.contact.twitter && !profile.contact.twitter.startsWith('http') 
          ? `https://${profile.contact.twitter}` 
          : profile.contact.twitter;
        
        const website = profile.contact.website && !profile.contact.website.startsWith('http') 
          ? `https://${profile.contact.website}` 
          : profile.contact.website;

        return {
          content: `My Contact Information:

E-mail: <a href="mailto:${profile.contact.email}" target="_blank">${profile.contact.email}</a>
${profile.contact.phone ? `Phone: ${profile.contact.phone}` : ''}
${linkedin ? `LinkedIn: <a href="${linkedin}" target="_blank">${profile.contact.linkedin}</a>` : ''}
${github ? `GitHub: <a href="${github}" target="_blank">${profile.contact.github}</a>` : ''}
${twitter ? `X/Twitter: <a href="${twitter}" target="_blank">${profile.contact.twitter}</a>` : ''}
${website ? `Website: <a href="${website}" target="_blank">${profile.contact.website}</a>` : ''}
`,
          isError: false,
        };
      },
    };
  },
};
