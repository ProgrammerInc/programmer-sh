/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef } from 'react';
import SnowflakeParticle from './snowflake-particle';

export interface SnowflakeCursorProps {
  element?: HTMLElement;
}

export const SnowflakeCursor: React.FC<SnowflakeCursorProps> = ({ element }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<any[]>([]);
  const canvImages = useRef<HTMLCanvasElement[]>([]);
  const animationFrame = useRef<number | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const possibleEmoji = ['❄️'];
  const prefersReducedMotion = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    // Check if window is defined (to ensure code runs on client-side)
    if (typeof window === 'undefined') return;

    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)');

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    const targetElement = element || document.body;

    canvas.style.position = element ? 'absolute' : 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999'; // Force high z-index
    canvas.style.transform = 'translateZ(0)'; // Create stacking context with hardware acceleration

    targetElement.appendChild(canvas);
    canvasRef.current = canvas;

    const setCanvasSize = () => {
      canvas.width = element ? targetElement.clientWidth : window.innerWidth;
      canvas.height = element ? targetElement.clientHeight : window.innerHeight;
    };

    const createEmojiImages = () => {
      context.font = '12px serif';
      context.textBaseline = 'middle';
      context.textAlign = 'center';

      possibleEmoji.forEach(emoji => {
        const measurements = context.measureText(emoji);
        const bgCanvas = document.createElement('canvas');
        const bgContext = bgCanvas.getContext('2d');
        if (!bgContext) return;

        bgCanvas.width = measurements.width;
        bgCanvas.height = measurements.actualBoundingBoxAscent * 2;

        bgContext.textAlign = 'center';
        bgContext.font = '12px serif';
        bgContext.textBaseline = 'middle';
        bgContext.fillText(emoji, bgCanvas.width / 2, measurements.actualBoundingBoxAscent);

        canvImages.current.push(bgCanvas);
      });
    };

    const addParticle = (x: number, y: number) => {
      const randomImage = canvImages.current[Math.floor(Math.random() * canvImages.current.length)];
      particles.current.push(new SnowflakeParticle(x, y, randomImage));
    };

    const onMouseMove = (e: MouseEvent) => {
      const x = element ? e.clientX - targetElement.getBoundingClientRect().left : e.clientX;
      const y = element ? e.clientY - targetElement.getBoundingClientRect().top : e.clientY;
      addParticle(x, y);
    };

    const updateParticles = () => {
      if (!context || !canvas) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle, index) => {
        particle.update(context);
        if (particle.lifeSpan < 0) {
          particles.current.splice(index, 1);
        }
      });
    };

    const animationLoop = () => {
      updateParticles();
      animationFrame.current = requestAnimationFrame(animationLoop);
    };

    const init = () => {
      if (prefersReducedMotion.current?.matches) return;

      setCanvasSize();
      createEmojiImages();

      targetElement.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', setCanvasSize);

      animationLoop();
    };

    const destroy = () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      targetElement.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', setCanvasSize);
    };

    prefersReducedMotion.current.onchange = () => {
      if (prefersReducedMotion.current?.matches) {
        destroy();
      } else {
        init();
      }
    };

    init();
    return () => destroy();
  }, [element, possibleEmoji]);

  return null;
};

export default SnowflakeCursor;
