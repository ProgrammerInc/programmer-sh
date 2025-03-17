/**
 * Custom hooks for the Squares animation component
 */

import { MutableRefObject, RefObject, useCallback, useEffect, useRef } from 'react';
import { GRADIENT_SETTINGS } from './squares.constants';
import { CanvasStrokeStyle, GridOffset } from './squares.types';
import {
  areGridOffsetsEqual,
  calculateGridStart,
  calculateHoveredSquare,
  calculateNextOffset,
  createOverlayGradient
} from './squares.utils';

/**
 * Hook to handle canvas resizing
 *
 * @param canvasRef - Reference to the canvas element
 * @param squareSize - Size of each square in pixels
 * @returns Object containing number of squares in X and Y directions
 */
export const useCanvasResize = (canvasRef: RefObject<HTMLCanvasElement>, squareSize: number) => {
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
    numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
  }, [canvasRef, squareSize]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return {
    numSquaresX,
    numSquaresY,
    handleResize
  };
};

/**
 * Hook to handle drawing the grid of squares
 *
 * @param canvasRef - Reference to the canvas element
 * @param gridOffset - Current grid offset
 * @param hoveredSquare - Currently hovered square
 * @param squareSize - Size of each square in pixels
 * @param borderColor - Color of square borders
 * @param hoverFillColor - Fill color for hovered square
 * @returns Function to draw the grid
 */
export const useDrawGrid = (
  canvasRef: RefObject<HTMLCanvasElement>,
  gridOffset: MutableRefObject<GridOffset>,
  hoveredSquare: MutableRefObject<GridOffset | null>,
  squareSize: number,
  borderColor: CanvasStrokeStyle,
  hoverFillColor: CanvasStrokeStyle
) => {
  return useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startPos = calculateGridStart(gridOffset.current, squareSize);

    // Draw squares grid
    for (let x = startPos.x; x < canvas.width + squareSize; x += squareSize) {
      for (let y = startPos.y; y < canvas.height + squareSize; y += squareSize) {
        const squareX = x - (gridOffset.current.x % squareSize);
        const squareY = y - (gridOffset.current.y % squareSize);

        if (
          hoveredSquare.current &&
          Math.floor((x - startPos.x) / squareSize) === hoveredSquare.current.x &&
          Math.floor((y - startPos.y) / squareSize) === hoveredSquare.current.y
        ) {
          ctx.fillStyle = hoverFillColor;
          ctx.fillRect(squareX, squareY, squareSize, squareSize);
        }

        ctx.strokeStyle = borderColor;
        ctx.strokeRect(squareX, squareY, squareSize, squareSize);
      }
    }

    // Apply radial gradient overlay
    const gradient = createOverlayGradient(
      ctx,
      canvas.width,
      canvas.height,
      GRADIENT_SETTINGS.INNER_COLOR,
      GRADIENT_SETTINGS.OUTER_COLOR
    );

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef, gridOffset, hoveredSquare, squareSize, borderColor, hoverFillColor]);
};

/**
 * Hook to handle the animation loop
 *
 * @param drawGrid - Function to draw the grid
 * @param gridOffset - Current grid offset
 * @param direction - Direction of animation
 * @param speed - Animation speed
 * @param squareSize - Size of each square in pixels
 * @returns Animation frame request reference
 */
export const useAnimationLoop = (
  drawGrid: () => void,
  gridOffset: MutableRefObject<GridOffset>,
  direction: 'diagonal' | 'up' | 'right' | 'down' | 'left',
  speed: number,
  squareSize: number
) => {
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const updateAnimation = () => {
      gridOffset.current = calculateNextOffset(gridOffset.current, direction, speed, squareSize);

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [drawGrid, direction, gridOffset, speed, squareSize]);

  return requestRef;
};

/**
 * Hook to handle mouse interactions with the grid
 *
 * @param canvasRef - Reference to the canvas element
 * @param gridOffset - Current grid offset
 * @param hoveredSquare - Currently hovered square
 * @param squareSize - Size of each square in pixels
 */
export const useMouseInteraction = (
  canvasRef: RefObject<HTMLCanvasElement>,
  gridOffset: MutableRefObject<GridOffset>,
  hoveredSquare: MutableRefObject<GridOffset | null>,
  squareSize: number
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startPos = calculateGridStart(gridOffset.current, squareSize);
      const newHoveredSquare = calculateHoveredSquare(
        mouseX,
        mouseY,
        gridOffset.current,
        startPos,
        squareSize
      );

      if (!areGridOffsetsEqual(hoveredSquare.current, newHoveredSquare)) {
        hoveredSquare.current = newHoveredSquare;
      }
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canvasRef, gridOffset, hoveredSquare, squareSize]);
};
