import { Command, CommandResult } from './types';

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
  const isDark = theme === 'dark';

  // Apply theme to the document
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
  } else {
    document.documentElement.classList.remove('light-theme');
  }

  // Dispatch custom event for favicon and other theme-aware components
  document.dispatchEvent(
    new CustomEvent('themeChange', {
      detail: { isDark, theme }
    })
  );
};

// Process theme from URL parameter
export const processThemeFromUrl = (themeParam: string): void => {
  if (!themeParam) return;

  const normalizedTheme = themeParam.toLowerCase();

  if (normalizedTheme === 'dark' || normalizedTheme === 'light') {
    setTheme(normalizedTheme as ThemeOption);
    console.log(`Theme set from URL parameter: ${normalizedTheme}`);
  } else {
    console.warn(`Invalid theme parameter: ${themeParam}. Using current theme.`);
  }
};

// Flag to track initialization status
let themeInitialized = false;

// Initialize theme on load - with safeguard to prevent multiple initializations
export const initializeTheme = (): void => {
  // Only initialize once
  if (themeInitialized) {
    return;
  }

  const currentTheme = getCurrentTheme();
  setTheme(currentTheme);

  // Mark as initialized
  themeInitialized = true;
  console.log('Theme initialized');
};

// Theme command
export const themeCommand: Command = {
  name: 'theme',
  description: 'Change the terminal theme (dark/light)',
  execute: (args?: string): CommandResult => {
    const currentTheme = getCurrentTheme();

    if (!args) {
      return {
        content: `\nCurrent theme: <span class="text-terminal-prompt">${currentTheme}</span>\n\nUsage: <span class="command-link" data-command="theme" data-placeholder="[dark|light]">theme</span> [<span class="command-link" data-command="theme dark">dark</span>|<span class="command-link" data-command="theme light">light</span>]\n\n`,
        isError: false
      };
    }

    const newTheme = args.trim().toLowerCase();

    if (newTheme !== 'dark' && newTheme !== 'light') {
      return {
        content: `\nInvalid theme: <span class="text-terminal-prompt">${newTheme}</span>. Available Themes: <span class="command-link" data-command="theme dark">dark</span>, <span class="command-link" data-command="theme light">light</span>\n\n`,
        isError: true
      };
    }

    if (newTheme === currentTheme) {
      return {
        content: `\nTheme is already set to <span class="text-terminal-prompt">${currentTheme}</span> mode.\n\n`,
        isError: false
      };
    }

    setTheme(newTheme as ThemeOption);

    return {
      content: `\nTheme switched to <span class="text-terminal-prompt">${newTheme}</span> mode.\n\n`,
      isError: false
    };
  }
};
