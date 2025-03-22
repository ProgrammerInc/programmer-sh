import { createFeatureLogger } from '../services/logger/logger.utils';
import { fetchPortfolioData } from '../services/portfolio/portfolio.service';
import { Command, CommandResult } from './command.types';
import { formatAchievements, formatTechnologies } from './experience.commands';

// Create a dedicated logger for resume commands
const resumeLogger = createFeatureLogger('ResumeCommands');

/**
 * Interface for experience record
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
 * Interface for education record
 */
interface EducationRecord {
  degree: string;
  institution: string;
  duration: string;
  details?: string;
}

/**
 * Interface for skill category
 */
interface SkillCategory {
  category: string;
  items: string[];
}

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
 * Interface for portfolio data
 */
interface PortfolioData {
  full_name: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  experience: ExperienceRecord[];
  education: EducationRecord[];
  skills: SkillCategory[];
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
    resumeLogger.error('Error processing URL protocol', { url, error: errorMessage });
    return null;
  }
};

/**
 * Creates a vCard string from portfolio data
 * @param portfolioData - Portfolio data to use for vCard
 * @returns Formatted vCard string
 */
const createVCard = (
  portfolioData: PortfolioData,
  socialUrls: {
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
    website: string | null;
  }
): string => {
  try {
    return `BEGIN:VCARD
VERSION:3.0
FN:${portfolioData.full_name}
TITLE:${portfolioData.title}
ORG:${portfolioData.company}
EMAIL:${portfolioData.contact.email}
${portfolioData.contact.phone ? `TEL:${portfolioData.contact.phone}` : ''}
${socialUrls.website ? `URL:${socialUrls.website}` : ''}
${socialUrls.github ? `X-SOCIALPROFILE;TYPE=github:${socialUrls.github}` : ''}
${socialUrls.linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:${socialUrls.linkedin}` : ''}
${socialUrls.twitter ? `X-SOCIALPROFILE;TYPE=twitter:${socialUrls.twitter}` : ''}
PHOTO;VALUE=uri:https://programmer.sh/images/programmer-icon-dark-medium.png
END:VCARD`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    resumeLogger.error('Error creating vCard', { error: errorMessage });
    return 'Error creating vCard';
  }
};

/**
 * Formats experience records for display
 * @param experience - Array of experience records
 * @returns Formatted HTML string of experience records
 */
const formatExperience = (experience: ExperienceRecord[]): string => {
  try {
    return experience
      .sort(
        (a, b) =>
          new Date(b.duration.split(' - ')[0]).getTime() -
          new Date(a.duration.split(' - ')[0]).getTime()
      )
      .map(
        exp => `Position: <span class="text-terminal-prompt">${exp.position}</span> @ <span class="text-terminal-prompt">${exp.company}</span>
Duration: ${exp.duration}

Description: ${exp.description}

Achievements:
${formatAchievements(exp.achievements)}

Technologies: ${formatTechnologies(exp.technologies)}`
      )
      .join('\n\n<hr class="terminal-divider" />\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    resumeLogger.error('Error formatting experience records', { error: errorMessage });
    return 'Error formatting experience records';
  }
};

/**
 * Formats education records for display
 * @param education - Array of education records
 * @returns Formatted HTML string of education records
 */
const formatEducation = (education: EducationRecord[]): string => {
  try {
    return education
      .sort(
        (a, b) =>
          new Date(b.duration.split(' - ')[0]).getTime() -
          new Date(a.duration.split(' - ')[0]).getTime()
      )
      .map(
        edu => `<div class="education-item">Degree/Major: <span class="text-terminal-prompt">${edu.degree}</span>
Institution: <span class="institution"><span class="text-terminal-prompt">${edu.institution}</span> (${edu.duration})</span>

${edu.details ? `Details: <span class="details">${edu.details}</span>` : ''}</div>`
      )
      .join('');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    resumeLogger.error('Error formatting education records', { error: errorMessage });
    return 'Error formatting education records';
  }
};

/**
 * Formats skill categories for display
 * @param skills - Array of skill categories
 * @returns Formatted HTML string of skill categories
 */
const formatSkills = (skills: SkillCategory[]): string => {
  try {
    return skills
      .map(
        skillCategory =>
          `<div class="skill-category"><span class="category">${skillCategory.category}:</span> ${skillCategory.items
            .map(
              skill =>
                `<a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${skill}" target="_blank">${skill}</a>`
            )
            .join(', ')}</span></div>`
      )
      .join('');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    resumeLogger.error('Error formatting skill categories', { error: errorMessage });
    return 'Error formatting skill categories';
  }
};

/**
 * Formats contact information for display
 * @param contact - Contact information
 * @param socialUrls - Processed social URLs with protocols
 * @returns Formatted HTML string of contact information
 */
const formatContact = (
  contact: Contact,
  socialUrls: {
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
    website: string | null;
  }
): string => {
  try {
    const contactLines = [
      `<span>E-mail: <a href="mailto:${contact.email}" target="_blank" class="text-terminal-link hover:underline">${contact.email}</a></span>`
    ];

    if (contact.phone) {
      contactLines.push(
        `<span>Phone: <a href="tel:${contact.phone.replace(/\D/g, '')}" class="text-terminal-link hover:underline">${contact.phone}</a></span>`
      );
    }

    if (socialUrls.github) {
      contactLines.push(
        `<span>GitHub: <a href="${socialUrls.github}" target="_blank" class="text-terminal-link hover:underline">${socialUrls.github.replace(/^https?:\/\//, '')}</a></span>`
      );
    }

    if (socialUrls.linkedin) {
      contactLines.push(
        `<span>LinkedIn: <a href="${socialUrls.linkedin}" target="_blank" class="text-terminal-link hover:underline">${socialUrls.linkedin.replace(/^https?:\/\//, '')}</a></span>`
      );
    }

    if (socialUrls.twitter) {
      contactLines.push(
        `<span>Twitter/X: <a href="${socialUrls.twitter}" target="_blank" class="text-terminal-link hover:underline">${socialUrls.twitter.replace(/^https?:\/\//, '')}</a></span>`
      );
    }

    if (socialUrls.website) {
      contactLines.push(
        `<span>Website: <a href="${socialUrls.website}" target="_blank" class="text-terminal-link hover:underline">${socialUrls.website.replace(/^https?:\/\//, '')}</a></span>`
      );
    }

    return contactLines.join('\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    resumeLogger.error('Error formatting contact information', { error: errorMessage });
    return '<span>Error formatting contact information</span>';
  }
};

