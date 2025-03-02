import { fetchProjectById, fetchProjects } from '../database/portfolioServices';
import { Command, CommandResult } from './types';

export const projectsCommand: Command = {
  name: 'projects',
  description: 'Display my projects',
  usage: 'projects [project_id]',
  execute: (args?: string) => {
    if (!args) {
      // Show all projects
      return {
        content: 'Fetching projects...',
        isAsync: true,
        isError: false,
        asyncResolver: async (): Promise<CommandResult> => {
          const projects = await fetchProjects();

          if (!projects || !projects.length) {
            return {
              content: 'Error: Could not fetch projects information.',
              isError: true,
            };
          }

          return {
            content: `My Projects:
${projects
  .map(
    project => `
- ${project.id}: ${project.title}\n
  ${project.description}\n
  Technologies: ${project.technologies.join(', ')}
  
  Type 'projects ${project.id}' for more details.
`
  )
  .join('\n')}
`,
            isError: false,
          };
        },
      };
    }

    // Show a specific project
    return {
      content: `Fetching project ${args}...`,
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        const project = await fetchProjectById(args);

        if (!project) {
          return {
            content: `Project '${args}' not found. Type 'projects' to see all projects.`,
            isError: true,
          };
        }

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
          isError: false,
        };
      },
    };
  },
};
