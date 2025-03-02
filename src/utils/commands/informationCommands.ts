import portfolioData from '../../data/portfolioData';
import { Command } from './types';

// About command implementation
export const aboutCommand: Command = {
  name: 'about',
  description: 'Display information about me',
  execute: () => {
    return {
      content: `
${portfolioData.name} - ${portfolioData.title}
${portfolioData.location}

${portfolioData.summary}

Contact:
- Email: ${portfolioData.contact.email}
${portfolioData.contact.github ? `- GitHub: ${portfolioData.contact.github}` : ''}
${portfolioData.contact.linkedin ? `- LinkedIn: ${portfolioData.contact.linkedin}` : ''}
${portfolioData.contact.twitter ? `- X/Twitter: ${portfolioData.contact.twitter}` : ''}
${portfolioData.contact.website ? `- Website: ${portfolioData.contact.website}` : ''}
`,
    };
  },
};

// Skills command implementation
export const skillsCommand: Command = {
  name: 'skills',
  description: 'List my technical skills',
  execute: () => {
    return {
      content: `
Skills:

${portfolioData.skills
  .map(
    skillCategory => `
${skillCategory.category}:
${skillCategory.items.map(skill => `- ${skill}`).join('\n')}
`
  )
  .join('\n')}
`,
    };
  },
};

// Contact command implementation
export const contactCommand: Command = {
  name: 'contact',
  description: 'Display my contact information',
  execute: () => {
    return {
      content: `
Contact Information:

Email: ${portfolioData.contact.email}
${portfolioData.contact.phone ? `Phone: ${portfolioData.contact.phone}` : ''}
${portfolioData.contact.linkedin ? `LinkedIn: ${portfolioData.contact.linkedin}` : ''}
${portfolioData.contact.github ? `GitHub: ${portfolioData.contact.github}` : ''}
${portfolioData.contact.twitter ? `X/Twitter: ${portfolioData.contact.twitter}` : ''}
${portfolioData.contact.website ? `Website: ${portfolioData.contact.website}` : ''}
`,
    };
  },
};
