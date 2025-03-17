/**
 * Utility functions for the Snowflake Cursor component.
 */
import { FONT_SETTINGS } from './snowflake-cursor.constants';

/**
 * Applies styles to the canvas element.
 *
 * @param canvas - Canvas element
 * @param styles - Object containing style properties
 * @param isFixed - Whether to use fixed or absolute positioning
 */
export const applyCanvasStyles = (
  canvas: HTMLCanvasElement,
  styles: Record<string, string>,
  isFixed: boolean
): void => {
  // Create a copy of styles with position updated based on isFixed
  const updatedStyles = {
    ...styles,
    position: isFixed ? 'fixed' : 'absolute'
  };

  // Apply all styles
  Object.entries(updatedStyles).forEach(([key, value]) => {
    Object.assign(canvas.style, { [key]: value });
  });
};

/**
 * Sets the size of the canvas based on container dimensions.
 *
 * @param canvas - Canvas element
 * @param containerElement - Container element (or null for window)
 */
export const setCanvasSize = (
  canvas: HTMLCanvasElement,
  containerElement: HTMLElement | null
): void => {
  canvas.width = containerElement ? containerElement.clientWidth : window.innerWidth;
  canvas.height = containerElement ? containerElement.clientHeight : window.innerHeight;
};

/**
 * Creates canvas elements with emoji images.
 *
 * @param emojis - Array of emoji characters
 * @returns Array of canvas elements with rendered emoji
 */
export const createEmojiCanvases = (emojis: string[]): HTMLCanvasElement[] => {
  const canvases: HTMLCanvasElement[] = [];

  // Create a temporary canvas for measurements
  const tempCanvas = document.createElement('canvas');
  const tempContext = tempCanvas.getContext('2d');
  if (!tempContext) return [];

  // Set font for measurements
  tempContext.font = FONT_SETTINGS.font;
  tempContext.textBaseline = FONT_SETTINGS.textBaseline as CanvasTextBaseline;
  tempContext.textAlign = FONT_SETTINGS.textAlign as CanvasTextAlign;

  // Create a canvas for each emoji
  emojis.forEach(emoji => {
    const measurements = tempContext.measureText(emoji);
    const bgCanvas = document.createElement('canvas');
    const bgContext = bgCanvas.getContext('2d');
    if (!bgContext) return;

    // Set canvas size based on text measurements
    bgCanvas.width = measurements.width;
    bgCanvas.height = measurements.actualBoundingBoxAscent * 2;

    // Apply font settings
    bgContext.textAlign = FONT_SETTINGS.textAlign as CanvasTextAlign;
    bgContext.font = FONT_SETTINGS.font;
    bgContext.textBaseline = FONT_SETTINGS.textBaseline as CanvasTextBaseline;

    // Draw emoji on canvas
    bgContext.fillText(emoji, bgCanvas.width / 2, measurements.actualBoundingBoxAscent);

    canvases.push(bgCanvas);
  });

  return canvases;
};

/**
 * Calculates mouse position relative to container element.
 *
 * @param event - Mouse event
 * @param containerElement - Container element (or null for window)
 * @returns Position with x and y coordinates
 */
export const getRelativeMousePosition = (
  event: MouseEvent,
  containerElement: HTMLElement | null
): { x: number; y: number } => {
  if (containerElement) {
    const rect = containerElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  return {
    x: event.clientX,
    y: event.clientY
  };
};
