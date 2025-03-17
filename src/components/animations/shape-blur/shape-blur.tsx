'use client';

import { FC, memo, useRef } from 'react';
import { CSS_CLASSES, DEFAULT_SHAPE_BLUR } from './shape-blur.constants';
import { useShapeBlur } from './shape-blur.hooks';
import styles from './shape-blur.module.css';
import { ShapeBlurProps } from './shape-blur.types';
import { cn } from './shape-blur.utils';

/**
 * ShapeBlur component - Creates an interactive blurred shape animation with WebGL
 *
 * This component renders a WebGL-based shape that responds to mouse movement
 * with an interactive blur effect. It supports multiple shape variations and
 * customizable animation parameters.
 *
 * @param {ShapeBlurProps} props - Component properties
 * @returns {JSX.Element} The ShapeBlur component
 */
export const ShapeBlur: FC<ShapeBlurProps> = memo(function ShapeBlur({
  className = '',
  variation = DEFAULT_SHAPE_BLUR.VARIATION,
  pixelRatioProp = DEFAULT_SHAPE_BLUR.PIXEL_RATIO,
  shapeSize = DEFAULT_SHAPE_BLUR.SHAPE_SIZE,
  roundness = DEFAULT_SHAPE_BLUR.ROUNDNESS,
  borderSize = DEFAULT_SHAPE_BLUR.BORDER_SIZE,
  circleSize = DEFAULT_SHAPE_BLUR.CIRCLE_SIZE,
  circleEdge = DEFAULT_SHAPE_BLUR.CIRCLE_EDGE
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useShapeBlur(
    mountRef.current,
    {
      variation,
      pixelRatioProp,
      shapeSize,
      roundness,
      borderSize,
      circleSize,
      circleEdge
    },
    { damping: DEFAULT_SHAPE_BLUR.DAMPING }
  );

  return (
    <div
      ref={mountRef}
      className={cn(styles[CSS_CLASSES.CONTAINER], className)}
      aria-hidden="true"
    />
  );
});

export default ShapeBlur;
