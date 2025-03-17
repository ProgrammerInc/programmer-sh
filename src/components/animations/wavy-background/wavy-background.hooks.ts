/**
 * Custom hooks for the WavyBackground animation component
 */
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';
import { ANIMATION_SPEEDS, DEFAULT_VALUES } from './wavy-background.constants';

/**
 * Hook to handle Safari browser detection
 * @returns Whether the current browser is Safari
 */
export const useSafariDetection = (): boolean => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(
      typeof window !== 'undefined' &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome')
    );
  }, []);

  return isSafari;
};

/**
 * Hook to handle the wavy background animation rendering
 * @param canvasRef Reference to the canvas element
 * @param colors Array of colors for the waves
 * @param waveWidth Width of the wave lines
 * @param backgroundFill Background color
 * @param blur Blur amount
 * @param speed Animation speed (slow or fast)
 * @param waveOpacity Opacity of the waves
 */
export const useWavyBackgroundAnimation = (
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  colors: string[],
  waveWidth?: number,
  backgroundFill?: string,
  blur: number = DEFAULT_VALUES.BLUR,
  speed: 'slow' | 'fast' = DEFAULT_VALUES.SPEED,
  waveOpacity: number = DEFAULT_VALUES.WAVE_OPACITY
) => {
  const noise = createNoise3D();
  const animationFrameRef = useRef<number>();

  /**
   * Gets the animation speed value based on the speed setting
   */
  const getSpeed = useCallback(() => {
    switch (speed) {
      case 'slow':
        return ANIMATION_SPEEDS.SLOW;
      case 'fast':
        return ANIMATION_SPEEDS.FAST;
      default:
        return ANIMATION_SPEEDS.SLOW;
    }
  }, [speed]);

  /**
   * Draw a set of waves on the canvas
   */
  const drawWaves = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      noiseTime: number,
      waveCount: number
    ) => {
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || DEFAULT_VALUES.WAVE_WIDTH;
        ctx.strokeStyle = colors[i % colors.length];

        for (let x = 0; x < width; x += DEFAULT_VALUES.X_STEP) {
          const y = noise(x / 800, 0.3 * i, noiseTime) * 100;
          ctx.lineTo(x, y + height * 0.5); // Position at 50% of container height
        }

        ctx.stroke();
        ctx.closePath();
      }
    },
    [colors, noise, waveWidth]
  );

  /**
   * Initialize the canvas and start the animation
   */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (ctx.canvas.width = window.innerWidth);
    let height = (ctx.canvas.height = window.innerHeight);
    ctx.filter = `blur(${blur}px)`;

    let noiseTime = 0;

    // Handle window resize
    const handleResize = () => {
      width = ctx.canvas.width = window.innerWidth;
      height = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    window.addEventListener('resize', handleResize);

    // Animation render loop
    const render = () => {
      ctx.fillStyle = backgroundFill || DEFAULT_VALUES.BACKGROUND_FILL;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, width, height);

      noiseTime += getSpeed();
      drawWaves(ctx, width, height, noiseTime, DEFAULT_VALUES.WAVE_COUNT);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [backgroundFill, blur, canvasRef, drawWaves, getSpeed, waveOpacity]);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);
};
