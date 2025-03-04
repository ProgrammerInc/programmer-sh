export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  details?: string;
}

export interface Contact {
  bitbucket?: string;
  bluesky?: string;
  cashapp?: string;
  discord?: string;
  email: string;
  facebook?: string;
  gitlab?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  loliapp?: string;
  mastodon?: string;
  patreon?: string;
  paypal?: string;
  phone?: string;
  pinterest?: string;
  reddit?: string;
  slack?: string;
  snapchat?: string;
  telegram?: string;
  threads?: string;
  tiktok?: string;
  twitter?: string;
  venmo?: string;
  website?: string;
  youtube?: string;
}

export interface Profile {
  name: string;
  full_name: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  contact: Contact;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
}

export default Profile;
