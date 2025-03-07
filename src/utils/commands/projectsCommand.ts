import { Command, CommandResult } from './types';

export const projectsCommand: Command = {
  name: 'projects',
  description: 'Browse portfolio projects',
  execute: (): CommandResult => {
    return {
      content: `<div class="mb-4">
        <strong class="text-terminal-prompt">Portfolio Projects</strong>
        <div>
          <div>
            <p class="font-bold">Programmer News</p>
            <p class="text-sm text-terminal-text-secondary">React, Node.js, PostgreSQL</p>
            <p>A Hacker News-like platform for developers to share and discuss tech news, articles, and resources.</p>
            <p><a href="https://programmer.news" target="_blank" class="text-terminal-link">programmer.news</a></p>
          </div>
          <div>
            <p class="font-bold">Programmer Search</p>
            <p class="text-sm text-terminal-text-secondary">JavaScript, Chrome Extensions API</p>
            <p>A browser extension that enhances search results with developer-friendly features and shortcuts.</p>
            <p><a href="https://programmer.search" target="_blank" class="text-terminal-link">programmer.search</a></p>
          </div>
          <div>
            <p class="font-bold">Programmer Books</p>
            <p class="text-sm text-terminal-text-secondary">React, TypeScript, Firebase</p>
            <p>A curated collection of programming books with reviews, categories, and reading recommendations.</p>
            <p><a href="https://programmer.books" target="_blank" class="text-terminal-link">programmer.books</a></p>
          </div>
          <div>
            <p class="font-bold">SpaceX Launches Tracker</p>
            <p class="text-sm text-terminal-text-secondary">Angular, RxJS, SpaceX API</p>
            <p>An interactive dashboard to track SpaceX rocket launches, with detailed mission information.</p>
            <p><a href="https://programmer.to/spacex" target="_blank" class="text-terminal-link">programmer.to/spacex</a></p>
          </div>
          <div>
            <p class="font-bold">Programmer.SH</p>
            <p class="text-sm text-terminal-text-secondary">React, TypeScript, Three.js</p>
            <p>This interactive terminal portfolio website showcasing my skills and projects.</p>
            <p><a href="https://programmer.sh" target="_blank" class="text-terminal-link">programmer.sh</a></p>
          </div>
        </div>
      </div>`,
      isError: false,
      rawHTML: true
    };
  }
};
