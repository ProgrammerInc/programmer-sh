'use client';

import Particles from '@tsparticles/react';
import { motion } from 'motion/react';
import { FC, memo, useId } from 'react';

import { CSS_CLASSES } from './sparkles.constants';
import { useParticlesAnimation, useParticlesInit } from './sparkles.hooks';
import styles from './sparkles.module.css';
import { SparklesProps } from './sparkles.types';
import { cn, generateParticlesConfig } from './sparkles.utils';

/**
 * Sparkles component - Creates an animated particle effect with customizable properties
 *
 * This component renders an animated sparkle effect using tsParticles, with
 * support for various animation and appearance customizations.
 *
 * @param {SparklesProps} props - Component properties
 * @returns {JSX.Element} The Sparkles component
 */
export const SparklesCore: FC<SparklesProps> = memo(function SparklesCore(props) {
  const { id, className } = props;
  const { init } = useParticlesInit();
  const { controls, particlesLoaded } = useParticlesAnimation();
  const generatedId = useId();

  return (
    <motion.div
      animate={controls}
      className={cn('opacity-0', styles[CSS_CLASSES.CONTAINER], className)}
      aria-hidden="true"
    >
      {init && (
        <Particles
          id={id || generatedId}
          className={cn(styles[CSS_CLASSES.PARTICLES_WRAPPER])}
          particlesLoaded={particlesLoaded}
          options={generateParticlesConfig(props)}
        />
      )}
    </motion.div>
  );
});

SparklesCore.displayName = 'SparklesCore';

/**
 * Sparkles component - Alias for SparklesCore for backward compatibility
 */
export const Sparkles = SparklesCore;

export default Sparkles;
