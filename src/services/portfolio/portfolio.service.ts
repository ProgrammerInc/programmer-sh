/**
 * Portfolio Service
 *
 * Combines all portfolio-related services to provide complete portfolio data
 * with optimized query performance.
 */

import { createServiceLogger, logError } from '@/services/logger/logger.utils';
import { fetchEducation, invalidateEducationCache } from './education.service';
import { fetchExperience, invalidateExperienceCache } from './experience.service';
import { Profile } from './portfolio.types';
import { fetchProfile, invalidateProfileCache } from './profile.service';
import { fetchProjectById, fetchProjects, invalidateProjectsCache } from './projects.service';

// Create a dedicated logger for the main portfolio service
const dbLogger = createServiceLogger('PortfolioService');

/**
 * Fetch complete portfolio data by combining all portfolio services
 */
export const fetchPortfolioData = async (): Promise<Profile | null> => {
  try {
    const profile = await fetchProfile();
    if (!profile) {
      dbLogger.error('Could not fetch profile data');
      return null;
    }

    const [experience, projects, education] = await Promise.all([
      fetchExperience(),
      fetchProjects(),
      fetchEducation()
    ]);

    profile.experience = experience;
    profile.projects = projects;
    profile.education = education;

    return profile;
  } catch (error) {
    logError('Error fetching complete portfolio data:', error, 'PortfolioService');
    return null;
  }
};

/**
 * Invalidates all portfolio-related caches, forcing the next fetch to get fresh data
 */
export const invalidatePortfolioCache = (): void => {
  invalidateProfileCache();
  invalidateExperienceCache();
  invalidateProjectsCache();
  invalidateEducationCache();
  dbLogger.debug('All portfolio caches invalidated');
};

// Re-export individual service functions for direct access
export {
  fetchEducation,
  fetchExperience,
  fetchProfile,
  fetchProjectById,
  fetchProjects,
  invalidateEducationCache,
  invalidateExperienceCache,
  invalidateProfileCache,
  invalidateProjectsCache
};
