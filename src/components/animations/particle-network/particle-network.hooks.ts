/**
 * Hooks for the Particle Network animation component
 */

import { useCallback, useEffect, useRef } from 'react';
import { MousePosition, Particle } from './particle-network.types';
import {
  calculateCanvasSize,
  clearCanvas,
  createParticles,
  drawConnections,
  drawParticles,
  updateParticles
} from './particle-network.utils';

/**
 * Hook to manage the Particle Network animation
 *
 * @param particleCount - Number of particles to display
 * @param particleSize - Size of each particle in pixels
 * @param particleColor - Color of particles
 * @param lineColor - Color of connection lines
 * @param maxDistance - Maximum distance for particle connections
 * @param speed - Movement speed of particles
 * @param interactive - Whether particles react to mouse movement
 * @returns Canvas reference to be attached to the canvas element
 */
export const useParticleNetworkAnimation = (
  particleCount: number,
  particleSize: number,
  particleColor: string,
  lineColor: string,
  maxDistance: number,
  speed: number,
  interactive: boolean
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const isMouseInCanvasRef = useRef<boolean>(false);
  const animationFrameId = useRef<number | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Initialize particles based on canvas size
  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = createParticles(particleCount, width, height, particleSize, speed);
    },
    [particleCount, particleSize, speed]
  );

  // Handle canvas resize and particle initialization
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = calculateCanvasSize(canvas);
    canvas.width = width;
    canvas.height = height;
    initParticles(width, height);
  }, [initParticles]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    const { width, height } = canvas;
    clearCanvas(ctx, width, height);

    // Update and render particles
    updateParticles(particlesRef.current, width, height);
    drawParticles(ctx, particlesRef.current, particleColor);

    // Draw connections
    drawConnections(
      ctx,
      particlesRef.current,
      mousePositionRef.current,
      isMouseInCanvasRef.current,
      maxDistance,
      lineColor,
      interactive
    );

    animationFrameId.current = requestAnimationFrame(animate);
  }, [particleColor, lineColor, maxDistance, interactive]);

  // Set up and clean up the animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get and store the canvas context
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseEnter = () => {
      isMouseInCanvasRef.current = true;
    };

    const handleMouseLeave = () => {
      isMouseInCanvasRef.current = false;
    };

    // Initialize everything
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Start animation
    animate();

    // Clean up event listeners and animation frame on unmount
    return () => {
      window.removeEventListener('resize', updateCanvasSize);

      if (interactive && canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [
    particleColor,
    lineColor,
    maxDistance,
    particleCount,
    particleSize,
    speed,
    interactive,
    animate,
    updateCanvasSize
  ]);

  return { canvasRef };
};
