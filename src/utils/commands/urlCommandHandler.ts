// List of valid commands that can be executed via URL
export const validUrlCommands = [
  'welcome',
  'about',
  'skills',
  'experience',
  'education',
  'projects',
  'resume',
  'contact',
  'help'
];

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
    const command = path.startsWith('/') ? path.substring(1) : path;

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
