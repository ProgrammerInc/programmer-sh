'use client';

import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Terminal from './terminal';

const meta: Meta<typeof Terminal> = {
  title: 'UI/Terminal',
  component: Terminal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Terminal>;

/**
 * The basic Terminal component with default settings.
 */
export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <Terminal
        className="h-[80vh] w-full max-w-4xl mx-auto border border-border rounded-lg overflow-hidden"
        initialCommands={[]}
        socialLinks={[
          { type: 'github', url: 'https://github.com', label: 'GitHub' },
          { type: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
          { type: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' }
        ]}
      />
    </div>
  )
};

/**
 * A Terminal with initial commands executed on load.
 */
export const WithInitialCommands: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <Terminal
        className="h-[80vh] w-full max-w-4xl mx-auto border border-border rounded-lg overflow-hidden"
        initialCommands={['help', 'echo "Welcome to the interactive terminal demo!"']}
        socialLinks={[
          { type: 'github', url: 'https://github.com', label: 'GitHub' },
          { type: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
          { type: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' }
        ]}
      />
    </div>
  )
};

/**
 * A Terminal that showcases different command outputs.
 */
export const CommandShowcase: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <Terminal
        className="h-[80vh] w-full max-w-4xl mx-auto border border-border rounded-lg overflow-hidden"
        initialCommands={[
          'help',
          'ls',
          'echo "This is a showcase of different command outputs"',
          'clear'
        ]}
        socialLinks={[
          { type: 'github', url: 'https://github.com', label: 'GitHub' },
          { type: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
          { type: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' }
        ]}
      />
    </div>
  )
};

/**
 * A Terminal with custom theme (dark mode).
 */
export const DarkMode: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8 dark">
      <Terminal
        className="h-[80vh] w-full max-w-4xl mx-auto border border-border bg-zinc-900 text-zinc-200 rounded-lg overflow-hidden"
        initialCommands={['echo "This is a terminal with dark mode styling."']}
        socialLinks={[
          { type: 'github', url: 'https://github.com', label: 'GitHub' },
          { type: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
          { type: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' }
        ]}
      />
    </div>
  )
};

/**
 * Terminal with interactive command execution.
 */
export const InteractiveCommands: Story = {
  render: () => {
    // Using global window since we're in storybook environment
    // In real applications, set up a proper command processing system
    if (typeof window !== 'undefined') {
      // @ts-expect-error - for storybook demonstration only
      window.__storybook_commands = {
        'hello': () => 'Hello World! This is an interactive command.',
        'random': () => `Random number: ${Math.floor(Math.random() * 100)}`,
        'date': () => `Current date: ${new Date().toLocaleString()}`
      };
    }
    
    return (
      <div className="min-h-screen bg-background p-8">
        <Terminal
          className="terminal-demo h-80 w-full border border-border rounded-lg overflow-hidden"
          initialCommands={[]}
          socialLinks={[
            { type: 'github', url: 'https://github.com', label: 'GitHub' },
            { type: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
            { type: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' }
          ]}
        />
      </div>
    );
  }
};

/**
 * Terminal with error state demonstration.
 */
export const ErrorStates: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <Terminal
        className="h-[80vh] w-full max-w-4xl mx-auto border border-border rounded-lg overflow-hidden"
        initialCommands={['help', 'unknown-command', 'echo "Error handling demonstration"']}
        socialLinks={[
          { type: 'github', url: 'https://github.com', label: 'GitHub' },
          { type: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
          { type: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' }
        ]}
      />
    </div>
  )
};
