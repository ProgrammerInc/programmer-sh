/**
 * Custom hooks for the Particle Veil animation component
 */

import { useCallback, useEffect, useRef } from 'react';
import {
  DEFAULT_INTERACTION_RADIUS,
  DEFAULT_PARTICLE_COLORS,
  DEFAULT_PARTICLE_COUNT,
  DEFAULT_SIZE_RANGE,
  DEFAULT_SPEED,
  OFF_SCREEN_MOUSE_POSITION
} from './particle-veil.constants';
import { MousePosition, Particle } from './particle-veil.types';
import {
  clearCanvas,
  createParticles,
  drawParticles,
  resizeCanvas,
  updateParticles
} from './particle-veil.utils';

/**
 * Hook to manage the Particle Veil animation
 *
 * @param particleCount - Number of particles to render
 * @param particleColors - Colors for the particles
 * @param interactionRadius - Mouse interaction radius in pixels
 * @param speed - Particle movement speed
 * @param sizeRange - Particle size range [min, max]
 * @returns Canvas reference to be attached to the canvas element
 */
export const useParticleVeilAnimation = (
  particleCount: number = DEFAULT_PARTICLE_COUNT,
  particleColors: string[] = DEFAULT_PARTICLE_COLORS,
  interactionRadius: number = DEFAULT_INTERACTION_RADIUS,
  speed: number = DEFAULT_SPEED,
  sizeRange: [number, number] = DEFAULT_SIZE_RANGE
) => {
  // Refs for canvas, context, animation frame, etc.
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>(OFF_SCREEN_MOUSE_POSITION);
  const rafRef = useRef<number | undefined>(undefined);
  const dprRef = useRef<number>(1);

  // Draw function for animation loop
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    // Clear canvas
    clearCanvas(ctx, canvas.width, canvas.height);

    // Update and draw particles
    updateParticles(
      particlesRef.current,
      mouseRef.current,
      interactionRadius,
      canvas.width,
      canvas.height,
      dprRef.current
    );

    drawParticles(ctx, particlesRef.current, dprRef.current);

    // Continue animation loop
    rafRef.current = requestAnimationFrame(draw);
  }, [interactionRadius]);

  // Initialize canvas and handle resize events
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize canvas and update device pixel ratio
    const { dpr } = resizeCanvas(canvas);
    dprRef.current = dpr;

    // Create particles based on new canvas size
    particlesRef.current = createParticles(
      particleCount,
      canvas.width / dpr,
      canvas.height / dpr,
      particleColors,
      sizeRange,
      speed
    );
  }, [particleCount, particleColors, sizeRange, speed]);

  // Setup effect for canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup canvas context
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    contextRef.current = ctx;

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = OFF_SCREEN_MOUSE_POSITION;
    };

    // Initialize
    handleResize();
    draw();

    // Event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
    };
  }, [particleCount, particleColors, interactionRadius, speed, sizeRange, draw, handleResize]);

  return { canvasRef };
};
