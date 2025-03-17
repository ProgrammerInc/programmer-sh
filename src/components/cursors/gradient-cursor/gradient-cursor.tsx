/**
 * GradientCursor
 *
 * Gradient cursor component that creates a colorful trail effect
 * Colors change based on cursor position and particles fade over time
 *
 * @module GradientCursor
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useGradientCursorHooks } from './gradient-cursor.hooks';

/**
 * GradientCursor component that creates a colorful gradient trail effect following the cursor
 * Colors change based on cursor position and particles fade over time
 *
 * @returns React component
 */
export const GradientCursor: React.FC = () => {
  const { mouseState, containerRef, hue, particles } = useGradientCursorHooks();

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      {mouseState.x !== null && mouseState.y !== null && (
        <>
          {/* Main cursor with gradient */}
          <motion.div
            className="fixed pointer-events-none z-50"
            style={{
              display: 'none',
              left: mouseState.x,
              top: mouseState.y,
              x: '-50%',
              y: '-50%',
              width: '40px',
              height: '40px'
            }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-full h-full rounded-full mix-blend-screen"
              style={{
                background: `radial-gradient(
                  circle at center,
                  hsl(${hue}, 100%, 70%),
                  hsl(${(hue + 60) % 360}, 100%, 60%)
                )`,
                boxShadow: `0 0 20px hsl(${hue}, 100%, 50%, 0.5)`
              }}
            />
          </motion.div>

          {/* Particle trail */}
          <AnimatePresence>
            {particles.map((particle, index) => (
              <motion.div
                key={particle.id}
                className="fixed pointer-events-none mix-blend-screen"
                style={{
                  left: particle.x,
                  top: particle.y,
                  x: '-50%',
                  y: '-50%'
                }}
                initial={{ opacity: particle.intensity, scale: 0 }}
                animate={{ opacity: 0, scale: particle.size }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: `${particle.size * 4}px`,
                    height: `${particle.size * 4}px`,
                    background: `radial-gradient(
                      circle at center,
                      hsl(${(hue + index * 10) % 360}, 100%, ${70 + particle.intensity * 30}%),
                      transparent
                    )`,
                    filter: 'blur(2px)',
                    boxShadow: `0 0 ${particle.size * 2}px hsl(${(hue + index * 10) % 360}, 100%, 50%, ${particle.intensity})`
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default GradientCursor;
