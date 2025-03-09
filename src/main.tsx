import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeTheme } from './utils/commands/themeCommand';
import { initializeWallpaper } from './utils/commands/wallpaperCommand';

// Initialize theme on application load
initializeTheme();

// Initialize wallpaper on application load
initializeWallpaper();

createRoot(document.getElementById('root')!).render(<App />);
