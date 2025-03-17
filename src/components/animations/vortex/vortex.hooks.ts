/**
 * Vortex Animation Component Hooks
 */

import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import { ANIMATION_SETTINGS, DEFAULT_SETTINGS, MATH_CONSTANTS } from './vortex.constants';
import { ParticlePropIndex, Point } from './vortex.types';
import {
  checkBounds,
  fadeInOut,
  lerp,
  rand,
  randRange,
  renderGlow,
  renderToScreen,
  resizeCanvas
} from './vortex.utils';

/**
 * Hook for managing vortex particle system
 *
 * @param canvasRef - Reference to the canvas element
 * @param containerRef - Reference to the container element
 * @param options - Animation configuration options
 * @returns Animation control functions
 */
export const useVortexAnimation = (
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  containerRef: MutableRefObject<HTMLDivElement | null>,
  options: {
    particleCount?: number;
    rangeY?: number;
    baseHue?: number;
    baseSpeed?: number;
    rangeSpeed?: number;
    baseRadius?: number;
    rangeRadius?: number;
    backgroundColor?: string;
  }
) => {
  // Animation state
  const tickRef = useRef(0);
  const centerRef = useRef<Point>([0, 0]);
  const noise3DRef = useRef(createNoise3D());
  const animationFrameRef = useRef<number | null>(null);

  // Parse options with defaults
  const particleCount = options.particleCount ?? DEFAULT_SETTINGS.PARTICLE_COUNT;
  const rangeY = options.rangeY ?? DEFAULT_SETTINGS.RANGE_Y;
  const baseHue = options.baseHue ?? DEFAULT_SETTINGS.BASE_HUE;
  const baseSpeed = options.baseSpeed ?? DEFAULT_SETTINGS.BASE_SPEED;
  const rangeSpeed = options.rangeSpeed ?? DEFAULT_SETTINGS.RANGE_SPEED;
  const baseRadius = options.baseRadius ?? DEFAULT_SETTINGS.BASE_RADIUS;
  const rangeRadius = options.rangeRadius ?? DEFAULT_SETTINGS.RANGE_RADIUS;
  const backgroundColor = options.backgroundColor ?? DEFAULT_SETTINGS.BACKGROUND_COLOR;

  // Constants
  const particlePropCount = Object.keys(ParticlePropIndex).length / 2; // Divide by 2 because enum has both string and number keys
  const particlePropsLength = particleCount * particlePropCount;
  const baseTTL = DEFAULT_SETTINGS.BASE_TTL;
  const rangeTTL = DEFAULT_SETTINGS.RANGE_TTL;
  const rangeHue = DEFAULT_SETTINGS.RANGE_HUE;
  const noiseSteps = ANIMATION_SETTINGS.NOISE_STEPS;
  const xOff = ANIMATION_SETTINGS.X_OFFSET;
  const yOff = ANIMATION_SETTINGS.Y_OFFSET;
  const zOff = ANIMATION_SETTINGS.Z_OFFSET;

  // Particle properties array
  const particlePropsRef = useRef<Float32Array | null>(null);

  /**
   * Initialize a particle at the specified index
   */
  const initParticle = useCallback(
    (i: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !particlePropsRef.current) return;

      const x = rand(canvas.width);
      const y = centerRef.current[1] + randRange(rangeY);
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = baseTTL + rand(rangeTTL);
      const speed = baseSpeed + rand(rangeSpeed);
      const radius = baseRadius + rand(rangeRadius);
      const hue = baseHue + rand(rangeHue);

      particlePropsRef.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    },
    [
      baseHue,
      baseRadius,
      baseSpeed,
      baseTTL,
      canvasRef,
      rangeHue,
      rangeRadius,
      rangeSpeed,
      rangeTTL,
      rangeY
    ]
  );

  /**
   * Initialize all particles
   */
  const initParticles = useCallback(() => {
    tickRef.current = 0;
    particlePropsRef.current = new Float32Array(particlePropsLength);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  }, [initParticle, particlePropCount, particlePropsLength]);

  /**
   * Draw a single particle
   */
  const drawParticle = useCallback(
    (
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number,
      ctx: CanvasRenderingContext2D
    ) => {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    },
    []
  );

  /**
   * Update and draw a particle
   */
  const updateParticle = useCallback(
    (i: number, ctx: CanvasRenderingContext2D) => {
      const canvas = canvasRef.current;
      if (!canvas || !particlePropsRef.current) return;

      const i2 = ParticlePropIndex.Y + i;
      const i3 = ParticlePropIndex.VX + i;
      const i4 = ParticlePropIndex.VY + i;
      const i5 = ParticlePropIndex.LIFE + i;
      const i6 = ParticlePropIndex.TTL + i;
      const i7 = ParticlePropIndex.SPEED + i;
      const i8 = ParticlePropIndex.RADIUS + i;
      const i9 = ParticlePropIndex.HUE + i;

      const x = particlePropsRef.current[i];
      const y = particlePropsRef.current[i2];
      const n =
        noise3DRef.current(x * xOff, y * yOff, tickRef.current * zOff) *
        noiseSteps *
        MATH_CONSTANTS.TAU;
      const vx = lerp(particlePropsRef.current[i3], Math.cos(n), 0.5);
      const vy = lerp(particlePropsRef.current[i4], Math.sin(n), 0.5);
      const life = particlePropsRef.current[i5];
      const ttl = particlePropsRef.current[i6];
      const speed = particlePropsRef.current[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particlePropsRef.current[i8];
      const hue = particlePropsRef.current[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

      particlePropsRef.current[i] = x2;
      particlePropsRef.current[i2] = y2;
      particlePropsRef.current[i3] = vx;
      particlePropsRef.current[i4] = vy;
      particlePropsRef.current[i5] = life + 1;

      // Reinitialize particle if it's out of bounds or its lifetime is over
      if (checkBounds(x, y, canvas) || life > ttl) {
        initParticle(i);
      }
    },
    [canvasRef, drawParticle, initParticle, noiseSteps, xOff, yOff, zOff]
  );

  /**
   * Draw all particles
   */
  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!particlePropsRef.current) return;

      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i, ctx);
      }
    },
    [particlePropCount, particlePropsLength, updateParticle]
  );

  /**
   * Main draw function for animation frame
   */
  const draw = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      tickRef.current++;

      // Clear and set background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles and apply effects
      drawParticles(ctx);
      renderGlow(
        canvas,
        ctx,
        ANIMATION_SETTINGS.GLOW_BLUR_1,
        ANIMATION_SETTINGS.GLOW_BLUR_2,
        ANIMATION_SETTINGS.GLOW_BRIGHTNESS
      );
      renderToScreen(canvas, ctx);

      // Request next frame
      animationFrameRef.current = window.requestAnimationFrame(() => draw(canvas, ctx));
    },
    [backgroundColor, drawParticles]
  );

  /**
   * Setup the animation
   */
  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize canvas and particles
    resizeCanvas(canvas, centerRef.current);
    initParticles();

    // Start animation loop
    draw(canvas, ctx);
  }, [canvasRef, draw, initParticles]);

  /**
   * Cleanup function to cancel animation frame
   */
  const cleanup = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  // Initialize animation on mount
  useEffect(() => {
    setup();

    // Handle window resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      resizeCanvas(canvas, centerRef.current);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, cleanup, setup]);

  return { setup, cleanup };
};
