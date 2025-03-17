/**
 * Hooks for the Neon Cursor component.
 */

import { useAnimation } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ANIMATION_SETTINGS, INTERACTIVE_ELEMENTS_SELECTOR } from './neon-cursor.constants';
import type { CursorPosition, NeonCursorProps } from './neon-cursor.types';
import { isInteractiveElement } from './neon-cursor.utils';

/**
 * Hook for managing neon cursor state and interactions.
 *
 * @param props - Neon cursor props
 * @returns State and handlers for the neon cursor
 */
export function useNeonCursor(props: NeonCursorProps) {
  const { primaryColor, hoverColor } = props;

  // Store props in ref to avoid dependency issues
  const propsRef = useRef<NeonCursorProps>(props);

  // Update props ref when props change
  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  // Main cursor state
  const [position, setPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1
  });

  // Interaction states
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Animation controls
  const trailControls = useAnimation();
  const glowControls = useAnimation();

  // Flag to prevent operations after unmount
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * Handle mouse movement to update cursor position
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isMountedRef.current) return;

    setPosition(prev => ({
      ...prev,
      x: e.clientX,
      y: e.clientY
    }));
  }, []);

  /**
   * Handle mouse down event
   */
  const handleMouseDown = useCallback(() => {
    if (!isMountedRef.current) return;
    setIsClicking(true);
  }, []);

  /**
   * Handle mouse up event
   */
  const handleMouseUp = useCallback(() => {
    if (!isMountedRef.current) return;
    setIsClicking(false);
  }, []);

  /**
   * Handle mouse over event for interactive elements
   */
  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      if (!isMountedRef.current) return;

      const target = e.target as Element;
      if (isInteractiveElement(target, INTERACTIVE_ELEMENTS_SELECTOR)) {
        setIsHovering(true);
        void trailControls.start({
          scale: ANIMATION_SETTINGS.trail.hover.scale,
          borderColor: propsRef.current.hoverColor || hoverColor,
          borderWidth: ANIMATION_SETTINGS.trail.hover.borderWidth
        });
        void glowControls.start({
          scale: ANIMATION_SETTINGS.glow.hover.scale,
          opacity: ANIMATION_SETTINGS.glow.hover.opacity
        });
      }
    },
    [trailControls, glowControls, hoverColor]
  );

  /**
   * Handle mouse out event from interactive elements
   */
  const handleMouseOut = useCallback(() => {
    if (!isMountedRef.current) return;

    setIsHovering(false);
    void trailControls.start({
      scale: ANIMATION_SETTINGS.trail.default.scale,
      borderColor: propsRef.current.primaryColor || primaryColor,
      borderWidth: ANIMATION_SETTINGS.trail.default.borderWidth
    });
    void glowControls.start({
      scale: ANIMATION_SETTINGS.glow.default.scale,
      opacity: ANIMATION_SETTINGS.glow.default.opacity
    });
  }, [trailControls, glowControls, primaryColor]);

  /**
   * Add event listeners on mount and remove on unmount
   */
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut, handleMouseDown, handleMouseUp]);

  return {
    position,
    isClicking,
    isHovering,
    trailControls,
    glowControls,
    ANIMATION_SETTINGS
  };
}
