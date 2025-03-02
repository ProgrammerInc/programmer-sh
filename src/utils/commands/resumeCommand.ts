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
            isError: true,
          };
        }

        return {
          content: `<strong>My Resume:</strong>

<span><strong>Name:</strong> ${portfolioData.full_name}</span>
<span><strong>Title:</strong> ${portfolioData.title} @ ${portfolioData.company}</span>
<span><strong>Location:</strong> ${portfolioData.location}</span>


<strong>SUMMARY</strong>

<strong>${portfolioData.summary}</strong>


<strong>EXPERIENCE</strong>
${portfolioData.experience
  .map(
    exp => `<div class="experience-item">
<span class="position"><strong>${exp.position}</strong> at <strong>${exp.company}</strong> <span class="duration">(${exp.duration})</span></span>
<span class="description">${exp.description}</span>

<span class="achievements-title">Key achievements:</span><ul>${exp.achievements.map(achievement => `<li>- ${achievement}</li>`).join('')}</ul></div>`
  )
  .join('')}

<strong>EDUCATION</strong>
${portfolioData.education
  .map(
    edu => `<div class="education-item">
<span class="degree"><strong>${edu.degree}</strong></span>
<span class="institution">${edu.institution}, ${edu.year}</span>
${edu.details ? `<span class="details">${edu.details}</span>` : ''}</div>`
  )
  .join('')}

<strong>SKILLS</strong>

<div class="skills-section">${portfolioData.skills.map(skillCategory => `<div class="skill-category"><span class="category"><strong>${skillCategory.category}:</strong> ${skillCategory.items.join(', ')}</span></div>`).join('')}</div>

<strong>CONTACT</strong>
<div class="contact-section">
<span><strong>E-mail:</strong> <a href="mailto:${portfolioData.contact.email}" target="_blank">${portfolioData.contact.email}</a></span>
${portfolioData.contact.phone ? `<span><strong>Phone:</strong> <a href="tel:${portfolioData.contact.phone}">${portfolioData.contact.phone}</a></span>` : ''}
${portfolioData.contact.linkedin ? `<span><strong>LinkedIn:</strong> <a href="${portfolioData.contact.linkedin.startsWith('http') ? portfolioData.contact.linkedin : 'https://' + portfolioData.contact.linkedin}" target="_blank">LinkedIn Profile</a></span>` : ''}
${portfolioData.contact.github ? `<span><strong>GitHub:</strong> <a href="${portfolioData.contact.github.startsWith('http') ? portfolioData.contact.github : 'https://' + portfolioData.contact.github}" target="_blank">GitHub Profile</a></span>` : ''}
${portfolioData.contact.twitter ? `<span><strong>X/Twitter:</strong> <a href="${portfolioData.contact.twitter.startsWith('http') ? portfolioData.contact.twitter : 'https://' + portfolioData.contact.twitter}" target="_blank">Twitter Profile</a></span>` : ''}
${portfolioData.contact.website ? `<span><strong>Website:</strong> <a href="${portfolioData.contact.website.startsWith('http') ? portfolioData.contact.website : 'https://' + portfolioData.contact.website}" target="_blank">${portfolioData.contact.website.replace(/^https?:\/\//, '')}</a></span>` : ''}</div></div>`,
          isError: false,
        };
      },
    };
  },
};
