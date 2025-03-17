/**
 * Utility functions for the Swarm Effect animation component
 */

import { PARTICLE_SETTINGS } from './swarm-effect.constants';
import { CanvasDimensions, HoverEffectType, MousePosition, Particle } from './swarm-effect.types';

/**
 * Creates a temporary canvas and gets image data from the source image
 *
 * @param image - Source image element
 * @param dimensions - Canvas dimensions
 * @returns ImageData object containing pixel data
 */
export const getImageData = (
  image: HTMLImageElement,
  dimensions: CanvasDimensions
): ImageData | null => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return null;

  tempCanvas.width = dimensions.width;
  tempCanvas.height = dimensions.height;
  tempCtx.drawImage(image, 0, 0, dimensions.width, dimensions.height);

  return tempCtx.getImageData(0, 0, dimensions.width, dimensions.height);
};

/**
 * Extracts particles from image data based on pixel brightness and alpha
 *
 * @param imageData - Pixel data from the image
 * @param dimensions - Canvas dimensions
 * @param spacing - Spacing between particles
 * @returns Array of particle objects
 */
export const extractParticlesFromImage = (
  imageData: ImageData,
  dimensions: CanvasDimensions,
  spacing: number
): Particle[] => {
  const particles: Particle[] = [];

  for (let y = 0; y < dimensions.height; y += spacing) {
    for (let x = 0; x < dimensions.width; x += spacing) {
      const i = (y * dimensions.width + x) * 4;
      const alpha = imageData.data[i + 3];
      const brightness = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;

      if (alpha > PARTICLE_SETTINGS.MIN_ALPHA && brightness > PARTICLE_SETTINGS.MIN_BRIGHTNESS) {
        particles.push({
          x,
          y,
          originX: x,
          originY: y
        });
      }
    }
  }

  return particles;
};

/**
 * Calculates the displacement vector for a particle based on mouse position and effect type
 *
 * @param particle - Particle to calculate displacement for
 * @param mousePosition - Current mouse position
 * @param displacementRadius - Radius of effect around mouse
 * @param hoverEffect - Type of hover effect to apply
 * @returns Displacement vector {dx, dy}
 */
export const calculateParticleDisplacement = (
  particle: Particle,
  mousePosition: MousePosition | null,
  displacementRadius: number,
  hoverEffect: HoverEffectType
): { dx: number; dy: number } => {
  let dx = 0;
  let dy = 0;

  if (mousePosition && hoverEffect !== 'none') {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - particle.x, 2) + Math.pow(mousePosition.y - particle.y, 2)
    );

    if (distance < displacementRadius) {
      const force = Math.pow((displacementRadius - distance) / displacementRadius, 1.5);

      if (hoverEffect === 'scatter') {
        dx = (particle.x - mousePosition.x) * force * PARTICLE_SETTINGS.FORCE_MULTIPLIER;
        dy = (particle.y - mousePosition.y) * force * PARTICLE_SETTINGS.FORCE_MULTIPLIER;
      } else if (hoverEffect === 'gather') {
        dx = (mousePosition.x - particle.x) * force * PARTICLE_SETTINGS.FORCE_MULTIPLIER;
        dy = (mousePosition.y - particle.y) * force * PARTICLE_SETTINGS.FORCE_MULTIPLIER;
      }
    }
  }

  return { dx, dy };
};

/**
 * Updates a particle's position based on its target position with easing
 *
 * @param particle - Particle to update
 * @param dx - X-axis displacement
 * @param dy - Y-axis displacement
 * @returns Updated particle
 */
export const updateParticlePosition = (particle: Particle, dx: number, dy: number): Particle => {
  const targetX = particle.originX + dx;
  const targetY = particle.originY + dy;

  // Apply easing for smooth movement
  particle.x += (targetX - particle.x) * PARTICLE_SETTINGS.MOVEMENT_EASING;
  particle.y += (targetY - particle.y) * PARTICLE_SETTINGS.MOVEMENT_EASING;

  return particle;
};

/**
 * Draws a single particle on the canvas
 *
 * @param ctx - Canvas rendering context
 * @param particle - Particle to draw
 * @param size - Size of the particle
 */
export const drawParticle = (
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  size: number
): void => {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
  ctx.fill();
};

/**
 * Creates a combined class name string with optional additional classes
 *
 * @param baseClass - Base CSS class
 * @param additionalClass - Optional additional CSS classes
 * @returns Combined class string
 */
export const createClassNames = (baseClass: string, additionalClass?: string): string => {
  return additionalClass ? `${baseClass} ${additionalClass}` : baseClass;
};
