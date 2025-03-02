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
  year: string;
  details?: string;
}

export interface Contact {
  phone?: string;
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  location: string;
  contact: Contact;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

// The actual data has been moved to the Supabase database
// Use the fetchPortfolioData utility to get the data from the database
