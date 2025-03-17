import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_SPEED,
  INITIAL_ANIMATION_REF,
  MAX_TAIL_LENGTH,
  POSITION_FACTOR,
  STAR_COLOR_PARAMS,
  STAR_SIZE_PARAMS
} from './hyperspace-hero.constants';
import { Star } from './hyperspace-hero.types';

/**
 * Hook for managing canvas dimensions based on parent container
 * @param canvasRef - Reference to the canvas element
 * @returns The current dimensions of the canvas and a resize handler
 */
export const useDimensions = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleResize = useCallback(() => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      const parent = canvasRef.current.parentElement;
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      setDimensions({ width, height });
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
  }, [canvasRef]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return { dimensions, handleResize };
};

/**
 * Hook for generating and managing stars for the hyperspace animation
 * @param starCount - Number of stars to generate
 * @param canvasRef - Reference to the canvas element
 * @param dimensions - Current canvas dimensions
 * @returns Reference to the stars array and initialization function
 */
export const useStars = (
  starCount: number,
  canvasRef: RefObject<HTMLCanvasElement>,
  dimensions: { width: number; height: number }
) => {
  const starsRef = useRef<Star[]>([]);

  const initStars = useCallback(() => {
    if (!canvasRef.current) return;

    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const star: Star = {
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 1000,
        px: 0,
        py: 0,
        size: Math.random() * STAR_SIZE_PARAMS.sizeVariation + STAR_SIZE_PARAMS.minSize,
        color: `rgba(${
          STAR_COLOR_PARAMS.redBase + Math.floor(Math.random() * STAR_COLOR_PARAMS.redVariation)
        }, ${
          STAR_COLOR_PARAMS.greenBase + Math.floor(Math.random() * STAR_COLOR_PARAMS.greenVariation)
        }, ${
          STAR_COLOR_PARAMS.blueBase + Math.floor(Math.random() * STAR_COLOR_PARAMS.blueVariation)
        }, ${STAR_COLOR_PARAMS.opacityMin + Math.random() * STAR_COLOR_PARAMS.opacityVariation})`
      };
      stars.push(star);
    }

    starsRef.current = stars;
  }, [canvasRef, starCount]);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initStars();
    }
  }, [dimensions, initStars]);

  return { starsRef, initStars };
};

/**
 * Hook for handling the hyperspace animation
 * @param canvasRef - Reference to the canvas element
 * @param starsRef - Reference to the stars array
 * @param speed - Animation speed factor
 * @returns Animation frame reference
 */
export const useHyperspaceAnimation = (
  canvasRef: RefObject<HTMLCanvasElement>,
  starsRef: React.MutableRefObject<Star[]>,
  speed: number = DEFAULT_SPEED
) => {
  const animationRef = useRef<number>(INITIAL_ANIMATION_REF);

  const drawStars = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    starsRef.current.forEach(star => {
      star.z -= speed;

      if (star.z <= 0) {
        star.z = 1000;
        star.x = Math.random() * width - centerX;
        star.y = Math.random() * height - centerY;
      }

      const factor = POSITION_FACTOR / star.z;
      star.px = star.x * factor + centerX;
      star.py = star.y * factor + centerY;

      const size = Math.min(star.size * (400 / star.z), STAR_SIZE_PARAMS.maxDisplaySize);

      const tailLength = Math.min(MAX_TAIL_LENGTH * (speed / 2), MAX_TAIL_LENGTH);
      const prevFactor = POSITION_FACTOR / (star.z + speed * 2);
      const prevX = star.x * prevFactor + centerX;
      const prevY = star.y * prevFactor + centerY;

      const gradient = ctx.createLinearGradient(prevX, prevY, star.px, star.py);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, star.color);

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(star.px, star.py);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = size;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(star.px, star.py, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.fill();
    });
  }, [canvasRef, speed, starsRef]);

  const animate = useCallback(() => {
    drawStars();
    animationRef.current = requestAnimationFrame(animate);
  }, [drawStars]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { animate, animationRef };
};
