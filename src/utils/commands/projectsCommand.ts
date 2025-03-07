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
              isError: true
            };
          }

          return {
            content: `<strong>My Projects:</strong>

${projects
  .map(
    project => `<strong>Project:</strong> <span class="text-terminal-prompt">${project.title}</span>
<strong>Description:</strong> ${project.description}

<strong>Technologies:</strong> ${project.technologies.map(tech => `<a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${tech}" target="_blank">${tech}</a>`).join(', ')}

Type <span class="command-link" data-command="project ${project.id}">project ${project.id}</span> for more details.

`
  )
  .join('\n')}
`,
            isError: false
          };
        }
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
            isError: true
          };
        }

        return {
          content: `
<strong>Project:</strong> <span class="text-terminal-prompt">${project.title}</span>
<strong>Description:</strong> ${project.description}

<strong>Highlights:</strong>
${project.highlights.map(highlight => `  - ${highlight}`).join('\n')}

<strong>Technologies:</strong> ${project.technologies.map(tech => `<a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${tech}" target="_blank">${tech}</a>`).join(', ')}

${project.github_url ? `<strong>GitHub:</strong> <a class="text-terminal-link hover:underline" href="${project.github_url}" target="_blank">${project.github_url}</a>` : ''}
${project.url ? `<strong>Website:</strong> <a class="text-terminal-link hover:underline" href="${project.url}" target="_blank">${project.url}</a>` : ''}
`,
          isError: false
        };
      }
    };
  }
};
