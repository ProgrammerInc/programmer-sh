'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

import { DEFAULT_SETTINGS, STYLE_SETTINGS } from './starfall.constants';
import { useStars } from './starfall.hooks';
import styles from './starfall.module.css';
import { Star, StarfallProps } from './starfall.types';
import { createContainerClasses } from './starfall.utils';

/**
 * Starfall component creates an animated starfall effect
 *
 * @param props - Component properties
 * @returns A React component with animated falling stars
 */
export const StarfallComponent = ({
  starCount = DEFAULT_SETTINGS.STAR_COUNT,
  primaryColor = DEFAULT_SETTINGS.PRIMARY_COLOR,
  className = ''
}: StarfallProps) => {
  // Generate stars with custom hook
  const stars = useStars(starCount);

  return (
    <div
      className={createContainerClasses(styles['starfall-container'], className)}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {stars.map(star => (
        <StarElement key={star.id} star={star} primaryColor={primaryColor} />
      ))}
    </div>
  );
};

/**
 * Individual star element component
 *
 * @param props - Star element properties
 * @returns A motion div representing a falling star
 */
const StarElement = ({ star, primaryColor }: { star: Star; primaryColor: string }) => {
  return (
    <motion.div
      className={`
        absolute h-[2px] 
        bg-gradient-to-r from-current to-transparent
        rounded-full
        drop-shadow-[0_0_6px_currentColor]
        ${styles['starfall-star']}
      `}
      style={{
        top: `${star.topOffset}vh`,
        width: '6em',
        color: primaryColor,
        willChange: 'transform'
      }}
      initial={{ x: STYLE_SETTINGS.ANIMATION_START }}
      animate={{ x: STYLE_SETTINGS.ANIMATION_END }}
      transition={{
        duration: star.fallDuration,
        delay: star.fallDelay,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop' as const
      }}
    >
      <div className={styles['starfall-star-wrapper']}>
        {/* Center glow */}
        <div
          className={`
            absolute top-0 left-[calc(-1em)] w-[1em] h-full
            bg-gradient-to-r from-transparent via-current to-transparent
            rounded-inherit animate-blink
            ${styles['starfall-star-glow']}
          `}
          style={{
            willChange: 'transform, opacity'
          }}
        />

        {/* Rotated glow for effect */}
        <div
          className={`
            absolute top-0 left-[calc(-1em)] w-[1em] h-full
            bg-gradient-to-r from-transparent via-current to-transparent
            rounded-inherit rotate-45 animate-blink
            ${styles['starfall-star-glow']}
          `}
          style={{
            willChange: 'transform, opacity'
          }}
        />

        {/* Oppositely rotated glow */}
        <div
          className={`
            absolute top-0 left-[calc(-1em)] w-[1em] h-full
            bg-gradient-to-r from-transparent via-current to-transparent
            rounded-inherit -rotate-45 animate-blink
            ${styles['starfall-star-glow']}
          `}
          style={{
            willChange: 'transform, opacity'
          }}
        />
      </div>
    </motion.div>
  );
};

/**
 * Memoized Starfall component for optimal performance
 */
export const Starfall = memo(StarfallComponent);

/**
 * Set display name for debugging purposes
 */
Starfall.displayName = 'Starfall';

export default Starfall;
