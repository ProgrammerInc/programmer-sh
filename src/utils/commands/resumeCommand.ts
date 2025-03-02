import { Command, CommandResult } from './types';
import { fetchPortfolioData } from '../database/portfolioServices';

export const resumeCommand: Command = {
  name: 'resume',
  description: 'Display my resume',
  execute: () => {
    return {
      content: 'Fetching resume...',
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        const portfolioData = await fetchPortfolioData();

        if (!portfolioData) {
          return {
            content:
              'Error: Could not fetch resume information.\nPlease try again later or contact the administrator.',
            isError: true,
          };
        }

        return {
          content: `
Name: ${portfolioData.fullname}
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
${portfolioData.skills
  .map(
    skillCategory => `
${skillCategory.category}: ${skillCategory.items.join(', ')}
`
  )
  .join('\n')}

CONTACT

Email: ${portfolioData.contact.email}
Phone: ${portfolioData.contact.phone || 'N/A'}
LinkedIn: ${portfolioData.contact.linkedin || 'N/A'}
GitHub: ${portfolioData.contact.github || 'N/A'}
X/Twitter: ${portfolioData.contact.twitter || 'N/A'}
Website: ${portfolioData.contact.website || 'N/A'}
`,
        };
      },
    };
  },
};
