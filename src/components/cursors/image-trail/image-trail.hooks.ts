/**
 * @file image-trail.hooks.ts
 * @description React hooks for the ImageTrail cursor component
 */

import { useEffect, useRef } from 'react';
import { createImageTrailVariant } from './image-trail.class';
import { IImageTrailBase, ImageTrailProps, ImageTrailState } from './image-trail.types';

/**
 * Custom hook for managing the ImageTrail component state and behavior
 * @param props - Component props
 * @returns ImageTrail state object
 */
export function useImageTrail(props: ImageTrailProps): ImageTrailState {
  const { variant = 1, items = [] } = props;

  // Create refs for state management
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<IImageTrailBase | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Initialize and clean up the image trail
  useEffect(() => {
    // Skip if no container or no items
    if (!containerRef.current || items.length === 0) return;

    // Clean up any existing instance
    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    // Create new instance with the appropriate variant
    instanceRef.current = createImageTrailVariant(variant, containerRef.current);

    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [variant, items]);

  return {
    containerRef,
    isMounted: isMountedRef.current,
    instance: instanceRef.current
  };
}
