
import { CommandResult } from './types';

// Theme options
export type ThemeOption = 'dark' | 'light';

// Get current theme from localStorage or default to dark
export const getCurrentTheme = (): ThemeOption => {
  const savedTheme = localStorage.getItem('terminal_theme');
  return (savedTheme as ThemeOption) || 'dark';
};

// Set theme in localStorage and apply to document
export const setTheme = (theme: ThemeOption): void => {
  localStorage.setItem('terminal_theme', theme);
  
  // Apply theme to the document
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
  } else {
    document.documentElement.classList.remove('light-theme');
  }
};

// Initialize theme on load
export const initializeTheme = (): void => {
  const currentTheme = getCurrentTheme();
  setTheme(currentTheme);
};

// Theme command
export const themeCommand = {
  execute: (args?: string): CommandResult => {
    const currentTheme = getCurrentTheme();
    
    if (!args) {
      return {
        content: `Current theme: ${currentTheme}\nUsage: theme [dark|light]`,
        isError: false,
      };
    }
    
    const newTheme = args.trim().toLowerCase();
    
    if (newTheme !== 'dark' && newTheme !== 'light') {
      return {
        content: `Invalid theme: ${newTheme}. Available themes: dark, light`,
        isError: true,
      };
    }
    
    if (newTheme === currentTheme) {
      return {
        content: `Theme is already set to ${currentTheme}`,
        isError: false,
      };
    }
    
    setTheme(newTheme as ThemeOption);
    
    return {
      content: `Theme switched to ${newTheme}`,
      isError: false,
    };
  },
};
