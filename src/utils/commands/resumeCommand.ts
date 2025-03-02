
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
          content: `<div class="resume">
  <h2>${portfolioData.full_name}</h2>
  <p class="title">${portfolioData.title}</p>
  <p class="location">${portfolioData.location}</p>

  <h3>SUMMARY</h3>
  <p>${portfolioData.summary}</p>

  <h3>EXPERIENCE</h3>
  ${portfolioData.experience
    .map(
      exp => `<div class="experience-item">
    <p class="position"><strong>${exp.position}</strong> at <strong>${exp.company}</strong> <span class="duration">(${exp.duration})</span></p>
    <p class="description">${exp.description}</p>
    <p class="achievements-title">Key achievements:</p>
    <ul>
      ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
    </ul>
  </div>`
    )
    .join('')}

  <h3>EDUCATION</h3>
  ${portfolioData.education
    .map(
      edu => `<div class="education-item">
    <p class="degree"><strong>${edu.degree}</strong></p>
    <p class="institution">${edu.institution}, ${edu.year}</p>
    ${edu.details ? `<p class="details">${edu.details}</p>` : ''}
  </div>`
    )
    .join('')}

  <h3>SKILLS</h3>
  <div class="skills-section">
    ${portfolioData.skills.map(skillCategory => `
      <div class="skill-category">
        <p class="category"><strong>${skillCategory.category}:</strong> ${skillCategory.items.join(', ')}</p>
      </div>
    `).join('')}
  </div>

  <h3>CONTACT</h3>
  <div class="contact-section">
    <p><strong>E-mail:</strong> <a href="mailto:${portfolioData.contact.email}" target="_blank">${portfolioData.contact.email}</a></p>
    ${portfolioData.contact.phone ? `<p><strong>Phone:</strong> <a href="tel:${portfolioData.contact.phone}">${portfolioData.contact.phone}</a></p>` : ''}
    ${portfolioData.contact.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${portfolioData.contact.linkedin.startsWith('http') ? portfolioData.contact.linkedin : 'https://' + portfolioData.contact.linkedin}" target="_blank">LinkedIn Profile</a></p>` : ''}
    ${portfolioData.contact.github ? `<p><strong>GitHub:</strong> <a href="${portfolioData.contact.github.startsWith('http') ? portfolioData.contact.github : 'https://' + portfolioData.contact.github}" target="_blank">GitHub Profile</a></p>` : ''}
    ${portfolioData.contact.twitter ? `<p><strong>X/Twitter:</strong> <a href="${portfolioData.contact.twitter.startsWith('http') ? portfolioData.contact.twitter : 'https://' + portfolioData.contact.twitter}" target="_blank">Twitter Profile</a></p>` : ''}
    ${portfolioData.contact.website ? `<p><strong>Website:</strong> <a href="${portfolioData.contact.website.startsWith('http') ? portfolioData.contact.website : 'https://' + portfolioData.contact.website}" target="_blank">${portfolioData.contact.website.replace(/^https?:\/\//, '')}</a></p>` : ''}
  </div>
</div>`,
          isError: false,
        };
      },
    };
  },
};
