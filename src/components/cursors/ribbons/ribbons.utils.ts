/**
 * Utility functions for the Ribbons cursor component.
 */
import { Color, Polyline, Renderer, Vec3 } from 'ogl';

import { FRAGMENT_SHADER, VERTEX_SHADER } from './ribbons.constants';
import type { RibbonUniforms } from './ribbons.types';

/**
 * Creates a renderer for the ribbons effect.
 *
 * @param dpr - Device pixel ratio
 * @param backgroundColor - Background color as RGBA array
 * @returns OGL renderer
 */
export const createRenderer = (dpr: number, backgroundColor: number[]): Renderer => {
  // Create a renderer with an alpha-enabled context
  const renderer = new Renderer({ dpr, alpha: true });
  const gl = renderer.gl;

  // Set the clear color
  if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {
    gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);
  } else {
    gl.clearColor(0, 0, 0, 0);
  }

  return renderer;
};

/**
 * Applies styles to the canvas element.
 *
 * @param canvas - Canvas element
 * @param styles - Object containing style properties
 */
export const applyCanvasStyles = (
  canvas: HTMLCanvasElement,
  styles: Record<string, string>
): void => {
  Object.entries(styles).forEach(([key, value]) => {
    // Use Object.assign to avoid TypeScript readonly properties errors
    Object.assign(canvas.style, { [key]: value });
  });
};

/**
 * Creates a polyline for a ribbon with specified properties.
 *
 * @param renderer - OGL renderer instance
 * @param points - Array of points for the ribbon
 * @param color - Color of the ribbon
 * @param thickness - Thickness of the ribbon
 * @param enableShaderEffect - Whether to enable the shader effect
 * @param effectAmplitude - Amplitude of the shader effect
 * @param enableFade - Whether to enable the fade effect
 * @returns Polyline object
 */
export const createPolyline = (
  renderer: Renderer,
  points: Vec3[],
  color: string,
  thickness: number,
  enableShaderEffect: boolean,
  effectAmplitude: number,
  enableFade: boolean
): Polyline => {
  return new Polyline(renderer.gl, {
    points,
    vertex: VERTEX_SHADER,
    fragment: FRAGMENT_SHADER,
    uniforms: {
      uColor: { value: new Color(color) },
      uThickness: { value: thickness },
      uOpacity: { value: 1.0 },
      uTime: { value: 0.0 },
      uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
      uEffectAmplitude: { value: effectAmplitude },
      uEnableFade: { value: enableFade ? 1.0 : 0.0 }
    } as RibbonUniforms
  });
};

/**
 * Updates the mouse position vector based on a mouse or touch event.
 *
 * @param e - Mouse or touch event
 * @param container - Container element
 * @param targetVec - Vector to update
 */
export const updateMousePosition = (
  e: MouseEvent | TouchEvent,
  container: HTMLElement,
  targetVec: Vec3
): void => {
  let x: number, y: number;
  const rect = container.getBoundingClientRect();

  if ('changedTouches' in e && e.changedTouches.length) {
    x = e.changedTouches[0].clientX - rect.left;
    y = e.changedTouches[0].clientY - rect.top;
  } else if (e instanceof MouseEvent) {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  } else {
    x = 0;
    y = 0;
  }

  const width = container.clientWidth;
  const height = container.clientHeight;
  targetVec.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0);
};

/**
 * Creates an array of Vec3 points for a ribbon.
 *
 * @param count - Number of points to create
 * @returns Array of Vec3 points
 */
export const createPoints = (count: number): Vec3[] => {
  const points: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    points.push(new Vec3());
  }
  return points;
};

/**
 * Calculates a mouse offset for a ribbon based on its index in the array.
 *
 * @param index - Index of the ribbon
 * @param centerValue - Center value of the ribbons array
 * @param offsetFactor - Factor for offset calculation
 * @returns Vec3 representing the offset
 */
export const calculateMouseOffset = (
  index: number,
  centerValue: number,
  offsetFactor: number
): Vec3 => {
  return new Vec3(
    (index - centerValue) * offsetFactor + (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.1,
    0
  );
};
