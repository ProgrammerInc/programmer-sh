/**
 * Utility functions for Threads animation component
 */

/**
 * Calculate the normalized mouse position within a container element
 *
 * @param event - Mouse event
 * @param container - Container element
 * @returns Normalized mouse coordinates [x, y] in range [0,1]
 */
export const getNormalizedMousePosition = (
  event: MouseEvent,
  container: HTMLElement
): [number, number] => {
  const rect = container.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  // WebGL coordinate system has Y pointing up, so we invert the Y value
  const y = 1.0 - (event.clientY - rect.top) / rect.height;
  return [x, y];
};

/**
 * Handle smooth mouse movement towards a target position
 *
 * @param current - Current mouse position
 * @param target - Target mouse position
 * @param smoothing - Smoothing factor (lower = smoother)
 * @returns Updated current position
 */
export const smoothMouseMovement = (
  current: [number, number],
  target: [number, number],
  smoothing: number
): [number, number] => {
  const nextX = current[0] + (target[0] - current[0]) * smoothing;
  const nextY = current[1] + (target[1] - current[1]) * smoothing;
  return [nextX, nextY];
};

/**
 * Create a Float32Array from a tuple
 *
 * @param values - Tuple of number values
 * @returns Float32Array containing the values
 */
export const createFloat32Array = (values: number[]): Float32Array => {
  return new Float32Array(values);
};
