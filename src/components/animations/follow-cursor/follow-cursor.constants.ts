/**
 * Constants for the FollowCursor component
 */

import { AnimationConfig } from './follow-cursor.types';

/**
 * Default animation configuration for cursor movement
 */
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  mass: 5,
  tension: 350,
  friction: 40
};

/**
 * Default wheel/pinch configuration for zoom operations
 */
export const DEFAULT_WHEEL_CONFIG: AnimationConfig = {
  mass: 1,
  tension: 200,
  friction: 30
};

/**
 * Default scale factor when hovering
 */
export const DEFAULT_HOVER_SCALE = 1.1;

/**
 * Default horizontal offset from cursor position
 */
export const DEFAULT_OFFSET_X = 20;

/**
 * Default card width
 */
export const DEFAULT_CARD_WIDTH = '200px';

/**
 * Default rotation factor (higher means less rotation)
 */
export const DEFAULT_ROTATION_FACTOR = 20;

/**
 * Default CSS perspective value
 */
export const DEFAULT_PERSPECTIVE = '300px';

/**
 * Default zoom sensitivity
 */
export const DEFAULT_ZOOM_SENSITIVITY = 200;

/**
 * Default tilt effect state
 */
export const DEFAULT_ENABLE_TILT = true;

/**
 * Default zoom effect state
 */
export const DEFAULT_ENABLE_ZOOM = true;

/**
 * Default drag functionality state
 */
export const DEFAULT_ENABLE_DRAG = true;
