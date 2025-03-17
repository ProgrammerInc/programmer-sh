'use client';

import { memo, useRef } from 'react';
import { DEFAULT_GRADIENT_COLOR, NOISE_TEXTURE_PATH } from './grid-motion.constants';
import {
  useCombinedItems,
  useDefaultItems,
  useGradientColor,
  useGridMotionAnimation,
  useGridMousePosition,
  useRenderedRows
} from './grid-motion.hooks';
import styles from './grid-motion.module.css';
import { GridMotionProps } from './grid-motion.types';

/**
 * GridMotion component creates a responsive grid with mouse-interactive motion effect.
 * Items in the grid move in alternating directions based on mouse position.
 *
 * @param props - Component properties
 * @returns Memoized React component with interactive grid motion effect
 */
const GridMotionComponent = ({
  items = [],
  gradientColor = DEFAULT_GRADIENT_COLOR
}: GridMotionProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get mouse position for interactive effects
  const mouseX = useGridMousePosition();

  // Create and combine items
  const defaultItems = useDefaultItems();
  const combinedItems = useCombinedItems(items, defaultItems);

  // Apply grid motion animation based on mouse position
  useGridMotionAnimation(rowRefs, mouseX);

  // Set gradient color CSS variable
  useGradientColor(gridRef, gradientColor);

  // Get rendered rows with their content
  const renderedRows = useRenderedRows(combinedItems, rowRefs);

  return (
    <div ref={gridRef} className={styles['container']}>
      <section className={styles['section']}>
        {/* Noise overlay - using proper asset path */}
        <div
          className={styles['noise-overlay']}
          style={{ backgroundImage: `url(${NOISE_TEXTURE_PATH})` }}
        ></div>
        <div className={styles['grid']}>
          {renderedRows.map(row => (
            <div key={row.key} className={styles['row']} ref={row.ref}>
              {row.items.map(item => (
                <div key={item.key} className={styles['item']}>
                  {typeof item.content === 'string' && item.content.startsWith('http') ? (
                    <div
                      className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                      style={{ backgroundImage: `url(${item.content})` }}
                    ></div>
                  ) : (
                    <div className="p-4 text-center z-[1]">{item.content}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Create a memoized version of the component
export const GridMotion = memo(GridMotionComponent);

export default GridMotion;
