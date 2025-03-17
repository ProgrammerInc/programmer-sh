/**
 * GlitchCursor
 *
 * Hook implementation for the GlitchCursor component
 *
 * @module GlitchCursor/Hooks
 */

import { useMouse } from '@/hooks/use-mouse.hook';
import { useCallback, useEffect, useRef } from 'react';
import { GlitchCursorState, GlitchOffset } from './glitch-cursor.types';

/**
 * Hook to manage the GlitchCursor state and behavior
 *
 * @returns Object containing state, refs, and handler functions
 */
export const useGlitchCursorHooks = () => {
  // Use the shared mouse hook for cursor position tracking
  const [mouseState, containerRef] = useMouse();

  // Use a ref to hold all mutable state to prevent unnecessary re-renders
  const stateRef = useRef<GlitchCursorState>({
    glitchActive: false,
    glitchOffsets: [],
    intensity: 1
  });

  // Interval ref for glitch effect
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Generate random offsets for the glitch effect based on intensity
   *
   * @param intensity - The intensity level of the glitch effect
   * @returns Array of glitch offset objects
   */
  const generateGlitchOffsets = useCallback((intensity: number): GlitchOffset[] => {
    return Array(5)
      .fill(0)
      .map(() => ({
        x: (Math.random() - 0.5) * 20 * intensity,
        y: (Math.random() - 0.5) * 20 * intensity,
        scale: 0.8 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 45 * intensity,
        opacity: 0.5 + Math.random() * 0.5,
        hue: Math.random() * 360
      }));
  }, []);

  /**
   * Set the glitch effect active state
   *
   * @param active - Whether the glitch effect should be active
   */
  const setGlitchActive = useCallback(
    (active: boolean) => {
      stateRef.current.glitchActive = active;

      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Set up a new interval if the effect is active
      if (active) {
        intervalRef.current = setInterval(() => {
          const newOffsets = generateGlitchOffsets(stateRef.current.intensity);
          stateRef.current.glitchOffsets = newOffsets;
        }, 50);
      } else {
        stateRef.current.glitchOffsets = [];
      }
    },
    [generateGlitchOffsets]
  );

  /**
   * Handle mouse movement to calculate the intensity of the glitch effect
   *
   * @param e - Mouse move event
   */
  const handleMouseSpeed = useCallback((e: React.MouseEvent) => {
    const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
    stateRef.current.intensity = Math.min(Math.max(speed / 10, 1), 3);
  }, []);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return {
    mouseState,
    containerRef,
    stateRef,
    setGlitchActive,
    handleMouseSpeed
  };
};
