
import { Command, CommandResult } from './types';

export const resumeCommand: Command = {
  name: 'resume',
  description: 'View resume',
  execute: (): CommandResult => {
    return {
      content: `<div class="mb-4">
        <strong class="text-terminal-prompt">Resume</strong>
        <div class="mt-2">
          <p class="font-bold text-lg">James A. Black Jr.</p>
          <p>Principal Engineer at Programmer Incorporated LLC</p>
          <p>Frisco, TX</p>
          <p><a href="mailto:james.black@programmer.sh" class="text-terminal-link">james.black@programmer.sh</a> | <a href="tel:+13475033967" class="text-terminal-link">+1 (347) 503-3967</a></p>
          
          <div class="mt-4">
            <p class="font-bold">PROFESSIONAL SUMMARY</p>
            <p>Full Stack Engineer with 25+ years of experience in web development, specializing in Angular and React frameworks. Proficient in multiple programming languages including JavaScript/TypeScript, Python, and Go. Experienced in integrating AI and machine learning solutions.</p>
          </div>
          
          <div class="mt-4">
            <p class="font-bold">WORK EXPERIENCE</p>
            <p>See details with <span class="command-link" data-command="experience">experience</span> command.</p>
          </div>
          
          <div class="mt-4">
            <p class="font-bold">EDUCATION</p>
            <p>See details with <span class="command-link" data-command="education">education</span> command.</p>
          </div>
          
          <div class="mt-4">
            <p class="font-bold">SKILLS</p>
            <p>See details with <span class="command-link" data-command="skills">skills</span> command.</p>
          </div>
          
          <div class="mt-4">
            <p class="font-bold">PROJECTS</p>
            <p>See details with <span class="command-link" data-command="projects">projects</span> command.</p>
          </div>
          
          <div class="mt-4">
            <p class="font-bold">CERTIFICATIONS</p>
            <ul class="list-disc ml-5">
              <li>AWS Certified Solutions Architect - Professional</li>
              <li>Google Cloud Professional Data Engineer</li>
              <li>Microsoft Certified: Azure Developer Associate</li>
              <li>TensorFlow Developer Certificate</li>
            </ul>
          </div>
          
          <div class="mt-4">
            <p>Download full resume: <a href="#" class="text-terminal-link">resume.pdf</a></p>
          </div>
        </div>
      </div>`,
      isError: false,
      rawHTML: true
    };
  }
};
