/**
 * @fileoverview Hook implementation for the FairyDustCursor component
 * @module FairyDustCursor/Hooks
 */

import { useCallback, useRef, useState } from 'react';
import {
  CanvasSize,
  FairyDustCursorProps,
  FairyDustCursorState,
  FairyDustParticle
} from './fairydust-cursor.types';

/**
 * Hook to manage the FairyDustCursor state and behavior
 *
 * @param props - Props for the FairyDustCursor component
 * @returns Object containing state and behavior functions
 */
export const useFairyDustCursorHooks = (props: FairyDustCursorProps) => {
  const {
    colors = ['#D61C59', '#E7D84B', '#1B8798'],
    element,
    characterSet = ['✨', '⭐', '🌟', '★', '*'],
    particleSize = 21,
    particleCount = 1,
    gravity = 0.02,
    fadeSpeed = 0.98,
    initialVelocity = { min: 0.5, max: 1.5 }
  } = props;

  // Use a ref to hold state to prevent re-renders
  const stateRef = useRef<FairyDustCursorState>({
    particles: [],
    cursor: { x: 0, y: 0 },
    lastPos: { x: 0, y: 0 }
  });

  // Canvas size state (needs to trigger re-render)
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });

  /**
   * Create a new fairy dust particle
   *
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns New particle object
   */
  const createParticle = useCallback(
    (x: number, y: number): FairyDustParticle => {
      const randomChar = characterSet[Math.floor(Math.random() * characterSet.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const velocityX =
        (Math.random() < 0.5 ? -1 : 1) *
        (Math.random() * (initialVelocity.max - initialVelocity.min) + initialVelocity.min);
      const velocityY = -(Math.random() * initialVelocity.max);

      return {
        x,
        y,
        character: randomChar,
        color: randomColor,
        velocity: { x: velocityX, y: velocityY },
        lifeSpan: 100,
        initialLifeSpan: 100,
        scale: 1
      };
    },
    [characterSet, colors, initialVelocity]
  );

  /**
   * Update and draw all particles
   *
   * @param context - Canvas rendering context
   */
  const updateParticles = useCallback(
    (context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, canvasSize.width, canvasSize.height);

      // Update and draw particles
      stateRef.current.particles.forEach(particle => {
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Apply gravity
        particle.velocity.y += gravity;

        // Update lifespan and scale
        particle.lifeSpan *= fadeSpeed;
        particle.scale = Math.max(particle.lifeSpan / particle.initialLifeSpan, 0);

        // Draw particle
        context.save();
        context.font = `${particleSize * particle.scale}px serif`;
        context.fillStyle = particle.color;
        context.globalAlpha = particle.scale;
        context.fillText(particle.character, particle.x, particle.y);
        context.restore();
      });

      // Remove dead particles
      stateRef.current.particles = stateRef.current.particles.filter(
        particle => particle.lifeSpan > 0.1
      );
    },
    [canvasSize.width, canvasSize.height, gravity, fadeSpeed, particleSize]
  );

  /**
   * Handle canvas size updates
   *
   * @param targetElement - Element to attach to
   */
  const updateCanvasSize = useCallback(() => {
    const targetElement = element || document.body;
    const newWidth = element ? targetElement.clientWidth : window.innerWidth;
    const newHeight = element ? targetElement.clientHeight : window.innerHeight;
    setCanvasSize({ width: newWidth, height: newHeight });
  }, [element]);

  /**
   * Handle mouse movement to create particles
   *
   * @param e - Mouse event
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const targetElement = element || document.body;
      const rect = element ? targetElement.getBoundingClientRect() : undefined;
      const x = element ? e.clientX - rect!.left : e.clientX;
      const y = element ? e.clientY - rect!.top : e.clientY;

      stateRef.current.cursor = { x, y };

      const distance = Math.hypot(
        stateRef.current.cursor.x - stateRef.current.lastPos.x,
        stateRef.current.cursor.y - stateRef.current.lastPos.y
      );

      if (distance > 2) {
        for (let i = 0; i < particleCount; i++) {
          stateRef.current.particles.push(
            createParticle(stateRef.current.cursor.x, stateRef.current.cursor.y)
          );
        }
        stateRef.current.lastPos = { ...stateRef.current.cursor };
      }
    },
    [element, particleCount, createParticle]
  );

  /**
   * Handle touch movement to create particles
   *
   * @param e - Touch event
   */
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const targetElement = element || document.body;
      const rect = element ? targetElement.getBoundingClientRect() : undefined;
      const x = element ? touch.clientX - rect!.left : touch.clientX;
      const y = element ? touch.clientY - rect!.top : touch.clientY;

      for (let i = 0; i < particleCount; i++) {
        stateRef.current.particles.push(createParticle(x, y));
      }
    },
    [element, particleCount, createParticle]
  );

  return {
    stateRef,
    canvasSize,
    setCanvasSize,
    updateCanvasSize,
    createParticle,
    updateParticles,
    handleMouseMove,
    handleTouchMove
  };
};
