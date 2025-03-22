import { createFeatureLogger } from '../services/logger/logger.utils';
import { fetchProfile } from '../services/portfolio/portfolio.services';
import { Command, CommandResult } from './command.types';

// Create a dedicated logger for skills commands
const skillsLogger = createFeatureLogger('SkillsCommands');

/**
 * Interface representing a skill category with associated skills
 */
interface SkillCategory {
  category: string;
  items: string[];
}

/**
 * Interface representing a user profile with skills
 */
interface Profile {
  skills: SkillCategory[];
  // Other profile properties would be defined here
}

/**
 * Command to display technical skills information
 */
export const skillsCommand: Command = {
  name: 'skills',
  description: 'List my technical skills',
  execute: (): CommandResult => {
    skillsLogger.info('Executing skills command');
    return {
      content: 'Fetching skills...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const profile = (await fetchProfile()) as Profile;

          if (!profile || !profile.skills || !profile.skills.length) {
            skillsLogger.error('Failed to fetch skills information', {
              reason: 'Empty response or no skills found'
            });
            return {
              content: 'Error: Could not fetch skills information.',
              isError: true
            };
          }

          skillsLogger.info('Successfully fetched skills', {
            skillCategories: profile.skills.length
          });

          const formattedSkills = formatSkillsByCategory(profile.skills);

          return {
            content: `My Skills:\n\n${formattedSkills}`,
            isError: false,
            rawHTML: true
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          skillsLogger.error('Error fetching skills information', { error: errorMessage });
          return {
            content: `Error: Failed to fetch skills information. ${errorMessage}`,
            isError: true
          };
        }
      }
    };
  }
};

/**
 * Format skills by category into a readable HTML string
 * @param skillCategories - Array of skill categories to format
 * @returns Formatted HTML string of skill categories and items
 */
function formatSkillsByCategory(skillCategories: SkillCategory[]): string {
  try {
    if (!skillCategories || !skillCategories.length) {
      return 'No skills information available.';
    }

    return skillCategories
      .sort((a, b) => a.category.localeCompare(b.category)) // Sort categories alphabetically
      .map(
        skillCategory =>
          `<span class="text-terminal-prompt font-normal">${skillCategory.category} Skills</span>\n${formatSkillItems(skillCategory.items)}`
      )
      .join('\n\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    skillsLogger.error('Error formatting skills by category', { error: errorMessage });
    return 'Error formatting skills information.';
  }
}

/**
 * Format individual skill items into a bulleted list with links
 * @param items - Array of skill names
 * @returns Formatted HTML string of skill items
 */
function formatSkillItems(items: string[]): string {
  try {
    if (!items || !items.length) {
      return '&nbsp;&nbsp;- None specified';
    }

    return items
      .sort() // Sort skills alphabetically within category
      .map(
        skill =>
          `&nbsp;&nbsp;- <a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${skill}" target="_blank">${skill}</a>`
      )
      .join('\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    skillsLogger.error('Error formatting skill items', { error: errorMessage });
    return 'Error formatting skill items.';
  }
}