/**
 * Command to display a formatted resume
 */
export const resumeCommand: Command = {
  name: 'resume',
  description: 'Display my resume',
  execute: (): CommandResult => {
    resumeLogger.info('Executing resume command');
    return {
      content: 'Fetching resume...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const portfolioData = (await fetchPortfolioData()) as PortfolioData;

          if (!portfolioData) {
            resumeLogger.error('Failed to fetch portfolio data', { reason: 'Empty response' });
            return {
              content: 'Error: Could not fetch resume information.',
              isError: true
            };
          }

          // Process social URLs with proper protocols
          const socialUrls = {
            github: ensureProtocol(portfolioData.contact.github),
            linkedin: ensureProtocol(portfolioData.contact.linkedin),
            twitter: ensureProtocol(portfolioData.contact.twitter),
            website: ensureProtocol(portfolioData.contact.website)
          };

          // Create a vCard for the QR code
          const vCard = createVCard(portfolioData, socialUrls);

          // Format each section of the resume
          const experienceSection = formatExperience(portfolioData.experience);
          const educationSection = formatEducation(portfolioData.education);
          const skillsSection = formatSkills(portfolioData.skills);
          const contactSection = formatContact(portfolioData.contact, socialUrls);

          resumeLogger.info('Successfully generated resume');
          return {
            content: `My Resume:
<div class="resume-header">
Name: <span class="text-terminal-prompt">${portfolioData.full_name}</span>
Title: <span class="text-terminal-prompt">${portfolioData.title}</span> @ <span class="text-terminal-prompt">${portfolioData.company}</span>
Location: <span class="text-terminal-prompt">${portfolioData.location}</span>
</div>
<hr class="terminal-divider" />
<div class="resume-summary">SUMMARY

<p>${portfolioData.summary}</p></div>
<hr class="terminal-divider" /><div class="resume-section">
MY EXPERIENCE

${experienceSection}\n
</div>
<hr class="terminal-divider" /><div class="resume-section">
MY EDUCATION

${educationSection}</div>
<hr class="terminal-divider" /><div class="resume-section">
MY SKILLS

<div class="skills-section">${skillsSection}</div></div>
<hr class="terminal-divider" /><div class="resume-section">
CONTACT INFORMATION
<div class="contact-section">
${contactSection}</div></div>`,
            isError: false,
            rawHTML: true
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          resumeLogger.error('Error generating resume', { error: errorMessage });
          return {
            content: `Error: Failed to generate resume. ${errorMessage}`,
            isError: true
          };
        }
      }
    };
  }
};
