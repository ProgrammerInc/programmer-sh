
import { Command, CommandResult } from './types';

// About command
export const aboutCommand: Command = {
  name: 'about',
  description: 'Learn about James A. Black Jr.',
  execute: (): CommandResult => {
    return {
      content: `<div class="mb-4">
        <strong class="text-terminal-prompt">James A. Black Jr.</strong>
        <div class="mt-2">
          <p>A passionate software engineer with 25+ years of experience building web applications. Specialized in Angular and React front-end frameworks, working with both JavaScript/TypeScript languages, and well versed with many backend languages and frameworks from Node.JS to Python, Golang and more.</p>
          
          <p class="mt-2">Dedicated to creating elegant, efficient, and user-friendly solutions that integrate Artificial Intelligence and Machine Learning to take the user experience to the next level.</p>
          
          <p class="mt-2">Currently working as a Principal Engineer at Programmer Incorporated LLC, based in Frisco, TX.</p>
          
          <p class="mt-4">Type <span class="command-link" data-command="contact">contact</span> to see how to get in touch with me.</p>
        </div>
      </div>`,
      isError: false,
      rawHTML: true
    };
  }
};

// Contact command
export const contactCommand: Command = {
  name: 'contact',
  description: 'View contact information',
  execute: (): CommandResult => {
    return {
      content: `<div class="mb-4">
        <strong class="text-terminal-prompt">Contact Information</strong>
        <div class="mt-2">
          <p>📞 Phone: <a href="tel:+13475033967" class="text-terminal-link">+1 (347) 503-3967</a></p>
          <p>📧 Email: <a href="mailto:james.black@programmer.sh" class="text-terminal-link">james.black@programmer.sh</a></p>
          <p>🔗 LinkedIn: <a href="https://linkedin.com/in/ProgrammerInc" target="_blank" class="text-terminal-link">linkedin.com/in/ProgrammerInc</a></p>
          <p>🐙 GitHub: <a href="https://github.com/ProgrammerInc" target="_blank" class="text-terminal-link">github.com/ProgrammerInc</a></p>
          <p>🐦 Twitter/X: <a href="https://x.com/ProgrammerInc" target="_blank" class="text-terminal-link">x.com/ProgrammerInc</a></p>
          <p>🌐 Website: <a href="https://programmer.to/website" target="_blank" class="text-terminal-link">programmer.to/website</a></p>
        </div>
      </div>`,
      isError: false,
      rawHTML: true
    };
  }
};

// Education command
export const educationCommand: Command = {
  name: 'education',
  description: 'See educational background',
  execute: (): CommandResult => {
    return {
      content: `<div class="mb-4">
        <strong class="text-terminal-prompt">Educational Background</strong>
        <div class="mt-2">
          <div class="mb-3">
            <p class="font-bold">Master of Science in Computer Science</p>
            <p>Stanford University</p>
            <p class="text-sm text-terminal-text-secondary">2009 - 2011</p>
            <p>Specialized in Artificial Intelligence and Machine Learning</p>
          </div>
          
          <div>
            <p class="font-bold">Bachelor of Science in Computer Engineering</p>
            <p>Massachusetts Institute of Technology (MIT)</p>
            <p class="text-sm text-terminal-text-secondary">2005 - 2009</p>
            <p>Minor in Data Science</p>
          </div>
        </div>
      </div>`,
      isError: false,
      rawHTML: true
    };
  }
};

// Skills command
export const skillsCommand: Command = {
  name: 'skills',
  description: 'View technical skills',
  execute: (): CommandResult => {
    return {
      content: `<div class="mb-4">
        <strong class="text-terminal-prompt">Technical Skills</strong>
        <div class="mt-2">
          <p class="font-bold mt-2">Frontend Development</p>
          <p>React, Angular, Vue.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, SASS/SCSS, Tailwind CSS</p>
          
          <p class="font-bold mt-2">Backend Development</p>
          <p>Node.js, Express, Python, Django, Flask, Ruby on Rails, Java, Spring Boot, Go</p>
          
          <p class="font-bold mt-2">Databases</p>
          <p>PostgreSQL, MySQL, MongoDB, Redis, Firebase, Supabase</p>
          
          <p class="font-bold mt-2">Cloud & DevOps</p>
          <p>AWS, Azure, Google Cloud Platform, Docker, Kubernetes, CI/CD, GitHub Actions</p>
          
          <p class="font-bold mt-2">Artificial Intelligence & Machine Learning</p>
          <p>TensorFlow, PyTorch, Scikit-learn, OpenAI API, Large Language Models, Prompt Engineering</p>
          
          <p class="font-bold mt-2">Other Skills</p>
          <p>REST APIs, GraphQL, WebSockets, Test-Driven Development, Agile Methodologies, Mobile App Development (React Native)</p>
        </div>
      </div>`,
      isError: false,
      rawHTML: true
    };
  }
};
