import { fetchEducation } from '../services/database/portfolio.services';
import { createFeatureLogger } from '../services/logger/logger.utils';
import { Command, CommandResult } from './command.types';

// Create a dedicated logger for education commands
const educationLogger = createFeatureLogger('EducationCommands');

/**
 * Interface representing an education record
 */
interface EducationRecord {
  degree: string;
  institution: string;
  duration: string;
  details?: string;
}

/**
 * Command to display education background information
 */
export const educationCommand: Command = {
  name: 'education',
  description: 'Display my education background',
  execute: (): CommandResult => {
    educationLogger.info('Executing education command');
    return {
      content: 'Fetching education...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const education = await fetchEducation() as EducationRecord[];

          if (!education || !education.length) {
            educationLogger.error('Failed to fetch education data', { reason: 'Empty response' });
            return {
              content: 'Error: Could not fetch education information.',
              isError: true
            };
          }

          educationLogger.info('Successfully fetched education data', { count: education.length });
          
          const formattedEducation = formatEducationData(education);
          
          return {
            content: `\nMy Education:\n\n${formattedEducation}\n\n`,
            isError: false,
            rawHTML: true
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          educationLogger.error('Error fetching education data', { error: errorMessage });
          return {
            content: `Error: Failed to fetch education information. ${errorMessage}`,
            isError: true
          };
        }
      }
    };
  }
};

/**
 * Format education records into a readable string
 * @param education - Array of education records to format
 * @returns Formatted education string with HTML formatting
 */
function formatEducationData(education: EducationRecord[]): string {
  try {
    return education
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
      .map(
        edu => `Degree/Major: <span class="text-terminal-prompt">${edu.degree}</span>
Institution: <span class="institution"><span class="text-terminal-prompt">${edu.institution}</span> (${edu.duration})</span>

${edu.details ? `Details: <span class="details">${edu.details}</span>` : ''}`
      )
      .join('\n<hr class="terminal-divider" />\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    educationLogger.error('Error formatting education data', { error: errorMessage });
    return 'Error formatting education data';
  }
}
