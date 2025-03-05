import wallpapers from '@/components/ui/wallpaper/wallpaper.presets';
import { Command, CommandResult } from './types';

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
