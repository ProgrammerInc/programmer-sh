/**
 * @fileoverview Fairy dust cursor component that creates sparkle animations that follow the cursor
 * @module FairyDustCursor
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { useFairyDustCursorHooks } from './fairydust-cursor.hooks';
import { FairyDustCursorProps } from './fairydust-cursor.types';

/**
 * FairyDustCursor component that creates fairy dust/sparkle particles following the cursor
 * This component renders a canvas with animated particles that follow mouse/touch movements
 *
 * @param props - Component props
 * @returns React component
 */
export const FairyDustCursor: React.FC<FairyDustCursorProps> = props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get hooks and functions from the custom hook
  const { canvasSize, updateCanvasSize, updateParticles, handleMouseMove, handleTouchMove } =
    useFairyDustCursorHooks(props);

  // Setup animation and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const targetElement = props.element || document.body;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Initialize canvas size
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Animation frame setup
    let animationFrameId: number;

    const animate = () => {
      updateParticles(context);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Add event listeners
    targetElement.addEventListener('mousemove', handleMouseMove);
    targetElement.addEventListener('touchmove', handleTouchMove, {
      passive: false
    });

    // Start animation
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      targetElement.removeEventListener('mousemove', handleMouseMove);
      targetElement.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [props.element, updateCanvasSize, updateParticles, handleMouseMove, handleTouchMove]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{
        position: props.element ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};

export default FairyDustCursor;
