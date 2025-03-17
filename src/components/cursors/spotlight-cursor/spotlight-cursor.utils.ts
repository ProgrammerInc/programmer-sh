/**
 * SpotlightCursor Utils
 *
 * Utility functions for the SpotlightCursor component
 *
 * @module SpotlightCursor/Utils
 */

import { DEFAULT_CONFIG, RENDERING } from './spotlight-cursor.constants';
import { Position, SpotlightConfig } from './spotlight-cursor.types';

/**
 * Linear interpolation between two values
 *
 * @param start - Starting value
 * @param end - Ending value
 * @param factor - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Parse a CSS color string to an RGB string format
 *
 * @param color - CSS color value
 * @returns RGB format as 'r, g, b'
 */
export function parseColorToRgb(color: string): string {
  // Default to white if parsing fails
  const defaultRgb = '255, 255, 255';

  try {
    // For simple hex colors
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);

      if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return defaultRgb;
      }

      return `${r}, ${g}, ${b}`;
    }

    // For rgb/rgba format
    if (color.startsWith('rgb')) {
      const match = color.match(/\d+/g);
      if (match && match.length >= 3) {
        return `${match[0]}, ${match[1]}, ${match[2]}`;
      }
    }

    return defaultRgb;
  } catch (error) {
    console.error('Error parsing color:', error);
    return defaultRgb;
  }
}

/**
 * Calculate the pulse effect based on current time
 *
 * @param pulseSpeed - Speed of the pulse in milliseconds
 * @returns Scale factor for the pulse effect
 */
export function calculatePulseEffect(pulseSpeed: number): number {
  return 1 + RENDERING.pulseAmplitude * Math.sin((Date.now() / pulseSpeed) * Math.PI * 2);
}

/**
 * Draw the spotlight effect on the canvas
 *
 * @param ctx - Canvas rendering context
 * @param canvas - Canvas element
 * @param position - Current spotlight position
 * @param config - Spotlight configuration
 */
export function drawSpotlightEffect(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  position: Position,
  config: SpotlightConfig
): void {
  const {
    radius = DEFAULT_CONFIG.radius,
    brightness = DEFAULT_CONFIG.brightness,
    color = DEFAULT_CONFIG.color,
    pulseSpeed = DEFAULT_CONFIG.pulseSpeed
  } = config;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Create dark overlay
  ctx.fillStyle = `rgba(0, 0, 0, ${RENDERING.overlayOpacity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Calculate pulse effect
  const pulseScale = calculatePulseEffect(pulseSpeed);
  const currentSpotlightSize = radius * pulseScale;

  // Parse color to RGB format
  const rgbColor = parseColorToRgb(color);

  // Create spotlight gradient
  const gradient = ctx.createRadialGradient(
    position.x,
    position.y,
    0,
    position.x,
    position.y,
    currentSpotlightSize
  );

  // Add multiple color stops for smoother transition
  gradient.addColorStop(0, `rgba(${rgbColor}, ${brightness})`);
  gradient.addColorStop(0.5, `rgba(${rgbColor}, ${brightness * 0.5})`);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  // Apply spotlight effect
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(position.x, position.y, currentSpotlightSize, 0, Math.PI * 2);
  ctx.fill();

  // Add glow effect
  ctx.globalCompositeOperation = 'source-over';
  const glowGradient = ctx.createRadialGradient(
    position.x,
    position.y,
    0,
    position.x,
    position.y,
    currentSpotlightSize * RENDERING.glowSizeMultiplier
  );

  glowGradient.addColorStop(0, `rgba(${rgbColor}, ${RENDERING.glowOpacity})`);
  glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = glowGradient;
  ctx.beginPath();
  ctx.arc(
    position.x,
    position.y,
    currentSpotlightSize * RENDERING.glowSizeMultiplier,
    0,
    Math.PI * 2
  );
  ctx.fill();
}
