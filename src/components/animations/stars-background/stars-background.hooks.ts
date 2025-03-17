/**
 * Custom hooks for the Stars Background animation component
 */

import { RefObject, useCallback, useEffect, useState } from 'react';
import { DEFAULT_SETTINGS } from './stars-background.constants';
import { CanvasDimensions, RenderFunction, StarProps } from './stars-background.types';
import { drawStar, generateStars, updateStarTwinkling } from './stars-background.utils';

/**
 * Hook for handling canvas setup and responsive resizing
 *
 * @param canvasRef - Reference to the canvas element
 * @returns Canvas dimensions and setup status
 */
export const useCanvasSetup = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [dimensions, setDimensions] = useState<CanvasDimensions | null>(null);
  const [isSetup, setIsSetup] = useState(false);

  const updateCanvasDimensions = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const { width, height } = canvas.getBoundingClientRect();

    // Set the canvas dimensions to match its display size
    canvas.width = width;
    canvas.height = height;

    setDimensions({ width, height });
    setIsSetup(true);
  }, [canvasRef]);

  useEffect(() => {
    updateCanvasDimensions();

    // Use ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(updateCanvasDimensions);
    const currentCanvas = canvasRef.current;

    if (currentCanvas) {
      resizeObserver.observe(currentCanvas);
    }

    return () => {
      if (currentCanvas) {
        resizeObserver.unobserve(currentCanvas);
      }
    };
  }, [canvasRef, updateCanvasDimensions]);

  return { dimensions, isSetup, updateCanvasDimensions };
};

/**
 * Hook to generate and manage stars
 *
 * @param dimensions - Canvas dimensions
 * @param starDensity - Density of stars
 * @param allStarsTwinkle - Whether all stars should twinkle
 * @param twinkleProbability - Probability of twinkling if not all stars twinkle
 * @param minTwinkleSpeed - Minimum twinkling speed
 * @param maxTwinkleSpeed - Maximum twinkling speed
 * @returns Array of star objects
 */
export const useStars = (
  dimensions: CanvasDimensions | null,
  starDensity: number = DEFAULT_SETTINGS.STAR_DENSITY,
  allStarsTwinkle: boolean = DEFAULT_SETTINGS.ALL_STARS_TWINKLE,
  twinkleProbability: number = DEFAULT_SETTINGS.TWINKLE_PROBABILITY,
  minTwinkleSpeed: number = DEFAULT_SETTINGS.MIN_TWINKLE_SPEED,
  maxTwinkleSpeed: number = DEFAULT_SETTINGS.MAX_TWINKLE_SPEED
) => {
  const [stars, setStars] = useState<StarProps[]>([]);

  const generateStarsCallback = useCallback(() => {
    if (!dimensions) return [];

    return generateStars(
      dimensions,
      starDensity,
      allStarsTwinkle,
      twinkleProbability,
      minTwinkleSpeed,
      maxTwinkleSpeed
    );
  }, [
    dimensions,
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed
  ]);

  useEffect(() => {
    if (dimensions) {
      setStars(generateStarsCallback());
    }
  }, [dimensions, generateStarsCallback]);

  return { stars, setStars };
};

/**
 * Hook for the animation loop to render and update stars
 *
 * @param canvasRef - Reference to the canvas element
 * @param stars - Array of star objects
 * @param setStars - Function to update stars
 * @returns Nothing
 */
export const useAnimationLoop = (
  canvasRef: RefObject<HTMLCanvasElement>,
  stars: StarProps[],
  setStars: React.Dispatch<React.SetStateAction<StarProps[]>>
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || stars.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render: RenderFunction = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update each star's twinkling effect and draw it
      const currentTime = Date.now();

      stars.forEach(star => {
        // Draw the star
        drawStar(ctx, star);

        // Update star's opacity if it's twinkling
        if (star.twinkleSpeed !== null) {
          star.opacity = updateStarTwinkling(star, currentTime).opacity;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup animation frame on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef, stars, setStars]);
};
