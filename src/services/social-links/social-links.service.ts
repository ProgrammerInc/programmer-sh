/**
 * Social Links Service
 *
 * Handles retrieval of social links data from the database
 * with optimized query performance.
 */

import { createServiceLogger, logError } from '@/services/logger/logger.utils';
import { supabase, isNotFoundError, logDbError } from '@/utils/supabase.utils';
import { ensureHttps } from '@/utils/app.utils';
import { fetchProfile } from '@/services/portfolio/profile.service';
import { SocialLink, SocialLinkWithSource, SocialLinkSettings } from './social-links.types';

// Create a dedicated logger for social links service
const socialLinksLogger = createServiceLogger('SocialLinks');

// In-memory cache for social links
let socialLinksCache: SocialLinkWithSource[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch social links from the profile data
 */
const getSocialLinksFromProfile = async (): Promise<SocialLinkWithSource[]> => {
  try {
    const profile = await fetchProfile();

    if (!profile) {
      logError(
        'Could not fetch profile for social links',
        new Error('Profile data not available'),
        'SocialLinks'
      );
      return [];
    }

    const socialLinks: SocialLinkWithSource[] = [];

    // Add GitHub if available
    if (profile.contact.github) {
      socialLinks.push({
        type: 'github',
        url: ensureHttps(profile.contact.github),
        source: 'profile'
      });
    }

    // Add LinkedIn if available
    if (profile.contact.linkedin) {
      socialLinks.push({
        type: 'linkedin',
        url: ensureHttps(profile.contact.linkedin),
        source: 'profile'
      });
    }

    // Add Twitter/X if available
    if (profile.contact.twitter) {
      socialLinks.push({
        type: 'twitter',
        url: ensureHttps(profile.contact.twitter),
        source: 'profile'
      });
    }

    // Add email if available
    if (profile.contact.email) {
      socialLinks.push({
        type: 'email',
        url: `mailto:${profile.contact.email}`,
        source: 'profile'
      });
    }

    // Add website if available
    if (profile.contact.website) {
      socialLinks.push({
        type: 'website',
        url: ensureHttps(profile.contact.website),
        source: 'profile'
      });
    }

    // Add additional social networks if available
    if (profile.contact.facebook) {
      socialLinks.push({
        type: 'facebook',
        url: ensureHttps(profile.contact.facebook),
        source: 'profile'
      });
    }

    if (profile.contact.youtube) {
      socialLinks.push({
        type: 'youtube',
        url: ensureHttps(profile.contact.youtube),
        source: 'profile'
      });
    }

    if (profile.contact.gitlab) {
      socialLinks.push({
        type: 'gitlab',
        url: ensureHttps(profile.contact.gitlab),
        source: 'profile'
      });
    }

    if (profile.contact.bitbucket) {
      socialLinks.push({
        type: 'bitbucket',
        url: ensureHttps(profile.contact.bitbucket),
        source: 'profile'
      });
    }

    if (profile.contact.reddit) {
      socialLinks.push({
        type: 'reddit',
        url: ensureHttps(profile.contact.reddit),
        source: 'profile'
      });
    }

    if (profile.contact.discord) {
      socialLinks.push({
        type: 'discord',
        url: ensureHttps(profile.contact.discord),
        source: 'profile'
      });
    }

    return socialLinks;
  } catch (error) {
    logError('Error getting social links from profile', error, 'SocialLinks');
    return [];
  }
};

/**
 * Fetch social links from the database or the profile with customizable settings
 * @param settings Optional settings to customize the social links retrieval
 */
export const fetchSocialLinks = async (settings?: SocialLinkSettings): Promise<SocialLink[]> => {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (socialLinksCache && (now - lastFetchTime < CACHE_TTL)) {
      // Use the cached social links but apply settings filters
      return filterSocialLinks(socialLinksCache, settings);
    }
    
    // Get social links from profile
    const socialLinks = await getSocialLinksFromProfile();

    // Update cache
    socialLinksCache = socialLinks;
    lastFetchTime = now;

    socialLinksLogger.debug('Fetched social links', { count: socialLinks.length });
    
    // Apply filters based on settings
    return filterSocialLinks(socialLinks, settings);
  } catch (error) {
    logError('Error fetching social links', error, 'SocialLinks');
    return [];
  }
};

/**
 * Filter social links based on provided settings
 */
const filterSocialLinks = (links: SocialLinkWithSource[], settings?: SocialLinkSettings): SocialLink[] => {
  // If no settings, return all links without the source property
  if (!settings) {
    return links.map(({ type, url }) => ({ type, url }));
  }

  // Apply filters
  let filteredLinks = [...links];

  // Filter out email if specified
  if (settings.includeEmail === false) {
    filteredLinks = filteredLinks.filter(link => link.type !== 'email');
  }

  // Filter out website if specified
  if (settings.includeWebsite === false) {
    filteredLinks = filteredLinks.filter(link => link.type !== 'website');
  }

  // Apply limit if specified
  if (typeof settings.limit === 'number' && settings.limit > 0) {
    filteredLinks = filteredLinks.slice(0, settings.limit);
  }

  // Return links without the source property
  return filteredLinks.map(({ type, url }) => ({ type, url }));
};

/**
 * Invalidates the social links cache, forcing the next fetch to get fresh data
 */
export const invalidateSocialLinksCache = (): void => {
  socialLinksCache = null;
  lastFetchTime = 0;
  socialLinksLogger.debug('Social links cache invalidated');
};
