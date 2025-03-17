import { createFeatureLogger } from '@/services/logger/logger.utils';
import { Command, CommandResult } from './command.types';

// Create a dedicated logger for theme commands
const themeLogger = createFeatureLogger('ThemeCommands');

/**
 * Theme storage key for localStorage
 */
export const THEME_STORAGE_KEY = 'terminal_theme';

/**
 * Available theme options for the terminal
 */
export enum Theme {
  Dark = 'dark',
  Light = 'light'
}

/**
 * Type alias for theme options
 */
export type ThemeOption = `${Theme}`;

/**
 * Get the current theme from localStorage or return default theme
 * @returns The current theme or 'dark' if not set
 */
export const getCurrentTheme = (): ThemeOption => {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    if (savedTheme === Theme.Dark || savedTheme === Theme.Light) {
      return savedTheme as ThemeOption;
    } 
    
    return Theme.Dark; // Default theme
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    themeLogger.error('Error getting current theme', { error: errorMessage });
    return Theme.Dark; // Fallback to dark theme on error
  }
};

/**
 * Interface for theme change event detail
 */
export interface ThemeChangeEventDetail {
  /** Whether dark mode is active */
  isDark: boolean;
  /** The current theme value */
  theme: ThemeOption;
}

/**
 * Set the theme in localStorage and apply it to the document
 * @param theme - The theme to set ('dark' or 'light')
 */
export const setTheme = (theme: ThemeOption): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    const isDark = theme === Theme.Dark;

    // Apply theme to the document
    if (theme === Theme.Light) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }

    // Dispatch custom event for favicon and other theme-aware components
    const themeChangeEvent: CustomEvent<ThemeChangeEventDetail> = new CustomEvent('themeChange', {
      detail: { isDark, theme }
    });
    document.dispatchEvent(themeChangeEvent);
    
    themeLogger.info('Theme applied successfully', { theme });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    themeLogger.error('Error setting theme', { theme, error: errorMessage });
  }
};

/**
 * Process theme from URL parameter and apply if valid
 * @param themeParam - The theme parameter from URL
 */
export const processThemeFromUrl = (themeParam: string): void => {
  try {
    if (!themeParam) {
      themeLogger.debug('No theme parameter provided in URL');
      return;
    }

    const normalizedTheme = themeParam.toLowerCase();

    if (normalizedTheme === Theme.Dark || normalizedTheme === Theme.Light) {
      setTheme(normalizedTheme as ThemeOption);
      themeLogger.info('Theme set from URL parameter', { theme: normalizedTheme });
    } else {
      themeLogger.warn('Invalid theme parameter', { param: themeParam, using: getCurrentTheme() });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    themeLogger.error('Error processing theme from URL', { themeParam, error: errorMessage });
  }
};

// Flag to track initialization status
let themeInitialized = false;

/**
 * Initialize theme on application load
 * Includes safeguard to prevent multiple initializations
 */
export const initializeTheme = (): void => {
  try {
    // Only initialize once
    if (themeInitialized) {
      themeLogger.debug('Theme already initialized, skipping');
      return;
    }

    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);

    // Mark as initialized
    themeInitialized = true;
    themeLogger.info('Theme initialized', { theme: currentTheme });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    themeLogger.error('Error initializing theme', { error: errorMessage });
    
    // Attempt to set default theme as fallback
    try {
      setTheme(Theme.Dark);
    } catch (fallbackError) {
      themeLogger.error('Failed to set fallback theme', {
        error: fallbackError instanceof Error ? fallbackError.message : String(fallbackError)
      });
    }
  }
};

/**
 * Validates if a string is a valid theme option
 * @param theme - The theme string to validate
 * @returns Whether the theme is valid
 */
export const isValidTheme = (theme: string): theme is ThemeOption => {
  return theme === Theme.Dark || theme === Theme.Light;
};

/**
 * Command to change or display the current terminal theme
 */
export const themeCommand: Command = {
  name: 'theme',
  description: 'Change the terminal theme (dark/light)',
  execute: (args?: string): CommandResult => {
    try {
      themeLogger.info('Executing theme command', args ? { themeArg: args } : {});
      
      const currentTheme = getCurrentTheme();

      if (!args) {
        return {
          content: `\nCurrent theme: <span class="text-terminal-prompt">${currentTheme}</span>\n\nUsage: <span class="command-link" data-command="theme" data-placeholder="[dark|light]">theme</span> [<span class="command-link" data-command="theme dark">dark</span>|<span class="command-link" data-command="theme light">light</span>]\n\n`,
          isError: false
        };
      }

      const newTheme = args.trim().toLowerCase();

      if (!isValidTheme(newTheme)) {
        themeLogger.warn('Invalid theme requested', { requested: newTheme });
        return {
          content: `\nInvalid theme: <span class="text-terminal-prompt">${newTheme}</span>. Available Themes: <span class="command-link" data-command="theme dark">dark</span>, <span class="command-link" data-command="theme light">light</span>\n\n`,
          isError: true
        };
      }

      if (newTheme === currentTheme) {
        themeLogger.info('Theme unchanged', { theme: currentTheme });
        return {
          content: `\nTheme is already set to <span class="text-terminal-prompt">${currentTheme}</span> mode.\n\n`,
          isError: false
        };
      }

      setTheme(newTheme);
      themeLogger.info('Theme changed', { from: currentTheme, to: newTheme });

      return {
        content: `\nTheme switched to <span class="text-terminal-prompt">${newTheme}</span> mode.\n\n`,
        isError: false
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      themeLogger.error('Error executing theme command', { error: errorMessage });
      return {
        content: `Error changing theme: ${errorMessage}`,
        isError: true
      };
    }
  }
};
