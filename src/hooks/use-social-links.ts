import { fetchSocialLinks } from '@/services/database/social-links.service';
import type { SocialLink } from '@/types/social-links.types';
import { useEffect, useState } from 'react';

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        const links = await fetchSocialLinks();
        setSocialLinks(links);
      } catch (error) {
        console.error('Failed to load social links:', error);
      }
    };

    loadSocialLinks();
  }, []);

  return { socialLinks };
};

export default useSocialLinks;
