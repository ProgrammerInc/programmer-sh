import { createFeatureLogger } from '@/services/logger/logger.utils';
import { fetchSocialLinks } from '@/services/social-links/social-links.service';
import { Command, CommandResult } from './command.types';

// Create a dedicated logger for social commands
const socialLogger = createFeatureLogger('SocialCommands');

/**
 * Interface for social media link
 */
interface SocialLink {
  id: string;
  type: string;
  url: string;
  label?: string;
}

/**
 * Get display name for a social link type
 * @param type - Social link type identifier
 * @returns Formatted display name
 */
const getSocialName = (type: string): string => {
  try {
    switch (type) {
      case 'github':
        return 'GitHub';
      case 'linkedin':
        return 'LinkedIn';
      case 'twitter':
        return 'Twitter/X';
      case 'email':
        return 'Email';
      case 'website':
        return 'Website';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    socialLogger.error('Error formatting social link name', { type, error: errorMessage });
    return type || 'Unknown';
  }
};

/**
 * Format a single social link for display
 * @param link - Social link object to format
 * @returns Formatted HTML string for the link
 */
const formatSocialLink = (link: SocialLink): string => {
  try {
    const name = getSocialName(link.type);

    if (link.type === 'email') {
      return `  - ${name}: <a class="text-terminal-link hover:underline" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.url.replace('mailto:', '')}</a>`;
    }

    if (link.type === 'website') {
      return `  - ${name}: <a class="text-terminal-link hover:underline" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.url.replace('https://', '')}</a>`;
    }

    return `  - ${name}: <a class="text-terminal-link hover:underline" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.url.replace('https://', '')}</a>`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    socialLogger.error('Error formatting social link', {
      linkType: link.type,
      error: errorMessage
    });
    return `  - Error formatting link: ${link.type}`;
  }
};

/**
 * Command to display social media links
 */
export const socialCommand: Command = {
  name: 'social',
  description: 'Display social media links',
  execute: (): CommandResult => {
    // Start logging for command execution
    socialLogger.info('Executing social command');

    // Return a CommandResult with isAsync flag and an asyncResolver function
    return {
      content: 'Loading social links...',
      isError: false,
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          socialLogger.debug('Fetching social links');
          // Fetch social links directly from the service
          const links = (await fetchSocialLinks()) as SocialLink[];

          if (!links || links.length === 0) {
            socialLogger.info('No social links available');
            return {
              content: 'No social links available.',
              isError: false
            };
          }

          socialLogger.info('Social links fetched successfully', { count: links.length });

          // Format and sort social links output
          const formattedLinks = links
            .sort((a, b) => getSocialName(a.type).localeCompare(getSocialName(b.type)))
            .map(formatSocialLink)
            .join('\n');

          return {
            content: `My Social Links:\n\n${formattedLinks}`,
            isError: false
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          socialLogger.error('Error executing social command', { error: errorMessage });
          return {
            content: `Error fetching social links: ${errorMessage}`,
            isError: true
          };
        }
      }
    };
  }
};
