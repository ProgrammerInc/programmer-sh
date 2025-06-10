/**
 * GlitchCursor
 *
 * Glitch cursor component that creates a glitch effect around the cursor
 *
 * @module GlitchCursor
 */

'use client';

import React, { useEffect } from 'react';
import { useGlitchCursorHooks } from './glitch-cursor.hooks';

/**
 * GlitchCursor component that creates an interactive glitch effect around the cursor
 * The effect intensifies based on mouse movement speed and is triggered when hovering
 * over specific elements
 *
 * @returns React component
 */
export const GlitchCursor: React.FC = () => {
  const { mouseState, containerRef, stateRef, setGlitchActive, handleMouseSpeed } =
    useGlitchCursorHooks();

  // Force re-render when glitch offsets change
  useEffect(() => {
    const interval = setInterval(() => {
      // This empty interval forces React to re-render periodically
      // to show updated glitch offsets from the stateRef
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full" ref={containerRef} onMouseMove={handleMouseSpeed}>
      {mouseState.x !== null && mouseState.y !== null && (
        <>
          {/* Glitch layers */}
          {stateRef.current.glitchOffsets.map((offset, index) => (
            <div
              key={index}
              className="fixed pointer-events-none mix-blend-screen"
              style={{
                left: mouseState.x + offset.x,
                top: mouseState.y + offset.y,
                transform: `translate(-50%, -50%) 
                           scale(${offset.scale}) 
                           rotate(${offset.rotation}deg)`,
                opacity: offset.opacity
              }}
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  background: `hsl(${offset.hue}, 100%, 50%)`,
                  filter: 'blur(2px)'
                }}
              />
            </div>
          ))}

          {/* Main cursor */}
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: mouseState.x,
              top: mouseState.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-8 h-8 bg-white rounded-full mix-blend-screen" />
          </div>

          {/* Static effect overlay */}
          {stateRef.current.glitchActive && (
            <div
              className="fixed pointer-events-none mix-blend-screen"
              style={{
                left: mouseState.x,
                top: mouseState.y,
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                // eslint-disable-next-line no-secrets/no-secrets
                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                opacity: 0.3
              }}
            />
          )}
        </>
      )}

      <div className="flex flex-col items-center justify-center h-full gap-8">
        <button
          className={`px-8 py-4 bg-red-600/30 text-white rounded-lg transition-all duration-300 relative overflow-hidden
            ${stateRef.current.glitchActive ? 'animate-pulse' : ''}`}
          onMouseEnter={() => setGlitchActive(true)}
          onMouseLeave={() => setGlitchActive(false)}
        >
          Trigger Glitch
          {stateRef.current.glitchActive && (
            <div className="absolute inset-0 bg-red-500/20 animate-glitch-overlay" />
          )}
        </button>
      </div>
    </div>
  );
};

export default GlitchCursor;
