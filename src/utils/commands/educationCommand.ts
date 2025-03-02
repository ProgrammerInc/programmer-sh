import portfolioData from '../../data/portfolioData';
import { Command } from './types';

export const educationCommand: Command = {
  name: 'education',
  description: 'Display my education background',
  execute: () => {
    return {
      content: `
Education:

${portfolioData.education
  .map(
    edu => `
${edu.degree}
${edu.institution}, ${edu.year}
${edu.details ? edu.details : ''}
`
  )
  .join('\n')}
`,
    };
  },
};
