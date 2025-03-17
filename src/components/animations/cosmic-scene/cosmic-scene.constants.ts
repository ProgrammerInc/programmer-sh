/**
 * Constants for the CosmicScene component
 */

import { ColorScheme } from './cosmic-scene.types';

/**
 * Default size of the cosmic grid pattern
 */
export const DEFAULT_SIZE = '20px';

/**
 * Default color scheme
 */
export const DEFAULT_COLOR_SCHEME: ColorScheme = 'default';

/**
 * Default interactive state
 */
export const DEFAULT_INTERACTIVE = true;

/**
 * Default overlay opacity
 */
export const DEFAULT_OVERLAY_OPACITY = 0;

/**
 * Default minimum height for the container
 */
export const DEFAULT_MIN_HEIGHT = '400px';

/**
 * Perspective value for 3D effect
 */
export const PERSPECTIVE_VALUE = 1000;

/**
 * Rotation factor for mouse movement
 */
export const ROTATION_FACTOR = 0.02;

/**
 * URL for the noise mask image
 */
export const NOISE_MASK_URL = 'https://assets.codepen.io/605876/noise-mask.png';

/**
 * Color schemes for different themes
 */
export const COLOR_SCHEMES: Record<ColorScheme, string> = {
  default:
    'from 180deg at 50% 70%, hsla(0,0%,98%,1) 0deg, #eec32d 72deg, #ec4b4b 144deg, #709ab9 216deg, #4dffbf 288deg, hsla(0,0%,98%,1) 1turn',
  neon: 'from 180deg at 50% 70%, #ff00ff 0deg, #00ffff 120deg, #ffff00 240deg, #ff00ff 360deg',
  sunset: 'from 180deg at 50% 70%, #ff7b00 0deg, #ff0055 120deg, #8900ff 240deg, #ff7b00 360deg',
  ocean: 'from 180deg at 50% 70%, #00fff2 0deg, #0066ff 120deg, #002bff 240deg, #00fff2 360deg',
  aurora:
    'from 180deg at 50% 70%, #00ff87 0deg, #60efff 90deg, #0061ff 180deg, #60efff 270deg, #00ff87 360deg',
  cosmic:
    'from 180deg at 50% 70%, #6600ff 0deg, #ff00cc 90deg, #ff0066 180deg, #ff00cc 270deg, #6600ff 360deg',
  forest:
    'from 180deg at 50% 70%, #2ecc71 0deg, #27ae60 90deg, #145a32 180deg, #27ae60 270deg, #2ecc71 360deg',
  desert:
    'from 180deg at 50% 70%, #ff9500 0deg, #ff5e3a 90deg, #ff2d55 180deg, #ff5e3a 270deg, #ff9500 360deg',
  twilight:
    'from 180deg at 50% 70%, #141e30 0deg, #243b55 90deg, #2c5364 180deg, #243b55 270deg, #141e30 360deg',
  volcano:
    'from 180deg at 50% 70%, #dd1818 0deg, #ff4e00 90deg, #ff8700 180deg, #ff4e00 270deg, #dd1818 360deg',
  arctic:
    'from 180deg at 50% 70%, #74ebd5 0deg, #acb6e5 90deg, #9face6 180deg, #acb6e5 270deg, #74ebd5 360deg',
  nebula:
    'from 180deg at 50% 70%, #5f2c82 0deg, #49a09d 90deg, #24243e 180deg, #49a09d 270deg, #5f2c82 360deg',
  rainbow:
    'from 180deg at 50% 70%, #ff0000 0deg, #ff8000 60deg, #ffff00 120deg, #00ff00 180deg, #0000ff 240deg, #8000ff 300deg, #ff0000 360deg',
  midnight:
    'from 180deg at 50% 70%, #020024 0deg, #090979 90deg, #00d4ff 180deg, #090979 270deg, #020024 360deg'
};
