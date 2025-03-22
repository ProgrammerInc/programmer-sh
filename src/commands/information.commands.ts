import { createFeatureLogger } from '../services/logger/logger.utils';
import { fetchProfile } from '../services/portfolio/portfolio.services';
import { Command, CommandResult } from './command.types';

// Create a dedicated logger for information commands
const informationLogger = createFeatureLogger('InformationCommands');

/**
 * Interface for contact information
 */
interface Contact {
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

/**
 * Interface for user profile data
 */
interface Profile {
  full_name: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  contact: Contact;
}

/**
 * Ensures a URL has a proper protocol for external links
 * @param url - URL string to process
 * @returns URL with proper protocol or null if input is invalid
 */
const ensureProtocol = (url: string | null | undefined): string | null => {
  try {
    if (!url || url.trim() === '') return null;
    return url.startsWith('http') ? url : `https://${url}`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    informationLogger.error('Error processing URL protocol', { url, error: errorMessage });
    return null;
  }
};

/**
 * Formats contact information into HTML content
 * @param profile - User profile with contact information
 * @returns Formatted HTML string of contact information
 */
const formatContactInfo = (profile: Profile): string => {
  try {
    // Ensure URLs have proper protocol for HTML anchors
    const github = ensureProtocol(profile.contact.github);
    const linkedin = ensureProtocol(profile.contact.linkedin);
    const twitter = ensureProtocol(profile.contact.twitter);
    const website = ensureProtocol(profile.contact.website);

    const contactLines = [
      `&nbsp;&nbsp;- E-mail: <a href="mailto:${profile.contact.email}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.email}</a>`
    ];

    if (profile.contact.phone) {
      contactLines.push(
        `&nbsp;&nbsp;- Phone: <a href="tel:${profile.contact.phone.replace(/\D/g, '')}" class="text-terminal-link hover:underline">${profile.contact.phone}</a>`
      );
    }

    if (github) {
      contactLines.push(
        `&nbsp;&nbsp;- GitHub: <a href="${github}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.github?.replace(/^https?:\/\//, '')}</a>`
      );
    }

    if (linkedin) {
      contactLines.push(
        `&nbsp;&nbsp;- LinkedIn: <a href="${linkedin}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.linkedin?.replace(/^https?:\/\//, '')}</a>`
      );
    }

    if (twitter) {
      contactLines.push(
        `&nbsp;&nbsp;- Twitter/X: <a href="${twitter}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.twitter?.replace(/^https?:\/\//, '')}</a>`
      );
    }

    if (website) {
      contactLines.push(
        `&nbsp;&nbsp;- Website: <a href="${website}" target="_blank" class="text-terminal-link hover:underline">${profile.contact.website?.replace(/^https?:\/\//, '')}</a>`
      );
    }

    return contactLines.join('\n  ');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    informationLogger.error('Error formatting contact information', { error: errorMessage });
    return '&nbsp;&nbsp;- Error formatting contact information';
  }
};

/**
 * Command to display information about the user
 */
export const aboutCommand: Command = {
  name: 'about',
  description: 'Display information about me',
  execute: (): CommandResult => {
    informationLogger.info('Executing about command');
    return {
      content: 'Fetching about information...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const profile = (await fetchProfile()) as Profile;

          if (!profile || !profile.contact) {
            informationLogger.error('Failed to fetch profile information', {
              reason: 'Empty response or invalid data structure'
            });
            return {
              content: 'Error: Could not fetch profile information.',
              isError: true
            };
          }

          informationLogger.info('Successfully fetched about information');

          const contactInfo = formatContactInfo(profile);

          return {
            content: `About Me:\n
Name: <span class="text-terminal-prompt">${profile.full_name}</span>
Title: <span class="text-terminal-prompt">${profile.title}</span> @ <span class="text-terminal-prompt">${profile.company}</span>
Location: <span class="text-terminal-prompt">${profile.location}</span>\n
${profile.summary}\n
Contact Information:\n
${contactInfo}`,
            isError: false,
            rawHTML: true
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          informationLogger.error('Error fetching about information', { error: errorMessage });
          return {
            content: `Error: Failed to fetch profile information. ${errorMessage}`,
            isError: true
          };
        }
      }
    };
  }
};

/**
 * Command to display contact information
 */
export const contactCommand: Command = {
  name: 'contact',
  description: 'Display my contact information',
  execute: (): CommandResult => {
    informationLogger.info('Executing contact command');
    return {
      content: 'Fetching contact information...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const profile = (await fetchProfile()) as Profile;

          if (!profile || !profile.contact) {
            informationLogger.error('Failed to fetch contact information', {
              reason: 'Empty response or invalid data structure'
            });
            return {
              content: 'Error: Could not fetch contact information.',
              isError: true
            };
          }

          informationLogger.info('Successfully fetched contact information');

          const contactInfo = formatContactInfo(profile);

          return {
            content: `My Contact Information:\n
Name: <span class="text-terminal-prompt">${profile.full_name}</span>
Title: <span class="text-terminal-prompt">${profile.title}</span> @ <span class="text-terminal-prompt">${profile.company}</span>
Location: <span class="text-terminal-prompt">${profile.location}</span>\n
${contactInfo}`,
            isError: false,
            rawHTML: true
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          informationLogger.error('Error fetching contact information', { error: errorMessage });
          return {
            content: `Error: Failed to fetch contact information. ${errorMessage}`,
            isError: true
          };
        }
      }
    };
  }
};
