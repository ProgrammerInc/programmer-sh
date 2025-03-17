/**
 * Hooks for the CosmicScene component
 */

import { RefObject, useCallback, useEffect, useState } from 'react';

/**
 * Mouse position state interface
 */
export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Hook to track mouse position relative to a container element
 *
 * @param containerRef - Reference to the container element
 * @param interactive - Whether interaction tracking is enabled
 * @returns Current mouse position as percentage values (0-100)
 */
export const useMousePositionEffect = (
  containerRef: RefObject<HTMLDivElement>,
  interactive: boolean
): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 50, y: 50 });

  /**
   * Handle mouse movement inside the container
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    },
    [containerRef]
  );

  // Set up and clean up event listeners
  useEffect(() => {
    if (!interactive || !containerRef.current) return;

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive, containerRef, handleMouseMove]);

  return mousePosition;
};
