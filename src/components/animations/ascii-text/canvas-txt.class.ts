/**
 * Utility class for rendering text on a canvas with various configuration options
 */

import { DEFAULT_CANVAS_TXT_OPTIONS } from './ascii-text.constants';
import { CanvasTxtOptions } from './ascii-text.types';

/**
 * Class that provides methods for drawing text on HTML Canvas
 * with various styling and alignment options
 */
export class CanvasTxt {
  align: string;
  vAlign: string;
  fontSize: number;
  fontWeight: string;
  fontStyle: string;
  fontVariant: string;
  fontFamily: string;
  lineHeight: number;
  justify: boolean;
  textDecoration: string;

  /**
   * Creates a new CanvasTxt instance with configuration options
   *
   * @param options - Configuration options for the canvas text
   */
  constructor(options: CanvasTxtOptions = {}) {
    const defaultOptions = DEFAULT_CANVAS_TXT_OPTIONS;

    this.align = options.align ?? defaultOptions.align!;
    this.vAlign = options.vAlign ?? defaultOptions.vAlign!;
    this.fontSize = options.fontSize ?? defaultOptions.fontSize!;
    this.fontWeight = options.fontWeight ?? defaultOptions.fontWeight!;
    this.fontStyle = options.fontStyle ?? defaultOptions.fontStyle!;
    this.fontVariant = options.fontVariant ?? defaultOptions.fontVariant!;
    this.fontFamily = options.fontFamily ?? defaultOptions.fontFamily!;
    this.lineHeight = options.lineHeight ?? defaultOptions.lineHeight!;
    this.justify = options.justify ?? defaultOptions.justify!;
    this.textDecoration = options.textDecoration ?? defaultOptions.textDecoration!;
  }

  /**
   * Sets the font property of the canvas context based on current settings
   *
   * @param ctx - Canvas context to set the font on
   */
  setFont(ctx: CanvasRenderingContext2D): void {
    ctx.font = `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
  }

  /**
   * Draws text on a canvas with the configured settings
   *
   * @param ctx - Canvas context to draw on
   * @param text - Text to draw
   * @param x - X coordinate (left position)
   * @param y - Y coordinate (top position)
   * @param width - Maximum width for the text
   * @param height - Maximum height for the text
   */
  drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    // Set the text alignment
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Apply font settings
    this.setFont(ctx);

    // Split the text into lines that fit within the specified width
    const lines = this.getLines(ctx, text, width);
    const totalHeight = lines.length * this.lineHeight;

    // Calculate the vertical position based on the vAlign setting
    let textY: number;
    switch (this.vAlign) {
      case 'top':
        textY = y;
        break;
      case 'middle':
        textY = y + (height - totalHeight) / 2;
        break;
      case 'bottom':
        textY = y + height - totalHeight;
        break;
      default:
        textY = y;
    }

    // Draw each line of text
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let textX: number;

      // Calculate the horizontal position based on the align setting
      switch (this.align) {
        case 'left':
          textX = x;
          break;
        case 'center':
          textX = x + width / 2 - ctx.measureText(line).width / 2;
          break;
        case 'right':
          textX = x + width - ctx.measureText(line).width;
          break;
        default:
          textX = x;
      }

      // Adjust for text decoration if needed
      if (this.textDecoration === 'underline') {
        const metrics = ctx.measureText(line);
        const underlineY = textY + this.fontSize * 1.1;
        ctx.fillRect(textX, underlineY, metrics.width, 1);
      }

      // Draw the current line
      ctx.fillText(line, textX, textY);
      textY += this.lineHeight;
    }
  }

  /**
   * Splits text into lines that fit within a specified width
   *
   * @param ctx - Canvas context for measuring text
   * @param text - Text to split into lines
   * @param width - Maximum width for each line
   * @returns Array of text lines
   */
  getLines(ctx: CanvasRenderingContext2D, text: string, width: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const lineWithWord = `${currentLine} ${word}`;
      const lineWidth = ctx.measureText(lineWithWord).width;

      if (lineWidth < width) {
        currentLine = lineWithWord;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    lines.push(currentLine);
    return lines;
  }

  /**
   * Calculates the width and height needed to draw the specified text
   *
   * @param ctx - Canvas context for measuring text
   * @param text - Text to measure
   * @param width - Maximum width for the text
   * @returns Object containing width and height
   */
  measureText(
    ctx: CanvasRenderingContext2D,
    text: string,
    width: number
  ): { width: number; height: number } {
    // Apply font settings
    this.setFont(ctx);

    // Split the text into lines that fit within the specified width
    const lines = this.getLines(ctx, text, width);

    // Calculate the maximum line width and total height
    let maxWidth = 0;
    for (const line of lines) {
      const lineWidth = ctx.measureText(line).width;
      maxWidth = Math.max(maxWidth, lineWidth);
    }

    const height = lines.length * this.lineHeight;

    return { width: maxWidth, height };
  }
}
