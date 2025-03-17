/**
 * Hooks for the Noise animation component
 */

import { useCallback, useEffect, useRef } from 'react';
import { drawNoisePattern, generateNoisePattern, resizeCanvas } from './noise.utils';

/**
 * Hook to setup and manage the noise animation
 *
 * @param patternSize - Size of the noise pattern in pixels
 * @param patternScaleX - Horizontal scale factor
 * @param patternScaleY - Vertical scale factor
 * @param patternRefreshInterval - Number of frames before refreshing the pattern
 * @param patternAlpha - Alpha transparency value
 * @returns Object containing the canvas ref for the noise animation
 */
export const useNoiseAnimation = (
  patternSize: number,
  patternScaleX: number,
  patternScaleY: number,
  patternRefreshInterval: number,
  patternAlpha: number
) => {
  // Refs for canvas elements and animation tracking
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const patternCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Memoized resize handler to prevent recreating on each render
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas(canvas, patternScaleX, patternScaleY);
  }, [patternScaleX, patternScaleY]);

  // Memoized update pattern function
  const updatePattern = useCallback(() => {
    if (!patternCanvasRef.current) return;

    const patternCtx = patternCanvasRef.current.getContext('2d');
    if (!patternCtx) return;

    const patternData = generateNoisePattern(patternSize, patternAlpha, patternCtx);
    patternCtx.putImageData(patternData, 0, 0);
  }, [patternSize, patternAlpha]);

  // Memoized draw function to render the noise pattern
  const drawGrain = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !patternCanvasRef.current) return;

    drawNoisePattern(canvas, patternCanvasRef.current);
  }, []);

  // Animation loop with useCallback to maintain reference stability
  const animationLoop = useCallback(() => {
    if (frameRef.current % patternRefreshInterval === 0) {
      updatePattern();
      drawGrain();
    }

    frameRef.current++;
    animationFrameRef.current = window.requestAnimationFrame(animationLoop);
  }, [patternRefreshInterval, updatePattern, drawGrain]);

  // Setup and teardown effect
  useEffect(() => {
    // Initialize pattern canvas
    patternCanvasRef.current = document.createElement('canvas');
    patternCanvasRef.current.width = patternSize;
    patternCanvasRef.current.height = patternSize;

    // Set up event listeners and start animation
    window.addEventListener('resize', handleResize);
    handleResize();
    animationLoop();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [patternSize, handleResize, animationLoop]);

  return { canvasRef };
};
