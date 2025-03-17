'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Interface for the spotlight position
 */
interface Position {
  x: number;
  y: number;
}

/**
 * Interface for the spotlight animation frame reference
 */
interface AnimationFrameRef {
  current: number | null;
}

/**
 * Interface for the configuration options of the spotlight effect
 */
export interface SpotlightConfig {
  /** Size of the spotlight in pixels */
  spotlightSize?: number;
  /** Intensity of the spotlight (0-1) */
  spotlightIntensity?: number;
  /** Speed of the fade effect (0-1) */
  fadeSpeed?: number;
  /** RGB color values for the glow (format: 'r, g, b') */
  glowColor?: string;
  /** Speed of the pulse animation in milliseconds */
  pulseSpeed?: number;
}

/**
 * Custom hook to create a spotlight effect on a canvas element
 * @param config - Configuration options for the spotlight effect
 * @returns A ref object to attach to a canvas element
 */
export const useSpotlightEffect = (config: SpotlightConfig = {}) => {
  const {
    spotlightSize = 200,
    spotlightIntensity = 0.8,
    fadeSpeed = 0.1,
    glowColor = '255, 255, 255',
    pulseSpeed = 2000
  } = config;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const spotlightPos = useRef<Position>({ x: 0, y: 0 });
  const targetPos = useRef<Position>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    try {
      console.debug('Initializing spotlight effect');

      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2D context from canvas');
        return;
      }

      ctxRef.current = ctx;

      const resizeCanvas = (): void => {
        try {
          if (!canvas) return;

          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          console.debug('Canvas resized', { width: canvas.width, height: canvas.height });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error('Error resizing canvas', { error: errorMessage });
        }
      };

      const lerp = (start: number, end: number, factor: number): number => {
        return start + (end - start) * factor;
      };

      const handleMouseMove = (e: MouseEvent): void => {
        try {
          targetPos.current = { x: e.clientX, y: e.clientY };
          setIsHovered(true);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error('Error handling mouse move', { error: errorMessage });
        }
      };

      const handleMouseLeave = (): void => {
        try {
          setIsHovered(false);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error('Error handling mouse leave', { error: errorMessage });
        }
      };

      const render = (): void => {
        try {
          if (!canvas || !ctx) return;

          // Smooth position transition
          spotlightPos.current.x = lerp(spotlightPos.current.x, targetPos.current.x, fadeSpeed);
          spotlightPos.current.y = lerp(spotlightPos.current.y, targetPos.current.y, fadeSpeed);

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Create dark overlay
          ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Calculate pulse effect
          const pulseScale = 1 + 0.1 * Math.sin((Date.now() / pulseSpeed) * Math.PI * 2);
          const currentSpotlightSize = spotlightSize * pulseScale;

          // Create spotlight gradient
          const gradient = ctx.createRadialGradient(
            spotlightPos.current.x,
            spotlightPos.current.y,
            0,
            spotlightPos.current.x,
            spotlightPos.current.y,
            currentSpotlightSize
          );

          // Add multiple color stops for smoother transition
          gradient.addColorStop(0, `rgba(${glowColor}, ${spotlightIntensity})`);
          gradient.addColorStop(0.5, `rgba(${glowColor}, ${spotlightIntensity * 0.5})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          // Apply spotlight effect
          ctx.globalCompositeOperation = 'destination-out';
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(
            spotlightPos.current.x,
            spotlightPos.current.y,
            currentSpotlightSize,
            0,
            Math.PI * 2
          );
          ctx.fill();

          // Add glow effect
          ctx.globalCompositeOperation = 'source-over';
          const glowGradient = ctx.createRadialGradient(
            spotlightPos.current.x,
            spotlightPos.current.y,
            0,
            spotlightPos.current.x,
            spotlightPos.current.y,
            currentSpotlightSize * 1.2
          );
          glowGradient.addColorStop(0, `rgba(${glowColor}, 0.2)`);
          glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(
            spotlightPos.current.x,
            spotlightPos.current.y,
            currentSpotlightSize * 1.2,
            0,
            Math.PI * 2
          );
          ctx.fill();

          animationFrame.current = requestAnimationFrame(render);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error('Error during render loop', { error: errorMessage });
          // Try to keep the animation going despite errors
          animationFrame.current = requestAnimationFrame(render);
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      render();
      console.debug('Spotlight effect initialized');

      return () => {
        try {
          window.removeEventListener('resize', resizeCanvas);
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseleave', handleMouseLeave);
          if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current);
          }
          console.debug('Spotlight effect cleanup complete');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error('Error during spotlight effect cleanup', { error: errorMessage });
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error setting up spotlight effect', { error: errorMessage });
      return () => {}; // Empty cleanup function
    }
  }, [spotlightSize, spotlightIntensity, fadeSpeed, glowColor, pulseSpeed]);

  return canvasRef;
};

export default useSpotlightEffect;
