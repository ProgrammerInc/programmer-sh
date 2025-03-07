
import { Command, CommandResult } from './types';

export const experienceCommand: Command = {
  name: 'experience',
  description: 'View work experience',
  execute: (): CommandResult => {
    return {
      content: `<div class="mb-4">
        <strong class="text-terminal-prompt">Work Experience</strong>
        <div class="mt-2">
          <div class="mb-4">
            <p class="font-bold">Principal Engineer</p>
            <p>Programmer Incorporated LLC, Frisco, TX</p>
            <p class="text-sm text-terminal-text-secondary">January 2019 - Present</p>
            <ul class="list-disc ml-5 mt-1">
              <li>Lead development of critical, high-performance web applications</li>
              <li>Architect scalable solutions using React, Node.js, and cloud services</li>
              <li>Implement AI-powered features to enhance user experience</li>
              <li>Mentor junior developers and establish best practices</li>
            </ul>
          </div>
          
          <div class="mb-4">
            <p class="font-bold">Senior Software Engineer</p>
            <p>Tech Solutions International, Austin, TX</p>
            <p class="text-sm text-terminal-text-secondary">March 2015 - December 2018</p>
            <ul class="list-disc ml-5 mt-1">
              <li>Developed and maintained large-scale Angular applications</li>
              <li>Designed RESTful APIs and microservices architecture</li>
              <li>Implemented automated testing and deployment pipelines</li>
            </ul>
          </div>
          
          <div class="mb-4">
            <p class="font-bold">Full Stack Developer</p>
            <p>Innovate Digital, San Francisco, CA</p>
            <p class="text-sm text-terminal-text-secondary">June 2011 - February 2015</p>
            <ul class="list-disc ml-5 mt-1">
              <li>Built responsive web applications using JavaScript frameworks</li>
              <li>Managed database design and optimization</li>
              <li>Collaborated with design and product teams to implement user-friendly interfaces</li>
            </ul>
          </div>
        </div>
      </div>`,
      isError: false,
      rawHTML: true
    };
  }
};
