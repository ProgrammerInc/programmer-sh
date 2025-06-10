/**
 * Rainbow Cursor Hooks Module
 *
 * Contains custom hooks for the Rainbow Cursor component that handle animation,
 * rendering, and particle management.
 *
 * @module RainbowCursorHooks
 */
import { useCallback, useEffect, useRef } from 'react';

import {
  CANVAS_CONTEXT_SETTINGS,
  CANVAS_STYLES,
  REDUCED_MOTION_QUERY
} from './rainbow-cursor.constants';
import type {
  CursorPosition,
  Particle,
  PositionSet,
  RainbowCursorProps
} from './rainbow-cursor.types';
import {
  createParticle,
  getPulseSize,
  interpolateColors,
  resizeCanvas,
  setupCanvasStyles,
  updateCursorPosition
} from './rainbow-cursor.utils';

/**
 * Hook that manages the rainbow cursor effect.
 * Handles all canvas rendering, animation, particle creation, and event handling.
 *
 * @param props - Rainbow cursor configuration properties
 * @returns Canvas reference and cleanup function
 */
export const useRainbowCursor = ({
  element,
  length = 20,
  colors = ['#FE0000', '#FD8C00', '#FFE500', '#119F0B', '#0644B3', '#C22EDC'],
  size = 3,
  trailSpeed = 0.4,
  colorCycleSpeed = 0.002,
  blur = 0,
  pulseSpeed = 0.01,
  pulseMin = 0.8,
  pulseMax = 1.2
}: RainbowCursorProps) => {
  // Refs to store component state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const cursorRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const cursorsInittedRef = useRef(false);
  const timeRef = useRef(0);
  const mountedRef = useRef(false);

  // Update particles based on cursor movement
  const updateParticles = useCallback(() => {
    if (!contextRef.current || !canvasRef.current || !mountedRef.current) return;

    const ctx = contextRef.current;
    const canvas = canvasRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineJoin = CANVAS_CONTEXT_SETTINGS.lineJoin;

    if (blur > 0) {
      ctx.filter = `blur(${blur}px)`;
    }

    const particleSets: PositionSet[] = [];
    let x = cursorRef.current.x;
    let y = cursorRef.current.y;

    particlesRef.current.forEach((particle, index) => {
      const nextParticle = particlesRef.current[index + 1] || particlesRef.current[0];

      particle.position.x = x;
      particle.position.y = y;

      particleSets.push({ x, y });

      x += (nextParticle.position.x - particle.position.x) * trailSpeed;
      y += (nextParticle.position.y - particle.position.y) * trailSpeed;
    });

    // Time-based color cycling
    timeRef.current += colorCycleSpeed;
    const colorOffset = timeRef.current % 1;

    // Dynamic size based on pulse
    const currentSize = getPulseSize(size, timeRef.current, pulseSpeed, pulseMin, pulseMax);

    colors.forEach((color, index) => {
      const nextColor = colors[(index + 1) % colors.length];

      ctx.beginPath();
      ctx.strokeStyle = interpolateColors(color, nextColor, (index + colorOffset) / colors.length);

      if (particleSets.length) {
        ctx.moveTo(particleSets[0].x, particleSets[0].y + index * (currentSize - 1));
      }

      particleSets.forEach((set, particleIndex) => {
        if (particleIndex !== 0) {
          ctx.lineTo(set.x, set.y + index * currentSize);
        }
      });

      ctx.lineWidth = currentSize;
      ctx.lineCap = CANVAS_CONTEXT_SETTINGS.lineCap;
      ctx.stroke();
    });
  }, [blur, colors, colorCycleSpeed, pulseMax, pulseMin, pulseSpeed, size, trailSpeed]);

  // Animation loop
  const loop = useCallback(() => {
    if (!mountedRef.current) return;

    updateParticles();
    animationFrameRef.current = requestAnimationFrame(loop);
  }, [updateParticles]);

  // Initialize and manage cursor effect
  useEffect(() => {
    const hasWrapperEl = element !== undefined;
    const targetElement = hasWrapperEl ? element : document.body;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    if (prefersReducedMotion.matches) {
      console.log('Reduced motion is enabled - cursor animation disabled');
      return;
    }

    // Create and set up canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { alpha: true });

    if (!context) return;

    canvasRef.current = canvas;
    contextRef.current = context;
    mountedRef.current = true;

    // Configure canvas styles
    setupCanvasStyles(canvas, hasWrapperEl, CANVAS_STYLES);
    resizeCanvas(canvas, hasWrapperEl, element);

    // Append canvas to DOM
    if (hasWrapperEl) {
      element?.appendChild(canvas);
    } else {
      document.body.appendChild(canvas);
    }

    // Event handlers
    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = updateCursorPosition(e, hasWrapperEl, element);

      if (!cursorsInittedRef.current) {
        cursorsInittedRef.current = true;
        for (let i = 0; i < length; i++) {
          particlesRef.current.push(createParticle(cursorRef.current.x, cursorRef.current.y));
        }
      }
    };

    const onWindowResize = () => {
      if (canvasRef.current) {
        resizeCanvas(canvasRef.current, hasWrapperEl, element);
      }
    };

    // Add event listeners
    targetElement.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    loop();

    // Cleanup function
    return () => {
      mountedRef.current = false;

      if (canvasRef.current) {
        canvasRef.current.remove();
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      targetElement.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);

      // Clear particles array
      particlesRef.current = [];
      cursorsInittedRef.current = false;
    };
  }, [
    element,
    length,
    colors,
    size,
    trailSpeed,
    colorCycleSpeed,
    blur,
    pulseSpeed,
    pulseMin,
    pulseMax,
    loop
  ]);

  return canvasRef;
};
