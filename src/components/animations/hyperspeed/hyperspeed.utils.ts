import * as THREE from 'three';

/**
 * Normalized sine function that returns values between 0 and 1 instead of -1 and 1.
 *
 * @param {number} val - The input value in radians
 * @returns {number} Normalized sine value between 0 and 1
 */
function nsin(val: number) {
  return Math.sin(val) * 0.5 + 0.5;
}

/**
 * Generates a random number within a specified range.
 *
 * @param {number | [number, number]} base - Either a maximum value or an array with [min, max] values
 * @returns {number} A random number within the specified range
 */
function random(base: number | [number, number]): number {
  if (Array.isArray(base)) {
    return Math.random() * (base[1] - base[0]) + base[0];
  }
  return Math.random() * base;
}

/**
 * Picks a random element from an array, or returns the single element if not an array.
 *
 * @template T - The type of elements in the array
 * @param {T | T[]} arr - Either a single element or an array of elements
 * @returns {T} A randomly selected element
 */
function pickRandom<T>(arr: T | T[]): T {
  if (Array.isArray(arr)) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  return arr;
}

/**
 * Linear interpolation function with optional speed and change limit parameters.
 *
 * @param {number} current - The current value
 * @param {number} target - The target value to interpolate towards
 * @param {number} speed - The interpolation speed factor (default: 0.1)
 * @param {number} limit - The minimum change threshold (default: 0.001)
 * @returns {number} The calculated change amount to apply
 */
function lerp(current: number, target: number, speed = 0.1, limit = 0.001): number {
  let change = (target - current) * speed;
  if (Math.abs(change) < limit) {
    change = target - current;
  }
  return change;
}

/**
 * Resizes the renderer to match the display size when needed.
 *
 * @param {THREE.WebGLRenderer} renderer - The THREE.js renderer to resize
 * @param {Function} setSize - Function to call to set the new size
 * @returns {boolean} True if the renderer was resized, false otherwise
 */
function resizeRendererToDisplaySize(
  renderer: THREE.WebGLRenderer,
  setSize: (width: number, height: number, updateStyle: boolean) => void
) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    setSize(width, height, false);
  }
  return needResize;
}

export { lerp, nsin, pickRandom, random, resizeRendererToDisplaySize };
