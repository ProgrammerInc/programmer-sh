import { supabase } from '../../integrations/supabase/client';
import {
  Contact,
  Education,
  Experience,
  Profile,
  Project,
  Skill
} from '../../types/portfolio-data';
import { createServiceLogger, logError } from '../logger/logger.utils';

// Create a dedicated logger for database services
const dbLogger = createServiceLogger('PortfolioService');

// Fetch profile data
export const fetchProfile = async (): Promise<Profile | null> => {
  try {
    // Fetch the profile data
    const { data: profileData, error: profileError } = await supabase
      .from('portfolio_profile')
      .select('*')
      .single();

    if (profileError) throw profileError;
    if (!profileData) {
      dbLogger.error('No profile data found in the database');
      return null;
    }

    // Fetch all skill categories
    const { data: skillsData, error: skillsError } = await supabase.from('skills').select(`
        id,
        category,
        skill_items (
          name
        )
      `);

    if (skillsError) throw skillsError;

    // Transform the data format
    const skills: Skill[] = skillsData.map(skillCategory => ({
      category: skillCategory.category,
      items: skillCategory.skill_items.map((item: { name: string }) => item.name)
    }));

    // Create a contact object explicitly with the Contact interface to ensure all required properties are present
    const contact: Contact = {
      email: profileData.email, // Make sure this is always assigned
      phone: profileData.phone,
      bitbucket: profileData.bitbucket,
      bluesky: profileData.bluesky,
      cashapp: profileData.cashapp,
      discord: profileData.discord,
      facebook: profileData.facebook,
      github: profileData.github,
      gitlab: profileData.gitlab,
      linkedin: profileData.linkedin,
      loliapp: profileData.loliapp,
      patreon: profileData.patreon,
      paypal: profileData.paypal,
      reddit: profileData.reddit,
      threads: profileData.threads,
      tiktok: profileData.tiktok,
      twitter: profileData.twitter,
      venmo: profileData.venmo,
      youtube: profileData.youtube,
      website: profileData.website
    };

    // Clean up undefined values
    Object.keys(contact).forEach(key => {
      if (contact[key as keyof Contact] === undefined) {
        delete contact[key as keyof Contact];
      }
    });

    // Make sure email is always present
    if (!contact.email) {
      dbLogger.error('Email is required but not found in the database');
      contact.email = 'missing@email.com'; // Fallback value
    }

    return {
      name: profileData.name,
      full_name: profileData.full_name,
      title: profileData.title,
      company: profileData.company,
      location: profileData.location,
      summary: profileData.summary,
      contact,
      skills,
      experience: [], // Will be filled by fetchExperience
      projects: [], // Will be filled by fetchProjects
      education: [] // Will be filled by fetchEducation
    };
  } catch (error) {
    logError('Error fetching profile:', error, 'PortfolioService');
    return null;
  }
};

// Fetch experience data
export const fetchExperience = async (): Promise<Experience[]> => {
  try {
    const { data: experienceData, error: experienceError } = await supabase.from('experiences')
      .select(`
        id,
        company,
        position,
        duration,
        description,
        experience_technologies (name),
        experience_achievements (description)
      `);

    if (experienceError) throw experienceError;
    if (!experienceData || experienceData.length === 0) {
      dbLogger.error('No experience data found in the database');
      return [];
    }

    return experienceData.map(exp => ({
      company: exp.company,
      position: exp.position,
      duration: exp.duration,
      description: exp.description,
      technologies: exp.experience_technologies.map((tech: { name: string }) => tech.name),
      achievements: exp.experience_achievements.map(
        (ach: { description: string }) => ach.description
      )
    }));
  } catch (error) {
    logError('Error fetching experience:', error, 'PortfolioService');
    return [];
  }
};

// Fetch projects data
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const { data: projectsData, error: projectsError } = await supabase.from('projects').select(`
        id,
        project_key,
        title,
        description,
        url,
        github_url,
        image,
        project_technologies (name),
        project_highlights (description)
      `);

    if (projectsError) throw projectsError;
    if (!projectsData || projectsData.length === 0) {
      dbLogger.error('No projects data found in the database');
      return [];
    }

    return projectsData.map(project => ({
      id: project.project_key, // Using project_key as the id for backward compatibility
      title: project.title,
      description: project.description,
      url: project.url,
      github: project.github_url,
      image: project.image,
      technologies: project.project_technologies.map((tech: { name: string }) => tech.name),
      highlights: project.project_highlights.map(
        (highlight: { description: string }) => highlight.description
      )
    }));
  } catch (error) {
    logError('Error fetching projects:', error, 'PortfolioService');
    return [];
  }
};

// Fetch education data
export const fetchEducation = async (): Promise<Education[]> => {
  try {
    const { data: educationData, error: educationError } = await supabase
      .from('education')
      .select('*');

    if (educationError) throw educationError;
    if (!educationData || educationData.length === 0) {
      dbLogger.error('No education data found in the database');
      return [];
    }

    return educationData.map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      duration: edu.duration,
      details: edu.details
    }));
  } catch (error) {
    logError('Error fetching education:', error, 'PortfolioService');
    return [];
  }
};

// Fetch complete portfolio data
export const fetchPortfolioData = async (): Promise<Profile | null> => {
  try {
    const profile = await fetchProfile();
    if (!profile) {
      dbLogger.error('Could not fetch profile data');
      return null;
    }

    const [experience, projects, education] = await Promise.all([
      fetchExperience(),
      fetchProjects(),
      fetchEducation()
    ]);

    profile.experience = experience;
    profile.projects = projects;
    profile.education = education;

    return profile;
  } catch (error) {
    logError('Error fetching complete portfolio data:', error, 'PortfolioService');
    return null;
  }
};

// Fetch a specific project by ID
export const fetchProjectById = async (projectId: string): Promise<Project | null> => {
  try {
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select(
        `
        id,
        project_key,
        title,
        description,
        url,
        github_url,
        image,
        project_technologies (name),
        project_highlights (description)
      `
      )
      .eq('project_key', projectId)
      .single();

    if (projectError) throw projectError;
    if (!projectData) return null;

    return {
      id: projectData.project_key,
      title: projectData.title,
      description: projectData.description,
      url: projectData.url,
      github_url: projectData.github_url,
      image: projectData.image,
      technologies: projectData.project_technologies.map((tech: { name: string }) => tech.name),
      highlights: projectData.project_highlights.map(
        (highlight: { description: string }) => highlight.description
      )
    };
  } catch (error) {
    logError(`Error fetching project with ID ${projectId}:`, error, 'PortfolioService');
    return null;
  }
};
