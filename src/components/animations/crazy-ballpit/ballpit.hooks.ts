/**
 * Custom hooks for the Ballpit component
 */
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  DEFAULT_COLORS,
  DEFAULT_LIGHTING,
  DEFAULT_MATERIAL_PARAMS,
  DEFAULT_PHYSICS
} from './ballpit.constants';
import styles from './ballpit.module.css';
import { BallpitProps, CreateBallpitReturn } from './ballpit.types';
import { cleanupResources, cn } from './ballpit.utils';

/**
 * Hook to generate container class name with proper composition
 *
 * @param className - Additional class names to apply
 * @returns Computed class name string
 */
export function useContainerClassName(className?: string) {
  return useMemo(() => {
    return cn(styles['ballpit-container'], className);
  }, [className]);
}

/**
 * Hook that memoizes the aria label for the component
 *
 * @returns Accessibility aria label
 */
export function useAccessibilityLabel() {
  return useMemo(() => {
    return 'Decorative 3D ball pit animation with colorful bouncing spheres';
  }, []);
}

/**
 * Hook to create and manage ballpit instance
 *
 * @param canvasRef - Reference to the canvas element
 * @param props - Component properties
 * @returns The ballpit instance and animation state control functions
 */
export function useBallpitInstance(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  props: BallpitProps
) {
  // Create a ref to store the ballpit instance
  const instanceRef = useRef<CreateBallpitReturn | null>(null);

  // Extract props with defaults
  const {
    followCursor = DEFAULT_PHYSICS.followCursor,
    count = DEFAULT_PHYSICS.count,
    colors = DEFAULT_COLORS,
    ambientColor = DEFAULT_LIGHTING.ambientColor,
    ambientIntensity = DEFAULT_LIGHTING.ambientIntensity,
    lightIntensity = DEFAULT_LIGHTING.lightIntensity,
    materialParams = DEFAULT_MATERIAL_PARAMS,
    minSize = DEFAULT_PHYSICS.minSize,
    maxSize = DEFAULT_PHYSICS.maxSize,
    size0 = DEFAULT_PHYSICS.size0,
    gravity = DEFAULT_PHYSICS.gravity,
    friction = DEFAULT_PHYSICS.friction,
    wallBounce = DEFAULT_PHYSICS.wallBounce,
    maxVelocity = DEFAULT_PHYSICS.maxVelocity,
    maxX = DEFAULT_PHYSICS.maxX,
    maxY = DEFAULT_PHYSICS.maxY,
    maxZ = DEFAULT_PHYSICS.maxZ,
    controlSphere0 = DEFAULT_PHYSICS.controlSphere0
  } = props;

  // Create configuration object
  const config = useMemo(
    () => ({
      count,
      colors,
      ambientColor,
      ambientIntensity,
      lightIntensity,
      materialParams,
      minSize,
      maxSize,
      size0,
      gravity,
      friction,
      wallBounce,
      maxVelocity,
      maxX,
      maxY,
      maxZ,
      controlSphere0,
      followCursor
    }),
    [
      count,
      colors,
      ambientColor,
      ambientIntensity,
      lightIntensity,
      materialParams,
      minSize,
      maxSize,
      size0,
      gravity,
      friction,
      wallBounce,
      maxVelocity,
      maxX,
      maxY,
      maxZ,
      controlSphere0,
      followCursor
    ]
  );

  // Initialize and clean up the ballpit instance
  useEffect(() => {
    // We need a canvas element to proceed
    if (!canvasRef.current) return;

    // For now, we'll skip the direct initialization since the createBallpit function
    // needs to be properly exported from the main module first.
    // We'll implement this initialization in the main component instead.

    // This ensures we don't break existing functionality during refactoring.
    // A complete refactoring would require exporting the createBallpit function properly.

    // Clean up the ballpit instance on unmount
    return () => {
      if (instanceRef.current) {
        cleanupResources(instanceRef.current);
        instanceRef.current = null;
      }
    };
  }, [canvasRef, config]);

  // Functions to control the ballpit
  const setCount = useCallback((newCount: number) => {
    if (instanceRef.current) {
      instanceRef.current.setCount(newCount);
    }
  }, []);

  const togglePause = useCallback(() => {
    if (instanceRef.current) {
      instanceRef.current.togglePause();
    }
  }, []);

  return { instance: instanceRef, setCount, togglePause };
}
