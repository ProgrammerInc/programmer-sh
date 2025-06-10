/**
 * Portfolio Services Types
 *
 * Type definitions for portfolio-related database services.
 */

import {
  Contact,
  Education,
  Experience,
  Profile,
  Project,
  Skill
} from '@/types/portfolio-data.types';

/**
 * Database profile interface
 */
export interface DbProfile {
  id: number;
  name: string;
  full_name: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  email: string;
  phone?: string;
  bitbucket?: string;
  bluesky?: string;
  cashapp?: string;
  discord?: string;
  facebook?: string;
  github?: string;
  gitlab?: string;
  linkedin?: string;
  loliapp?: string;
  patreon?: string;
  paypal?: string;
  reddit?: string;
  threads?: string;
  tiktok?: string;
  twitter?: string;
  venmo?: string;
  youtube?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Database skill category interface
 */
export interface DbSkillCategory {
  id: number;
  category: string;
  skill_items: {
    name: string;
  }[];
}

/**
 * Database experience interface
 */
export interface DbExperience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  experience_technologies: {
    name: string;
  }[];
  experience_achievements: {
    description: string;
  }[];
}

/**
 * Database project interface
 */
export interface DbProject {
  id: number;
  project_key: string;
  title: string;
  description: string;
  url?: string;
  github_url?: string;
  image?: string;
  project_technologies: {
    name: string;
  }[];
  project_highlights: {
    description: string;
  }[];
}

/**
 * Database education interface
 */
export interface DbEducation {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  details?: string;
}

/**
 * Re-export types from portfolio-data.types.ts for convenience
 */
export type { Contact, Education, Experience, Profile, Project, Skill };
