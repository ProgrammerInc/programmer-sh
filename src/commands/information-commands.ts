import { fetchProfile } from '../services/database/portfolio-services';
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
            isError: true
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
          content: `\nAbout Me:\n
Name: <span class="text-terminal-prompt">${profile.full_name}</span>
Title: <span class="text-terminal-prompt">${profile.title}</span> @ <span class="text-terminal-prompt">${profile.company}</span>
Location: <span class="text-terminal-prompt">${profile.location}</span>

${profile.summary}

Contact Information:

&nbsp;&nbsp;- E-mail: <a href="mailto:${profile.contact.email}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.email}</a>
  ${profile.contact.phone ? `&nbsp;&nbsp;- Phone: <a href="tel:${profile.contact.phone.replace(/\D/g, '')}" class="text-terminal-link hover:underline">${profile.contact.phone}</a>` : ''}
  ${github ? `&nbsp;&nbsp;- GitHub: <a href="${github}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.github.replace(/^https?:\/\//, '')}</a>` : ''}
  ${linkedin ? `&nbsp;&nbsp;- LinkedIn: <a href="${linkedin}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.linkedin.replace(/^https?:\/\//, '')}</a>` : ''}
  ${twitter ? `&nbsp;&nbsp;- Twitter/X: <a href="${twitter}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.twitter.replace(/^https?:\/\//, '')}</a>` : ''}
  ${website ? `&nbsp;&nbsp;- Website: <a href="${website}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.website.replace(/^https?:\/\//, '')}</a>` : ''}\n\n`,
          isError: false
        };
      }
    };
  }
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
            isError: true
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
          content: `\nMy Contact Information:\n
Name: <span class="text-terminal-prompt">${profile.full_name}</span>
Title: <span class="text-terminal-prompt">${profile.title}</span> @ <span class="text-terminal-prompt">${profile.company}</span>
Location: <span class="text-terminal-prompt">${profile.location}</span>

&nbsp;&nbsp;- E-mail: <a href="mailto:${profile.contact.email}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.email}</a>
  ${profile.contact.phone ? `&nbsp;&nbsp;- Phone: <a href="tel:${profile.contact.phone.replace(/\D/g, '')}" class="text-terminal-link hover:underline">${profile.contact.phone}</a>` : ''}
  ${github ? `&nbsp;&nbsp;- GitHub: <a href="${github}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.github.replace(/^https?:\/\//, '')}</a>` : ''}
  ${linkedin ? `&nbsp;&nbsp;- LinkedIn: <a href="${linkedin}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.linkedin.replace(/^https?:\/\//, '')}</a>` : ''}
  ${twitter ? `&nbsp;&nbsp;- Twitter/X: <a href="${twitter}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.twitter.replace(/^https?:\/\//, '')}</a>` : ''}
  ${website ? `&nbsp;&nbsp;- Website: <a href="${website}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.website.replace(/^https?:\/\//, '')}</a>` : ''}\n\n`,
          isError: false
        };
      }
    };
  }
};
