import { fetchPortfolioData } from '../database/portfolioServices';
import { Command, CommandResult } from './types';

export const resumeCommand: Command = {
  name: 'resume',
  description: 'Display my resume',
  execute: () => {
    return {
      content: 'Fetching resume...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        const portfolioData = await fetchPortfolioData();

        if (!portfolioData) {
          return {
            content: 'Error: Could not fetch resume information.',
            isError: true
          };
        }

        // Format contact links with proper HTML and ensure all URLs have protocol
        const github =
          portfolioData.contact.github && !portfolioData.contact.github.startsWith('http')
            ? `https://${portfolioData.contact.github}`
            : portfolioData.contact.github;

        const linkedin =
          portfolioData.contact.linkedin && !portfolioData.contact.linkedin.startsWith('http')
            ? `https://${portfolioData.contact.linkedin}`
            : portfolioData.contact.linkedin;

        const twitter =
          portfolioData.contact.twitter && !portfolioData.contact.twitter.startsWith('http')
            ? `https://${portfolioData.contact.twitter}`
            : portfolioData.contact.twitter;

        const website =
          portfolioData.contact.website && !portfolioData.contact.website.startsWith('http')
            ? `https://${portfolioData.contact.website}`
            : portfolioData.contact.website;

        // Create a vCard for the QR code
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${portfolioData.full_name}
TITLE:${portfolioData.title}
ORG:${portfolioData.company}
EMAIL:${portfolioData.contact.email}
${portfolioData.contact.phone ? `TEL:${portfolioData.contact.phone}` : ''}
${website ? `URL:${website}` : ''}
${github ? `X-SOCIALPROFILE;TYPE=github:${github}` : ''}
${linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:${linkedin}` : ''}
${twitter ? `X-SOCIALPROFILE;TYPE=twitter:${twitter}` : ''}
PHOTO;VALUE=uri:https://programmer.sh/images/programmer-icon-dark-medium.png
END:VCARD`;

        return {
          content: `\n<span class="font-bold">My Resume:</span>
<div class="resume-header">
Name: <span class="text-terminal-prompt">${portfolioData.full_name}</span>
Title: <span class="text-terminal-prompt">${portfolioData.title}</span> @ <span class="text-terminal-prompt">${portfolioData.company}</span>
Location: <span class="text-terminal-prompt">${portfolioData.location}</span>
</div>
<hr class="terminal-divider" />
<div class="resume-summary"><span class="font-bold">SUMMARY</span>

<p>${portfolioData.summary}</p></div>
<hr class="terminal-divider" /><div class="resume-section">
<span class="font-bold">MY EXPERIENCE</span>

${portfolioData.experience
  .sort(
    (a, b) =>
      new Date(b.duration.split(' - ')[0]).getTime() -
      new Date(a.duration.split(' - ')[0]).getTime()
  )
  .map(
    exp => `<div class="experience-item"><span class="position"><span class="text-terminal-prompt">${exp.position}</span></> @ <span class="text-terminal-prompt">${exp.company}</span> <span class="duration">(${exp.duration})</span></span>
<span class="description">${exp.description}</span>

<span class="achievements-title">Key achievements:</span><ul class="achievements-list">${exp.achievements
      .sort()
      .map(achievement => `<li>- ${achievement}</li>`)
      .join('')}</ul>
</div>`
  )
  .join('\n')}</div>
<hr class="terminal-divider" />
<div class="resume-section"><span class="font-bold">MY EDUCATION</span>

${portfolioData.education
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
  .join('')}</div>
<hr class="terminal-divider" />
<div class="resume-section"><span class="font-bold">MY SKILLS</span>

<div class="skills-section">${portfolioData.skills.map(skillCategory => `<div class="skill-category"><span class="category">${skillCategory.category}:</span> ${skillCategory.items.map(skill => `<a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${skill}" target="_blank">${skill}</a>`).join(', ')}</span></div>`).join('')}</div></div>
<hr class="terminal-divider" />
<div class="resume-section"><span class="font-bold">CONTACT INFORMATION</span>
<div class="contact-section">
<span>E-mail: <a href="mailto:${portfolioData.contact.email}" target="_blank" class="text-terminal-link hover:underline">${portfolioData.contact.email}</a></span>
${portfolioData.contact.phone ? `<span>Phone: <a href="tel:${portfolioData.contact.phone.replace(/\D/g, '')}" class="text-terminal-link hover:underline">${portfolioData.contact.phone}</a></span>` : ''}
${github ? `<span>GitHub: <a href="${github}" target="_blank" class="text-terminal-link hover:underline">${github.replace(/^https?:\/\//, '')}</a></span>` : ''}
${linkedin ? `<span>LinkedIn: <a href="${linkedin}" target="_blank" class="text-terminal-link hover:underline">${linkedin.replace(/^https?:\/\//, '')}</a></span>` : ''}
${twitter ? `<span>Twitter/X: <a href="${twitter}" target="_blank" class="text-terminal-link hover:underline">${twitter.replace(/^https?:\/\//, '')}</a></span>` : ''}
${website ? `<span>Website: <a href="${website}" target="_blank" class="text-terminal-link hover:underline">${website.replace(/^https?:\/\//, '')}</a></span>` : ''}</div></div>\n`,
          isError: false,
          rawHTML: true
        };
      }
    };
  }
};
