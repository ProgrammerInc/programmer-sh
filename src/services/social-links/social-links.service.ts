/**
 * Social Links Service
 *
 * Handles retrieval of social links data from the database
 * with optimized query performance.
 */

import { createServiceLogger, logError } from '@/services/logger/logger.utils';
import { supabase, isNotFoundError, logDbError } from '@/utils/supabase.utils';
import { ensureHttps } from '@/utils/app.utils';
import type { SocialLink } from '@/types/social-links.types';
import { fetchProfile } from '@/services/portfolio/portfolio.services';

// Create a dedicated logger for social links service
const socialLinksLogger = createServiceLogger('SocialLinks');

// In-memory cache for social links
let socialLinksCache: SocialLink[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch social links from the database or the profile
 */
export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (socialLinksCache && (now - lastFetchTime < CACHE_TTL)) {
      return socialLinksCache;
    }
    
    const profile = await fetchProfile();

    if (!profile) {
      logError(
        'Could not fetch profile for social links',
        new Error('Profile data not available'),
        'SocialLinks'
      );
      return [];
    }

    const socialLinks: SocialLink[] = [];

    // Add GitHub if available
    if (profile.contact.github) {
      socialLinks.push({
        type: 'github',
        url: ensureHttps(profile.contact.github)
      });
    }

    // Add LinkedIn if available
    if (profile.contact.linkedin) {
      socialLinks.push({
        type: 'linkedin',
        url: ensureHttps(profile.contact.linkedin)
      });
    }

    // Add Twitter/X if available
    if (profile.contact.twitter) {
      socialLinks.push({
        type: 'twitter',
        url: ensureHttps(profile.contact.twitter)
      });
    }

    // Add email if available
    if (profile.contact.email) {
      socialLinks.push({
        type: 'email',
        url: `mailto:${profile.contact.email}`
      });
    }

    // Add website if available
    if (profile.contact.website) {
      socialLinks.push({
        type: 'website',
        url: ensureHttps(profile.contact.website)
      });
    }

    // Update cache
    socialLinksCache = socialLinks;
    lastFetchTime = now;

    socialLinksLogger.debug('Fetched social links', { count: socialLinks.length });
    return socialLinks;
  } catch (error) {
    logError('Error fetching social links', error, 'SocialLinks');
    return [];
  }
};

/**
 * Invalidates the social links cache, forcing the next fetch to get fresh data
 */
export const invalidateSocialLinksCache = (): void => {
  socialLinksCache = null;
  lastFetchTime = 0;
  socialLinksLogger.debug('Social links cache invalidated');
};
