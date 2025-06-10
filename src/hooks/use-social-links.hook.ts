import { createFeatureLogger } from '@/services/logger/logger.utils';
import { fetchSocialLinks } from '@/services/social-links/social-links.service';
import { SocialLink as ServiceSocialLink } from '@/services/social-links/social-links.types';
import type { SocialLink } from '@/types/social-links.types';
import { useEffect, useState } from 'react';

// Create a dedicated logger instance for social links
const socialLinksLogger = createFeatureLogger('SocialLinks');

/**
 * Maps a service social link to a component social link, filtering out unsupported types
 */
const mapServiceLinkToComponentLink = (serviceLink: ServiceSocialLink): SocialLink | null => {
  // Only include types supported by the component
  const supportedTypes = ['email', 'github', 'linkedin', 'twitter', 'website'] as const;
  type SupportedType = typeof supportedTypes[number];
  
  // Type guard to check if a string is a supported social link type
  const isSupportedType = (type: string): type is SupportedType => {
    return supportedTypes.includes(type as SupportedType);
  };
  
  if (!isSupportedType(serviceLink.type)) {
    socialLinksLogger.debug('Filtering out unsupported social link type', { type: serviceLink.type });
    return null;
  }
  
  return {
    type: serviceLink.type as SocialLink['type'],
    url: serviceLink.url,
    label: serviceLink.label,
    icon: serviceLink.icon
  };
};

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
        const serviceLinks = await fetchSocialLinks();
        
        // Map and filter service links to component-compatible links
        const componentLinks = serviceLinks
          .map(mapServiceLinkToComponentLink)
          .filter((link): link is SocialLink => link !== null);
          
        setSocialLinks(componentLinks);
        socialLinksLogger.debug('Social links loaded successfully', { 
          total: serviceLinks.length, 
          compatible: componentLinks.length 
        });
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
