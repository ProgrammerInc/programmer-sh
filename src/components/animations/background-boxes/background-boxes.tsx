'use client';

import { motion } from 'motion/react';
import { memo, useCallback } from 'react';
import { DEFAULT_ANIMATION } from './background-boxes.constants';
import {
  useBoxClassName,
  useBoxesContainerClassName,
  useColors,
  useColumns,
  useContainerStyle,
  useIconClassName,
  useRowClassName,
  useRows
} from './background-boxes.hooks';
import { BackgroundBoxesProps } from './background-boxes.types';
import { getRandomColor, shouldShowIcon } from './background-boxes.utils';

/**
 * BoxesCore component - internal implementation of BackgroundBoxes
 *
 * Renders a grid of interactive boxes with hover effects and 3D-like transformation
 *
 * @param props Component properties
 * @returns JSX element
 */
const BoxesCore = ({
  className,
  rowCount = 150,
  colCount = 100,
  ...rest
}: BackgroundBoxesProps) => {
  // Use custom hooks for memoized values
  const rows = useRows(rowCount);
  const cols = useColumns(colCount);
  const colors = useColors();
  const containerStyle = useContainerStyle();
  const containerClassName = useBoxesContainerClassName(className);
  const rowClassName = useRowClassName();
  const boxClassName = useBoxClassName();
  const iconClassName = useIconClassName();

  // Use useCallback for the function to prevent recreation on each render
  const randomColor = useCallback(() => {
    return getRandomColor(colors);
  }, [colors]);

  return (
    <div style={containerStyle} className={containerClassName} {...rest}>
      <span className="sr-only">Decorative background grid animation</span>
      {rows.map((_, i) => (
        <motion.div key={`row-${i}`} className={rowClassName}>
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `var(${randomColor()})`,
                transition: { duration: DEFAULT_ANIMATION.hoverDuration }
              }}
              animate={{
                transition: { duration: DEFAULT_ANIMATION.animateDuration }
              }}
              key={`col-${j}`}
              className={boxClassName}
            >
              {shouldShowIcon(i, j) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={iconClassName}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

/**
 * BackgroundBoxes component creates a grid of interactive boxes as a decorative background
 *
 * Features:
 * - Renders a grid of boxes with a 3D-like transformation
 * - Boxes have hover effects with random colors
 * - Optimized with React.memo and useMemo for better performance
 * - Supports both light and dark themes
 *
 * @example
 * ```tsx
 * // Basic usage
 * <BackgroundBoxes />
 *
 * // Custom configuration
 * <BackgroundBoxes
 *   rowCount={100}
 *   colCount={80}
 *   className="my-custom-class"
 * />
 * ```
 *
 * @param props Component properties including className and HTML div attributes
 * @returns Memoized React component
 */
export const BackgroundBoxes = memo(BoxesCore);

// Add displayName to help with debugging
BackgroundBoxes.displayName = 'BackgroundBoxes';

// Export both as default and named export for different import patterns
export default BackgroundBoxes;
