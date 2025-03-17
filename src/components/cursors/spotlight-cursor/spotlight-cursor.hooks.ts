/**
 * SpotlightCursor Hooks
 *
 * Hook implementation for the SpotlightCursor component
 *
 * @module SpotlightCursor/Hooks
 */

import { RefObject, useEffect, useRef } from 'react';
import { DEFAULT_CONFIG } from './spotlight-cursor.constants';
import { SpotlightConfig, SpotlightCursorState } from './spotlight-cursor.types';
import { drawSpotlightEffect, lerp } from './spotlight-cursor.utils';

// Import the logger directly to avoid circular dependency issues
import { logger } from '@/services/logger/logger.service';

// Create a dedicated logger for spotlight effect
const spotlightLogger = logger.createChildLogger('SpotlightEffect');

/**
 * Hook for managing the SpotlightCursor state and behavior
 *
 * @param config - Configuration options for the spotlight effect
 * @param canvasRef - Ref to the canvas element
 * @returns State and behavior functions for the SpotlightCursor
 */
export function useSpotlightCursor(
  config: SpotlightConfig = {},
  canvasRef: RefObject<HTMLCanvasElement>
) {
  // Use a single ref to hold all mutable state to prevent re-renders
  const stateRef = useRef<SpotlightCursorState>({
    mounted: false,
    position: { x: 0, y: 0 },
    targetPosition: { x: 0, y: 0 },
    animationFrame: null,
    context: null,
    isHovered: false
  });

  // Store config in a ref to avoid dependency changes triggering re-renders
  const configRef = useRef({
    ...DEFAULT_CONFIG,
    ...config
  });

  // Update config ref when config changes
  useEffect(() => {
    configRef.current = {
      ...DEFAULT_CONFIG,
      ...config
    };
  }, [config]);

  // Initialize/cleanup the cursor system
  useEffect(() => {
    try {
      spotlightLogger.debug('Initializing spotlight effect');

      // Prevent execution if prefers-reduced-motion is enabled
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches) {
        spotlightLogger.debug(
          'Reduced motion preference detected, not initializing spotlight effect'
        );
        return;
      }

      // Setup state and mark as mounted
      stateRef.current.mounted = true;

      // Store reference to state for cleanup function to avoid stale refs
      const state = stateRef.current;
      const userConfig = configRef.current;

      // Initialize canvas
      const canvas = canvasRef.current;
      if (!canvas) {
        spotlightLogger.error('Canvas element not found');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        spotlightLogger.error('Could not get 2D context from canvas');
        return;
      }

      state.context = ctx;

      // Set initial position
      state.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      state.targetPosition = { ...state.position };

      // Resize handler
      const resizeCanvas = (): void => {
        try {
          if (!canvas) return;

          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          spotlightLogger.debug('Canvas resized', { width: canvas.width, height: canvas.height });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          spotlightLogger.error('Error resizing canvas', { error: errorMessage });
        }
      };

      // Mouse handlers
      const handleMouseMove = (e: MouseEvent): void => {
        try {
          if (!state.mounted) return;

          state.targetPosition = { x: e.clientX, y: e.clientY };
          state.isHovered = true;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          spotlightLogger.error('Error handling mouse move', { error: errorMessage });
        }
      };

      const handleMouseLeave = (): void => {
        try {
          if (!state.mounted) return;

          state.isHovered = false;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          spotlightLogger.error('Error handling mouse leave', { error: errorMessage });
        }
      };

      // Animation render function
      const render = (): void => {
        try {
          if (!canvas || !state.context || !state.mounted) return;

          // Smooth position transition
          state.position.x = lerp(state.position.x, state.targetPosition.x, userConfig.smoothing);
          state.position.y = lerp(state.position.y, state.targetPosition.y, userConfig.smoothing);

          // Draw the spotlight effect
          drawSpotlightEffect(state.context, canvas, state.position, userConfig);

          // Continue animation loop
          state.animationFrame = requestAnimationFrame(render);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          spotlightLogger.error('Error during render loop', { error: errorMessage });
          // Try to keep the animation going despite errors
          state.animationFrame = requestAnimationFrame(render);
        }
      };

      // Initialize and start
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      render();

      spotlightLogger.debug('Spotlight effect initialized');

      // Cleanup function
      return () => {
        try {
          state.mounted = false;

          window.removeEventListener('resize', resizeCanvas);
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseleave', handleMouseLeave);

          if (state.animationFrame) {
            cancelAnimationFrame(state.animationFrame);
            state.animationFrame = null;
          }

          state.context = null;
          spotlightLogger.debug('Spotlight effect cleanup complete');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          spotlightLogger.error('Error during spotlight effect cleanup', { error: errorMessage });
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      spotlightLogger.error('Error setting up spotlight effect', { error: errorMessage });
      return () => {}; // Empty cleanup function
    }
  }, [canvasRef]);

  return { stateRef };
}
