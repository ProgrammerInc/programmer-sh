
import portfolioData from '../../data/portfolioData';
import { Command } from './types';

export const experienceCommand: Command = {
  name: 'experience',
  description: 'Display my work experience',
  execute: () => {
    return {
      content: `
Work Experience:

${portfolioData.experience.map(exp => `
${exp.position} at ${exp.company}
${exp.duration}

${exp.description}

Technologies: ${exp.technologies.join(', ')}

Achievements:
${exp.achievements.map(achievement => `- ${achievement}`).join('\n')}
`).join('\n')}
`
    };
  }
};
