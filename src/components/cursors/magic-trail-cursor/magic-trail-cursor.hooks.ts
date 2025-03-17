/**
 * MagicTrailCursor
 *
 * Hook implementation for the MagicTrailCursor component
 *
 * @module MagicTrailCursor/Hooks
 */

import { useEffect, useRef } from 'react';
import { MagicTrailCursorBase } from './magic-trail-cursor.class';
import { MagicTrailCursorProps, MagicTrailCursorState } from './magic-trail-cursor.types';

/**
 * Custom hook for managing the MagicTrailCursor component state and behavior
 * @param props - Component props
 * @returns MagicTrailCursor state object
 */
export function useMagicTrailCursor(props: MagicTrailCursorProps): MagicTrailCursorState {
  const {
    colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'],
    particleCount = 50,
    trailLength = 35,
    decay = 0.03,
    smoothing = 0.65,
    containerRef
  } = props;

  // Create refs for state management
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<MagicTrailCursorBase | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Initialize and clean up the magic trail cursor
  useEffect(() => {
    // Skip if no canvas
    if (!canvasRef.current) return;

    // Use document.body as a fallback to ensure cursor always works
    const container = containerRef?.current || document.body;

    // Clean up any existing instance
    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    // Create new instance
    instanceRef.current = new MagicTrailCursorBase(canvasRef.current, container, {
      colors,
      trailLength,
      decay,
      smoothing,
      particleCount
    });

    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [colors, trailLength, decay, smoothing, particleCount, containerRef]);

  return {
    canvasRef,
    isMounted: isMountedRef.current
  };
}
