/**
 * Hooks for the Magnet Lines animation component
 */

import { useEffect, useRef } from 'react';
import { PointerPosition } from './magnet-lines.types';
import { calculateRotationAngle } from './magnet-lines.utils';

/**
 * Hook that manages the magnetic line rotation effect
 *
 * @returns A ref object to attach to the container element
 */
export function useMagnetLinesEffect() {
  // Create a ref for the container element
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get all span elements within the container
    const items = container.querySelectorAll<HTMLSpanElement>('span');

    // Function to handle pointer movement and update rotations
    const onPointerMove = (pointer: PointerPosition) => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const rotationAngle = calculateRotationAngle(rect, pointer);

        // Update the CSS custom property for rotation
        item.style.setProperty('--rotate', `${rotationAngle}deg`);
      });
    };

    // Event handler for pointer movement
    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.x, y: e.y });
    };

    // Add event listener for pointer movement
    window.addEventListener('pointermove', handlePointerMove);

    // Initial positioning - orient lines toward the center item
    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return containerRef;
}
