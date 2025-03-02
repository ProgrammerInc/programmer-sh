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
        const github =
          profile.contact.github && !profile.contact.github.startsWith('http')
            ? `https://${profile.contact.github}`
            : profile.contact.github;

        const linkedin =
          profile.contact.linkedin && !profile.contact.linkedin.startsWith('http')
            ? `https://${profile.contact.linkedin}`
            : profile.contact.linkedin;

        const twitter =
          profile.contact.twitter && !profile.contact.twitter.startsWith('http')
            ? `https://${profile.contact.twitter}`
            : profile.contact.twitter;

        const website =
          profile.contact.website && !profile.contact.website.startsWith('http')
            ? `https://${profile.contact.website}`
            : profile.contact.website;

        return {
          content: `<strong>About Me:</strong>

<strong>Name:</strong> <span class="text-terminal-prompt">${profile.full_name}</span>
<strong>Title:</strong> <span class="text-terminal-prompt">${profile.title}</span> @ <span class="text-terminal-prompt">${profile.company}</span>
<strong>Location:</strong> <span class="text-terminal-prompt">${profile.location}</span>

${profile.summary}

<strong>Contact Information:</strong>
  - <strong>E-mail:</strong> <a href="mailto:${profile.contact.email}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.email}</a>
  ${profile.contact.phone ? `- <strong>Phone:</strong> <a href="tel:${profile.contact.phone.replace(/\D/g, '')}" class="text-terminal-link hover:underline">${profile.contact.phone}</a>` : ''}
  ${github ? `- <strong>GitHub:</strong> <a href="${github}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.github}</a>` : ''}
  ${linkedin ? `- <strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.linkedin}</a>` : ''}
  ${twitter ? `- <strong>X/Twitter:</strong> <a href="${twitter}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.twitter}</a>` : ''}
  ${website ? `- <strong>Website:</strong> <a href="${website}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.website}</a>` : ''}
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
        const github =
          profile.contact.github && !profile.contact.github.startsWith('http')
            ? `https://${profile.contact.github}`
            : profile.contact.github;

        const linkedin =
          profile.contact.linkedin && !profile.contact.linkedin.startsWith('http')
            ? `https://${profile.contact.linkedin}`
            : profile.contact.linkedin;

        const twitter =
          profile.contact.twitter && !profile.contact.twitter.startsWith('http')
            ? `https://${profile.contact.twitter}`
            : profile.contact.twitter;

        const website =
          profile.contact.website && !profile.contact.website.startsWith('http')
            ? `https://${profile.contact.website}`
            : profile.contact.website;

        return {
          content: `<strong>My Contact Information:</strong>

  - <strong>E-mail:</strong> <a href="mailto:${profile.contact.email}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.email}</a>
  ${profile.contact.phone ? `- <strong>Phone:</strong> <a href="tel:${profile.contact.phone.replace(/\D/g, '')}" class="text-terminal-link hover:underline">${profile.contact.phone}</a>` : ''}
  ${linkedin ? `- <strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.linkedin}</a>` : ''}
  ${github ? `- <strong>GitHub:</strong> <a href="${github}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.github}</a>` : ''}
  ${twitter ? `- <strong>X/Twitter:</strong> <a href="${twitter}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.twitter}</a>` : ''}
  ${website ? `- <strong>Website:</strong> <a href="${website}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.website}</a>` : ''}
`,
          isError: false,
        };
      },
    };
  },
};
