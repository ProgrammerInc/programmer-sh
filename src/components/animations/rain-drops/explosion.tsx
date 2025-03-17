/**
 * Explosion component creates particle animation effects when raindrops hit a surface
 */
'use client';

import { cn } from '@/utils/app.utils';
import { motion } from 'motion/react';
import { memo, useMemo } from 'react';

import { ANIMATION_SETTINGS } from './rain-drops.constants';
import styles from './rain-drops.module.css';
import { ExplosionProps } from './rain-drops.types';
import { generateExplosionParticles, getRandomParticleDuration } from './rain-drops.utils';

/**
 * Explosion component creates particle animation effects when raindrops hit a surface
 *
 * @component
 */
const Explosion = memo(({ className, style, ...props }: ExplosionProps) => {
  // Memoize explosion particles to prevent recreation on each render
  const explosionParticles = useMemo(
    () => generateExplosionParticles(ANIMATION_SETTINGS.EXPLOSION_PARTICLE_COUNT),
    []
  );

  return (
    <div {...props} className={cn(styles['rain-drops__explosion'], className)} style={style}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className={styles['rain-drops__explosion-glow']}
      />

      {explosionParticles.map(particle => (
        <motion.span
          key={particle.id}
          initial={{ x: particle.initialX, y: particle.initialY, opacity: 1 }}
          animate={{
            x: particle.directionX,
            y: particle.directionY,
            opacity: 0
          }}
          transition={{
            duration: getRandomParticleDuration(),
            ease: 'easeOut'
          }}
          className={styles['rain-drops__explosion-particle']}
        />
      ))}
    </div>
  );
});

Explosion.displayName = 'Explosion';

export default Explosion;
