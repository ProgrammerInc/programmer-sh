import { fetchPortfolioData } from '../database/portfolioServices';
import { Command, CommandResult } from './types';

export const resumeCommand: Command = {
  name: 'resume',
  description: 'Display my resume',
  execute: () => {
    return {
      content: 'Fetching resume...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        const portfolioData = await fetchPortfolioData();

        if (!portfolioData) {
          return {
            content: 'Error: Could not fetch resume information.',
            isError: true,
          };
        }

        return {
          content: `My Resume:

Name: ${portfolioData.full_name}
Title: ${portfolioData.title}
Location: ${portfolioData.location}

SUMMARY

${portfolioData.summary}

EXPERIENCE
${portfolioData.experience
  .map(
    exp => `
${exp.position} at ${exp.company} (${exp.duration})
${exp.description}\n
Key achievements:
${exp.achievements.map(achievement => `- ${achievement}`).join('\n')}
`
  )
  .join('\n')}

EDUCATION
${portfolioData.education
  .map(
    edu => `
${edu.degree}
${edu.institution}, ${edu.year}
`
  )
  .join('\n')}

SKILLS

${portfolioData.skills.map(skillCategory => `${skillCategory.category}: ${skillCategory.items.join(', ')}`).join('\n')}


CONTACT

E-mail: ${portfolioData.contact.email}
Phone: ${portfolioData.contact.phone}
LinkedIn: ${portfolioData.contact.linkedin}
GitHub: ${portfolioData.contact.github}
X/Twitter: ${portfolioData.contact.twitter}
Website: ${portfolioData.contact.website}
`,
          isError: false,
        };
      },
    };
  },
};
