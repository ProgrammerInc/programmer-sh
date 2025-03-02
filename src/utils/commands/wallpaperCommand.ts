
import { Command, CommandResult } from './types';

// Predefined wallpapers
export const wallpapers = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Default gradient background',
    type: 'gradient'
  },
  code: {
    id: 'code',
    name: 'Code',
    description: 'Colorful code on a computer monitor',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80'
  },
  workspace: {
    id: 'workspace',
    name: 'Workspace',
    description: 'Clean workspace with iMac',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80'
  },
  mountains: {
    id: 'mountains',
    name: 'Mountains',
    description: "Bird's eye view of green mountains",
    type: 'image',
    url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80'
  },
  fog: {
    id: 'fog',
    name: 'Fog',
    description: 'Foggy mountain summit',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    description: 'Ocean wave at beach',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80'
  }
};

// Wallpaper types
export type WallpaperType = 'gradient' | 'image';

// Wallpaper definition
export interface Wallpaper {
  id: string;
  name: string;
  description: string;
  type: WallpaperType;
  url?: string;
}

// Current wallpaper key in localStorage
const WALLPAPER_STORAGE_KEY = 'terminal_wallpaper';

// Get current wallpaper from localStorage or default to default
export const getCurrentWallpaper = (): string => {
  const savedWallpaper = localStorage.getItem(WALLPAPER_STORAGE_KEY);
  return savedWallpaper || 'default';
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
        .map(([id, wallpaper]) => `\n- <span class="command-link" data-command="wallpaper ${id}">${wallpaper.name}</span>: ${wallpaper.description}`)
        .join('');
        
      return {
        content: `Current wallpaper: ${wallpapers[currentWallpaper].name}\n\nAvailable wallpapers:${availableWallpapers}\n\nUsage: wallpaper [name]`,
        isError: false,
      };
    }

    const requestedWallpaper = args.trim().toLowerCase();
    
    if (!Object.keys(wallpapers).includes(requestedWallpaper)) {
      return {
        content: `Wallpaper "${requestedWallpaper}" not found. Use "wallpaper" to see available options.`,
        isError: true,
      };
    }

    if (requestedWallpaper === currentWallpaper) {
      return {
        content: `Wallpaper is already set to ${wallpapers[currentWallpaper].name}.`,
        isError: false,
      };
    }

    setWallpaper(requestedWallpaper);

    return {
      content: `Wallpaper changed to ${wallpapers[requestedWallpaper].name}.`,
      isError: false,
    };
  },
};
