/**
 * Hooks for the Magnet animation component
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_POSITION } from './magnet.constants';
import { MagnetPosition } from './magnet.types';
import { calculateMagnetOffset, isCursorWithinActivationArea } from './magnet.utils';

/**
 * Hook that manages the magnet effect on mouse movement
 *
 * @param padding - Padding around the element in pixels that activates the magnet effect
 * @param disabled - Whether the magnet effect is disabled
 * @param magnetStrength - Strength of the magnetic effect (lower values = stronger pull)
 * @returns Object containing refs, state and event handlers for the magnet effect
 */
export function useMagnetEffect(padding: number, disabled: boolean, magnetStrength: number) {
  // Track if the mouse is close enough to activate the magnet effect
  const [isActive, setIsActive] = useState<boolean>(false);

  // Store current position offset for the inner element
  const [position, setPosition] = useState<MagnetPosition>(DEFAULT_POSITION);

  // Reference to the magnet container element
  const magnetRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement and calculate magnet effect
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!magnetRef.current || disabled) return;

      const rect = magnetRef.current.getBoundingClientRect();

      // Check if cursor is within activation area using utility function
      if (isCursorWithinActivationArea(rect, e.clientX, e.clientY, padding)) {
        setIsActive(true);
        // Calculate position offset using utility function
        const newPosition = calculateMagnetOffset(rect, e.clientX, e.clientY, magnetStrength);
        setPosition(newPosition);
      } else if (isActive) {
        // Reset position when cursor moves out of range
        setIsActive(false);
        setPosition(DEFAULT_POSITION);
      }
    },
    [padding, disabled, magnetStrength, isActive]
  );

  // Reset position when component is disabled
  useEffect(() => {
    if (disabled && (position.x !== 0 || position.y !== 0)) {
      setPosition(DEFAULT_POSITION);
      setIsActive(false);
    }
  }, [disabled, position.x, position.y]);

  // Set up and clean up mouse movement listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return { magnetRef, isActive, position };
}
