/**
 * Click Spark Component
 *
 * Exports an interactive cursor component that displays animated spark
 * particles that follow the mouse cursor.
 *
 * @module ClickSpark
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { useClickSparkHooks } from './click-spark.hooks';
import { ClickSparkProps } from './click-spark.types';

/**
 * ClickSpark component that creates spark animations when clicking on its children.
 * This component renders a canvas that shows spark animations when clicked,
 * with customizable colors, particle count, and animation speed.
 *
 * @param props - Component props including children and spark configuration
 * @returns React component with click spark effect
 */
export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get hooks and functions from the custom hook
  const { stateRef, drawSparks, createSparks, handleResize } = useClickSparkHooks({
    sparkColor,
    sparkSize,
    sparkRadius,
    sparkCount,
    duration,
    easing,
    extraScale
  });

  // Handle canvas resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      handleResize(canvas, parent);
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100); // Debounce by 100ms
    };

    // Observe size changes
    const ro = new ResizeObserver(debouncedResize);
    ro.observe(parent);

    // Initial sizing
    resizeCanvas();

    // Cleanup
    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, [handleResize]);

  // Setup animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      drawSparks(ctx, canvas.width, canvas.height, timestamp);
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [drawSparks]);

  // Handle click events
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createSparks(x, y);
  };

  return (
    <div className="relative w-full h-full" onClick={handleClick}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {children}
    </div>
  );
};

export default ClickSpark;
