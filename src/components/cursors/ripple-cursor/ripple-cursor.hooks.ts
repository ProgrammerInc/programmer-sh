/**
 * Custom hooks for the Ripple Cursor component.
 */
import { useEffect, useReducer, useRef } from 'react';

import { rippleReducer } from './ripple-cursor.reducer';
import type { Ripple, RippleCursorProps } from './ripple-cursor.types';

/**
 * Custom hook to manage ripple effect state and mouse tracking.
 *
 * @param duration - Duration of each ripple animation in milliseconds
 * @returns Array of current ripples
 */
export const useRippleEffect = (duration: number) => {
  const [ripples, dispatch] = useReducer(rippleReducer, []);
  const mountedRef = useRef(false);

  // Effect to attach and detach the mousemove event listener
  useEffect(() => {
    mountedRef.current = true;

    // Need to redefine the event handler inside useEffect to properly handle the duration dependency
    const handleMouseMoveEffect = (e: MouseEvent): void => {
      if (!mountedRef.current) return;

      const ripple: Ripple = {
        id: `${Date.now()}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY
      };

      dispatch({ type: 'ADD_RIPPLE', payload: ripple });

      // Remove ripple after the animation duration
      setTimeout(() => {
        if (mountedRef.current) {
          dispatch({ type: 'REMOVE_RIPPLE', payload: ripple.id });
        }
      }, duration);
    };

    window.addEventListener('mousemove', handleMouseMoveEffect);

    return () => {
      mountedRef.current = false;
      window.removeEventListener('mousemove', handleMouseMoveEffect);
    };
  }, [duration, dispatch]);

  return ripples;
};

/**
 * Hook to calculate ripple style properties.
 *
 * @param props - Ripple cursor properties
 * @returns Object containing calculated ripple styles
 */
export const useRippleStyles = ({ maxSize, duration, blur, color }: RippleCursorProps) => {
  // Convert hex color to RGB array for shadow effects
  const getRgbArray = (hexColor: string): number[] => {
    // Remove the # symbol if present
    const hex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  };

  const rgbArray = getRgbArray(color || '#64ffda');

  return {
    getStyles: (ripple: Ripple) => ({
      backgroundColor: color,
      boxShadow: `0 0 10px rgba(${rgbArray.join(',')}, 0.7), 0 0 20px rgba(${rgbArray.join(',')}, 0.4)`,
      left: `${ripple.x}px`,
      top: `${ripple.y}px`,
      width: `${maxSize}px`,
      height: `${maxSize}px`,
      animationDuration: `${duration}ms`,
      filter: blur ? 'blur(4px)' : 'none'
    })
  };
};
