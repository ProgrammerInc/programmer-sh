
import portfolioData from '../../data/portfolioData';
import { Command } from './types';

export const resumeCommand: Command = {
  name: 'resume',
  description: 'Display my resume',
  execute: () => {
    return {
      content: `
Resume - ${portfolioData.name}
${portfolioData.title}
${portfolioData.location}

SUMMARY
${portfolioData.summary}

EXPERIENCE
${portfolioData.experience.map(exp => `
${exp.position} at ${exp.company} (${exp.duration})
${exp.description}
Key achievements:
${exp.achievements.map(achievement => `- ${achievement}`).join('\n')}
`).join('\n')}

EDUCATION
${portfolioData.education.map(edu => `
${edu.degree}
${edu.institution}, ${edu.year}
`).join('\n')}

SKILLS
${portfolioData.skills.map(skillCategory => `
${skillCategory.category}: ${skillCategory.items.join(', ')}
`).join('\n')}

CONTACT
Email: ${portfolioData.contact.email}
Phone: +1 (347) 503-3967
${portfolioData.contact.linkedin ? `LinkedIn: ${portfolioData.contact.linkedin}` : ''}
${portfolioData.contact.github ? `GitHub: ${portfolioData.contact.github}` : ''}
`
    };
  }
};
