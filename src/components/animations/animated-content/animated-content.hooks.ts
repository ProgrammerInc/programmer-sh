/**
 * Custom hooks for the AnimatedContent animation component
 */
import { SpringConfig, useSpring } from '@react-spring/web';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_VALUES, DIRECTION_TO_TRANSFORM_MAP } from './animated-content.constants';
import { AnimationDirection } from './animated-content.types';

/**
 * Hook to manage the intersection observer for triggering animations
 * @param ref Reference to the element to observe
 * @param threshold Threshold for intersection observer
 * @param delay Delay before triggering animation after intersection
 * @returns Whether the element is in view
 */
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  threshold: number = DEFAULT_VALUES.THRESHOLD,
  delay: number = DEFAULT_VALUES.DELAY
): boolean => {
  const [inView, setInView] = useState<boolean>(false);

  // Callback for intersection observer when element comes into view
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setTimeout(() => {
          setInView(true);
        }, delay);
      }
    },
    [delay]
  );

  // Set up the intersection observer to trigger animation when element is in view
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(handleIntersection, { threshold });

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, handleIntersection, ref]);

  return inView;
};

/**
 * Hook to calculate transform values based on animation parameters
 * @param direction Animation direction (vertical or horizontal)
 * @param distance Distance in pixels for the animation
 * @param reverse Whether to reverse the animation direction
 * @param scale Initial scale value
 * @returns Object containing initialTransform and finalTransform values
 */
export const useTransformValues = (
  direction: `${AnimationDirection}` = DEFAULT_VALUES.DIRECTION,
  distance: number = DEFAULT_VALUES.DISTANCE,
  reverse: boolean = DEFAULT_VALUES.REVERSE,
  scale: number = DEFAULT_VALUES.SCALE
) => {
  // Determine initial transform based on direction and distance
  const initialTransform = useMemo(
    () =>
      `translate${DIRECTION_TO_TRANSFORM_MAP[direction as AnimationDirection]}(${reverse ? `-${distance}px` : `${distance}px`}) scale(${scale})`,
    [direction, distance, reverse, scale]
  );

  // Calculate the final transform when in view
  const finalTransform = useMemo(
    () => `translate${DIRECTION_TO_TRANSFORM_MAP[direction as AnimationDirection]}(0px) scale(1)`,
    [direction]
  );

  return { initialTransform, finalTransform };
};

/**
 * Hook to create spring animation properties for the AnimatedContent component
 * @param inView Whether the element is in view
 * @param initialTransform Initial transform value
 * @param finalTransform Final transform value when in view
 * @param initialOpacity Initial opacity value
 * @param animateOpacity Whether to animate opacity
 * @param config Spring configuration
 * @returns Spring animation properties
 */
export const useAnimationSpring = (
  inView: boolean,
  initialTransform: string,
  finalTransform: string,
  initialOpacity: number = DEFAULT_VALUES.INITIAL_OPACITY,
  animateOpacity: boolean = DEFAULT_VALUES.ANIMATE_OPACITY,
  config: SpringConfig
) => {
  // Calculate the animation "from" state
  const fromState = useMemo(
    () => ({
      transform: initialTransform,
      opacity: animateOpacity ? initialOpacity : 1
    }),
    [initialTransform, animateOpacity, initialOpacity]
  );

  // Calculate the animation "to" state when in view
  const toState = useMemo(
    () => ({
      transform: finalTransform,
      opacity: 1
    }),
    [finalTransform]
  );

  // Set up spring animation
  return useSpring({
    from: fromState,
    to: inView ? toState : undefined,
    config
  });
};
