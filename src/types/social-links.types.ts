/**
 * Social Links Types
 *
 * Type definitions for social media links and related functionality
 */

/**
 * Supported social media platform types
 */
export type SocialLinkType = 'bitbucket' | 'bluesky' | 'cashapp' | 'discord' | 'email' | 
  'facebook' | 'github' | 'gitlab' | 'instagram' | 'linkedin' | 'mastodon' | 
  'patreon' | 'paypal' | 'pinterest' | 'reddit' | 'slack' | 'snapchat' | 
  'telegram' | 'threads' | 'tiktok' | 'twitter' | 'venmo' | 'website' | 'youtube';

/**
 * Social link information interface
 */
export interface SocialLink {
  /** Type of social media platform */
  type: 'github' | 'linkedin' | 'twitter' | 'email' | 'website';
  /** URL or identifier for the social media profile */
  url: string;
  /** Display label (optional, defaults to the capitalized type) */
  label?: string;
  /** Icon identifier (optional, defaults to the type) */
  icon?: string;
}

/**
 * Collection of social links by type
 */
export interface SocialLinkCollection {
  [key: string]: SocialLink;
}

/**
 * Function to validate a social link URL
 * 
 * @param url - The URL to validate
 * @param type - The type of social link
 * @returns Whether the URL is valid for the given type
 */
export function isValidSocialLinkUrl(url: string, type: SocialLink['type']): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  // Basic URL validation
  try {
    new URL(url);
  } catch (e) {
    // Special case for email which might not be a full URL
    if (type === 'email' && url.includes('@')) {
      return true;
    }
    return false;
  }
  
  return true;
}

export default SocialLink;
