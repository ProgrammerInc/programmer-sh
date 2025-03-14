import plugin from 'tailwindcss/plugin';

/**
 * Custom plugin to handle gradient colors properly
 */
export const gradientPlugin = plugin(({ addUtilities, theme, e, matchUtilities }) => {
  // Create basic gradient utilities
  const gradientUtilities = {
    '.bg-gradient-to-t': {
      'background-image': 'linear-gradient(to top, var(--tw-gradient-stops))'
    },
    '.bg-gradient-to-tr': {
      'background-image': 'linear-gradient(to top right, var(--tw-gradient-stops))'
    },
    '.bg-gradient-to-r': {
      'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))'
    },
    '.bg-gradient-to-br': {
      'background-image': 'linear-gradient(to bottom right, var(--tw-gradient-stops))'
    },
    '.bg-gradient-to-b': {
      'background-image': 'linear-gradient(to bottom, var(--tw-gradient-stops))'
    },
    '.bg-gradient-to-bl': {
      'background-image': 'linear-gradient(to bottom left, var(--tw-gradient-stops))'
    },
    '.bg-gradient-to-l': {
      'background-image': 'linear-gradient(to left, var(--tw-gradient-stops))'
    },
    '.bg-gradient-to-tl': {
      'background-image': 'linear-gradient(to top left, var(--tw-gradient-stops))'
    }
  };

  addUtilities(gradientUtilities);

  // Initialize gradient variables
  const fromUtilities = {
    '.from-transparent': {
      '--tw-gradient-from': 'transparent',
      '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)'
    }
  };

  addUtilities(fromUtilities);
});
