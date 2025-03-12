// Import wdyr (why-did-you-render) to track unnecessary re-renders
// This import must be first!
import './wdyr';

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeTheme } from './utils/commands/theme-commands.ts';
import { initializeWallpaper } from './utils/commands/wallpaper-commands.ts';

// Initialize theme on application load
initializeTheme();

// Initialize wallpaper on application load
initializeWallpaper();

createRoot(document.getElementById('root')!).render(<App />);
