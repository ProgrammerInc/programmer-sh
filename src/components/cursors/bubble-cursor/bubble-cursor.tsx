'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import BubbleParticle from './bubble-particle';

export interface BubbleCursorProps {
  fillStyle: string;
  strokeStyle: string;
  wrapperElement?: HTMLElement;
}

export const BubbleCursor: React.FC<BubbleCursorProps> = ({
  wrapperElement,
  fillStyle,
  strokeStyle
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<BubbleParticle[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Define all event handlers first to avoid "used before declaration" errors
  const onWindowResize = useCallback(() => {
    if (!canvasRef.current) return;
    
    if (wrapperElement) {
      canvasRef.current.width = wrapperElement.clientWidth;
      canvasRef.current.height = wrapperElement.clientHeight;
    } else {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, [wrapperElement]);

  const addParticle = useCallback((x: number, y: number) => {
    particlesRef.current.push(new BubbleParticle(x, y, fillStyle, strokeStyle));
  }, [fillStyle, strokeStyle]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      for (let i = 0; i < e.touches.length; i++) {
        addParticle(e.touches[i].clientX, e.touches[i].clientY);
      }
    }
  }, [addParticle]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (wrapperElement) {
      const boundingRect = wrapperElement.getBoundingClientRect();
      cursorRef.current.x = e.clientX - boundingRect.left;
      cursorRef.current.y = e.clientY - boundingRect.top;
    } else {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    }

    addParticle(cursorRef.current.x, cursorRef.current.y);
  }, [wrapperElement, addParticle]);

  // Cleanup function to properly remove event listeners and canvas elements
  const cleanupCanvas = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    const canvas = canvasRef.current;
    if (canvas && canvas.parentElement) {
      canvas.parentElement.removeChild(canvas);
    }
    
    const element = wrapperElement || document.body;
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('touchmove', onTouchMove);
    element.removeEventListener('touchstart', onTouchMove);
    window.removeEventListener('resize', onWindowResize);
  }, [wrapperElement, onMouseMove, onTouchMove, onWindowResize]);
  
  // Main initialization function outside of the effect for better control
  const initializeCanvas = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      console.log('This browser has prefers reduced motion turned on, so the cursor did not init');
      return;
    }

    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvasRef.current = canvas;
    }
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Window dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Essential canvas styling
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999'; // Ensure high z-index
    canvas.style.transform = 'translateZ(0)'; // Force hardware acceleration and proper stacking
    
    // Check if the canvas is already in the DOM
    const canvasParent = canvas.parentElement;
    
    // If the canvas already has a parent but it's not the right one, remove it first
    if (canvasParent && canvasParent !== (wrapperElement || document.body)) {
      canvasParent.removeChild(canvas);
    }

    // Append canvas to the DOM if not already there or to the correct parent
    if (!canvasParent || canvasParent !== (wrapperElement || document.body)) {
      if (wrapperElement) {
        canvas.style.position = 'absolute';
        wrapperElement.appendChild(canvas);
        canvas.width = wrapperElement.clientWidth;
        canvas.height = wrapperElement.clientHeight;
      } else {
        canvas.style.position = 'fixed';
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
      }
    }

    // Bind events
    const element = wrapperElement || document.body;
    // Clean up previous event listeners if any
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('touchmove', onTouchMove);
    element.removeEventListener('touchstart', onTouchMove);
    window.removeEventListener('resize', onWindowResize);

    // Add fresh event listeners
    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('touchmove', onTouchMove, { passive: true });
    element.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('resize', onWindowResize);

    const updateParticles = () => {
      if (!canvas || !context) return;

      if (particlesRef.current.length === 0) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Update
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(context);
      }

      // Remove dead particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        if (particlesRef.current[i].lifeSpan < 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      if (particlesRef.current.length === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    // Cancel any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Start the animation loop
    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    
    // Begin animation loop
    loop();
  }, [wrapperElement, onMouseMove, onTouchMove, onWindowResize]);
  
  // Effect to re-initialize the cursor when needed
  useEffect(() => {
    // Avoid running on first render if there's no wrapper element yet
    if (!wrapperElement && !canvasRef.current) {
      // Create the canvas element directly
      const newCanvas = document.createElement('canvas');
      canvasRef.current = newCanvas;
    }
    
    // Handle initialization
    initializeCanvas();
    
    // Cleanup function
    return cleanupCanvas;
  }, [wrapperElement, fillStyle, strokeStyle, initializeCanvas, cleanupCanvas]); // Re-initialize when these props change
  
  return <canvas ref={canvasRef} />;
};

export default BubbleCursor;
