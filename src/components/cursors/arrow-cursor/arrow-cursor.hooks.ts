'use client';

import { useEffect, useRef, useState } from 'react';
import type { ArrowDirection, MousePosition } from './arrow-cursor.types';

/**
 * Hook for tracking mouse position and movement direction.
 *
 * @returns Mouse position and direction of movement
 */
export const useArrowCursorTracking = () => {
  const [lastY, setLastY] = useState<number | null>(null);
  const [direction, setDirection] = useState<ArrowDirection>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    // Track component mount status for cleanup
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Prevent state updates if component unmounted
      if (!mountedRef.current) return;

      // Track mouse position
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Determine direction
      if (lastY !== null) {
        if (e.clientY < lastY) {
          setDirection('up');
        } else if (e.clientY > lastY) {
          setDirection('down');
        }
      }
      setLastY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastY]);

  return { direction, mousePosition };
};

/**
 * Animation variants for the arrow cursor.
 */
export const useArrowAnimationVariants = (direction: ArrowDirection) => {
  return {
    initial: {
      opacity: 0,
      scale: 0.5,
      rotate: direction === 'up' ? 0 : 180
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: direction === 'up' ? 0 : 180
    },
    exit: {
      opacity: 0,
      scale: 0.5
    }
  };
};
