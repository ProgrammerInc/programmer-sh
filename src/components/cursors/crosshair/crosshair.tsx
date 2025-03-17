/**
 * @fileoverview Crosshair cursor component that creates a dynamic crosshair
 * @module Crosshair
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { CrosshairProps } from './crosshair.types';
import { useCrosshairHooks } from './crosshair.hooks';

/**
 * Crosshair component that creates a dynamic crosshair cursor
 * This component displays horizontal and vertical lines that follow the cursor
 * with special animation effects when hovering over links
 *
 * @param props - Component props
 * @returns React component
 */
export const Crosshair: React.FC<CrosshairProps> = (props) => {
  const { containerRef } = props;
  const cursorRef = useRef<HTMLDivElement>(null);

  // Get hooks and refs from the custom hook
  const {
    lineHorizontalRef,
    lineVerticalRef,
    filterXRef,
    filterYRef,
    setupCrosshair,
    color
  } = useCrosshairHooks(props);

  // Setup crosshair effects
  useEffect(() => {
    return setupCrosshair();
  }, [setupCrosshair]);

  return (
    <div
      ref={cursorRef}
      className={`${
        containerRef ? 'absolute' : 'fixed'
      } top-0 left-0 w-full h-full pointer-events-none z-[10000]`}
    >
      <svg className="absolute top-0 left-0 w-full h-full">
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterXRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterYRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div
        ref={lineHorizontalRef}
        className={`absolute w-full h-px pointer-events-none opacity-0 transform translate-y-1/2`}
        style={{ background: color }}
      ></div>
      <div
        ref={lineVerticalRef}
        className={`absolute h-full w-px pointer-events-none opacity-0 transform translate-x-1/2`}
        style={{ background: color }}
      ></div>
    </div>
  );
};

export default Crosshair;
