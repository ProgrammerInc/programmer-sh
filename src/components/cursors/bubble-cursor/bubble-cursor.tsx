'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { CSS_CLASSES, DEFAULT_VALUES } from './bubble-cursor.constants';
import type { BubbleCursorProps } from './bubble-cursor.types';
import { BubbleParticle } from './bubble-particle';

/**
 * BubbleCursor Component
 *
 * Displays animated bubble particles that follow mouse movements
 * and touch interactions, creating a playful cursor effect.
 *
 * @component
 */
export const BubbleCursor = memo<BubbleCursorProps>(
  ({
    wrapperElement,
    fillStyle = DEFAULT_VALUES.FILL_STYLE,
    strokeStyle = DEFAULT_VALUES.STROKE_STYLE
  }) => {
    console.log('[BubbleCursor] Rendering with props:', { fillStyle, strokeStyle });

    // Use a single ref to hold component state to prevent re-renders
    const stateRef = useRef({
      initialized: false,
      animationFrame: null as number | null,
      canvas: null as HTMLCanvasElement | null,
      context: null as CanvasRenderingContext2D | null,
      cursorPosition: { x: 0, y: 0 },
      particles: [] as BubbleParticle[],
      mounted: false, // Start with false to prevent any operations before fully mounted
      props: { fillStyle, strokeStyle }
    });

    // Force a re-render when mounted to ensure canvas ref is set
    const [, forceRender] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Update props in ref without causing re-renders
    useEffect(() => {
      stateRef.current.props = { fillStyle, strokeStyle };
    }, [fillStyle, strokeStyle]);

    // Cleanup function to handle all resource disposal
    const cleanup = useCallback(() => {
      const state = stateRef.current;

      // Cancel animation frame
      if (state.animationFrame !== null) {
        cancelAnimationFrame(state.animationFrame);
        state.animationFrame = null;
      }

      // Clear particles
      state.particles = [];

      // Clear canvas
      if (state.canvas && state.context) {
        state.context.clearRect(0, 0, state.canvas.width, state.canvas.height);
      }

      // Reset initialization
      state.initialized = false;
    }, []);

    // Mark component as mounted
    useEffect(() => {
      stateRef.current.mounted = true;

      // Store a reference to the state object to avoid closure issues
      const state = stateRef.current;

      // This cleanup happens when the component is unmounted
      return () => {
        // Set mounted to false first to prevent any more rendering or updates
        state.mounted = false;

        // Cancel any pending animation frame
        if (state.animationFrame !== null) {
          cancelAnimationFrame(state.animationFrame);
          state.animationFrame = null;
        }

        // Clear particle array to release memory
        state.particles = [];
      };
    }, []);

    // Add a new particle at the specified coordinates
    const addParticle = useCallback((x: number, y: number) => {
      if (!stateRef.current.mounted) return;

      const { fillStyle, strokeStyle } = stateRef.current.props;
      stateRef.current.particles.push(new BubbleParticle(x, y, fillStyle, strokeStyle));
    }, []);

    // Handle mouse movement
    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!stateRef.current.mounted) return;

        // Update cursor position
        stateRef.current.cursorPosition.x = e.clientX;
        stateRef.current.cursorPosition.y = e.clientY;

        // Add a particle at the cursor position
        addParticle(e.clientX, e.clientY);
      },
      [addParticle]
    );

    // Handle touch events
    const handleTouchMove = useCallback(
      (e: TouchEvent) => {
        if (!stateRef.current.mounted || !e.touches.length) return;

        for (let i = 0; i < e.touches.length; i++) {
          addParticle(e.touches[i].clientX, e.touches[i].clientY);
        }
      },
      [addParticle]
    );

    // Update canvas size
    const updateCanvasSize = useCallback(() => {
      const state = stateRef.current;
      const canvas = canvasRef.current;

      if (!canvas || !state.mounted) return;

      // Store canvas reference
      state.canvas = canvas;

      // Update dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Get context
      state.context = canvas.getContext('2d');

      console.log(`[BubbleCursor] Canvas sized: ${canvas.width}x${canvas.height}`);
    }, []);

    // Animation loop
    const animate = useCallback(() => {
      const state = stateRef.current;

      if (!state.mounted || !state.canvas || !state.context) {
        return;
      }

      const { canvas, context, particles } = state;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(context);
      }

      // Remove dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].lifeSpan < 0) {
          particles.splice(i, 1);
        }
      }

      // Continue animation
      state.animationFrame = requestAnimationFrame(animate);
    }, []);

    // Initialize or re-initialize when canvasRef changes
    useEffect(() => {
      const state = stateRef.current;
      const canvas = canvasRef.current;

      console.log('[BubbleCursor] Init effect triggered', { canvas, mounted: state.mounted });

      // Skip if not mounted or no canvas
      if (!state.mounted || !canvas) {
        console.log(
          '[BubbleCursor] Skipping initialization, mounted:',
          state.mounted,
          'canvas:',
          !!canvas
        );
        return;
      }

      console.log('[BubbleCursor] Initializing with canvas ref');

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        console.log('[BubbleCursor] Reduced motion preference detected');
        return;
      }

      // Clean up previous initialization
      cleanup();

      // Set up canvas
      updateCanvasSize();

      // Add event listeners
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchstart', handleTouchMove, { passive: true });
      window.addEventListener('resize', updateCanvasSize);

      // Start animation
      state.initialized = true;
      animate();

      return () => {
        // Remove event listeners
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchstart', handleTouchMove);
        window.removeEventListener('resize', updateCanvasSize);

        // Clean up
        cleanup();
      };
    }, [animate, cleanup, handleMouseMove, handleTouchMove, updateCanvasSize]);

    return (
      <canvas
        ref={canvasRef}
        className={CSS_CLASSES.CANVAS}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          border: '1px solid rgba(255, 0, 0, 0.2)', // Debug border to see canvas
          pointerEvents: 'none'
        }}
        data-testid="bubble-cursor-canvas"
      />
    );
  }
);

BubbleCursor.displayName = 'BubbleCursor';

export default BubbleCursor;
