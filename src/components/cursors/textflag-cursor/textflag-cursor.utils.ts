/**
 * TextFlagCursor Utils
 *
 * Utility functions for the TextFlagCursor component
 *
 * @module TextFlagCursor/Utils
 */

import { CANVAS_STYLE, RENDERING } from './textflag-cursor.constants';
import { Position, TextFlagCharacter, TextFlagCursorState } from './textflag-cursor.types';

/**
 * Initialize characters array from a text string
 * 
 * @param text - Text to convert to character array
 * @param x - Initial X position for all characters
 * @param y - Initial Y position for all characters
 * @returns Array of TextFlagCharacter objects
 */
export function initializeCharacters(text: string, x: number, y: number): TextFlagCharacter[] {
  const characters: TextFlagCharacter[] = [];
  
  for (let i = 0; i < text.length; i++) {
    characters[i] = {
      letter: text.charAt(i),
      x,
      y
    };
  }
  
  return characters;
}

/**
 * Update characters positions based on cursor movement and oscillation
 * 
 * @param state - Current cursor state
 * @param gap - Gap between characters
 * @returns Updated angle value
 */
export function updateCharacters(state: TextFlagCursorState, gap: number): number {
  // Increment angle for oscillation effect
  const newAngle = state.angle + RENDERING.angleIncrement;
  
  // Calculate oscillation offset
  const locX = RENDERING.radiusX * Math.cos(newAngle);
  const locY = RENDERING.radiusY * Math.sin(newAngle);
  
  // Update following characters (1 to end)
  for (let i = state.characters.length - 1; i > 0; i--) {
    state.characters[i].x = state.characters[i - 1].x + gap;
    state.characters[i].y = state.characters[i - 1].y;
  }
  
  // Update the first character (follows the cursor)
  const x1 = state.characters[0].x;
  const y1 = state.characters[0].y;
  
  // Move towards cursor with oscillation
  state.characters[0].x = x1 + (state.cursor.x - x1) / RENDERING.followSpeed + locX + RENDERING.cursorOffset;
  state.characters[0].y = y1 + (state.cursor.y - y1) / RENDERING.followSpeed + locY;
  
  return newAngle;
}

/**
 * Render all characters to the canvas
 * 
 * @param state - Current cursor state
 * @param width - Canvas width
 * @param height - Canvas height
 * @param color - Text color
 * @param fontFamily - Font family with size
 */
export function renderCharacters(
  state: TextFlagCursorState,
  width: number,
  height: number,
  color: string,
  fontFamily: string
): void {
  if (!state.context) return;
  
  // Clear canvas
  state.context.clearRect(0, 0, width, height);
  
  // Set text style
  state.context.fillStyle = color;
  state.context.font = fontFamily;
  
  // Render each character
  for (const char of state.characters) {
    state.context.fillText(char.letter, char.x, char.y);
  }
}

/**
 * Create and initialize the canvas element
 * 
 * @param container - Container element
 * @param isContainerBody - Whether the container is document.body
 * @param width - Canvas width
 * @param height - Canvas height
 * @returns The created canvas and its context
 */
export function createCanvas(
  container: HTMLElement,
  isContainerBody: boolean,
  width: number,
  height: number
): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D | null } {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  // Apply common styles
  canvas.style.top = CANVAS_STYLE.top;
  canvas.style.left = CANVAS_STYLE.left;
  canvas.style.pointerEvents = CANVAS_STYLE.pointerEvents;
  canvas.style.zIndex = CANVAS_STYLE.zIndex;
  canvas.style.transform = CANVAS_STYLE.transform;
  
  // Apply position style based on container
  if (isContainerBody) {
    canvas.style.position = CANVAS_STYLE.fixedPosition;
    canvas.width = width;
    canvas.height = height;
  } else {
    canvas.style.position = CANVAS_STYLE.absolutePosition;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }
  
  // Append to container
  container.appendChild(canvas);
  
  return { canvas, context };
}

/**
 * Convert cursor position from page to element coordinates
 * 
 * @param event - Mouse event
 * @param container - Container element
 * @param isContainerBody - Whether the container is document.body
 * @returns Cursor position
 */
export function getCursorPosition(
  event: MouseEvent,
  container: HTMLElement,
  isContainerBody: boolean
): Position {
  if (isContainerBody) {
    return { x: event.clientX, y: event.clientY };
  } else {
    const boundingRect = container.getBoundingClientRect();
    return {
      x: event.clientX - boundingRect.left,
      y: event.clientY - boundingRect.top
    };
  }
}
