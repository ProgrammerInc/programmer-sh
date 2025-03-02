import type { SocialLink } from '@/types/socialLinks';
import { fetchSocialLinks } from '@/utils/database/socialLinksService';
import { useEffect, useState } from 'react';

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
