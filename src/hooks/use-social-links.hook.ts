import { fetchSocialLinks } from '@/services/database/social-links.service';
import { createFeatureLogger } from '@/services/logger/logger.utils';
import type { SocialLink } from '@/types/social-links.types';
import { useEffect, useState } from 'react';

// Create a dedicated logger for social links management
const socialLinksLogger = createFeatureLogger('SocialLinks');

/**
 * Interface for the return type of the useSocialLinks hook
 */
interface UseSocialLinksReturn {
  /** Array of social links */
  socialLinks: SocialLink[];
}

/**
 * Custom hook to fetch and manage social links
 * @returns Object containing the array of social links
 */
export const useSocialLinks = (): UseSocialLinksReturn => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const loadSocialLinks = async (): Promise<void> => {
      try {
        socialLinksLogger.debug('Fetching social links');
        const links = await fetchSocialLinks();
        setSocialLinks(links);
        socialLinksLogger.debug('Social links loaded successfully', { count: links.length });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        socialLinksLogger.error('Failed to load social links', { error: errorMessage });
      }
    };

    loadSocialLinks();
  }, []);

  return { socialLinks };
};

export default useSocialLinks;
