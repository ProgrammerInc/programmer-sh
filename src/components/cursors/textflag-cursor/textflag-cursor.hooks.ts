/**
 * TextFlagCursor Hooks
 *
 * Hook implementation for the TextFlagCursor component
 *
 * @module TextFlagCursor/Hooks
 */

import { createFeatureLogger } from '@/services/logger/logger.utils';
import { RefObject, useEffect, useRef } from 'react';
import { DEFAULT_CONFIG, RENDERING } from './textflag-cursor.constants';
import { TextFlagConfig, TextFlagCursorState } from './textflag-cursor.types';
import {
  createCanvas,
  getCursorPosition,
  initializeCharacters,
  renderCharacters,
  updateCharacters
} from './textflag-cursor.utils';

// Create a dedicated logger for text flag cursor effect
const textFlagLogger = createFeatureLogger('TextFlagCursor');

/**
 * Hook for managing the TextFlagCursor state and behavior
 * 
 * @param config - Configuration options for the text flag cursor
 * @returns Functions to manipulate the cursor
 */
export function useTextFlagCursor(config: TextFlagConfig = {}) {
  // Use a single ref to hold all mutable state
  const stateRef = useRef<TextFlagCursorState>({
    mounted: false,
    cursor: { x: 0, y: 0 },
    characters: [],
    angle: 0,
    canvas: null,
    context: null,
    animationFrame: null
  });
  
  // Store config in a ref to avoid dependency changes triggering re-renders
  const configRef = useRef<Required<TextFlagConfig>>({ ...DEFAULT_CONFIG } as Required<TextFlagConfig>);
  
  // Update config ref when config changes
  useEffect(() => {
    configRef.current = {
      ...DEFAULT_CONFIG,
      ...config,
      gap: config.gap || (config.textSize || DEFAULT_CONFIG.textSize) + 2,
      element: config.element || document.body
    } as Required<TextFlagConfig>;
  }, [config]);
  
  // Initialize/cleanup the cursor system
  useEffect(() => {
    try {
      textFlagLogger.debug('Initializing text flag cursor');
      
      // Prevent execution if prefers-reduced-motion is enabled
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches) {
        textFlagLogger.debug('Reduced motion preference detected, not initializing text flag cursor');
        return;
      }
      
      // Setup state and mark as mounted
      stateRef.current.mounted = true;
      
      // Store references to avoid stale closures in cleanup function
      const state = stateRef.current;
      const userConfig = configRef.current;
      
      // Initialize config values
      const container = userConfig.element || document.body;
      const isContainerBody = container === document.body;
      
      // Prepare text with leading space for better visual effect
      const displayText = ' ' + (userConfig.text || DEFAULT_CONFIG.text);
      const fontFamily = userConfig.textSize + 'px ' + userConfig.font;
      
      // Initialize dimensions
      let width = window.innerWidth;
      let height = window.innerHeight;
      
      // Initialize cursor position at center
      state.cursor = { x: width / 2, y: height / 2 };
      
      // Initialize characters array
      state.characters = initializeCharacters(displayText, width / 2, height / 2);
      
      // Initialize canvas
      const { canvas, context } = createCanvas(container, isContainerBody, width, height);
      state.canvas = canvas;
      state.context = context;
      
      // Handler for mouse movement
      const handleMouseMove = (e: MouseEvent) => {
        try {
          if (!state.mounted) return;
          
          state.cursor = getCursorPosition(e, container, isContainerBody);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          textFlagLogger.error('Error handling mouse move', { error: errorMessage });
        }
      };
      
      // Handler for window resize
      const handleResize = () => {
        try {
          if (!state.mounted || !state.canvas) return;
          
          width = window.innerWidth;
          height = window.innerHeight;
          
          if (isContainerBody) {
            state.canvas.width = width;
            state.canvas.height = height;
          } else {
            state.canvas.width = container.clientWidth;
            state.canvas.height = container.clientHeight;
          }
          
          textFlagLogger.debug('Canvas resized', {
            width: state.canvas.width,
            height: state.canvas.height
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          textFlagLogger.error('Error handling resize', { error: errorMessage });
        }
      };
      
      // Animation loop
      const render = () => {
        try {
          if (!state.mounted || !state.canvas || !state.context) return;
          
          // Update character positions
          state.angle = updateCharacters(state, userConfig.gap);
          
          // Render characters
          renderCharacters(
            state,
            state.canvas.width,
            state.canvas.height,
            userConfig.color,
            fontFamily
          );
          
          // Continue animation loop
          state.animationFrame = requestAnimationFrame(render);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          textFlagLogger.error('Error during render loop', { error: errorMessage });
          // Try to keep the animation going despite errors
          state.animationFrame = requestAnimationFrame(render);
        }
      };
      
      // Handle reduced motion preference change
      const handleReducedMotionChange = () => {
        if (prefersReducedMotion.matches) {
          // Clean up resources
          cleanup();
        } else {
          // Reinitialize
          init();
        }
      };
      
      // Init function
      const init = () => {
        if (state.mounted) return;
        
        state.mounted = true;
        
        // Initialize canvas
        const { canvas, context } = createCanvas(container, isContainerBody, width, height);
        state.canvas = canvas;
        state.context = context;
        
        // Start animation
        render();
      };
      
      // Cleanup function
      const cleanup = () => {
        if (!state.mounted) return;
        
        state.mounted = false;
        
        if (state.animationFrame !== null) {
          cancelAnimationFrame(state.animationFrame);
          state.animationFrame = null;
        }
        
        if (state.canvas) {
          state.canvas.remove();
          state.canvas = null;
        }
        
        state.context = null;
      };
      
      // Add event listeners
      container.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      prefersReducedMotion.addEventListener('change', handleReducedMotionChange);
      
      // Start animation
      render();
      
      textFlagLogger.debug('Text flag cursor initialized');
      
      // Return cleanup function
      return () => {
        cleanup();
        
        container.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize); // Fix: Correctly remove resize event listener
        prefersReducedMotion.removeEventListener('change', handleReducedMotionChange);
        
        textFlagLogger.debug('Text flag cursor cleanup complete');
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      textFlagLogger.error('Error setting up text flag cursor', { error: errorMessage });
      return () => {}; // Empty cleanup function
    }
  }, []);
  
  return { stateRef };
}
