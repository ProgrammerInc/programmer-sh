/**
 * Projects Service
 *
 * Handles retrieval of projects data from the database
 * with optimized query performance.
 */

import { createServiceLogger, logError } from '@/services/logger/logger.utils';
import { isNotFoundError, logDbError, supabase } from '@/utils/supabase.utils';
import { DbProject, Project } from './portfolio.types';

// Create a dedicated logger for projects service
const dbLogger = createServiceLogger('ProjectsService');

// In-memory cache for projects data
let projectsCache: Project[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Maps a database project record to the application Project type
 */
const mapDbProjectToProject = (project: DbProject): Project => ({
  id: project.project_key, // Using project_key as the id for backward compatibility
  title: project.title,
  description: project.description,
  url: project.url,
  github_url: project.github_url,
  image: project.image,
  technologies: project.project_technologies.map(tech => tech.name),
  highlights: project.project_highlights.map(highlight => highlight.description)
});

/**
 * Fetch all projects data from the database
 */
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (projectsCache && now - lastFetchTime < CACHE_TTL) {
      return projectsCache;
    }

    const { data: projectsData, error: projectsError } = await supabase.from('projects').select(`
        id,
        project_key,
        title,
        description,
        url,
        github_url,
        image,
        project_technologies (name),
        project_highlights (description)
      `);

    if (projectsError) {
      logDbError('fetchProjects', projectsError);
      return [];
    }

    if (!projectsData || projectsData.length === 0) {
      dbLogger.error('No projects data found in the database');
      return [];
    }

    const projects = projectsData.map(mapDbProjectToProject);

    // Update cache
    projectsCache = projects;
    lastFetchTime = now;

    return projects;
  } catch (error) {
    logError('Error fetching projects:', error, 'ProjectsService');
    return [];
  }
};

/**
 * Fetch a specific project by ID
 */
export const fetchProjectById = async (projectId: string): Promise<Project | null> => {
  try {
    // Try to find the project in the cache first
    if (projectsCache) {
      const cachedProject = projectsCache.find(project => project.id === projectId);
      if (cachedProject) {
        return cachedProject;
      }
    }

    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select(
        `
        id,
        project_key,
        title,
        description,
        url,
        github_url,
        image,
        project_technologies (name),
        project_highlights (description)
      `
      )
      .eq('project_key', projectId)
      .single();

    if (projectError) {
      if (isNotFoundError(projectError, 'Project')) {
        return null;
      }
      logDbError(`fetchProjectById (${projectId})`, projectError);
      return null;
    }

    if (!projectData) return null;

    return mapDbProjectToProject(projectData);
  } catch (error) {
    logError(`Error fetching project with ID ${projectId}:`, error, 'ProjectsService');
    return null;
  }
};

/**
 * Invalidates the projects cache, forcing the next fetch to get fresh data
 */
export const invalidateProjectsCache = (): void => {
  projectsCache = null;
  lastFetchTime = 0;
  dbLogger.debug('Projects cache invalidated');
};
