'use client';

import { motion } from 'motion/react';
import { FC, memo } from 'react';
import { StarsBackground } from '..';

import { DEFAULT_GRADIENTS, DEFAULT_SETTINGS } from './spotlight.constants';
import { useSpotlightMotion } from './spotlight.hooks';
import { SpotlightNewProps } from './spotlight.types';
import {
  createMainGradientStyle,
  createSecondaryGradientStyle,
  createTertiaryGradientStyle
} from './spotlight.utils';

/**
 * An enhanced Spotlight component that renders customizable animated gradient spotlights
 * with motion effects and optional stars background
 *
 * @example
 * <Spotlight
 *   gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(270, 100%, 85%, .08) 0, hsla(270, 100%, 55%, .02) 50%, hsla(270, 100%, 45%, 0) 80%)"
 *   width={600}
 *   height={1400}
 *   duration={5}
 *   withStars={true}
 * />
 *
 * @param {SpotlightNewProps} props - The component props
 * @returns The enhanced Spotlight component
 */
export const SpotlightComponent: FC<SpotlightNewProps> = ({
  gradientFirst = DEFAULT_GRADIENTS.PRIMARY,
  gradientSecond = DEFAULT_GRADIENTS.SECONDARY,
  gradientThird = DEFAULT_GRADIENTS.TERTIARY,
  translateY = DEFAULT_SETTINGS.TRANSLATE_Y,
  width = DEFAULT_SETTINGS.WIDTH,
  height = DEFAULT_SETTINGS.HEIGHT,
  smallWidth = DEFAULT_SETTINGS.SMALL_WIDTH,
  duration = DEFAULT_SETTINGS.DURATION,
  xOffset = DEFAULT_SETTINGS.X_OFFSET,
  withStars = false
}) => {
  // Get motion animation properties
  const motionProps = useSpotlightMotion(duration, xOffset);

  return (
    <motion.div
      initial={motionProps.initial}
      animate={motionProps.animate}
      transition={motionProps.transition}
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <motion.div
        animate={motionProps.leftAnimation}
        transition={motionProps.animationTransition}
        className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
      >
        <div
          style={createMainGradientStyle(translateY, gradientFirst, width, height)}
          className="absolute top-0 left-0"
        />

        <div
          style={createSecondaryGradientStyle(gradientSecond, smallWidth, height, false)}
          className="absolute top-0 left-0 origin-top-left"
        />

        <div
          style={createTertiaryGradientStyle(gradientThird, smallWidth, height, false)}
          className="absolute top-0 left-0 origin-top-left"
        />
      </motion.div>

      <motion.div
        animate={motionProps.rightAnimation}
        transition={motionProps.animationTransition}
        className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
      >
        <div
          style={createMainGradientStyle(translateY, gradientFirst, width, height, true)}
          className="absolute top-0 right-0"
        />

        <div
          style={createSecondaryGradientStyle(gradientSecond, smallWidth, height, true)}
          className="absolute top-0 right-0 origin-top-right"
        />

        <div
          style={createTertiaryGradientStyle(gradientThird, smallWidth, height, true)}
          className="absolute top-0 right-0 origin-top-right"
        />
      </motion.div>

      {withStars && <StarsBackground className="stars-background" />}
    </motion.div>
  );
};

/**
 * Memoized enhanced Spotlight component for optimal performance
 */
export const Spotlight = memo(SpotlightComponent);

/**
 * Set display name for debugging purposes
 */
Spotlight.displayName = 'SpotlightEnhanced';

export default Spotlight;
