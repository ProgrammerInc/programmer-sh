import { Wallpaper } from '@/components/ui/wallpaper';
import wallpaperPresets from '@/presets/wallpaper.presets';
import { createFeatureLogger } from '@/services/logger/logger.utils';
import { Command, CommandResult } from './command.types';

// Create a dedicated logger for wallpaper commands
const wallpaperLogger = createFeatureLogger('WallpaperCommands');

/**
 * Local storage key for storing the current wallpaper selection
 */
export const WALLPAPER_STORAGE_KEY = 'terminal_wallpaper';

/**
 * Type for wallpaper categories
 */
export enum WallpaperType {
  Animation = 'animation',
  Image = 'image',
  Video = 'video',
  Default = 'default'
}

/**
 * Interface for grouped wallpaper entries
 */
export interface WallpapersByType {
  [type: string]: Array<[string, Wallpaper]>;
}

/**
 * Type mapping for display names
 */
export interface TypeDisplayNames {
  [key: string]: string;
}

/**
 * Interface for wallpaper change event detail
 */
export interface WallpaperChangeEventDetail {
  /** ID of the selected wallpaper */
  wallpaperId: string;
  /** The wallpaper configuration */
  wallpaper: Wallpaper;
}

/**
 * Get the currently active wallpaper ID from localStorage or return the default
 * @returns The ID of the current wallpaper
 */
export const getCurrentWallpaper = (): string => {
  try {
    const savedWallpaper = localStorage.getItem(WALLPAPER_STORAGE_KEY);
    const wallpaperId = savedWallpaper || 'default';

    // Verify the wallpaper exists in presets
    if (!Object.keys(wallpaperPresets).includes(wallpaperId)) {
      wallpaperLogger.warn('Saved wallpaper not found in presets, using default', { wallpaperId });
      return 'default';
    }

    return wallpaperId;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    wallpaperLogger.error('Error getting current wallpaper', { error: errorMessage });
    return 'default'; // Fallback to default
  }
};

/**
 * Validates if a wallpaper ID exists in presets
 * @param id - The wallpaper ID to validate
 * @returns True if wallpaper exists in presets
 */
export const isValidWallpaper = (id: string): boolean => {
  return !!wallpaperPresets[id];
};

/**
 * Set the active wallpaper and store in localStorage
 * @param id - The ID of the wallpaper to set
 * @throws Error if wallpaper ID is not found in presets
 */
export const setWallpaper = (id: string): void => {
  try {
    // Verify the wallpaper exists in presets before proceeding
    if (!isValidWallpaper(id)) {
      throw new Error(`Wallpaper with ID '${id}' not found in presets`);
    }

    localStorage.setItem(WALLPAPER_STORAGE_KEY, id);

    // Dispatch custom event for components to respond to wallpaper change
    const wallpaperChangeEvent: CustomEvent<WallpaperChangeEventDetail> = new CustomEvent(
      'wallpaperChange',
      {
        detail: { wallpaperId: id, wallpaper: wallpaperPresets[id] }
      }
    );
    document.dispatchEvent(wallpaperChangeEvent);

    wallpaperLogger.info('Wallpaper set successfully', { wallpaperId: id });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    wallpaperLogger.error('Error setting wallpaper', { id, error: errorMessage });
    // Re-throw to allow calling code to handle the error
    throw error;
  }
};

// Flag to track initialization status
let wallpaperInitialized = false;

/**
 * Initialize wallpaper on application load
 * Only initializes once to prevent multiple initializations
 */
export const initializeWallpaper = (): void => {
  try {
    // Only initialize once
    if (wallpaperInitialized) {
      wallpaperLogger.debug('Wallpaper already initialized, skipping');
      return;
    }

    const currentWallpaper = getCurrentWallpaper();
    setWallpaper(currentWallpaper);

    // Mark as initialized
    wallpaperInitialized = true;
    wallpaperLogger.info('Wallpaper initialized', { wallpaper: currentWallpaper });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    wallpaperLogger.error('Error initializing wallpaper', { error: errorMessage });
    // Don't re-throw as this is called during initialization
  }
};

/**
 * Group wallpapers by their type
 * @returns Object with wallpapers grouped by type
 */
const groupWallpapersByType = (): WallpapersByType => {
  try {
    const wallpapersByType: WallpapersByType = {};

    Object.entries(wallpaperPresets).forEach(([id, wallpaper]) => {
      const type = wallpaper.type;
      if (!wallpapersByType[type]) {
        wallpapersByType[type] = [];
      }
      wallpapersByType[type].push([id, wallpaper]);
    });

    return wallpapersByType;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    wallpaperLogger.error('Error grouping wallpapers by type', { error: errorMessage });
    return {}; // Return empty object on error
  }
};

/**
 * Format wallpaper list for display
 * @param wallpapersByType - Wallpapers grouped by type
 * @returns Formatted HTML string for display
 */
