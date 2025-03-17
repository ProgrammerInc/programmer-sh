'use client';

import { gsap } from 'gsap';
import { MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react';
import {
  BASE_DURATION,
  COLUMNS_PER_ROW,
  GRADIENT_COLOR_CSS_VAR,
  INERTIA_FACTORS,
  MAX_MOVE_AMOUNT,
  ROWS_COUNT,
  TOTAL_ITEMS
} from './grid-motion.constants';

/**
 * Hook to create default items for the grid
 *
 * @returns Array of default item strings
 */
export const useDefaultItems = () => {
  return useMemo(() => {
    return Array.from({ length: TOTAL_ITEMS }, (_, index) => `Item ${index + 1}`);
  }, []);
};

/**
 * Hook to manage the mouse position for interactive effects
 *
 * @returns Current X position of the mouse
 */
export const useGridMousePosition = () => {
  const [mouseX, setMouseX] = useState<number>(window.innerWidth / 2);

  const handleMouseMove = useCallback((e: MouseEvent): void => {
    setMouseX(e.clientX);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return mouseX;
};

/**
 * Hook to combine provided items with default items
 *
 * @param items Array of items provided as props
 * @param defaultItems Array of default items
 * @returns Combined array of items to display
 */
export const useCombinedItems = (items: (string | React.ReactNode)[], defaultItems: string[]) => {
  return useMemo(() => {
    return items.length > 0 ? items.slice(0, TOTAL_ITEMS) : defaultItems;
  }, [items, defaultItems]);
};

/**
 * Hook to handle grid motion animation based on mouse position
 *
 * @param rowRefs References to row elements
 * @param mouseX Current X position of the mouse
 */
export const useGridMotionAnimation = (
  rowRefs: MutableRefObject<(HTMLDivElement | null)[]>,
  mouseX: number
) => {
  const updateMotion = useCallback((): void => {
    rowRefs.current.forEach((row, index) => {
      if (row) {
        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount =
          ((mouseX / window.innerWidth) * MAX_MOVE_AMOUNT - MAX_MOVE_AMOUNT / 2) * direction;

        gsap.to(row, {
          x: moveAmount,
          duration: BASE_DURATION + INERTIA_FACTORS[index % INERTIA_FACTORS.length],
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });
  }, [rowRefs, mouseX]);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    // Set up the animation ticker
    const removeAnimationLoop = gsap.ticker.add(updateMotion);

    // Cleanup function to remove animation loop
    return () => {
      removeAnimationLoop();
    };
  }, [updateMotion]);
};

/**
 * Hook to set gradient color CSS variable
 *
 * @param gridRef Reference to the grid container
 * @param gradientColor Color to set for the gradient
 */
export const useGradientColor = (
  gridRef: MutableRefObject<HTMLDivElement | null>,
  gradientColor: string
) => {
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.setProperty(GRADIENT_COLOR_CSS_VAR, gradientColor);
    }
  }, [gridRef, gradientColor]);
};

/**
 * Hook to create rendered row elements
 *
 * @param combinedItems Combined array of items to display
 * @param rowRefs References to row elements
 * @returns Array of row elements
 */
export const useRenderedRows = (
  combinedItems: (string | React.ReactNode)[],
  rowRefs: MutableRefObject<(HTMLDivElement | null)[]>
) => {
  return useMemo(() => {
    return Array.from({ length: ROWS_COUNT }, (_, rowIndex) => ({
      key: rowIndex,
      ref: (el: HTMLDivElement | null) => (rowRefs.current[rowIndex] = el),
      items: combinedItems
        .slice(rowIndex * COLUMNS_PER_ROW, (rowIndex + 1) * COLUMNS_PER_ROW)
        .map((item, index) => ({
          key: index,
          content: item
        }))
    }));
  }, [combinedItems, rowRefs]);
};
