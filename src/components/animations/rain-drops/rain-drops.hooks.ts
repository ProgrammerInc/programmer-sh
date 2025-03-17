/**
 * Custom hooks for the Rain Drops animation component
 */
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ANIMATION_SETTINGS } from './rain-drops.constants';
import { BeamOptions, CollisionState } from './rain-drops.types';
import { calculateRelativePosition } from './rain-drops.utils';

/**
 * Hook for managing collision detection and state
 *
 * @param parentRef - Reference to the parent container
 * @param containerRef - Reference to the bottom surface container
 * @param beamRef - Reference to the beam element
 * @returns Collision state and management functions
 */
export const useCollisionDetection = (
  parentRef: React.RefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  beamRef: React.RefObject<HTMLDivElement>
) => {
  // Track collision state
  const [collision, setCollision] = useState<CollisionState>({
    detected: false,
    coordinates: null
  });

  // Track whether collision was detected in the current cycle
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  // Track the beam animation key for resetting
  const [beamKey, setBeamKey] = useState(0);

  // Collision detection function with useCallback to prevent recreation on each render
  const checkCollision = useCallback(() => {
    if (beamRef.current && containerRef.current && parentRef.current && !cycleCollisionDetected) {
      const beamRect = beamRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();

      if (beamRect.bottom >= containerRect.top) {
        const relativePosition = calculateRelativePosition(
          beamRect.left + beamRect.width / 2,
          beamRect.bottom,
          parentRect
        );

        setCollision({
          detected: true,
          coordinates: relativePosition
        });

        setCycleCollisionDetected(true);
      }
    }
  }, [beamRef, containerRef, cycleCollisionDetected, parentRef]);

  // Setup collision detection interval
  useEffect(() => {
    const animationInterval = setInterval(
      checkCollision,
      ANIMATION_SETTINGS.COLLISION_CHECK_INTERVAL
    );

    return () => clearInterval(animationInterval);
  }, [checkCollision]);

  // Handle collision detection and reset with proper cleanup
  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      const resetCollision = setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, ANIMATION_SETTINGS.COLLISION_RESET_TIMEOUT);

      const resetBeam = setTimeout(() => {
        setBeamKey(prevKey => prevKey + 1);
      }, ANIMATION_SETTINGS.COLLISION_RESET_TIMEOUT);

      // Cleanup timeouts on component unmount or state change
      return () => {
        clearTimeout(resetCollision);
        clearTimeout(resetBeam);
      };
    }

    return undefined;
  }, [collision]);

  return {
    collision,
    beamKey
  };
};

/**
 * Hook for managing beam animation props
 *
 * @param options - Beam configuration options
 * @returns Memoized animation properties for the beam
 */
export const useBeamAnimation = (options: BeamOptions = {}) => {
  const initialProps = useMemo(
    () => ({
      translateY: options.initialY || '-200px',
      translateX: options.initialX || '0px',
      rotate: options.rotate || 0
    }),
    [options.initialY, options.initialX, options.rotate]
  );

  const animateVariants = useMemo(
    () => ({
      animate: {
        translateY: options.translateY || '1800px',
        translateX: options.translateX || '0px',
        rotate: options.rotate || 0
      }
    }),
    [options.translateY, options.translateX, options.rotate]
  );

  const transitionProps = useMemo(
    () => ({
      duration: options.duration || ANIMATION_SETTINGS.DEFAULT_BEAM_DURATION,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'linear',
      delay: options.delay || 0,
      repeatDelay: options.repeatDelay || 0
    }),
    [options.duration, options.delay, options.repeatDelay]
  );

  return {
    initialProps,
    animateVariants,
    transitionProps
  };
};