const formatWallpaperList = (wallpapersByType: WallpapersByType): string => {
  try {
    // Define the display order and titles for types
    const typeDisplayOrder = [WallpaperType.Animation, WallpaperType.Image, WallpaperType.Video];

    const typeDisplayNames: TypeDisplayNames = {
      [WallpaperType.Animation]: 'Animation',
      [WallpaperType.Image]: 'Image',
      [WallpaperType.Video]: 'Video'
    };

    // Build the categorized output
    let wallpaperOutput = '';

    // Iterate over the display order and add wallpapers to the output (except for Image wallpapers)
    typeDisplayOrder.forEach(type => {
      if (
        type !== WallpaperType.Image &&
        wallpapersByType[type] &&
        wallpapersByType[type].length > 0
      ) {
        wallpaperOutput += `\n<span class="text-terminal-prompt font-normal">${typeDisplayNames[type]} Wallpapers</span>`;

        wallpapersByType[type]
          .sort(([idA], [idB]) => idA.localeCompare(idB))
          .forEach(([id, wallpaper]) => {
            wallpaperOutput += `\n&nbsp;&nbsp;- <span class="command-link" data-command="wallpaper ${wallpaper.id}">${wallpaper.id}</span>: ${wallpaper.description}`;
          });

        wallpaperOutput += '\n';
      }
    });

    return wallpaperOutput;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    wallpaperLogger.error('Error formatting wallpaper list', { error: errorMessage });
    return 'Error formatting wallpaper list. Please try again.';
  }
};

/**
 * Interface for wallpaper command result metadata
 */
export interface WallpaperCommandMetadata
  extends Record<string, string | number | boolean | string[] | number[]> {
  /** Previously active wallpaper ID */
  previousWallpaper: string;
  /** Newly set wallpaper ID */
  newWallpaper: string;
}

/**
 * Command to change or list available terminal background wallpapers
 */
export const wallpaperCommand: Command = {
  name: 'wallpaper',
  description: 'Change the terminal background wallpaper',
  usage: 'wallpaper [name]',
  execute: (args?: string): CommandResult => {
    try {
      const currentWallpaper = getCurrentWallpaper();

      if (!args) {
        // List available wallpapers
        const wallpapersByType = groupWallpapersByType();
        const wallpaperOutput = formatWallpaperList(wallpapersByType);

        wallpaperLogger.debug('Listed available wallpapers', {
          current: currentWallpaper,
          totalAvailable: Object.keys(wallpaperPresets).length
        });

        return {
          content: `Current wallpaper: <span class="text-terminal-prompt">${wallpaperPresets[currentWallpaper].id}</span>\n\nAvailable Wallpapers:\n${wallpaperOutput}\nUsage: <span class="command-link" data-command="wallpaper [name]" data-placeholder="[name]">wallpaper [name]</span>`,
          isError: false,
          rawHTML: true
        };
      }

      const requestedWallpaper = args.trim().toLowerCase();

      if (!isValidWallpaper(requestedWallpaper)) {
        wallpaperLogger.warn('Wallpaper not found', { requested: requestedWallpaper });
        return {
          content: `Wallpaper <span class="text-terminal-prompt">${requestedWallpaper}</span> not found. Use <span class="command-link" data-command="wallpaper">wallpaper</span> to see available options.`,
          isError: true,
          rawHTML: true
        };
      }

      // Set the wallpaper
      setWallpaper(requestedWallpaper);

      wallpaperLogger.info('Wallpaper changed', {
        from: currentWallpaper,
        to: requestedWallpaper
      });

      return {
        content: `Wallpaper changed to <span class="text-terminal-prompt">${requestedWallpaper}</span>.`,
        isError: false,
        rawHTML: true,
        metadata: {
          previousWallpaper: currentWallpaper,
          newWallpaper: requestedWallpaper
        } as WallpaperCommandMetadata
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      wallpaperLogger.error('Error executing wallpaper command', { error: errorMessage });
      return {
        content: `Error changing wallpaper: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Debug the Ballpit wallpaper specifically
 */
export const debugBallpit = (): void => {
  try {
    console.log('[Debug] Attempting to force Ballpit wallpaper');

    // Log available wallpapers
    console.log('[Debug] Available wallpapers:', Object.keys(wallpaperPresets));

    // Verify ballpit exists in presets
    if (!wallpaperPresets.ballpit) {
      console.error('[Debug] Ballpit wallpaper not found in presets');
      return;
    }

    // Force ballpit wallpaper
    localStorage.setItem(WALLPAPER_STORAGE_KEY, 'ballpit');

    // Dispatch custom event for components to respond to wallpaper change
    const wallpaperChangeEvent: CustomEvent<WallpaperChangeEventDetail> = new CustomEvent(
      'wallpaperChange',
      {
        detail: { wallpaperId: 'ballpit', wallpaper: wallpaperPresets.ballpit }
      }
    );
    document.dispatchEvent(wallpaperChangeEvent);

    // Log success
    console.log('[Debug] Successfully forced Ballpit wallpaper');

    // Load the animation properties for inspection
    const ballpitConfig = wallpaperPresets.ballpit;
    console.log('[Debug] Ballpit config:', ballpitConfig);

    // Check if the animation type is correctly set
    if (ballpitConfig.background.animation) {
      console.log('[Debug] Animation type:', ballpitConfig.background.animation.type);
      console.log('[Debug] Animation ID:', ballpitConfig.background.animation.id);
    } else {
      console.error('[Debug] No animation config found for Ballpit');
    }
  } catch (error) {
    console.error('[Debug] Error forcing Ballpit wallpaper:', error);
  }
};
