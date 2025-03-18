'use client';

/**
 * Decay Card Component
 * 
 * A card component that applies distortion effects to an image based on mouse movement,
 * creating an engaging visual decay/distortion effect.
 */

import { gsap } from 'gsap';
import React, { memo, useEffect, useRef } from 'react';

import styles from './decay-card.module.css';
import { DecayCardProps, ImageValues, MousePosition, WindowSize } from './decay-card.types';

/**
 * Decay Card Component
 * 
 * @param props - Component props
 * @returns React component
 * 
 * @example
 * ```tsx
 * <DecayCard 
 *   width={300} 
 *   height={400} 
 *   image="/images/example.jpg"
 * >
 *   Title
 *   <span>Subtitle</span>
 * </DecayCard>
 * ```
 */
export const DecayCard = memo(({ 
  width = 300,
  height = 400,
  image = 'https://picsum.photos/300/400?grayscale',
  children
}: DecayCardProps) => {
  const svgRef = useRef<HTMLDivElement | null>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const cursor = useRef<MousePosition>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  });
  const cachedCursor = useRef<MousePosition>({ ...cursor.current });
  const winsize = useRef<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    // Animation helper functions
    const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;
    const map = (x: number, a: number, b: number, c: number, d: number): number =>
      ((x - a) * (d - c)) / (b - a) + c;
    const distance = (x1: number, x2: number, y1: number, y2: number): number =>
      Math.hypot(x1 - x2, y1 - y2);

    // Event handlers
    const handleResize = (): void => {
      winsize.current = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };

    const handleMouseMove = (ev: MouseEvent): void => {
      cursor.current = { x: ev.clientX, y: ev.clientY };
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize image values for animation
    const imgValues: ImageValues = {
      imgTransforms: { x: 0, y: 0, rz: 0 },
      displacementScale: 0
    };

    // Animation render loop
    const render = () => {
      // Calculate target positions with smooth interpolation
      let targetX = lerp(
        imgValues.imgTransforms.x,
        map(cursor.current.x, 0, winsize.current.width, -120, 120),
        0.1
      );
      let targetY = lerp(
        imgValues.imgTransforms.y,
        map(cursor.current.y, 0, winsize.current.height, -120, 120),
        0.1
      );
      const targetRz = lerp(
        imgValues.imgTransforms.rz,
        map(cursor.current.x, 0, winsize.current.width, -10, 10),
        0.1
      );

      // Apply elastic bounds to limit movement within 50px in any direction
      const bound = 50;
      if (targetX > bound) targetX = bound + (targetX - bound) * 0.2;
      if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2;
      if (targetY > bound) targetY = bound + (targetY - bound) * 0.2;
      if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2;

      // Update transform values
      imgValues.imgTransforms.x = targetX;
      imgValues.imgTransforms.y = targetY;
      imgValues.imgTransforms.rz = targetRz;

      // Apply transforms to the SVG container using GSAP
      if (svgRef.current) {
        gsap.set(svgRef.current, {
          x: imgValues.imgTransforms.x,
          y: imgValues.imgTransforms.y,
          rotateZ: imgValues.imgTransforms.rz
        });
      }

      // Calculate cursor movement distance for displacement effect
      const cursorTravelledDistance = distance(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y
      );
      
      // Update displacement scale based on cursor movement
      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        map(cursorTravelledDistance, 0, 200, 0, 400),
        0.06
      );

      // Apply displacement scale to the SVG filter
      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, {
          attr: { scale: imgValues.displacementScale }
        });
      }

      // Cache current cursor position for next frame
      cachedCursor.current = { ...cursor.current };

      // Continue animation loop
      requestAnimationFrame(render);
    };

    // Start the animation loop
    render();

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={svgRef} 
      className={styles['decay-card']} 
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <svg
        viewBox="-60 -75 720 900"
        preserveAspectRatio="xMidYMid slice"
        className={styles['svg-container']}
      >
        <filter id="imgFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.015"
            numOctaves="5"
            seed="4"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          <image
            href={image}
            x="0"
            y="0"
            width="600"
            height="750"
            filter="url(#imgFilter)"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
});

DecayCard.displayName = 'DecayCard';

export default DecayCard;
