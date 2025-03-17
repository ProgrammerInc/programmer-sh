/**
 * GradientCursor
 *
 * Hook implementation for the GradientCursor component
 *
 * @module GradientCursor/Hooks
 */

import { useMouse } from '@/hooks/use-mouse.hook';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GradientCursorState, GradientParticle } from './gradient-cursor.types';

/**
 * Hook to manage the GradientCursor state and behavior
 *
 * @returns Object containing state, refs, and handler functions
 */
export const useGradientCursorHooks = () => {
  // Use the shared mouse hook for cursor position tracking
  const [mouseState, containerRef] = useMouse();

  // State for re-rendering
  const [particles, setParticles] = useState<GradientParticle[]>([]);
  const [hue, setHue] = useState(0);

  // Use ref to store mutable state to prevent unnecessary re-renders
  const stateRef = useRef<GradientCursorState>({
    hue: 0,
    particles: []
  });

  /**
   * Create new particles at the current mouse position
   */
  const createParticles = useCallback(() => {
    if (!mouseState.x || !mouseState.y) return;

    // Update hue based on mouse position
    const newHue = (mouseState.x || 0) % 360;
    stateRef.current.hue = newHue;
    setHue(newHue);

    // Create multiple new particles
    const newParticles = Array.from({ length: 3 }, () => ({
      id: Date.now() + Math.random(),
      x: mouseState.x + (Math.random() - 0.5) * 20,
      y: mouseState.y + (Math.random() - 0.5) * 20,
      size: Math.random() * 3 + 2, // Random size between 2 and 5
      intensity: Math.random() * 0.5 + 0.5 // Random intensity between 0.5 and 1
    }));

    // Keep last 30 particles
    const updatedParticles = [...stateRef.current.particles, ...newParticles].slice(-30);
    stateRef.current.particles = updatedParticles;
    setParticles(updatedParticles);
  }, [mouseState.x, mouseState.y]);

  // Update particles when mouse moves
  useEffect(() => {
    createParticles();
  }, [mouseState.x, mouseState.y, createParticles]);

  return {
    mouseState,
    containerRef,
    hue,
    particles
  };
};
