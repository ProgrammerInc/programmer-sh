import { Command, CommandResult } from './types';

// Predefined wallpapers
export const wallpapers = {
  aurora: {
    id: 'aurora',
    name: 'Aurora',
    description: 'Northern Lights in the night sky',
    type: 'animation'
  },
  balatro: {
    id: 'balatro',
    name: 'Balatro',
    description: 'Balatro - a rainbow of colors',
    type: 'animation'
  },
  ballpit: {
    id: 'ballpit',
    name: 'Ballpit',
    description: 'A ball pit of many colorful balls',
    type: 'animation'
  },
  code: {
    id: 'code',
    name: 'Code',
    description: 'Colorful code on a computer monitor',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80'
  },
  // dither: {
  //   id: 'dither',
  //   name: 'Dither',
  //   description: 'Dithered animation wallpaper',
  //   type: 'animation'
  // },
  fog: {
    id: 'fog',
    name: 'Fog',
    description: 'Foggy mountain summit',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80'
  },
  gradient: {
    id: 'gradient',
    name: 'Gradient',
    description: 'A simple gradient background',
    type: 'gradient'
  },
  'grid-distortion': {
    id: 'grid-distortion',
    name: 'Grid Distortion',
    description: 'Grid Distortion - a twisted grid of tiles flipping and rotating',
    type: 'animation',
    url: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&q=80'
  },
  hyperspeed: {
    id: 'hyperspeed',
    name: 'Hyperspeed',
    description: 'Hyperspeed - streams of light race across the screen',
    type: 'animation'
  },
  iridescence: {
    id: 'iridescence',
    name: 'Iridescence',
    description: 'Iridescence - waves of iridescence',
    type: 'animation'
  },
  'letter-glitch': {
    id: 'letter-glitch',
    name: 'Letter Glitch',
    description: "There's a glitch in the matrix",
    type: 'animation'
  },
  lightning: {
    id: 'lightning',
    name: 'Lightning',
    description: 'Lightning across in the sky',
    type: 'animation'
  },
  'liquid-chrome': {
    id: 'liquid-chrome',
    name: 'Liquid Chrome',
    description: 'Liquid Chrome - monochrome waves of liquid metal',
    type: 'animation'
  },
  'magnet-lines': {
    id: 'magnet-lines',
    name: 'Magnet Lines',
    description: 'Magnet Lines - magnet lines follows the cursor across the screen',
    type: 'animation'
  },
  'meta-balls': {
    id: 'meta-balls',
    name: 'Meta Balls',
    description: 'Meta Balls - reactivate balls on cursor hover',
    type: 'animation'
  },
  mountains: {
    id: 'mountains',
    name: 'Mountains',
    description: "Bird's eye view of green mountains",
    type: 'image',
    url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    description: 'Ocean wave at beach',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80'
  },
  particles: {
    id: 'particles',
    name: 'Particles',
    description: 'Particles - lucy in the sky with diamonds',
    type: 'animation'
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    description: 'The threads of fate on your desktop',
    type: 'animation'
  },
  waves: {
    id: 'waves',
    name: 'Waves',
    description: 'Waves - trippy psychedelic liquid animation wallpaper',
    type: 'animation'
  },
  workspace: {
    id: 'workspace',
    name: 'Workspace',
    description: 'Clean workspace with iMac',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80'
  }
};

// Wallpaper types
export type WallpaperType = 'gradient' | 'image' | 'animation';

// Wallpaper definition
export interface Wallpaper {
  id: string;
  name: string;
  description: string;
  type: WallpaperType;
  url?: string;
}

// Current wallpaper key in localStorage
export const WALLPAPER_STORAGE_KEY = 'terminal_wallpaper';

// Get current wallpaper from localStorage or default wallpaper
export const getCurrentWallpaper = (): string => {
  const savedWallpaper = localStorage.getItem(WALLPAPER_STORAGE_KEY);
  return savedWallpaper || 'particles';
};

// Set wallpaper in localStorage and dispatch event
export const setWallpaper = (id: string): void => {
  localStorage.setItem(WALLPAPER_STORAGE_KEY, id);

  // Dispatch custom event for components to respond to wallpaper change
  document.dispatchEvent(
    new CustomEvent('wallpaperChange', {
      detail: { wallpaperId: id, wallpaper: wallpapers[id] }
    })
  );
};

// Initialize wallpaper on load
export const initializeWallpaper = (): void => {
  const currentWallpaper = getCurrentWallpaper();
  setWallpaper(currentWallpaper);
};

// Wallpaper command
export const wallpaperCommand: Command = {
  name: 'wallpaper',
  description: 'Change the terminal background wallpaper',
  execute: (args?: string): CommandResult => {
    const currentWallpaper = getCurrentWallpaper();

    if (!args) {
      const availableWallpapers = Object.entries(wallpapers)
        .map(
          ([id, wallpaper]) =>
            `\n  - <span class="command-link" data-command="wallpaper ${wallpaper.id}">${wallpaper.id}</span>: ${wallpaper.description}`
        )
        .join('');

      return {
        content: `Current wallpaper: <span class="text-terminal-prompt">${wallpapers[currentWallpaper].id}</span>\n\nAvailable wallpapers:\n${availableWallpapers}\n\nUsage: wallpaper [name]`,
        isError: false
      };
    }

    const requestedWallpaper = args.trim().toLowerCase();

    if (!Object.keys(wallpapers).includes(requestedWallpaper)) {
      return {
        content: `Wallpaper <span class="text-terminal-prompt">${requestedWallpaper}</span> not found. Use <span class="command-link" data-command="wallpaper">wallpaper</span> to see available options.`,
        isError: true
      };
    }

    if (requestedWallpaper === currentWallpaper) {
      return {
        content: `Wallpaper is already set to <span class="text-terminal-prompt">${wallpapers[currentWallpaper].id}</span>.`,
        isError: false
      };
    }

    setWallpaper(requestedWallpaper);

    return {
      content: `Wallpaper changed to <span class="text-terminal-prompt">${wallpapers[requestedWallpaper].id}</span>.`,
      isError: false
    };
  }
};
