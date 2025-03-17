'use client';

import type { MotionStyle, Transition, Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback, useMemo, useState } from 'react';
import { DEFAULT_ROTATION_TRANSITION, DEFAULT_TRANSITION } from './blob-background.constants';
import { BlobProps } from './blob-background.types';

/**
 * Animated blob component that creates a colorful, moving background element
 *
 * @param props - Component properties
 * @returns A motion-animated blob element
 */
export const Blob = memo(function Blob({
  color,
  size = 400,
  blur = 60,
  speed = 20,
  opacity = 0.5,
  zIndex = 0,
  initialPosition = { x: 50, y: 50 },
  pulseScale = 1.1,
  rotationSpeed = 10,
  gradientColors
}: BlobProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate random points for animation path
  const getRandomPoint = useCallback(
    () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }),
    []
  );

  // Calculate gradient or color value
  const gradient = useMemo(() => {
    return gradientColors ? `linear-gradient(45deg, ${gradientColors.join(', ')})` : color;
  }, [gradientColors, color]);

  // Configure transition with the provided speed
  const transition = useMemo(
    (): Transition => ({
      ...DEFAULT_TRANSITION,
      duration: speed
    }),
    [speed]
  );

  // Configure rotation transition with the provided rotation speed
  const rotateTransition = useMemo(
    (): Transition => ({
      ...DEFAULT_ROTATION_TRANSITION,
      duration: ((speed * 2) / rotationSpeed) * 10
    }),
    [speed, rotationSpeed]
  );

  // Define animation variants
  const variants = useMemo((): Variants => {
    const randomPoint1 = getRandomPoint();
    const randomPoint2 = getRandomPoint();

    return {
      initial: {
        x: `${initialPosition.x}%`,
        y: `${initialPosition.y}%`,
        scale: 1,
        rotate: 0
      },
      animate: {
        x: [
          `${initialPosition.x}%`,
          `${randomPoint1.x}%`,
          `${randomPoint2.x}%`,
          `${initialPosition.x}%`
        ],
        y: [
          `${initialPosition.y}%`,
          `${randomPoint1.y}%`,
          `${randomPoint2.y}%`,
          `${initialPosition.y}%`
        ],
        scale: [1, pulseScale, 1],
        rotate: 360,
        transition: {
          ...transition,
          rotate: rotateTransition
        }
      },
      hover: {
        scale: 1.1,
        filter: `blur(${blur * 0.8}px)`,
        transition: { duration: 0.3 }
      }
    };
  }, [initialPosition, pulseScale, blur, transition, rotateTransition, getRandomPoint]);

  // Define blob style
  const blobStyle = useMemo(
    (): MotionStyle => ({
      position: 'absolute',
      width: size,
      height: size,
      filter: `blur(${blur}px)`,
      background: gradient || 'transparent',
      borderRadius: '50%',
      opacity,
      zIndex,
      mixBlendMode: 'screen'
    }),
    [size, blur, gradient, opacity, zIndex]
  );

  // Setup hover glow effect style
  const hoverGlowStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      inset: -10,
      background: `radial-gradient(circle, ${
        gradientColors?.[0] || color || '#fff'
      }33 0%, transparent 70%)`,
      borderRadius: '50%'
    }),
    [gradientColors, color]
  );

  return (
    <motion.div
      style={blobStyle}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={hoverGlowStyle}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// Add displayName to help with debugging
Blob.displayName = 'Blob';

export default Blob;
