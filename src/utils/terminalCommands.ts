
import portfolioData from '../data/portfolioData';

export type CommandResult = {
  content: React.ReactNode;
  isError?: boolean;
  isHTML?: boolean;
};

export type Command = {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[]) => CommandResult;
  hidden?: boolean;
};

// Help command implementation
const helpCommand: Command = {
  name: 'help',
  description: 'Display available commands',
  execute: (args: string[]) => {
    const specificCommand = args[0];
    
    if (specificCommand) {
      const command = commands.find(cmd => cmd.name === specificCommand && !cmd.hidden);
      if (command) {
        return {
          content: `
Command: ${command.name}
Description: ${command.description}
${command.usage ? `Usage: ${command.usage}` : ''}
`
        };
      } else {
        return {
          content: `Command '${specificCommand}' not found. Type 'help' to see available commands.`,
          isError: true
        };
      }
    }
    
    return {
      content: `
Available commands:

${commands
  .filter(cmd => !cmd.hidden)
  .map(cmd => `- ${cmd.name}: ${cmd.description}`)
  .join('\n')}

Type 'help [command]' for more information about a specific command.
`
    };
  }
};

// About command implementation
const aboutCommand: Command = {
  name: 'about',
  description: 'Display information about me',
  execute: () => {
    return {
      content: `
${portfolioData.name} - ${portfolioData.title}
${portfolioData.location}

${portfolioData.summary}

Contact:
- Email: ${portfolioData.contact.email}
${portfolioData.contact.github ? `- GitHub: ${portfolioData.contact.github}` : ''}
${portfolioData.contact.linkedin ? `- LinkedIn: ${portfolioData.contact.linkedin}` : ''}
${portfolioData.contact.twitter ? `- Twitter: ${portfolioData.contact.twitter}` : ''}
${portfolioData.contact.website ? `- Website: ${portfolioData.contact.website}` : ''}
`
    };
  }
};

// Skills command implementation
const skillsCommand: Command = {
  name: 'skills',
  description: 'List my technical skills',
  execute: () => {
    return {
      content: `
Skills:

${portfolioData.skills.map(skillCategory => `
${skillCategory.category}:
${skillCategory.items.map(skill => `- ${skill}`).join('\n')}
`).join('\n')}
`
    };
  }
};

// Projects command implementation
const projectsCommand: Command = {
  name: 'projects',
  description: 'Display my projects',
  usage: 'projects [project_id]',
  execute: (args: string[]) => {
    const projectId = args[0];
    
    if (projectId) {
      const project = portfolioData.projects.find(p => p.id === projectId);
      if (project) {
        return {
          content: `
Project: ${project.title}

${project.description}

Technologies: ${project.technologies.join(', ')}

Highlights:
${project.highlights.map(highlight => `- ${highlight}`).join('\n')}

${project.github ? `GitHub: ${project.github}` : ''}
${project.link ? `Live Demo: ${project.link}` : ''}
`
        };
      } else {
        return {
          content: `Project '${projectId}' not found. Type 'projects' to see all projects.`,
          isError: true
        };
      }
    }
    
    return {
      content: `
Projects:

${portfolioData.projects.map(project => `
- ${project.id}: ${project.title}
  ${project.description}
  Technologies: ${project.technologies.join(', ')}
  
  Type 'projects ${project.id}' for more details.
`).join('\n')}
`
    };
  }
};

// Experience command implementation
const experienceCommand: Command = {
  name: 'experience',
  description: 'Display my work experience',
  execute: () => {
    return {
      content: `
Work Experience:

${portfolioData.experience.map(exp => `
${exp.position} at ${exp.company}
${exp.duration}

${exp.description}

Technologies: ${exp.technologies.join(', ')}

Achievements:
${exp.achievements.map(achievement => `- ${achievement}`).join('\n')}
`).join('\n')}
`
    };
  }
};

// Education command implementation
const educationCommand: Command = {
  name: 'education',
  description: 'Display my education background',
  execute: () => {
    return {
      content: `
Education:

${portfolioData.education.map(edu => `
${edu.degree}
${edu.institution}, ${edu.year}
${edu.details ? edu.details : ''}
`).join('\n')}
`
    };
  }
};

// Contact command implementation
const contactCommand: Command = {
  name: 'contact',
  description: 'Display my contact information',
  execute: () => {
    return {
      content: `
Contact Information:

Email: ${portfolioData.contact.email}
${portfolioData.contact.linkedin ? `LinkedIn: ${portfolioData.contact.linkedin}` : ''}
${portfolioData.contact.github ? `GitHub: ${portfolioData.contact.github}` : ''}
${portfolioData.contact.twitter ? `Twitter: ${portfolioData.contact.twitter}` : ''}
${portfolioData.contact.website ? `Website: ${portfolioData.contact.website}` : ''}
`
    };
  }
};

// Clear command implementation
const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal screen',
  execute: () => {
    return {
      content: 'CLEAR_TERMINAL',
    };
  }
};

// Resume command implementation
const resumeCommand: Command = {
  name: 'resume',
  description: 'Display my resume',
  execute: () => {
    return {
      content: `
Resume - ${portfolioData.name}
${portfolioData.title}
${portfolioData.location}

SUMMARY
${portfolioData.summary}

EXPERIENCE
${portfolioData.experience.map(exp => `
${exp.position} at ${exp.company} (${exp.duration})
${exp.description}
Key achievements:
${exp.achievements.map(achievement => `- ${achievement}`).join('\n')}
`).join('\n')}

EDUCATION
${portfolioData.education.map(edu => `
${edu.degree}
${edu.institution}, ${edu.year}
`).join('\n')}

SKILLS
${portfolioData.skills.map(skillCategory => `
${skillCategory.category}: ${skillCategory.items.join(', ')}
`).join('\n')}

CONTACT
Email: ${portfolioData.contact.email}
${portfolioData.contact.linkedin ? `LinkedIn: ${portfolioData.contact.linkedin}` : ''}
${portfolioData.contact.github ? `GitHub: ${portfolioData.contact.github}` : ''}
`
    };
  }
};

const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Display welcome message',
  hidden: true,
  execute: () => {
    return {
      content: `
Welcome to ${portfolioData.name}'s Terminal Portfolio!
======================================================

Type 'help' to see available commands.
Try 'about' to learn more about me.
`,
    };
  }
};

// Define the list of available commands
export const commands: Command[] = [
  helpCommand,
  aboutCommand,
  skillsCommand,
  projectsCommand,
  experienceCommand,
  educationCommand,
  contactCommand,
  clearCommand,
  resumeCommand,
  welcomeCommand
];

// Process a command string and return the result
export function processCommand(commandString: string): CommandResult {
  // Trim leading/trailing whitespace and split into command and args
  const parts = commandString.trim().split(/\s+/);
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  // Find the matching command
  const command = commands.find(cmd => cmd.name === commandName);
  
  if (!command) {
    return {
      content: `Command not found: ${commandName}. Type 'help' to see available commands.`,
      isError: true
    };
  }
  
  try {
    return command.execute(args);
  } catch (error) {
    return {
      content: `Error executing command: ${error instanceof Error ? error.message : String(error)}`,
      isError: true
    };
  }
}
