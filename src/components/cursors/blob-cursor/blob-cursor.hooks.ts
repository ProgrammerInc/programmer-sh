/**
 * BlobCursor Component Hooks
 *
 * Custom hooks used by the BlobCursor component.
 */

import { useTrail } from '@react-spring/web';
import { useCallback, useEffect, useRef } from 'react';
import { ANIMATION_CONFIG } from './blob-cursor.constants';
import { Position } from './blob-cursor.types';

/**
 * Creates the transformation string for translating blob elements.
 *
 * @param x X-coordinate
 * @param y Y-coordinate
 * @returns CSS transform string
 */
export const createTransform = (x: number, y: number) =>
  `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

/**
 * Hook for creating and managing blob cursor animations.
 *
 * @param count Number of blobs to create
 * @returns Animation trail and API
 */
export const useBlobTrail = (count: number = 3) => {
  return useTrail(count, i => ({
    xy: [0, 0],
    config: i === 0 ? ANIMATION_CONFIG.FAST : ANIMATION_CONFIG.SLOW
  }));
};

/**
 * Hook for tracking cursor position relative to container.
 *
 * @returns Position tracking functions and container ref
 */
export const useCursorPositionTracking = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getContainerPosition = useCallback((): Position => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      return { left: rect.left, top: rect.top };
    }
    return { left: 0, top: 0 };
  }, []);

  const handleCursorMove = useCallback(
    (e: MouseEvent | TouchEvent, updateFn: (xy: [number, number]) => void) => {
      const { left, top } = getContainerPosition();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      updateFn([x - left, y - top]);
    },
    [getContainerPosition]
  );

  useEffect(() => {
    const handleResize = () => {
      getContainerPosition();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getContainerPosition]);

  return { containerRef, handleCursorMove };
};
