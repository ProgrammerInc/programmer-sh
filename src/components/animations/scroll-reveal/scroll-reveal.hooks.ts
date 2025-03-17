/**
 * Custom hooks for the Scroll Reveal animation component
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useEffect } from 'react';

import {
  CSS_CLASSES,
  DEFAULT_BLUR_ANIMATION,
  DEFAULT_OPACITY_ANIMATION,
  DEFAULT_ROTATION_ANIMATION
} from './scroll-reveal.constants';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for initializing and managing the scroll reveal animations
 *
 * @param containerRef - Reference to the container element
 * @param scrollerRef - Reference to the scrollable container (defaults to window)
 * @param enableBlur - Whether to enable blur effect
 * @param baseOpacity - Base opacity for words before animation
 * @param baseRotation - Base rotation in degrees before animation
 * @param blurStrength - Blur strength in pixels
 * @param rotationEnd - ScrollTrigger end position for rotation animation
 * @param wordAnimationEnd - ScrollTrigger end position for word animation
 */
export const useScrollRevealAnimation = (
  containerRef: RefObject<HTMLElement>,
  scrollerRef?: RefObject<HTMLElement>,
  enableBlur: boolean = true,
  baseOpacity: number = 0.1,
  baseRotation: number = 3,
  blurStrength: number = 4,
  rotationEnd: string = 'bottom bottom',
  wordAnimationEnd: string = 'bottom bottom'
): void => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Determine scroller (either the provided ref or window)
    const scroller = scrollerRef?.current || window;

    // Create rotation animation
    const rotationAnimation = {
      ...DEFAULT_ROTATION_ANIMATION,
      from: {
        ...DEFAULT_ROTATION_ANIMATION.from,
        rotate: baseRotation
      },
      scrollTrigger: {
        ...DEFAULT_ROTATION_ANIMATION.scrollTrigger,
        end: rotationEnd
      }
    };

    // Apply container rotation animation
    gsap.fromTo(container, rotationAnimation.from, {
      ...rotationAnimation.to,
      scrollTrigger: {
        ...rotationAnimation.scrollTrigger,
        trigger: container,
        scroller
      }
    });

    // Get all word elements
    const wordElements = container.querySelectorAll(`.${CSS_CLASSES.WORD}`);
    if (wordElements.length === 0) return;

    // Create opacity animation
    const opacityAnimation = {
      ...DEFAULT_OPACITY_ANIMATION,
      from: {
        ...DEFAULT_OPACITY_ANIMATION.from,
        opacity: baseOpacity
      },
      scrollTrigger: {
        ...DEFAULT_OPACITY_ANIMATION.scrollTrigger,
        end: wordAnimationEnd
      }
    };

    // Apply opacity animation to words
    gsap.fromTo(wordElements, opacityAnimation.from, {
      ...opacityAnimation.to,
      scrollTrigger: {
        ...opacityAnimation.scrollTrigger,
        trigger: container,
        scroller
      }
    });

    // Apply blur animation if enabled
    if (enableBlur) {
      // Create blur animation
      const blurAnimation = {
        ...DEFAULT_BLUR_ANIMATION,
        from: {
          filter: `blur(${blurStrength}px)`
        },
        scrollTrigger: {
          ...DEFAULT_BLUR_ANIMATION.scrollTrigger,
          end: wordAnimationEnd
        }
      };

      gsap.fromTo(wordElements, blurAnimation.from, {
        ...blurAnimation.to,
        scrollTrigger: {
          ...blurAnimation.scrollTrigger,
          trigger: container,
          scroller
        }
      });
    }

    // Cleanup animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [
    containerRef,
    scrollerRef,
    enableBlur,
    baseOpacity,
    baseRotation,
    blurStrength,
    rotationEnd,
    wordAnimationEnd
  ]);
};
