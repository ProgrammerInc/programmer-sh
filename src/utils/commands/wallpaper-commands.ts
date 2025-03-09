import wallpapers from '@/presets/wallpaper.presets';
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

// Flag to track initialization status
let wallpaperInitialized = false;

// Initialize wallpaper on load - with safeguard to prevent multiple initializations
export const initializeWallpaper = (): void => {
  // Only initialize once
  if (wallpaperInitialized) {
    return;
  }

  const currentWallpaper = getCurrentWallpaper();
  setWallpaper(currentWallpaper);

  // Mark as initialized
  wallpaperInitialized = true;
  console.log('Wallpaper initialized');
};

// Wallpaper command
export const wallpaperCommand: Command = {
  name: 'wallpaper',
  description: 'Change the terminal background wallpaper',
  execute: (args?: string): CommandResult => {
    const currentWallpaper = getCurrentWallpaper();

    if (!args) {
      // Group wallpapers by their type
      const wallpapersByType: Record<
        string,
        Array<[string, (typeof wallpapers)[keyof typeof wallpapers]]>
      > = {};

      Object.entries(wallpapers).forEach(([id, wallpaper]) => {
        const type = wallpaper.type;
        if (!wallpapersByType[type]) {
          wallpapersByType[type] = [];
        }
        wallpapersByType[type].push([id, wallpaper]);
      });

      // Define the display order and titles for types
      const typeDisplayOrder = ['animation', 'image', 'video'];
      const typeDisplayNames: Record<string, string> = {
        animation: 'Animation',
        image: 'Image',
        video: 'Video'
      };

      // Build the categorized output
      let wallpaperOutput = '';

      typeDisplayOrder.forEach(type => {
        if (wallpapersByType[type] && wallpapersByType[type].length > 0) {
          wallpaperOutput += `\n<span class="text-terminal-prompt font-normal">${typeDisplayNames[type]} Wallpapers</span>`;

          wallpapersByType[type]
            .sort(([idA], [idB]) => idA.localeCompare(idB))
            .forEach(([id, wallpaper]) => {
              wallpaperOutput += `\n&nbsp;&nbsp;- <span class="command-link" data-command="wallpaper ${wallpaper.id}">${wallpaper.id}</span>: ${wallpaper.description}`;
            });

          wallpaperOutput += '\n';
        }
      });

      return {
        content: `\nCurrent wallpaper: <span class="text-terminal-prompt">${wallpapers[currentWallpaper].id}</span>\n\nAvailable Wallpapers:\n${wallpaperOutput}\nUsage: <span class="command-link" data-command="wallpaper" data-placeholder="[name]">wallpaper [name]</span>\n\n`,
        isError: false,
        rawHTML: true
      };
    }

    const requestedWallpaper = args.trim().toLowerCase();

    if (!Object.keys(wallpapers).includes(requestedWallpaper)) {
      return {
        content: `\nWallpaper <span class="text-terminal-prompt">${requestedWallpaper}</span> not found. Use <span class="command-link" data-command="wallpaper">wallpaper</span> to see available options.\n\n`,
        isError: true
      };
    }

    if (requestedWallpaper === currentWallpaper) {
      return {
        content: `\nWallpaper is already set to <span class="text-terminal-prompt">${wallpapers[currentWallpaper].id}</span>.\n\n`,
        isError: false
      };
    }

    setWallpaper(requestedWallpaper);

    return {
      content: `\nWallpaper changed to <span class="text-terminal-prompt">${wallpapers[requestedWallpaper].id}</span>.\n\n`,
      isError: false
    };
  }
};
