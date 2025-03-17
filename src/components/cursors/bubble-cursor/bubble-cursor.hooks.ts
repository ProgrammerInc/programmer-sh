/**
 * BubbleCursor Hooks Module
 *
 * Custom hooks used by the BubbleCursor component to manage cursor tracking,
 * particle creation, animation, and interaction handling.
 *
 * @module BubbleCursorHooks
 */

import { useCallback, useEffect, useRef } from 'react';
import type { Position } from './bubble-cursor.types';
import { BubbleParticle } from './bubble-particle';

/**
 * Hook for tracking cursor position.
 * Monitors mouse and touch events to update cursor coordinates.
 *
 * @param wrapperElement - Optional container element
 * @returns Current cursor position and handlers
 */
export const useCursorTracking = (wrapperElement?: HTMLElement) => {
  const cursorPositionRef = useRef<Position>({ x: 0, y: 0 });
  const mountedRef = useRef<boolean>(true);

  // Track component mount status
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!mountedRef.current) return;

      if (wrapperElement) {
        const boundingRect = wrapperElement.getBoundingClientRect();
        cursorPositionRef.current.x = e.clientX - boundingRect.left;
        cursorPositionRef.current.y = e.clientY - boundingRect.top;
      } else {
        cursorPositionRef.current.x = e.clientX;
        cursorPositionRef.current.y = e.clientY;
      }
    },
    [wrapperElement]
  );

  return {
    cursorPositionRef,
    handleMouseMove
  };
};

/**
 * Hook for managing bubble particles.
 *
 * @param fillStyle - Fill color for bubbles
 * @param strokeStyle - Stroke color for bubbles
 * @returns Particle management functions
 */
export const useBubbleParticles = (fillStyle: string, strokeStyle: string) => {
  const particlesRef = useRef<BubbleParticle[]>([]);
  const propsRef = useRef({ fillStyle, strokeStyle });
  const mountedRef = useRef<boolean>(true);

  // Track component mount status
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      // Clear particles array on unmount
      particlesRef.current = [];
    };
  }, []);

  // Update the props ref when the style props change
  useEffect(() => {
    propsRef.current = { fillStyle, strokeStyle };
  }, [fillStyle, strokeStyle]);

  const addParticle = useCallback((x: number, y: number) => {
    if (!mountedRef.current) return;

    const { fillStyle, strokeStyle } = propsRef.current;
    particlesRef.current.push(new BubbleParticle(x, y, fillStyle, strokeStyle));
  }, []);

  const updateParticles = useCallback(
    (context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
      if (!mountedRef.current || particlesRef.current.length === 0) {
        return false;
      }

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      // Update particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(context);
      }

      // Remove dead particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        if (particlesRef.current[i].lifeSpan < 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      if (particlesRef.current.length === 0) {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        return false;
      }

      return true;
    },
    []
  );

  return {
    particlesRef,
    addParticle,
    updateParticles
  };
};

/**
 * Hook for handling touch events to create bubbles.
 *
 * @param addParticle - Function to add a particle
 * @returns Touch event handlers
 */
export const useTouchHandlers = (addParticle: (x: number, y: number) => void) => {
  const mountedRef = useRef<boolean>(true);

  // Track component mount status
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!mountedRef.current) return;

      if (e.touches.length > 0) {
        for (let i = 0; i < e.touches.length; i++) {
          addParticle(e.touches[i].clientX, e.touches[i].clientY);
        }
      }
    },
    [addParticle]
  );

  return {
    handleTouchMove
  };
};

/**
 * Hook to check if reduced motion is preferred.
 *
 * @returns Whether reduced motion is preferred
 */
export const useReducedMotionCheck = () => {
  return useCallback(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
};
