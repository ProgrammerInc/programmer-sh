'use client';

import { motion } from 'motion/react';
import { memo } from 'react';
import { DEFAULT_STROKE_WIDTH } from './background-lines.constants';
import {
  useAnimationTransition,
  useColors,
  useContainerClassName,
  usePathClassName,
  usePathVariants,
  usePaths,
  useSvgClassName
} from './background-lines.hooks';
import { BackgroundLinesProps, SVGProps } from './background-lines.types';

/**
 * SVG component that renders the animated background lines
 *
 * @param props - Component properties
 * @returns JSX element
 */
const LinesBackground = ({ svgOptions }: SVGProps) => {
  // Use custom hooks for memoized values
  const svgClassName = useSvgClassName();
  const pathClassName = usePathClassName();
  const pathVariants = usePathVariants();
  const paths = usePaths();
  const colors = useColors();
  const transition = useAnimationTransition(svgOptions?.duration);

  return (
    <motion.svg
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={svgClassName}
      aria-hidden="true"
    >
      <span className="sr-only">Decorative animated background lines</span>

      {/* First set of animated paths */}
      {paths.map((path, idx) => (
        <motion.path
          d={path}
          stroke={colors[idx % colors.length]}
          strokeWidth={DEFAULT_STROKE_WIDTH}
          className={pathClassName}
          variants={pathVariants}
          initial="initial"
          animate="animate"
          transition={transition}
          key={`path-first-${idx}`}
        />
      ))}

      {/* Second set of animated paths */}
      {paths.map((path, idx) => (
        <motion.path
          d={path}
          stroke={colors[idx % colors.length]}
          strokeWidth={DEFAULT_STROKE_WIDTH}
          className={pathClassName}
          variants={pathVariants}
          initial="initial"
          animate="animate"
          transition={transition}
          key={`path-second-${idx}`}
        />
      ))}
    </motion.svg>
  );
};

/**
 * BackgroundLines component creates animated line patterns for background decoration
 *
 * Features:
 * - Renders animated SVG lines with random colors
 * - Customizable animation duration
 * - Optimized with React.memo for better performance
 * - Accessible with proper ARIA attributes
 *
 * @example
 * ```tsx
 * // Basic usage with content
 * <BackgroundLines>
 *   <div>Content overlaid on animated background</div>
 * </BackgroundLines>
 *
 * // With custom animation duration
 * <BackgroundLines svgOptions={{ duration: 15 }}>
 *   <div>Content with slower animation</div>
 * </BackgroundLines>
 * ```
 *
 * @param props - Component properties including children, className and animation options
 * @returns Memoized React component
 */
export const BackgroundLines = memo(({ children, className, svgOptions }: BackgroundLinesProps) => {
  const containerClassName = useContainerClassName(className);

  return (
    <div className={containerClassName}>
      <LinesBackground svgOptions={svgOptions} />
      {children}
    </div>
  );
});

// Add displayName to help with debugging
BackgroundLines.displayName = 'BackgroundLines';

// Export both as default and named export for different import patterns
export default BackgroundLines;
