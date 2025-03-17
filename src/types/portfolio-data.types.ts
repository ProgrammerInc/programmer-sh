/**
 * Portfolio Data Types
 *
 * Type definitions for portfolio data structures used throughout the application
 */

/**
 * Project information interface
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Project title */
  title: string;
  /** Short description of the project */
  description: string;
  /** Technologies used in the project */
  technologies: string[];
  /** Live URL for the project (optional) */
  url?: string;
  /** GitHub repository URL (optional) */
  github_url?: string;
  /** Project image path or URL (optional) */
  image?: string;
  /** Key project highlights and features */
  highlights: string[];
}

/**
 * Work experience information interface
 */
export interface Experience {
  /** Company or organization name */
  company: string;
  /** Job title or position */
  position: string;
  /** Duration of employment (e.g., "2019-2021") */
  duration: string;
  /** Description of role and responsibilities */
  description: string;
  /** Technologies used in this role */
  technologies: string[];
  /** Key achievements during this role */
  achievements: string[];
}

/**
 * Skill category with list of skills
 */
export interface Skill {
  /** Skill category name (e.g., "Programming Languages") */
  category: string;
  /** List of skills within this category */
  items: string[];
}

/**
 * Educational background information interface
 */
export interface Education {
  /** Degree or certification title */
  degree: string;
  /** Name of educational institution */
  institution: string;
  /** Duration of study (e.g., "2015-2019") */
  duration: string;
  /** Additional details about education (optional) */
  details?: string;
}

/**
 * Contact information interface with various social platforms
 * All fields except email are optional
 */
export interface Contact {
  /** Bitbucket profile URL */
  bitbucket?: string;
  /** Bluesky handle or URL */
  bluesky?: string;
  /** Cash App username or URL */
  cashapp?: string;
  /** Discord username or invite link */
  discord?: string;
  /** Email address (required) */
  email: string;
  /** Facebook profile URL */
  facebook?: string;
  /** GitLab profile URL */
  gitlab?: string;
  /** GitHub profile URL */
  github?: string;
  /** Instagram profile URL */
  instagram?: string;
  /** LinkedIn profile URL */
  linkedin?: string;
  /** Loli App handle or URL */
  loliapp?: string;
  /** Mastodon profile URL */
  mastodon?: string;
  /** Patreon page URL */
  patreon?: string;
  /** PayPal link or username */
  paypal?: string;
  /** Phone number */
  phone?: string;
  /** Pinterest profile URL */
  pinterest?: string;
  /** Reddit profile URL */
  reddit?: string;
  /** Slack workspace or user URL */
  slack?: string;
  /** Snapchat username */
  snapchat?: string;
  /** Telegram username or URL */
  telegram?: string;
  /** Threads profile URL */
  threads?: string;
  /** TikTok profile URL */
  tiktok?: string;
  /** Twitter/X profile URL */
  twitter?: string;
  /** Venmo username or URL */
  venmo?: string;
  /** Personal website URL */
  website?: string;
  /** YouTube channel URL */
  youtube?: string;
}

/**
 * Complete profile information combining all portfolio data
 */
export interface Profile {
  /** Short name or username */
  name: string;
  /** Full legal name */
  full_name: string;
  /** Professional title or role */
  title: string;
  /** Current company or organization */
  company: string;
  /** Geographic location */
  location: string;
  /** Professional summary or bio */
  summary: string;
  /** Contact information */
  contact: Contact;
  /** Educational background */
  education: Education[];
  /** Work experience history */
  experience: Experience[];
  /** Projects portfolio */
  projects: Project[];
  /** Skills categorized by type */
  skills: Skill[];
}

/**
 * Default export of the Profile interface for convenience
 */
export default Profile;
