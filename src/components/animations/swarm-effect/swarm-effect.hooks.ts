/**
 * Custom hooks for the Swarm Effect animation component
 */

import { RefObject, useEffect, useState } from 'react';
import { CANVAS_SETTINGS } from './swarm-effect.constants';
import { CanvasDimensions, HoverEffectType, MousePosition, Particle } from './swarm-effect.types';
import {
  calculateParticleDisplacement,
  drawParticle,
  extractParticlesFromImage,
  getImageData,
  updateParticlePosition
} from './swarm-effect.utils';

/**
 * Hook to load an image and extract particles
 *
 * @param canvasRef - Reference to the canvas element
 * @param src - Source image URL
 * @param particleSpacing - Spacing between particles
 * @returns Array of extracted particles and loading status
 */
export const useImageParticles = (
  canvasRef: RefObject<HTMLCanvasElement>,
  src: string,
  particleSpacing: number
) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', CANVAS_SETTINGS.CONTEXT_OPTIONS);
    if (!ctx) return;

    // Reset particles when source changes
    setParticles([]);
    setIsLoading(true);

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = src;

    image.onload = () => {
      const containerWidth = canvas.clientWidth;
      const containerHeight = canvas.clientHeight || (containerWidth * image.height) / image.width;

      // Set canvas dimensions
      canvas.width = containerWidth;
      canvas.height = containerHeight;

      const dimensions: CanvasDimensions = {
        width: containerWidth,
        height: containerHeight
      };

      // Get image data and extract particles
      const imageData = getImageData(image, dimensions);
      if (!imageData) {
        setIsLoading(false);
        return;
      }

      const extractedParticles = extractParticlesFromImage(imageData, dimensions, particleSpacing);

      setParticles(extractedParticles);
      setIsLoading(false);
    };

    image.onerror = () => {
      console.error('Failed to load image:', src);
      setIsLoading(false);
    };

    return () => {
      // Cancel image loading if component unmounts
      image.onload = null;
      image.onerror = null;
    };
  }, [canvasRef, src, particleSpacing]);

  return { particles, isLoading };
};

/**
 * Hook to handle mouse interactions with the canvas
 *
 * @param canvasRef - Reference to the canvas element
 * @returns Current mouse position or null when not hovering
 */
export const useMouseInteraction = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) * canvas.width) / rect.width,
        y: ((e.clientY - rect.top) * canvas.height) / rect.height
      });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canvasRef]);

  return mousePosition;
};

/**
 * Hook to animate particles with mouse interaction effects
 *
 * @param canvasRef - Reference to the canvas element
 * @param particles - Array of particles to animate
 * @param mousePosition - Current mouse position
 * @param particleSize - Size of each particle
 * @param particleColor - Color of the particles
 * @param displacementRadius - Radius of effect around cursor
 * @param hoverEffect - Type of effect to apply on hover
 * @returns Animation frame ID for cleanup
 */
export const useParticleAnimation = (
  canvasRef: RefObject<HTMLCanvasElement>,
  particles: Particle[],
  mousePosition: MousePosition | null,
  particleSize: number,
  particleColor: string,
  displacementRadius: number,
  hoverEffect: HoverEffectType
) => {
  const [frameId, setFrameId] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || particles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = particleColor;

      // Update and draw each particle
      particles.forEach(particle => {
        // Calculate displacement based on mouse position
        const { dx, dy } = calculateParticleDisplacement(
          particle,
          mousePosition,
          displacementRadius,
          hoverEffect
        );

        // Update particle position with easing
        updateParticlePosition(particle, dx, dy);

        // Draw the particle
        drawParticle(ctx, particle, particleSize);
      });

      // Request next frame
      const id = requestAnimationFrame(animate);
      setFrameId(id);
    };

    // Start animation
    animate();

    // Cleanup animation on unmount or when dependencies change
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canvasRef,
    particles,
    mousePosition,
    particleSize,
    particleColor,
    displacementRadius,
    hoverEffect
  ]);

  return frameId;
};
