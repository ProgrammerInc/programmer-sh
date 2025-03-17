'use client';

/**
 * Hooks for the Snowflake Cursor component.
 */
import { useCallback, useEffect, useRef } from 'react';

import { CANVAS_STYLES, POSSIBLE_EMOJI } from './snowflake-cursor.constants';
import {
  applyCanvasStyles,
  createEmojiCanvases,
  getRelativeMousePosition,
  setCanvasSize
} from './snowflake-cursor.utils';
import { SnowflakeParticle } from './snowflake-particle';

/**
 * Custom hook to manage the snowflake cursor effect.
 *
 * @param element - Optional container element
 * @returns Tuple containing canvas reference and mounted status
 */
export const useSnowflakeEffect = (element?: HTMLElement) => {
  // Refs to store component state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<SnowflakeParticle[]>([]);
  const canvImages = useRef<HTMLCanvasElement[]>([]);
  const animationFrame = useRef<number | null>(null);
  const mountedRef = useRef<boolean>(false);
  const prefersReducedMotion = useRef<MediaQueryList | null>(null);

  /**
   * Adds a new particle at the specified coordinates.
   */
  const addParticle = useCallback((x: number, y: number) => {
    if (!mountedRef.current || canvImages.current.length === 0) return;

    const randomImage = canvImages.current[Math.floor(Math.random() * canvImages.current.length)];
    particles.current.push(new SnowflakeParticle(x, y, randomImage));
  }, []);

  /**
   * Updates and renders particles.
   */
  const updateParticles = useCallback(() => {
    if (!canvasRef.current || !mountedRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Update each particle and remove those that have expired
    for (let i = particles.current.length - 1; i >= 0; i--) {
      particles.current[i].update(context);
      if (particles.current[i].lifeSpan < 0) {
        particles.current.splice(i, 1);
      }
    }
  }, []);

  /**
   * Animation loop function.
   */
  const animationLoop = useCallback(() => {
    if (!mountedRef.current) return;

    updateParticles();
    animationFrame.current = requestAnimationFrame(animationLoop);
  }, [updateParticles]);

  /**
   * Initialize the snowflake effect.
   */
  const init = useCallback(() => {
    if (!mountedRef.current) return;
    if (prefersReducedMotion.current?.matches) return;

    const targetElement = element || document.body;

    // Create and setup canvas if not already created
    if (!canvasRef.current) {
      const canvas = document.createElement('canvas');
      canvasRef.current = canvas;

      // Apply styles to canvas
      applyCanvasStyles(canvas, CANVAS_STYLES, !element);

      // Append canvas to target element
      targetElement.appendChild(canvas);
    }

    // Initialize canvas size
    if (canvasRef.current) {
      setCanvasSize(canvasRef.current, element || null);
    }

    // Create emoji images if not already created
    if (canvImages.current.length === 0) {
      canvImages.current = createEmojiCanvases(POSSIBLE_EMOJI);
    }

    // Handle mouse movement
    const onMouseMove = (e: MouseEvent) => {
      if (!mountedRef.current) return;

      const { x, y } = getRelativeMousePosition(e, element || null);
      addParticle(x, y);
    };

    // Add event listeners
    targetElement.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', () => {
      if (canvasRef.current) {
        setCanvasSize(canvasRef.current, element || null);
      }
    });

    // Store event handler in ref for cleanup
    const eventHandlers = {
      mouseMove: onMouseMove,
      resize: () => {
        if (canvasRef.current) {
          setCanvasSize(canvasRef.current, element || null);
        }
      }
    };

    // Start animation loop
    animationLoop();

    return eventHandlers;
  }, [element, animationLoop, addParticle]);

  /**
   * Cleanup function.
   */
  const cleanup = useCallback(
    (eventHandlers?: { mouseMove: (e: MouseEvent) => void; resize: () => void }) => {
      // Cancel animation frame
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }

      // Remove event listeners if provided
      if (eventHandlers) {
        const targetElement = element || document.body;
        targetElement.removeEventListener('mousemove', eventHandlers.mouseMove);
        window.removeEventListener('resize', eventHandlers.resize);
      }

      // Clear particles
      particles.current = [];
    },
    [element]
  );

  // Main effect to initialize and clean up
  useEffect(() => {
    // Check if window is defined (to ensure code runs on client-side)
    if (typeof window === 'undefined') return;

    mountedRef.current = true;
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)');

    const eventHandlers = init();

    // Handle reduced motion preference changes
    const handleReducedMotionChange = () => {
      if (prefersReducedMotion.current?.matches) {
        cleanup(eventHandlers);
      } else {
        const newEventHandlers = init();
        // Update event handlers reference
        if (eventHandlers && newEventHandlers) {
          Object.assign(eventHandlers, newEventHandlers);
        }
      }
    };

    prefersReducedMotion.current.addEventListener('change', handleReducedMotionChange);

    return () => {
      mountedRef.current = false;
      cleanup(eventHandlers);
      prefersReducedMotion.current?.removeEventListener('change', handleReducedMotionChange);
    };
  }, [element, init, cleanup]);

  return { canvasRef, isMounted: mountedRef };
};
