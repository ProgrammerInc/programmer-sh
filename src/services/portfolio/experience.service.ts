/**
 * Experience Service
 *
 * Handles retrieval of professional experience data from the database
 * with optimized query performance.
 */

import { createServiceLogger, logError } from '@/services/logger/logger.utils';
import { logDbError, supabase } from '@/utils/supabase.utils';
import { DbExperience, Experience } from './portfolio.types';

// Create a dedicated logger for experience service
const dbLogger = createServiceLogger('ExperienceService');

// In-memory cache for experience data
let experienceCache: Experience[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Maps a database experience record to the application Experience type
 */
const mapDbExperienceToExperience = (exp: DbExperience): Experience => ({
  company: exp.company,
  position: exp.position,
  duration: exp.duration,
  description: exp.description,
  technologies: exp.experience_technologies.map(tech => tech.name),
  achievements: exp.experience_achievements.map(ach => ach.description)
});

/**
 * Fetch experience data from the database
 */
export const fetchExperience = async (): Promise<Experience[]> => {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (experienceCache && now - lastFetchTime < CACHE_TTL) {
      return experienceCache;
    }

    const { data: experienceData, error: experienceError } = await supabase.from('experiences')
      .select(`
        id,
        company,
        position,
        duration,
        description,
        experience_technologies (name),
        experience_achievements (description)
      `);

    if (experienceError) {
      logDbError('fetchExperience', experienceError);
      return [];
    }

    if (!experienceData || experienceData.length === 0) {
      dbLogger.error('No experience data found in the database');
      return [];
    }

    const experiences = experienceData.map(mapDbExperienceToExperience);

    // Update cache
    experienceCache = experiences;
    lastFetchTime = now;

    return experiences;
  } catch (error) {
    logError('Error fetching experience:', error, 'ExperienceService');
    return [];
  }
};

/**
 * Invalidates the experience cache, forcing the next fetch to get fresh data
 */
export const invalidateExperienceCache = (): void => {
  experienceCache = null;
  lastFetchTime = 0;
  dbLogger.debug('Experience cache invalidated');
};
