
import { Command, CommandResult } from './types';

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
