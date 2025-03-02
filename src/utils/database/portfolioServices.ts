import { supabase } from '../../integrations/supabase/client';
import { Profile, Skill, Experience, Project, Education } from '../../data/portfolioData';

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
      console.error('No profile data found in the database');
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
      items: skillCategory.skill_items.map((item: { name: string }) => item.name),
    }));

    return {
      name: profileData.name,
      full_name: profileData.full_name,
      title: profileData.title,
      company: profileData.company,
      location: profileData.location,
      summary: profileData.summary,
      contact: {
        email: profileData.email,
        phone: profileData.phone,
        bitbucket: profileData.bitbucket,
        bluesky: profileData.bluesky,
        cashapp: profileData.cashapp,
        discord: profileData.discord,
        facebook: profileData.facebook,
        github: profileData.github,
        gitlab: profileData.gitlab,
        instagram: profileData.instagram,
        linkedin: profileData.linkedin,
        loliapp: profileData.loliapp,
        patreon: profileData.patreon,
        paypal: profileData.paypal,
        reddit: profileData.reddit,
        slack: profileData.slack,
        snapchat: profileData.snapchat,
        telegram: profileData.telegram,
        threads: profileData.threads,
        tiktok: profileData.tiktok,
        twitter: profileData.twitter,
        venmo: profileData.venmo,
        youtube: profileData.youtube,
        website: profileData.website,
      },
      skills,
      experience: [], // Will be filled by fetchExperience
      projects: [], // Will be filled by fetchProjects
      education: [], // Will be filled by fetchEducation
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
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
      console.error('No experience data found in the database');
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
      ),
    }));
  } catch (error) {
    console.error('Error fetching experience:', error);
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
        link,
        github,
        image,
        project_technologies (name),
        project_highlights (description)
      `);

    if (projectsError) throw projectsError;
    if (!projectsData || projectsData.length === 0) {
      console.error('No projects data found in the database');
      return [];
    }

    return projectsData.map(project => ({
      id: project.project_key, // Using project_key as the id for backward compatibility
      title: project.title,
      description: project.description,
      link: project.link,
      github: project.github,
      image: project.image,
      technologies: project.project_technologies.map((tech: { name: string }) => tech.name),
      highlights: project.project_highlights.map(
        (highlight: { description: string }) => highlight.description
      ),
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
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
      console.error('No education data found in the database');
      return [];
    }

    return educationData.map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      year: edu.year,
      details: edu.details,
    }));
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
};

// Fetch complete portfolio data
export const fetchPortfolioData = async (): Promise<Profile | null> => {
  try {
    const profile = await fetchProfile();
    if (!profile) {
      console.error('Could not fetch profile data');
      return null;
    }

    const [experience, projects, education] = await Promise.all([
      fetchExperience(),
      fetchProjects(),
      fetchEducation(),
    ]);

    profile.experience = experience;
    profile.projects = projects;
    profile.education = education;

    return profile;
  } catch (error) {
    console.error('Error fetching complete portfolio data:', error);
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
        link,
        github,
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
      link: projectData.link,
      github: projectData.github,
      image: projectData.image,
      technologies: projectData.project_technologies.map((tech: { name: string }) => tech.name),
      highlights: projectData.project_highlights.map(
        (highlight: { description: string }) => highlight.description
      ),
    };
  } catch (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error);
    return null;
  }
};
