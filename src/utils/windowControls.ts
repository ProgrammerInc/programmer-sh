
// Window states
export type WindowState = 'normal' | 'minimized' | 'maximized' | 'closed';

const WINDOW_STATE_KEY = 'terminal_window_state';
const WINDOW_POSITION_KEY = 'terminal_window_position';

// Get current window state from localStorage or default to normal
export const getWindowState = (): WindowState => {
  const savedState = localStorage.getItem(WINDOW_STATE_KEY);
  return (savedState as WindowState) || 'normal';
};

// Set window state in localStorage
export const setWindowState = (state: WindowState): void => {
  localStorage.setItem(WINDOW_STATE_KEY, state);
};

// Window position type
export interface WindowPosition {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

// Get saved window position
export const getWindowPosition = (): WindowPosition | null => {
  const savedPosition = localStorage.getItem(WINDOW_POSITION_KEY);
  if (savedPosition) {
    try {
      return JSON.parse(savedPosition);
    } catch (e) {
      console.error('Error parsing window position:', e);
    }
  }
  return null;
};

// Save window position
export const setWindowPosition = (position: WindowPosition): void => {
  localStorage.setItem(WINDOW_POSITION_KEY, JSON.stringify(position));
};
