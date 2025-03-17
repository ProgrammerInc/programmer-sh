/**
 * Click Spark Hooks
 *
 * Hook implementation for the ClickSpark component
 *
 * @module ClickSpark/Hooks
 */

import { useCallback, useRef } from 'react';
import { ClickSparkProps, ClickSparkState, Spark } from './click-spark.types';

/**
 * Hook to manage the ClickSpark state and behavior
 *
 * @param props - Props for the ClickSpark component
 * @returns Object containing state and behavior functions
 */
export const useClickSparkHooks = (props: ClickSparkProps) => {
  const {
    sparkRadius = 15,
    duration = 400,
    easing = 'ease-out',
    sparkSize = 10,
    sparkCount = 8,
    extraScale = 1.0,
    sparkColor = '#fff'
  } = props;

  // Use a single ref to hold all mutable state to prevent re-renders
  const stateRef = useRef<ClickSparkState>({
    sparks: [],
    startTime: null
  });

  /**
   * Easing function based on the provided easing type
   */
  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default: // 'ease-out'
          return t * (2 - t);
      }
    },
    [easing]
  );

  /**
   * Draw function for rendering the sparks animation
   *
   * @param ctx - Canvas rendering context
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param timestamp - Current animation timestamp
   */
  const drawSparks = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      timestamp: number
    ) => {
      if (!stateRef.current.startTime) {
        stateRef.current.startTime = timestamp; // store initial time
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      stateRef.current.sparks = stateRef.current.sparks.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          // Spark finished its animation
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        // Points for the spark line
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        // Draw the spark line
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });
    },
    [sparkRadius, duration, easeFunc, sparkSize, extraScale, sparkColor]
  );

  /**
   * Create new sparks at the specified coordinates
   *
   * @param x - X coordinate for the spark origin
   * @param y - Y coordinate for the spark origin
   */
  const createSparks = useCallback(
    (x: number, y: number) => {
      const now = performance.now();
      const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now
      }));

      stateRef.current.sparks.push(...newSparks);
    },
    [sparkCount]
  );

  /**
   * Handle resizing of the canvas
   *
   * @param canvas - Canvas element
   * @param parent - Parent element of the canvas
   */
  const handleResize = useCallback((canvas: HTMLCanvasElement, parent: HTMLElement) => {
    const { width, height } = parent.getBoundingClientRect();
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }, []);

  return {
    stateRef,
    easeFunc,
    drawSparks,
    createSparks,
    handleResize
  };
};
