/**
 * Profile Service
 *
 * Handles retrieval of profile data from the database
 * with optimized query performance.
 */

import { createServiceLogger, logError } from '@/services/logger/logger.utils';
import { logDbError, supabase } from '@/utils/supabase.utils';
import { Contact, DbSkillCategory, Profile, Skill } from './portfolio.types';

// Create a dedicated logger for profile service
const dbLogger = createServiceLogger('ProfileService');

// In-memory cache for profile data
let profileCache: Profile | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch profile data including basic info and skills
 */
export const fetchProfile = async (): Promise<Profile | null> => {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (profileCache && now - lastFetchTime < CACHE_TTL) {
      return profileCache;
    }

    // Fetch the profile data
    const { data: profileData, error: profileError } = await supabase
      .from('portfolio_profile')
      .select('*')
      .single();

    if (profileError) {
      logDbError('fetchProfile', profileError);
      return null;
    }

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

    if (skillsError) {
      logDbError('fetchProfile (skills)', skillsError);
      return null;
    }

    // Transform the data format
    const skills: Skill[] = skillsData.map((skillCategory: DbSkillCategory) => ({
      category: skillCategory.category,
      items: skillCategory.skill_items.map(item => item.name)
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

    const profile: Profile = {
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

    // Update cache
    profileCache = profile;
    lastFetchTime = now;

    return profile;
  } catch (error) {
    logError('Error fetching profile:', error, 'ProfileService');
    return null;
  }
};

/**
 * Invalidates the profile cache, forcing the next fetch to get fresh data
 */
export const invalidateProfileCache = (): void => {
  profileCache = null;
  lastFetchTime = 0;
  dbLogger.debug('Profile cache invalidated');
};
