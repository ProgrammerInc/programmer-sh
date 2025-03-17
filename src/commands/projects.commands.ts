import { fetchProjectById, fetchProjects } from '../services/database/portfolio.services';
import { createFeatureLogger } from '../services/logger/logger.utils';
import { Command, CommandResult } from './command.types';

// Create a dedicated logger for projects commands
const projectsLogger = createFeatureLogger('ProjectsCommands');

/**
 * Interface representing a project record
 */
interface Project {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  github_url?: string;
  url?: string;
}

/**
 * Command to display projects information
 */
export const projectsCommand: Command = {
  name: 'projects',
  description: 'Display my projects',
  usage: 'projects [project_id]',
  execute: (args?: string): CommandResult => {
    if (!args) {
      // Show all projects
      projectsLogger.info('Executing projects command - listing all projects');
      return {
        content: 'Fetching projects...',
        isAsync: true,
        isError: false,
        asyncResolver: async (): Promise<CommandResult> => {
          try {
            const projects = await fetchProjects() as Project[];

            if (!projects || !projects.length) {
              projectsLogger.error('Failed to fetch projects', { reason: 'Empty response' });
              return {
                content: 'Error: Could not fetch projects information.',
                isError: true
              };
            }

            projectsLogger.info('Successfully fetched projects', { count: projects.length });
            
            const formattedProjects = formatProjectsList(projects);
            
            return {
              content: `\nMy Projects:\n${formattedProjects}`,
              isError: false,
              rawHTML: true
            };
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            projectsLogger.error('Error fetching all projects', { error: errorMessage });
            return {
              content: `Error: Failed to fetch projects. ${errorMessage}`,
              isError: true
            };
          }
        }
      };
    }

    // Show a specific project
    projectsLogger.info('Executing projects command - specific project', { projectId: args });
    return {
      content: `Fetching project ${args}...`,
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const project = await fetchProjectById(args) as Project | null;

          if (!project) {
            projectsLogger.warn('Project not found', { projectId: args });
            return {
              content: `Project '${args}' not found. Type 'projects' to see all projects.`,
              isError: true
            };
          }

          projectsLogger.info('Successfully fetched project', { projectId: args, title: project.title });
          
          const formattedProject = formatSingleProject(project);
          
          return {
            content: formattedProject,
            isError: false,
            rawHTML: true
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          projectsLogger.error('Error fetching specific project', { projectId: args, error: errorMessage });
          return {
            content: `Error: Failed to fetch project details. ${errorMessage}`,
            isError: true
          };
        }
      }
    };
  }
};

/**
 * Format a list of projects into a readable HTML string
 * @param projects - Array of project records to format
 * @returns Formatted HTML string for all projects
 */
function formatProjectsList(projects: Project[]): string {
  try {
    const formattedProjects = projects
      .map(
        project => `
Project: <span class="text-terminal-prompt">${project.title}</span>
Description: ${project.description}

Technologies: ${formatTechnologies(project.technologies)}

<span class="text-terminal-prompt">Tip:</span> Type <span class="command-link" data-command="projects ${project.id}">projects ${project.id}</span> for more details.
`
      )
      .join('\n<hr class="terminal-divider" />');
      
    return formattedProjects;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    projectsLogger.error('Error formatting projects list', { error: errorMessage });
    return 'Error formatting projects list';
  }
}

/**
 * Format a single project into a detailed HTML display
 * @param project - Project record to format
 * @returns Formatted HTML string for a single project
 */
function formatSingleProject(project: Project): string {
  try {
    return `
Project: <span class="text-terminal-prompt">${project.title}</span>
Description: ${project.description}

Highlights:
${formatHighlights(project.highlights)}

Technologies: ${formatTechnologies(project.technologies)}

${project.github_url ? `GitHub: <a class="text-terminal-link hover:underline" href="${project.github_url}" target="_blank">${project.github_url.replace('https://', '')}</a>` : ''}
${project.url ? `Website: <a class="text-terminal-link hover:underline" href="${project.url}" target="_blank">${project.url}</a>` : ''}\n\n`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    projectsLogger.error('Error formatting single project', { error: errorMessage });
    return 'Error formatting project details';
  }
}

/**
 * Format project highlights as a bulleted list
 * @param highlights - Array of highlight strings
 * @returns Formatted HTML string for highlights
 */
function formatHighlights(highlights: string[]): string {
  try {
    if (!highlights || !highlights.length) {
      return 'None specified';
    }
    
    return highlights.map(highlight => `&nbsp;&nbsp;- ${highlight}`).join('\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    projectsLogger.error('Error formatting highlights', { error: errorMessage });
    return 'Error formatting highlights';
  }
}

/**
 * Format technologies as a comma-separated list with links
 * @param technologies - Array of technology names
 * @returns Formatted HTML string for technologies
 */
function formatTechnologies(technologies: string[]): string {
  try {
    if (!technologies || !technologies.length) {
      return 'None specified';
    }
    
    return technologies
      .sort()
      .map(
        tech =>
          `<a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${tech}" target="_blank">${tech}</a>`
      )
      .join(', ');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    projectsLogger.error('Error formatting technologies', { error: errorMessage });
    return 'Error formatting technologies';
  }
}
