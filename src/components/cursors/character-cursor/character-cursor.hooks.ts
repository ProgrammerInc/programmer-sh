/**
 * Character Cursor Hooks
 *
 * Hook implementation for the CharacterCursor component
 *
 * @module CharacterCursor/Hooks
 */

import { useCallback, useRef } from 'react';
import { CharacterCursorProps, CharacterCursorState } from './character-cursor.types';
import { Particle } from './character-particle';

/**
 * Hook to manage CharacterCursor state and behavior
 *
 * @param props - Props for the CharacterCursor component
 * @returns Object containing state and behavior functions
 */
export const useCharacterCursorHooks = (props: CharacterCursorProps) => {
  // Use a single ref to hold all mutable state to prevent re-renders
  const stateRef = useRef<CharacterCursorState>({
    initialized: false,
    mounted: false,
    particles: [],
    canvImages: [],
    cursorPosition: { x: 0, y: 0 },
    animationFrame: null,
    width: 0,
    height: 0,
    context: null
  });

  /**
   * Add a new particle at the specified position
   *
   * @param x - X position to add the particle
   * @param y - Y position to add the particle
   * @param img - Canvas element with the pre-rendered character
   */
  const addParticle = useCallback(
    (x: number, y: number, img: HTMLCanvasElement) => {
      stateRef.current.particles.push(new Particle(x, y, img, props));
    },
    [props]
  );

  /**
   * Update all particles and render them
   */
  const updateParticles = useCallback(() => {
    const state = stateRef.current;
    if (!state.context) return;

    if (state.particles.length === 0) {
      return;
    }

    // Clear canvas
    state.context.clearRect(0, 0, state.width, state.height);

    // Update and render particles
    for (let i = 0; i < state.particles.length; i++) {
      state.particles[i].update(state.context);
    }

    // Remove dead particles
    for (let i = state.particles.length - 1; i >= 0; i--) {
      if (state.particles[i].lifeSpan < 0) {
        state.particles.splice(i, 1);
      }
    }

    if (state.particles.length === 0) {
      state.context.clearRect(0, 0, state.width, state.height);
    }
  }, []);

  /**
   * Animation loop function
   */
  const animate = useCallback(() => {
    if (!stateRef.current.mounted) return;

    updateParticles();
    stateRef.current.animationFrame = requestAnimationFrame(animate);
  }, [updateParticles]);

  /**
   * Handle mouse movement events
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const state = stateRef.current;

      if (props.wrapperElement) {
        const boundingRect = props.wrapperElement.getBoundingClientRect();
        state.cursorPosition.x = e.clientX - boundingRect.left;
        state.cursorPosition.y = e.clientY - boundingRect.top;
      } else {
        state.cursorPosition.x = e.clientX;
        state.cursorPosition.y = e.clientY;
      }

      addParticle(
        state.cursorPosition.x,
        state.cursorPosition.y,
        state.canvImages[Math.floor(Math.random() * state.canvImages.length)]
      );
    },
    [props.wrapperElement, addParticle]
  );

  /**
   * Handle touch movement events
   */
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const state = stateRef.current;

        for (let i = 0; i < e.touches.length; i++) {
          if (state.canvImages.length === 0) continue;

          addParticle(
            e.touches[i].clientX,
            e.touches[i].clientY,
            state.canvImages[Math.floor(Math.random() * state.canvImages.length)]
          );
        }
      }
    },
    [addParticle]
  );

  /**
   * Handle window resize events
   */
  const handleResize = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;

      if (props.wrapperElement) {
        canvas.width = props.wrapperElement.clientWidth;
        canvas.height = props.wrapperElement.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      stateRef.current.width = canvas.width;
      stateRef.current.height = canvas.height;
    },
    [props.wrapperElement]
  );

  /**
   * Initialize the canvas and pre-render characters
   */
  const initCanvas = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas || !stateRef.current.mounted) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      const state = stateRef.current;
      state.context = context;

      // Configure canvas positioning
      canvas.style.position = props.wrapperElement ? 'absolute' : 'fixed';
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '99999';
      canvas.style.transform = 'translateZ(0)';

      // Set canvas dimensions
      handleResize(canvas);

      // Setup context
      context.font = props.font || '15px serif';
      context.textBaseline = 'middle';
      context.textAlign = 'center';

      // Create character canvas images
      const characters = props.characters || ['p', 'r', 'o', 'g', 'r', 'a', 'm', 'm', 'e', 'r'];
      const colors = props.colors || ['#6622CC', '#A755C2', '#B07C9E', '#B59194', '#D2A1B8'];

      characters.forEach(char => {
        const measurements = context.measureText(char);
        const bgCanvas = document.createElement('canvas');
        const bgContext = bgCanvas.getContext('2d');

        if (bgContext) {
          bgCanvas.width = measurements.width;
          bgCanvas.height = measurements.actualBoundingBoxAscent * 2.5;

          bgContext.textAlign = 'center';
          bgContext.font = props.font || '15px serif';
          bgContext.textBaseline = 'middle';
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          bgContext.fillStyle = randomColor;

          bgContext.fillText(char, bgCanvas.width / 2, measurements.actualBoundingBoxAscent);

          state.canvImages.push(bgCanvas);
        }
      });

      // Start animation
      animate();
    },
    [props, handleResize, animate]
  );

  /**
   * Clean up resources and event listeners
   */
  const cleanup = useCallback(() => {
    const state = stateRef.current;

    // Cancel any pending animation frame
    if (state.animationFrame !== null) {
      cancelAnimationFrame(state.animationFrame);
      state.animationFrame = null;
    }

    // Clear arrays to help with GC
    state.particles = [];
    state.canvImages = [];
  }, []);

  return {
    stateRef,
    handleMouseMove,
    handleTouchMove,
    handleResize,
    addParticle,
    updateParticles,
    animate,
    cleanup,
    initCanvas
  };
};
