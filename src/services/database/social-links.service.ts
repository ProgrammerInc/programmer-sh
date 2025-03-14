import { ensureHttps } from '@/utils/app.utils';
import type { SocialLink } from '../../types/social-links.types';
import { fetchProfile } from './portfolio.services';
import { createServiceLogger, logError } from '@/services/logger/logger.utils';

// Create a dedicated logger for social links service
const socialLinksLogger = createServiceLogger('SocialLinks');

// Fetch social links from the profile
export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  try {
    const profile = await fetchProfile();

    if (!profile) {
      logError('Could not fetch profile for social links', new Error('Profile data not available'), 'SocialLinks');
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

    socialLinksLogger.debug('Fetched social links', { count: socialLinks.length });
    return socialLinks;
  } catch (error) {
    logError('Error fetching social links', error, 'SocialLinks');
    return [];
  }
};
