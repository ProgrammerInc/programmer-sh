'use client';

import { FC, memo, useRef } from 'react';

import { DEFAULT_SETTINGS } from './squares.constants';
import {
  useAnimationLoop,
  useCanvasResize,
  useDrawGrid,
  useMouseInteraction
} from './squares.hooks';
import styles from './squares.module.css';
import { GridOffset, SquaresProps } from './squares.types';

/**
 * Squares Animation Component
 *
 * Renders an animated grid of squares that move in a specified direction.
 * Supports hover effects and customizable appearance.
 *
 * @example
 * <Squares
 *   direction="diagonal"
 *   speed={0.5}
 *   squareSize={35}
 *   borderColor="#ff0000"
 * />
 *
 * @param {SquaresProps} props - The component props
 * @returns The Squares component
 */
export const SquaresComponent: FC<SquaresProps> = ({
  direction = DEFAULT_SETTINGS.DIRECTION as 'diagonal' | 'up' | 'right' | 'down' | 'left',
  speed = DEFAULT_SETTINGS.SPEED,
  borderColor = DEFAULT_SETTINGS.BORDER_COLOR,
  squareSize = DEFAULT_SETTINGS.SQUARE_SIZE,
  hoverFillColor = DEFAULT_SETTINGS.HOVER_FILL_COLOR,
  className
}) => {
  // Refs for the canvas and animation state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);

  // Setup canvas resizing
  const { handleResize } = useCanvasResize(canvasRef, squareSize);

  // Create grid drawing function
  const drawGrid = useDrawGrid(
    canvasRef,
    gridOffset,
    hoveredSquareRef,
    squareSize,
    borderColor,
    hoverFillColor
  );

  // Setup animation loop
  useAnimationLoop(drawGrid, gridOffset, direction, speed, squareSize);

  // Setup mouse interactions
  useMouseInteraction(canvasRef, gridOffset, hoveredSquareRef, squareSize);

  return (
    <div className={styles['squares-container']}>
      <canvas
        ref={canvasRef}
        className={`${styles['squares-canvas']} ${className || ''}`}
        aria-hidden="true"
      />
    </div>
  );
};

/**
 * Memoized Squares component for optimal performance
 */
export const Squares = memo(SquaresComponent);

/**
 * Set display name for debugging purposes
 */
Squares.displayName = 'Squares';

export default Squares;
