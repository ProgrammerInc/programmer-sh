/**
 * Education Service
 *
 * Handles retrieval of education data from the database
 * with optimized query performance.
 */

import { createServiceLogger, logError } from '@/services/logger/logger.utils';
import { logDbError, supabase } from '@/utils/supabase.utils';
import { DbEducation, Education } from './portfolio.types';

// Create a dedicated logger for education service
const dbLogger = createServiceLogger('EducationService');

// In-memory cache for education data
let educationCache: Education[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Maps a database education record to the application Education type
 */
const mapDbEducationToEducation = (edu: DbEducation): Education => ({
  degree: edu.degree,
  institution: edu.institution,
  duration: edu.duration,
  details: edu.details
});

/**
 * Fetch education data from the database
 */
export const fetchEducation = async (): Promise<Education[]> => {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (educationCache && now - lastFetchTime < CACHE_TTL) {
      return educationCache;
    }

    const { data: educationData, error: educationError } = await supabase
      .from('education')
      .select('*');

    if (educationError) {
      logDbError('fetchEducation', educationError);
      return [];
    }

    if (!educationData || educationData.length === 0) {
      dbLogger.error('No education data found in the database');
      return [];
    }

    const education = educationData.map(mapDbEducationToEducation);

    // Update cache
    educationCache = education;
    lastFetchTime = now;

    return education;
  } catch (error) {
    logError('Error fetching education:', error, 'EducationService');
    return [];
  }
};

/**
 * Invalidates the education cache, forcing the next fetch to get fresh data
 */
export const invalidateEducationCache = (): void => {
  educationCache = null;
  lastFetchTime = 0;
  dbLogger.debug('Education cache invalidated');
};
