/**
 * CanvasCursor Hooks Module
 *
 * Contains the core functionality of the CanvasCursor component including
 * the animation and rendering of canvas particles that follow the mouse cursor.
 *
 * @module CanvasCursorHooks
 */

import { createFeatureLogger } from '@/services/logger/logger.utils';
import { useCallback, useMemo, useRef } from 'react';
import {
  CanvasContextWithRunning,
  CanvasCursorConfig,
  CanvasCursorState
} from './canvas-cursor.types';
import { Line } from './canvas-particle';
import { WaveObject } from './wave-object';

// Create a dedicated logger for canvas cursor
const canvasCursorLogger = createFeatureLogger('CanvasCursor');

/**
 * Hook that provides the core functionality for the CanvasCursor component.
 * Manages the state, animation loop, and rendering of the cursor effects.
 *
 * @returns Object containing state and functions for the CanvasCursor component
 */
export const useCanvasCursorHooks = () => {
  // Create configuration object with useMemo to prevent unnecessary re-renders
  const config = useMemo<CanvasCursorConfig>(
    () => ({
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98
    }),
    []
  );

  /**
   * Reference to the state object containing all mutable state for the CanvasCursor component.
   */
  const stateRef = useRef<CanvasCursorState>({
    mounted: false,
    ctx: null,
    f: null,
    lines: [],
    e: 0,
    pos: { x: 0, y: 0 },
    animationFrame: null
  });

  /**
   * Resizes the canvas to fit the window dimensions.
   *
   * @param canvas The canvas element to resize
   */
  const resizeCanvas = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!stateRef.current.mounted || !canvas) return;

    const ctx = stateRef.current.ctx;
    if (!ctx) return;

    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight;
  }, []);

  /**
   * Renders the canvas cursor effect.
   */
  const render = useCallback(() => {
    if (!stateRef.current.mounted) return;

    const ctx = stateRef.current.ctx;
    const f = stateRef.current.f;
    const lines = stateRef.current.lines;

    if (!ctx || !f) return;

    if (ctx.running) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)';
      ctx.lineWidth = 1;

      for (let i = 0; i < config.trails; i++) {
        const line = lines[i];
        if (line) {
          line.update();
          line.draw(ctx);
        }
      }

      ctx.frame++;
      stateRef.current.animationFrame = window.requestAnimationFrame(() => render()); // Fix: Added an arrow function to call render
    }
  }, [config.trails]);

  /**
   * Initializes the lines for the canvas cursor effect.
   */
  const initLines = useCallback(() => {
    if (!stateRef.current.mounted) return;

    const getPos = () => stateRef.current.pos;
    stateRef.current.lines = [];

    for (let i = 0; i < config.trails; i++) {
      const line = new Line({ spring: 0.4 + (i / config.trails) * 0.025 }, config, getPos);

      stateRef.current.lines.push({
        update: () => line.update(),
        draw: (ctx: CanvasRenderingContext2D) => line.draw(ctx)
      });
    }
  }, [config]);

  /**
   * Handles mouse move events to update the cursor position.
   *
   * @param e The mouse event
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!stateRef.current.mounted) return;

    stateRef.current.pos.x = e.clientX;
    stateRef.current.pos.y = e.clientY;
  }, []);

  /**
   * Handles touch move events to update the cursor position.
   *
   * @param e The touch event
   */
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!stateRef.current.mounted || e.touches.length === 0) return;

    stateRef.current.pos.x = e.touches[0].pageX;
    stateRef.current.pos.y = e.touches[0].pageY;
    e.preventDefault();
  }, []);

  /**
   * Handles touch start events to update the cursor position.
   *
   * @param e The touch event
   */
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!stateRef.current.mounted || e.touches.length !== 1) return;

    stateRef.current.pos.x = e.touches[0].pageX;
    stateRef.current.pos.y = e.touches[0].pageY;
  }, []);

  /**
   * Cleans up the canvas cursor effect when the component is unmounted.
   */
  const cleanup = useCallback(() => {
    const state = stateRef.current;

    // Cancel animation frame
    if (state.animationFrame !== null) {
      cancelAnimationFrame(state.animationFrame);
      state.animationFrame = null;
    }

    // Stop rendering
    if (state.ctx) {
      state.ctx.running = false;
    }

    // Clear lines
    state.lines = [];
  }, []);

  /**
   * Initializes the canvas cursor effect.
   *
   * @param canvas The canvas element to initialize
   */
  const initCanvas = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas || !stateRef.current.mounted) {
        canvasCursorLogger.error('Canvas element not found or component unmounted');
        return;
      }

      const ctx2d = canvas.getContext('2d');
      if (!ctx2d) {
        canvasCursorLogger.error('Could not get 2D context from canvas');
        return;
      }

      // Initialize context with running properties
      const ctx = Object.assign(ctx2d, {
        running: true,
        frame: 1
      }) as CanvasContextWithRunning;

      stateRef.current.ctx = ctx;

      // Create wave function
      const f = new WaveObject({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285
      });

      stateRef.current.f = f;

      // Initialize lines and start rendering
      resizeCanvas(canvas);
      initLines();
      render();

      canvasCursorLogger.debug('Canvas cursor initialization complete');
    },
    [resizeCanvas, initLines, render]
  );

  return {
    stateRef,
    config,
    handleMouseMove,
    handleTouchMove,
    handleTouchStart,
    resizeCanvas,
    render,
    initLines,
    cleanup,
    initCanvas
  };
};
