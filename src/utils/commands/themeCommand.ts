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

// Initialize theme on load
export const initializeTheme = (): void => {
  const currentTheme = getCurrentTheme();
  setTheme(currentTheme);
};

// Theme command
export const themeCommand: Command = {
  name: 'theme',
  description: 'Change the terminal theme (dark/light)',
  execute: (args?: string): CommandResult => {
    const currentTheme = getCurrentTheme();

    if (!args) {
      return {
        content: `Current theme: <span class="text-terminal-prompt">${currentTheme}</span>\nUsage: theme [<span class="command-link" data-command="theme dark">dark</span>|<span class="command-link" data-command="theme light">light</span>]`,
        isError: false
      };
    }

    const newTheme = args.trim().toLowerCase();

    if (newTheme !== 'dark' && newTheme !== 'light') {
      return {
        content: `Invalid theme: <span class="text-terminal-prompt">${newTheme}</span>. Available themes: <span class="command-link" data-command="theme dark">dark</span>, <span class="command-link" data-command="theme light">light</span>`,
        isError: true
      };
    }

    if (newTheme === currentTheme) {
      return {
        content: `Theme is already set to <span class="text-terminal-prompt">${currentTheme}</span> mode.`,
        isError: false
      };
    }

    setTheme(newTheme as ThemeOption);

    return {
      content: `Theme switched to <span class="text-terminal-prompt">${newTheme}</span> mode.`,
      isError: false
    };
  }
};
