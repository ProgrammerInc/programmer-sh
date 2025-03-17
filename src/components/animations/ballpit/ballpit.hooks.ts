/**
 * Custom hooks for the Ballpit animation component
 *
 * @module BallpitHooks
 */

import { useEffect, useRef, useState } from 'react';
import { DEFAULT_X_CONFIG } from './ballpit.constants';
import { CreateBallpitReturn } from './ballpit.types';
import { createBallpit } from './ballpit.utils';

/**
 * Hook to initialize and manage a Ballpit animation instance
 *
 * This hook properly handles the lifecycle of the Ballpit animation,
 * ensuring that the Three.js instance is properly disposed when the
 * component unmounts and prevents infinite re-rendering.
 *
 * @param {HTMLCanvasElement | null} canvasRef - Reference to the canvas element
 * @param {Partial<typeof DEFAULT_X_CONFIG>} props - Configuration props
 * @returns {CreateBallpitReturn | null} Interface to control the animation
 */
export const useBallpit = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  props: Partial<typeof DEFAULT_X_CONFIG>
): CreateBallpitReturn | null => {
  // Store instance in a ref to avoid re-initialization triggers
  const instanceRef = useRef<CreateBallpitReturn | null>(null);
  // Store latest props in a ref to avoid dependency changes
  const propsRef = useRef(props);
  // Use state only for re-rendering when really needed
  const [initialized, setInitialized] = useState<boolean>(false);

  // Update props ref when props change
  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  // Initialize the Ballpit instance once
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || instanceRef.current) return;

    instanceRef.current = createBallpit(canvas, propsRef.current);
    setInitialized(true);

    return () => {
      if (instanceRef.current) {
        instanceRef.current.dispose();
        instanceRef.current = null;
      }
    };
  }, [canvasRef]);

  return instanceRef.current;
};
