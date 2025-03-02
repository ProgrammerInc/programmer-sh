
import { useState, useEffect } from 'react';
import { fetchSocialLinks } from '@/utils/database/socialLinksService';
import type { SocialLink } from '@/types/socialLinks';

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        console.log('Fetching social links...');
        const links = await fetchSocialLinks();
        console.log('Social links loaded:', links);
        setSocialLinks(links);
      } catch (error) {
        console.error('Failed to load social links:', error);
      }
    };

    loadSocialLinks();
  }, []);

  return { socialLinks };
};
