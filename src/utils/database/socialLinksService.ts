
import type { SocialLink } from '../../types/socialLinks';
import { fetchProfile } from './portfolioServices';

// Helper to ensure URLs have https:// prefix
const ensureHttps = (url: string): string => {
  if (!url) return url;
  return url.startsWith('http') ? url : `https://${url}`;
};

// Fetch social links from the profile
export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  try {
    const profile = await fetchProfile();

    if (!profile) {
      console.error('Could not fetch profile for social links');
      return [];
    }

    const socialLinks: SocialLink[] = [];

    // Add GitHub if available
    if (profile.contact.github) {
      socialLinks.push({
        type: 'github',
        url: ensureHttps(profile.contact.github),
      });
    }

    // Add LinkedIn if available
    if (profile.contact.linkedin) {
      socialLinks.push({
        type: 'linkedin',
        url: ensureHttps(profile.contact.linkedin),
      });
    }

    // Add Twitter/X if available
    if (profile.contact.twitter) {
      socialLinks.push({
        type: 'twitter',
        url: ensureHttps(profile.contact.twitter),
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

    console.log('Fetched social links:', socialLinks); // Debug log
    return socialLinks;
  } catch (error) {
    console.error('Error fetching social links:', error);
    return [];
  }
};
