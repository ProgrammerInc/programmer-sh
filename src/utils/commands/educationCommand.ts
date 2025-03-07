
import { Command, CommandResult } from './types';

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
