'use client';

import { a, useTransition } from '@react-spring/web';
import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './masonry.module.css';
import { GridItem, MasonryProps } from './masonry.types';
import { MASONRY_DEFAULTS, calculateGridPositions, getColumnCountForScreenSize } from './masonry.utils';

/**
 * Masonry Component
 *
 * A responsive masonry layout component that organizes items in a grid with different heights.
 * Automatically adjusts the number of columns based on screen size.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Masonry data={items} />
 * 
 * // Where items is an array of MasonryItem objects
 * const items = [
 *   { id: 1, height: 400, image: '/images/example1.jpg' },
 *   { id: 2, height: 300, image: '/images/example2.jpg' }
 * ];
 * ```
 */
export const MasonryComponent: React.FC<MasonryProps> = ({ data }) => {
  const [columns, setColumns] = useState<number>(MASONRY_DEFAULTS.SMALL_SCREEN_COLUMNS);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Update columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      setColumns(getColumnCountForScreenSize());
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Update container width on resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate grid positions
  const { gridItems, heights } = useMemo(() => {
    if (containerWidth === 0) return { gridItems: [], heights: [0] };
    return calculateGridPositions(data, columns, containerWidth);
  }, [columns, data, containerWidth]);

  // Set up transitions for grid items
  const transitions = useTransition<
    GridItem,
    { x: number; y: number; width: number; height: number; opacity: number }
  >(gridItems, {
    keys: item => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25
  });

  return (
    <div 
      ref={containerRef} 
      className={styles['masonry-container']} 
      style={{ height: Math.max(...heights) }}
    >
      {transitions((style, item) => (
        <a.div
          key={item.id}
          style={style}
          className={styles['masonry-item']}
        >
          <div
            className={styles['masonry-image']}
            style={{
              backgroundImage: `url(${item.image})`
            }}
          />
        </a.div>
      ))}
    </div>
  );
};

MasonryComponent.displayName = 'Masonry';

/**
 * Memoized Masonry Component
 */
export const Masonry = React.memo(MasonryComponent);

export default Masonry;
