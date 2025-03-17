/**
 * SpringyCursor Hooks
 *
 * Hook implementation for the SpringyCursor component
 *
 * @module SpringyCursor/Hooks
 */

import { RefObject, useEffect, useRef } from 'react';
import {
  CANVAS_STYLE,
  DELTA_T,
  GRAVITY,
  MASS,
  N_DOTS,
  RESISTANCE
} from './springy-cursor.constants';
import { Particle, SpringyCursorProps, SpringyCursorState, Vec } from './springy-cursor.types';
import {
  calculateSpringForce,
  createEmojiCanvas,
  getRelativeMousePosition,
  handleBoundaryCollisions,
  isParticleStopped
} from './springy-cursor.utils';

/**
 * Hook for managing the SpringyCursor state and behavior
 *
 * @param props - Props for the SpringyCursor component
 * @param canvasRef - Ref to the canvas element
 * @returns State and behavior functions for the SpringyCursor
 */
export function useSpringyCursor(
  props: SpringyCursorProps,
  canvasRef: RefObject<HTMLCanvasElement>
) {
  // Use a single ref to hold all mutable state to prevent re-renders
  const stateRef = useRef<SpringyCursorState>({
    mounted: false,
    initialized: false,
    particles: [],
    cursorPosition: { x: 0, y: 0 },
    animationFrame: null,
    emojiCanvas: null,
    width: 0,
    height: 0,
    context: null
  });

  // Store props in a ref to avoid dependency changes triggering re-renders
  const propsRef = useRef(props);

  // Update props ref when props change
  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  // Initialize/cleanup the cursor system
  useEffect(() => {
    // Prevent execution if prefers-reduced-motion is enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      console.log('This browser has prefers reduced motion turned on, so the cursor did not init');
      return;
    }

    // Setup state and mark as mounted
    stateRef.current.mounted = true;

    // Store reference to state for cleanup function to avoid stale refs
    const state = stateRef.current;
    const props = propsRef.current;

    // Initialize canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    state.context = context;

    // Configure canvas positioning
    canvas.style.position = props.wrapperElement
      ? CANVAS_STYLE.absolutePosition
      : CANVAS_STYLE.fixedPosition;
    canvas.style.top = CANVAS_STYLE.top;
    canvas.style.left = CANVAS_STYLE.left;
    canvas.style.pointerEvents = CANVAS_STYLE.pointerEvents;
    canvas.style.zIndex = CANVAS_STYLE.zIndex;
    canvas.style.transform = CANVAS_STYLE.transform;

    // Set canvas dimensions
    if (props.wrapperElement) {
      canvas.width = props.wrapperElement.clientWidth;
      canvas.height = props.wrapperElement.clientHeight;
    } else {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    state.width = canvas.width;
    state.height = canvas.height;

    // Setup emoji image
    state.emojiCanvas = createEmojiCanvas(props.emoji || '');

    if (state.emojiCanvas) {
      // Create particles
      for (let i = 0; i < N_DOTS; i++) {
        state.particles[i] = new Particle(state.emojiCanvas);
        state.particles[i].position = { x: state.cursorPosition.x, y: state.cursorPosition.y };
      }
    }

    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!state.mounted) return;

      const pos = getRelativeMousePosition(e, props.wrapperElement);
      state.cursorPosition.x = pos.x;
      state.cursorPosition.y = pos.y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!state.mounted || e.touches.length === 0) return;

      const pos = getRelativeMousePosition(e.touches[0], props.wrapperElement);
      state.cursorPosition.x = pos.x;
      state.cursorPosition.y = pos.y;
    };

    const handleResize = () => {
      if (!canvasRef.current || !state.mounted) return;

      if (props.wrapperElement) {
        canvasRef.current.width = props.wrapperElement.clientWidth;
        canvasRef.current.height = props.wrapperElement.clientHeight;
      } else {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }

      state.width = canvasRef.current.width;
      state.height = canvasRef.current.height;
    };

    const updateParticles = () => {
      if (!canvasRef.current || !state.context || !state.mounted) return;

      // Clear canvas by resetting width (faster than clearRect)
      // eslint-disable-next-line no-self-assign
      canvasRef.current.width = canvasRef.current.width;

      // Follow mouse with first particle
      state.particles[0].position.x = state.cursorPosition.x;
      state.particles[0].position.y = state.cursorPosition.y;

      // Update physics for each particle starting from the second one
      for (let i = 1; i < state.particles.length; i++) {
        const spring = new Vec(0, 0);

        // Calculate spring forces with previous and next particles
        if (i > 0) {
          const force = calculateSpringForce(
            state.particles[i - 1].position,
            state.particles[i].position
          );
          spring.X += force.X;
          spring.Y += force.Y;
        }

        if (i < state.particles.length - 1) {
          const force = calculateSpringForce(
            state.particles[i + 1].position,
            state.particles[i].position
          );
          spring.X += force.X;
          spring.Y += force.Y;
        }

        // Calculate resistance force
        const resist = new Vec(
          -state.particles[i].velocity.x * RESISTANCE,
          -state.particles[i].velocity.y * RESISTANCE
        );

        // Calculate acceleration
        const accel = new Vec((spring.X + resist.X) / MASS, (spring.Y + resist.Y) / MASS + GRAVITY);

        // Update velocity
        state.particles[i].velocity.x += DELTA_T * accel.X;
        state.particles[i].velocity.y += DELTA_T * accel.Y;

        // Stop very slow particles
        if (isParticleStopped(state.particles[i].velocity, accel)) {
          state.particles[i].velocity.x = 0;
          state.particles[i].velocity.y = 0;
        }

        // Update position
        state.particles[i].position.x += state.particles[i].velocity.x;
        state.particles[i].position.y += state.particles[i].velocity.y;

        // Handle boundary collisions
        handleBoundaryCollisions(
          state.particles[i],
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight
        );

        // Draw the particle
        state.particles[i].draw(state.context);
      }
    };

    // Animation loop
    const animate = () => {
      if (!state.mounted) return;

      updateParticles();
      state.animationFrame = requestAnimationFrame(animate);
    };

    // Add event listeners
    const element = props.wrapperElement || document.body;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup function
    return () => {
      // Mark as unmounted to prevent further updates
      state.mounted = false;

      // Cancel any pending animation frame
      if (state.animationFrame !== null) {
        cancelAnimationFrame(state.animationFrame);
        state.animationFrame = null;
      }

      // Remove event listeners
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      // Clear arrays to help with GC
      state.particles = [];
      state.emojiCanvas = null;
      state.context = null;
    };
  }, [canvasRef]);

  return { stateRef };
}
