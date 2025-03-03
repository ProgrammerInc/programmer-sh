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
          content: `<strong>My Resume:</strong>
<div class="resume-header">
<strong>Name:</strong> <span class="text-terminal-prompt">${portfolioData.full_name}</span>
<strong>Title:</strong> <span class="text-terminal-prompt">${portfolioData.title}</span> &amp; <span class="text-terminal-prompt">${portfolioData.company}</span>
<strong>Location:</strong> <span class="text-terminal-prompt">${portfolioData.location}</span>
</div>
<div class="resume-summary"><strong>SUMMARY</strong>

<p>${portfolioData.summary}</p></div>
<div class="resume-section">
<strong>EXPERIENCE</strong>

${portfolioData.experience
  .map(
    exp => `<div class="experience-item"><span class="position"><strong><span class="text-terminal-prompt">${exp.position}</span></strong> &amp; <strong><span class="text-terminal-prompt">${exp.company}</span></strong> <span class="duration">(${exp.duration})</span></span>
<span class="description">${exp.description}</span>

<span class="achievements-title">Key achievements:</span><ul class="achievements-list">${exp.achievements.map(achievement => `<li>- ${achievement}</li>`).join('')}</ul>
</div>`
  )
  .join('')}</div>
<div class="resume-section"><strong>EDUCATION</strong>

${portfolioData.education
  .map(
    edu => `<div class="education-item"><strong>Degree/Major:</strong> <span class="text-terminal-prompt">${edu.degree}</span>
<strong>Institution:</strong> <span class="institution"><span class="text-terminal-prompt">${edu.institution}</span> (${edu.duration})</span>

${edu.details ? `<strong>Details:</strong> <span class="details">${edu.details}</span>` : ''}</div>`
  )
  .join('')}</div>

<div class="resume-section"><strong>SKILLS</strong>

<div class="skills-section">${portfolioData.skills.map(skillCategory => `<div class="skill-category"><span class="category"><strong>${skillCategory.category}:</strong> ${skillCategory.items.map(skill => `<a class="text-terminal-link hover:underline" href="https://en.wikipedia.org/wiki/${skill}" target="_blank">${skill}</a>`).join(', ')}</span></div>`).join('')}</div></div>

<div class="resume-section"><strong>CONTACT</strong>
<div class="contact-section">
<span><strong>E-mail:</strong> <a href="mailto:${portfolioData.contact.email}" target="_blank" class="text-terminal-link hover:underline">${portfolioData.contact.email}</a></span>
${portfolioData.contact.phone ? `<span><strong>Phone:</strong> <a href="tel:${portfolioData.contact.phone.replace(/\D/g, '')}" class="text-terminal-link hover:underline">${portfolioData.contact.phone}</a></span>` : ''}
${linkedin ? `<span><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank" class="text-terminal-link hover:underline">${linkedin.replace(/^https?:\/\//, '')}</a></span>` : ''}
${github ? `<span><strong>GitHub:</strong> <a href="${github}" target="_blank" class="text-terminal-link hover:underline">${github.replace(/^https?:\/\//, '')}</a></span>` : ''}
${twitter ? `<span><strong>Twitter/X:</strong> <a href="${twitter}" target="_blank" class="text-terminal-link hover:underline">${twitter.replace(/^https?:\/\//, '')}</a></span>` : ''}
${website ? `<span><strong>Website:</strong> <a href="${website}" target="_blank" class="text-terminal-link hover:underline">${website.replace(/^https?:\/\//, '')}</a></span>` : ''}</div></div>
<div class="flex justify-center w-full mt-4"><div id="qrcodeContainer" class="qrcode-container"><QRCode value="${encodeURIComponent(vCard)}" title="Scan QR Code to Save My Contact Information" /></div></div>`,
          isError: false,
          rawHTML: true
        };
      }
    };
  }
};
