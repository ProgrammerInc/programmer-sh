/**
 * Custom hooks for the Scroll Velocity animation component
 */
import {
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'framer-motion';
import { RefObject, useRef } from 'react';

import {
  DEFAULT_DAMPING,
  DEFAULT_STIFFNESS,
  DEFAULT_VELOCITY_MAPPING
} from './scroll-velocity.constants';
import { VelocityMapping } from './scroll-velocity.types';
import { useElementWidth, wrapValue } from './scroll-velocity.utils';

/**
 * Hook for handling text animation based on scroll velocity
 *
 * @param baseVelocity - Base velocity for the animation
 * @param scrollContainerRef - Reference to the scroll container
 * @param damping - Damping factor for spring animation
 * @param stiffness - Stiffness factor for spring animation
 * @param velocityMapping - Mapping configuration for scroll velocity
 * @returns Object containing motion values and refs for the animation
 */
export const useVelocityAnimation = (
  baseVelocity: number,
  scrollContainerRef?: RefObject<HTMLElement>,
  damping: number = DEFAULT_DAMPING,
  stiffness: number = DEFAULT_STIFFNESS,
  velocityMapping: VelocityMapping = DEFAULT_VELOCITY_MAPPING
) => {
  // Set up base motion value for x-position
  const baseX = useMotionValue(0);

  // Get scroll position and velocity
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);

  // Create smooth velocity using spring physics
  const smoothVelocity = useSpring(scrollVelocity, {
    damping,
    stiffness
  });

  // Transform scroll velocity to animation velocity factor
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  );

  // Reference to track animation direction
  const directionFactor = useRef<number>(1);

  // Reference for measuring element width
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  // Transform baseX to create a wrapping effect based on element width
  const x = useTransform(baseX, v => {
    if (copyWidth === 0) return '0px';
    return `${wrapValue(-copyWidth, 0, v)}px`;
  });

  // Animation frame handler for continuous movement
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Change direction based on scroll velocity
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Scale the movement by velocity factor
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    // Update the base x position
    baseX.set(baseX.get() + moveBy);
  });

  return {
    x,
    copyRef,
    copyWidth
  };
};
