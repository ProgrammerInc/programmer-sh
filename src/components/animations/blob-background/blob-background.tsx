'use client';

import type { MotionStyle, Transition, Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export interface BlobProps {
  color?: string;
  size?: number;
  blur?: number;
  speed?: number;
  opacity?: number;
  zIndex?: number;
  initialPosition?: { x: number; y: number };
  pulseScale?: number;
  rotationSpeed?: number;
  gradientColors?: string[];
}

export const Blob = ({
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
}: BlobProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRandomPoint = () => ({
    x: Math.random() * 100,
    y: Math.random() * 100
  });

  const gradient = gradientColors ? `linear-gradient(45deg, ${gradientColors.join(', ')})` : color;

  const transition: Transition = {
    duration: speed,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'reverse'
  };

  const rotateTransition: Transition = {
    duration: speed * 2,
    ease: 'linear',
    repeat: Infinity,
    repeatType: 'loop'
  };

  const variants: Variants = {
    initial: {
      x: `${initialPosition.x}%`,
      y: `${initialPosition.y}%`,
      scale: 1,
      rotate: 0
    },
    animate: {
      x: [
        `${initialPosition.x}%`,
        `${getRandomPoint().x}%`,
        `${getRandomPoint().x}%`,
        `${initialPosition.x}%`
      ],
      y: [
        `${initialPosition.y}%`,
        `${getRandomPoint().y}%`,
        `${getRandomPoint().y}%`,
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

  const blobStyle: MotionStyle = {
    position: 'absolute' as const,
    width: size,
    height: size,
    filter: `blur(${blur}px)`,
    background: gradient || 'transparent',
    borderRadius: '50%',
    opacity,
    zIndex,
    mixBlendMode: 'screen' as const
  };

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
            style={{
              position: 'absolute',
              inset: -10,
              background: `radial-gradient(circle, ${
                gradientColors?.[0] || color || '#fff'
              }33 0%, transparent 70%)`,
              borderRadius: '50%'
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export interface BlobConfig extends BlobProps {
  id: string;
}

export interface BlobBackgroundProps {
  blobs?: BlobConfig[];
  className?: string;
}

const defaultBlobs: BlobConfig[] = [
  {
    id: 'blob1',
    gradientColors: ['#FF0080', '#7928CA'],
    size: 400,
    blur: 60,
    speed: 15,
    opacity: 0.3,
    zIndex: 1,
    initialPosition: { x: 20, y: 20 },
    pulseScale: 1.2,
    rotationSpeed: 8
  },
  {
    id: 'blob2',
    gradientColors: ['#0070F3', '#00DFD8'],
    size: 300,
    blur: 50,
    speed: 20,
    opacity: 0.2,
    zIndex: 2,
    initialPosition: { x: 60, y: 60 },
    pulseScale: 1.15,
    rotationSpeed: 12
  },
  {
    id: 'blob3',
    gradientColors: ['#7928CA', '#FF0080'],
    size: 350,
    blur: 55,
    speed: 25,
    opacity: 0.25,
    zIndex: 3,
    initialPosition: { x: 80, y: 30 },
    pulseScale: 1.1,
    rotationSpeed: 10
  }
];

export function BlobBackground({ blobs = defaultBlobs, className = '' }: BlobBackgroundProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: 'transparent'
      }}
    >
      {blobs.map(blob => (
        <Blob key={blob.id} {...blob} />
      ))}
    </div>
  );
}

export default BlobBackground;
