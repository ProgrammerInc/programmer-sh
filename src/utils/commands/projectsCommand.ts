
import portfolioData from '../../data/portfolioData';
import { Command, CommandResult } from './types';

export const projectsCommand: Command = {
  name: 'projects',
  description: 'Display my projects',
  usage: 'projects [project_id]',
  execute: (args?: string) => {
    if (!args) {
      // Show all projects
      return {
        content: `
Projects:

${portfolioData.projects
  .map(
    project => `
- ${project.id}: ${project.title}
  ${project.description}
  Technologies: ${project.technologies.join(', ')}
  
  Type 'projects ${project.id}' for more details.
`
  )
  .join('\n')}
`,
      };
    }

    // Show a specific project
    const project = portfolioData.projects.find(p => p.id === args);
    if (project) {
      return {
        content: `
Project: ${project.title}

${project.description}

Technologies: ${project.technologies.join(', ')}

Highlights:
${project.highlights.map(highlight => `- ${highlight}`).join('\n')}

${project.github ? `GitHub: ${project.github}` : ''}
${project.link ? `Live Demo: ${project.link}` : ''}
`,
      };
    } else {
      return {
        content: `Project '${args}' not found. Type 'projects' to see all projects.`,
        isError: true,
      };
    }
  },
};
