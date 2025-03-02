
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeTheme } from './utils/commands/themeCommand';

// Initialize theme on application load
initializeTheme();

createRoot(document.getElementById('root')!).render(<App />);
