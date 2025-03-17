/**
 * Custom hooks for the Scroll Float animation component
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useEffect } from 'react';

import { DEFAULT_ANIMATION } from './scroll-float.constants';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for initializing and managing the scroll float animation
 *
 * @param containerRef - Reference to the container element
 * @param scrollerRef - Reference to the scrollable container (defaults to window)
 * @param duration - Animation duration in seconds
 * @param ease - GSAP easing function
 * @param scrollStart - ScrollTrigger start position
 * @param scrollEnd - ScrollTrigger end position
 * @param stagger - Delay between each character's animation
 */
export const useScrollFloatAnimation = (
  containerRef: RefObject<HTMLElement>,
  scrollerRef?: RefObject<HTMLElement>,
  duration: number = 1,
  ease: string = 'back.inOut(2)',
  scrollStart: string = 'center bottom+=50%',
  scrollEnd: string = 'bottom bottom-=40%',
  stagger: number = 0.03
): void => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Determine scroller (either the provided ref or window)
    const scroller = scrollerRef?.current || window;

    // Find all character elements
    const charElements = container.querySelectorAll('.char');
    if (charElements.length === 0) return;

    // Create animation
    const animation = gsap.fromTo(
      charElements,
      { ...DEFAULT_ANIMATION.from },
      {
        ...DEFAULT_ANIMATION.to,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: container,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );

    // Cleanup animation on unmount
    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [containerRef, scrollerRef, duration, ease, scrollStart, scrollEnd, stagger]);
};
