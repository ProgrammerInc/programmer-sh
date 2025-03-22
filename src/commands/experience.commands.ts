import { createFeatureLogger } from '../services/logger/logger.utils';
import { fetchExperience } from '../services/portfolio/portfolio.services';
import { Command, CommandResult } from './command.types';

// Create a dedicated logger for experience commands
const experienceLogger = createFeatureLogger('ExperienceCommands');

/**
 * Interface representing a work experience record
 */
interface ExperienceRecord {
  position: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

/**
 * Command to display work experience information
 */
export const experienceCommand: Command = {
  name: 'experience',
  description: 'Display my work experience',
  execute: (): CommandResult => {
    experienceLogger.info('Executing experience command');
    return {
      content: 'Fetching experience...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const experience = (await fetchExperience()) as ExperienceRecord[];

          if (!experience || !experience.length) {
            experienceLogger.error('Failed to fetch experience data', { reason: 'Empty response' });
            return {
              content: 'Error: Could not fetch experience information.',
              isError: true
            };
          }

          experienceLogger.info('Successfully fetched experience data', {
            count: experience.length
          });

          const formattedExperience = formatExperienceData(experience);

          return {
            content: `My Experience:\n\n${formattedExperience}`,
            isError: false,
            rawHTML: true
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          experienceLogger.error('Error fetching experience data', { error: errorMessage });
          return {
            content: `Error: Failed to fetch experience information. ${errorMessage}`,
            isError: true
          };
        }
      }
    };
  }
};

/**
 * Format experience records into a readable HTML string
 * @param experience - Array of experience records to format
 * @returns Formatted experience string with HTML formatting
 */
function formatExperienceData(experience: ExperienceRecord[]): string {
  try {
    return experience
      .sort((a, b) => {
        // Parse dates safely
        const getStartYear = (duration: string): number => {
          try {
            const startDate = duration.split(' - ')[0];
            return new Date(startDate).getTime();
          } catch {
            return 0; // Default to 0 if parsing fails
          }
        };

        return getStartYear(b.duration) - getStartYear(a.duration);
      })
      .map(exp => formatSingleExperience(exp))
      .join('\n\n<hr class="terminal-divider" />\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    experienceLogger.error('Error formatting experience data', { error: errorMessage });
    return 'Error formatting experience data';
  }
}

/**
 * Format a single experience record
 * @param exp - Experience record to format
 * @returns Formatted HTML string for a single experience
 */
function formatSingleExperience(exp: ExperienceRecord): string {
  try {
    return `Position: <span class="text-terminal-prompt">${exp.position}</span> @ <span class="text-terminal-prompt">${exp.company}</span>
Duration: ${exp.duration}

Description: ${exp.description}

Achievements:
${formatAchievements(exp.achievements)}

Technologies: ${formatTechnologies(exp.technologies)}`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    experienceLogger.error('Error formatting single experience', { error: errorMessage });
    return 'Error formatting experience';
  }
}

/**
 * Format achievements as a bulleted list
 * @param achievements - Array of achievement strings
 * @returns Formatted HTML string for achievements
 */
export function formatAchievements(achievements: string[]): string {
  try {
    if (!achievements || !achievements.length) {
      return '\nNone specified';
    }

    return achievements.map(achievement => `&nbsp;&nbsp;- ${achievement}`).join('\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    experienceLogger.error('Error formatting achievements', { error: errorMessage });
    return 'Error formatting achievements';
  }
}

/**
 * Format technologies as a comma-separated list with links
 * @param technologies - Array of technology names
 * @returns Formatted HTML string for technologies
 */
export function formatTechnologies(technologies: string[]): string {
  try {
    if (!technologies || !technologies.length) {
      return 'None specified';
    }

    return technologies
      .sort()
      .map(
        tech =>
          `<a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${tech}" target="_blank">${tech}</a>`
      )
      .join(', ');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    experienceLogger.error('Error formatting technologies', { error: errorMessage });
    return 'Error formatting technologies';
  }
}
