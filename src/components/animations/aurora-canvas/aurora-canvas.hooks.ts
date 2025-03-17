/**
 * Custom hooks for the Aurora Canvas component
 *
 * @module AuroraCanvas
 */

import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { CSS_CLASSES } from './aurora-canvas.constants';
import { Particle } from './aurora-canvas.types';
import {
  applyInteractiveForce,
  cn,
  createParticle,
  limitParticleVelocity,
  updateParticlePosition
} from './aurora-canvas.utils';

/**
 * Hook to generate the canvas class name with memoization
 *
 * @param className - Additional class names to apply
 * @returns Memoized canvas class name string
 */
export function useCanvasClassName(className?: string) {
  return useMemo(() => {
    return cn(CSS_CLASSES.canvas, className);
  }, [className]);
}

/**
 * Hook to manage canvas setup and animation
 *
 * @param canvasRef - Reference to the canvas element
 * @param colors - Colors to use for particles
 * @param speed - Speed of particle movement
 * @param layers - Number of layers
 * @param particleDensity - Density of particles per layer
 * @param interactive - Whether to enable mouse interaction
 * @param interactiveDistance - Maximum distance for mouse interaction
 * @param interactiveForce - Strength of mouse interaction
 * @returns Object containing animation control functions
 */
export function useAuroraCanvasAnimation(
  canvasRef: RefObject<HTMLCanvasElement>,
  colors: string[],
  speed: number,
  layers: number,
  particleDensity: number,
  interactive: boolean,
  interactiveDistance: number,
  interactiveForce: number
) {
  // Refs for animation state
  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Set up the canvas and initialize particles
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    // Set canvas size with device pixel ratio for sharp rendering
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Initialize particles
    const particleCount = Math.floor(particleDensity * layers);
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(rect.width, rect.height, colors, speed, layers)
    );
  }, [canvasRef, colors, layers, speed, particleDensity]);

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!interactive || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    },
    [canvasRef, interactive]
  );

  // Handle window resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;

    // Reset canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctxRef.current.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Reset particle positions on resize
    particlesRef.current.forEach(particle => {
      particle.x = Math.random() * rect.width;
      particle.y = Math.random() * rect.height;
    });
  }, [canvasRef]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      // Update position
      updateParticlePosition(particle, width, height);

      // Interactive movement
      if (interactive && mousePosRef.current.x && mousePosRef.current.y) {
        applyInteractiveForce(
          particle,
          mousePosRef.current.x,
          mousePosRef.current.y,
          interactiveDistance,
          interactiveForce
        );
      }

      // Apply velocity limits
      const maxVelocity = speed * 2;
      limitParticleVelocity(particle, maxVelocity);

      // Draw particle
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size
      );
      gradient.addColorStop(0, `${particle.color}30`);
      gradient.addColorStop(1, `${particle.color}00`);
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    frameRef.current = requestAnimationFrame(animate);
  }, [canvasRef, interactive, speed, interactiveDistance, interactiveForce]);

  // Set up animation and event listeners
  useEffect(() => {
    setupCanvas();
    animate();

    // Throttled mouse move handler
    let lastMove = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMove < 16) return; // ~60fps
      lastMove = now;
      handleMouseMove(e);
    };

    const canvas = canvasRef.current;
    if (interactive && canvas) {
      canvas.addEventListener('mousemove', throttledMouseMove);
    }
    window.addEventListener('resize', handleResize);

    // Clean up event listeners and animation frame
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
      if (interactive && canvas) {
        canvas.removeEventListener('mousemove', throttledMouseMove);
      }
    };
  }, [setupCanvas, animate, handleMouseMove, handleResize, interactive, canvasRef]);

  return {
    particlesRef,
    mousePosRef,
    frameRef,
    ctxRef,
    setupCanvas,
    handleMouseMove,
    handleResize,
    animate
  };
}
