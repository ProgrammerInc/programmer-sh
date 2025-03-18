'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Wallpaper } from '.';
import { WallpaperProvider } from './wallpaper';

const meta: Meta<typeof WallpaperProvider> = {
  title: 'UI/Wallpaper',
  component: WallpaperProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof WallpaperProvider>;

/**
 * The basic Wallpaper component with default settings.
 */
export const Default: Story = {
  render: () => (
    <WallpaperProvider>
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-background/80 p-8 backdrop-blur-sm">
          <h1 className="mb-4 text-3xl font-bold">Default Wallpaper</h1>
          <p className="max-w-md">
            This example shows the default wallpaper with content on top. The content has a
            semi-transparent background with backdrop blur for better readability.
          </p>
        </div>
      </div>
    </WallpaperProvider>
  )
};

/**
 * A Wallpaper with particle network animation.
 */
export const ParticleNetwork: Story = {
  render: () => (
    <WallpaperProvider wallpaper="particle-network">
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-background/80 p-8 backdrop-blur-sm">
          <h1 className="mb-4 text-3xl font-bold">Particle Network</h1>
          <p className="max-w-md">
            This example shows a particle network animation. The particles connect to form a dynamic
            network that responds to mouse movement if interactive mode is enabled.
          </p>
        </div>
      </div>
    </WallpaperProvider>
  )
};

/**
 * A Wallpaper with gradient animation.
 */
export const GradientAnimation: Story = {
  render: () => (
    <WallpaperProvider wallpaper="gradient-animation">
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-background/80 p-8 backdrop-blur-sm">
          <h1 className="mb-4 text-3xl font-bold">Gradient Animation</h1>
          <p className="max-w-md">
            This example shows a smooth gradient animation that transitions between different
            colors.
          </p>
        </div>
      </div>
    </WallpaperProvider>
  )
};

/**
 * An interactive Wallpaper that responds to user input.
 */
export const Interactive: Story = {
  render: () => (
    <WallpaperProvider wallpaper="particle-network" interactive={true}>
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-background/80 p-8 backdrop-blur-sm">
          <h1 className="mb-4 text-3xl font-bold">Interactive Wallpaper</h1>
          <p className="max-w-md">
            Move your mouse or touch the screen to interact with the particles. The interactive mode
            enables user input to affect the animation.
          </p>
        </div>
      </div>
    </WallpaperProvider>
  )
};

/**
 * A custom gradient Wallpaper defined inline.
 */
export const CustomGradient: Story = {
  render: () => {
    const customWallpapers: Record<string, Wallpaper> = {
      'custom-gradient': {
        id: 'custom-gradient',
        name: 'Custom Gradient',
        enabled: true,
        type: 'gradient',
        background: {
          id: 'custom-gradient-bg',
          type: 'gradient',
          gradient: {
            id: 'purple-blue',
            type: 'linear',
            gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
          }
        }
      }
    };

    return (
      <WallpaperProvider wallpapers={customWallpapers} wallpaper="custom-gradient">
        <div className="flex h-screen items-center justify-center">
          <div className="rounded-lg bg-white/90 p-8 text-black backdrop-blur-sm dark:bg-black/90 dark:text-white">
            <h1 className="mb-4 text-3xl font-bold">Custom Gradient</h1>
            <p className="max-w-md">
              This example shows a custom gradient wallpaper defined inline with the component. The
              gradient transitions from indigo to purple.
            </p>
          </div>
        </div>
      </WallpaperProvider>
    );
  }
};

/**
 * A Wallpaper with theme switching capability.
 */
export const ThemeSwitching: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    return (
      <WallpaperProvider wallpaper="grid-pattern" theme={theme}>
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="mb-8 rounded-lg bg-background/80 p-8 backdrop-blur-sm">
            <h1 className="mb-4 text-3xl font-bold">Theme Switching</h1>
            <p className="mb-4 max-w-md">
              This example demonstrates how the wallpaper can respond to theme changes. Click the
              button below to toggle between light and dark themes.
            </p>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
          <div className="text-sm text-muted-foreground">
            Current theme: <span className="font-bold">{theme}</span>
          </div>
        </div>
      </WallpaperProvider>
    );
  }
};

/**
 * A randomized Wallpaper that changes on each render.
 */
export const Randomized: Story = {
  render: () => (
    <WallpaperProvider randomize={true}>
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-background/80 p-8 backdrop-blur-sm">
          <h1 className="mb-4 text-3xl font-bold">Randomized Wallpaper</h1>
          <p className="max-w-md">
            This example shows a different wallpaper each time you refresh the page. The randomize
            prop selects a random wallpaper from the available options.
          </p>
        </div>
      </div>
    </WallpaperProvider>
  )
};

/**
 * Multiple wallpaper examples shown side by side.
 */
export const ComparisonGrid: Story = {
  render: () => {
    const wallpaperTypes = [
      { id: 'particle-network', name: 'Particle Network' },
      { id: 'gradient-animation', name: 'Gradient Animation' },
      { id: 'grid-pattern', name: 'Grid Pattern' },
      { id: 'aurora', name: 'Aurora' }
    ];

    return (
      <div className="grid h-screen grid-cols-1 gap-4 p-4 md:grid-cols-2">
        {wallpaperTypes.map(wallpaper => (
          <div
            key={wallpaper.id}
            className="relative h-full min-h-[300px] overflow-hidden rounded-lg border"
          >
            <WallpaperProvider wallpaper={wallpaper.id}>
              <div className="absolute bottom-4 left-4 rounded-md bg-background/80 px-4 py-2 backdrop-blur-sm">
                {wallpaper.name}
              </div>
            </WallpaperProvider>
          </div>
        ))}
      </div>
    );
  }
};
