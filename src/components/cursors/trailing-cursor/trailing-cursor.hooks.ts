/**
 * TrailingCursor Hooks Module
 *
 * Contains the core functionality of the TrailingCursor component including
 * event handling, animation loop, and particle management.
 *
 * @module TrailingCursorHooks
 */
import { useEffect, useRef } from 'react';
import {
  DEFAULT_BASE_IMAGE_SRC,
  DEFAULT_PARTICLES_COUNT,
  DEFAULT_RATE,
  REDUCED_MOTION_QUERY
} from './trailing-cursor.constants';
import type { Particle, TrailingCursorProps } from './trailing-cursor.types';
import { calculateCursorPosition, createParticle, setupCanvas } from './trailing-cursor.utils';

/**
 * Hook to manage trailing cursor effect.
 * Creates and animates a trail of particles that follow the mouse cursor.
 * Handles mouse movement, particle creation, and animation lifecycle.
 *
 * @param props - Component props including element, particle count, and rate settings
 * @returns Nothing (side effects only)
 */
export function useTrailingCursor({
  element,
  particles = DEFAULT_PARTICLES_COUNT,
  rate = DEFAULT_RATE,
  baseImageSrc = DEFAULT_BASE_IMAGE_SRC
}: TrailingCursorProps): void {
  // Store mounting state to prevent operations after unmount
  const mountedRef = useRef(true);

  // Track animation frame ID separately to avoid lint warning
  const animationFrameIdRef = useRef<number>();

  // Track cursor position
  const cursorRef = useRef({ x: 0, y: 0 });

  // Track particles
  const particlesRef = useRef<Particle[]>([]);

  // Track initialization state
  const initializedRef = useRef(false);

  // Setup effect for the trailing cursor
  useEffect(() => {
    // Store props in refs to avoid dependency issues
    const hasWrapperEl = element !== undefined;
    const targetElement = hasWrapperEl ? element : document.body;

    // Setup image
    const baseImage = new Image();
    baseImage.src = baseImageSrc;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    if (prefersReducedMotion.matches) return;

    // Create and setup canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    // Setup canvas with the utility function
    setupCanvas(canvas, targetElement, hasWrapperEl);

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      const cursorPos = calculateCursorPosition(e, element, hasWrapperEl);
      cursorRef.current = cursorPos;

      // Initialize particles if not already done
      if (!initializedRef.current) {
        initializedRef.current = true;
        for (let i = 0; i < particles; i++) {
          particlesRef.current.push(createParticle(cursorPos.x, cursorPos.y, baseImage));
        }
      }
    };

    // Window resize handler
    const onWindowResize = () => {
      if (hasWrapperEl && element) {
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Update particles positions and draw them
    const updateParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      let x = cursorRef.current.x;
      let y = cursorRef.current.y;

      particlesRef.current.forEach((particle, index) => {
        const nextParticle = particlesRef.current[index + 1] || particlesRef.current[0];

        particle.position.x = x;
        particle.position.y = y;
        particle.move(context);
        x += (nextParticle.position.x - particle.position.x) * rate;
        y += (nextParticle.position.y - particle.position.y) * rate;
      });
    };

    // Animation loop
    const loop = () => {
      if (!mountedRef.current) return;
      updateParticles();
      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    // Add event listeners
    targetElement.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    loop();

    // Cleanup function
    return () => {
      // First, set mounted flag to false to stop any ongoing operations
      mountedRef.current = false;

      // Cancel animation frame if exists
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = undefined;
      }

      // Remove the canvas from the DOM if it exists
      canvas.remove();

      // Remove event listeners
      targetElement.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);

      // Clear particles to help with garbage collection
      particlesRef.current = [];
      initializedRef.current = false;
    };
  }, [element, particles, rate, baseImageSrc]);
}
