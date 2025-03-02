
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

        // Create a vCard for the QR code
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.full_name}
TITLE:${profile.title}
ORG:${profile.company}
EMAIL:${profile.contact.email}
${profile.contact.phone ? `TEL:${profile.contact.phone}` : ''}
${website ? `URL:${website}` : ''}
${github ? `X-SOCIALPROFILE;TYPE=github:${github}` : ''}
${linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:${linkedin}` : ''}
${twitter ? `X-SOCIALPROFILE;TYPE=twitter:${twitter}` : ''}
END:VCARD`;

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
  ${twitter ? `- <strong>Twitter/X:</strong> <a href="${twitter}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.twitter}</a>` : ''}
  ${website ? `- <strong>Website:</strong> <a href="${website}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.website}</a>` : ''}

<div class="flex justify-center w-full mt-4">
  <div id="qrcode-container">
    <QRCode value="${encodeURIComponent(vCard)}" title="Scan to save contact information" />
  </div>
</div>
`,
          isError: false,
          rawHTML: true,
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

        // Create a vCard for the QR code
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.full_name}
TITLE:${profile.title}
ORG:${profile.company}
EMAIL:${profile.contact.email}
${profile.contact.phone ? `TEL:${profile.contact.phone}` : ''}
${website ? `URL:${website}` : ''}
${github ? `X-SOCIALPROFILE;TYPE=github:${github}` : ''}
${linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:${linkedin}` : ''}
${twitter ? `X-SOCIALPROFILE;TYPE=twitter:${twitter}` : ''}
END:VCARD`;

        return {
          content: `<strong>My Contact Information:</strong>

<strong>Name:</strong> <span class="text-terminal-prompt">${profile.full_name}</span>
<strong>Title:</strong> <span class="text-terminal-prompt">${profile.title}</span> @ <span class="text-terminal-prompt">${profile.company}</span>
<strong>Location:</strong> <span class="text-terminal-prompt">${profile.location}</span>

  - <strong>E-mail:</strong> <a href="mailto:${profile.contact.email}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.email}</a>
  ${profile.contact.phone ? `- <strong>Phone:</strong> <a href="tel:${profile.contact.phone.replace(/\D/g, '')}" class="text-terminal-link hover:underline">${profile.contact.phone}</a>` : ''}
  ${linkedin ? `- <strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.linkedin}</a>` : ''}
  ${github ? `- <strong>GitHub:</strong> <a href="${github}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.github}</a>` : ''}
  ${twitter ? `- <strong>Twitter/X:</strong> <a href="${twitter}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.twitter}</a>` : ''}
  ${website ? `- <strong>Website:</strong> <a href="${website}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.website}</a>` : ''}

<div class="flex justify-center w-full mt-4">
  <div id="qrcode-container">
    <QRCode value="${encodeURIComponent(vCard)}" title="Scan to save contact information" />
  </div>
</div>
`,
          isError: false,
          rawHTML: true,
        };
      },
    };
  },
};
