// Import getCommands function from the main commands file
import { getCommands } from '../commands';

// Get all commands and log them for debugging
const allCommands = getCommands();
console.log('All available commands:', Object.keys(allCommands));

// List of valid commands that can be executed via URL
// This is now dynamically generated from all available commands
export const validUrlCommands = Object.keys(allCommands);

// Log the valid commands to verify they are correctly populated
console.log('Valid URL commands:', validUrlCommands);

// Extract command and theme from URL
export const extractUrlParameters = (url: string) => {
  // Default values
  const result = {
    command: '',
    theme: ''
  };

  // Check if URL has a path component
  if (!url || url === '/' || url === '') {
    return result;
  }

  try {
    // Parse URL to extract path and query parameters
    const urlObj = new URL(url, window.location.origin);

    // Extract command from path (remove leading slash)
    const path = urlObj.pathname;
    // Clean up the path to extract just the command
    // Remove leading slash and split on any additional slashes
    // to get just the first path segment
    let command = '';
    if (path && path !== '/') {
      const pathWithoutLeadingSlash = path.startsWith('/') ? path.substring(1) : path;
      // Split by slash and take only the first segment
      command = pathWithoutLeadingSlash.split('/')[0];
    }

    // Extract theme parameter if present
    const theme = urlObj.searchParams.get('theme') || '';

    return {
      command: command || '',
      theme: theme || ''
    };
  } catch (error) {
    console.error('Error parsing URL:', error);
    return result;
  }
};
