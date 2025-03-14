'use client';

import { motion } from 'framer-motion';

export interface StarfallProps {
  starCount?: number;
  primaryColor?: string;
  className?: string;
}

export const Starfall = ({
  starCount = 50,
  primaryColor = '#ffffff',
  className = ''
}: StarfallProps) => {
  const stars = Array.from({ length: starCount }, (_, i) => {
    const starTailLength = Math.random() * 2.5 + 5;
    const topOffset = Math.random() * 100;
    const fallDuration = Math.random() * 6 + 6;
    const fallDelay = Math.random() * 10;

    return {
      id: i,
      topOffset,
      fallDuration,
      fallDelay
    };
  });

  return (
    <div
      className={`absolute inset-0 w-full h-full -rotate-45 pointer-events-none ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {stars.map(star => (
        <motion.div
          key={star.id}
          className={`
            absolute h-[2px] 
            bg-gradient-to-r from-current to-transparent
            rounded-full
            drop-shadow-[0_0_6px_currentColor]
          `}
          style={{
            top: `${star.topOffset}vh`,
            width: '6em',
            color: primaryColor,
            willChange: 'transform'
          }}
          initial={{ x: '104em' }}
          animate={{ x: '-30em' }}
          transition={{
            duration: star.fallDuration,
            delay: star.fallDelay,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }}
        >
          <div className="relative w-full h-full">
            <div
              className={`
                absolute top-0 left-[calc(-1em)] w-[1em] h-full
                bg-gradient-to-r from-transparent via-current to-transparent
                rounded-inherit animate-blink
              `}
              style={{
                willChange: 'transform, opacity'
              }}
            />
            <div
              className={`
                absolute top-0 left-[calc(-1em)] w-[1em] h-full
                bg-gradient-to-r from-transparent via-current to-transparent
                rounded-inherit rotate-45 animate-blink
              `}
              style={{
                willChange: 'transform, opacity'
              }}
            />
            <div
              className={`
                absolute top-0 left-[calc(-1em)] w-[1em] h-full
                bg-gradient-to-r from-transparent via-current to-transparent
                rounded-inherit -rotate-45 animate-blink
              `}
              style={{
                willChange: 'transform, opacity'
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Starfall;
