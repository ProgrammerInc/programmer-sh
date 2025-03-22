/**
 * Social Links Types
 *
 * Type definitions for social links-related database services.
 */

import { SocialLinkType } from '@/types/social-links.types';

/**
 * Social link interface with updated type definition
 */
export interface SocialLink {
  /** Type of social media platform */
  type: SocialLinkType;
  /** URL or identifier for the social media profile */
  url: string;
  /** Display label (optional, defaults to the capitalized type) */
  label?: string;
  /** Icon identifier (optional, defaults to the type) */
  icon?: string;
}

/**
 * Social link with source information
 */
export interface SocialLinkWithSource extends SocialLink {
  /** Source of the social link (e.g., 'profile', 'direct') */
  source?: string;
}

/**
 * Optional social link settings type
 */
export interface SocialLinkSettings {
  /** Whether to include email links */
  includeEmail?: boolean;
  /** Whether to include website links */
  includeWebsite?: boolean;
  /** Maximum number of links to return */
  limit?: number;
}
