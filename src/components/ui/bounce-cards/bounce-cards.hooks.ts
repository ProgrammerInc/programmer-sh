'use client';

import { gsap } from 'gsap';
import { useCallback, useEffect } from 'react';
import { getNoRotationTransform, getPushedTransform } from './bounce-cards.utils';

/**
 * Hook to manage card animations for the BounceCards component
 *
 * @param images - Array of image URLs
 * @param transformStyles - Array of transform styles for each card
 * @param animationDelay - Delay before animation starts
 * @param animationStagger - Time between each card animation
 * @param easeType - GSAP easing type
 * @param enableHover - Whether hover interactions are enabled
 * @returns Callbacks for handling hover interactions
 */
export const useBounceCardsAnimation = (
  images: string[],
  transformStyles: string[],
  animationDelay: number,
  animationStagger: number,
  easeType: string,
  enableHover: boolean
) => {
  // Initial animation effect
  useEffect(() => {
    gsap.fromTo(
      '.card',
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay
      }
    );
  }, [animationDelay, animationStagger, easeType]);

  // Handler for pushing sibling cards on hover
  const pushSiblings = useCallback(
    (hoveredIdx: number) => {
      if (!enableHover) return;

      images.forEach((_, i) => {
        const selector = `.card-${i}`;
        gsap.killTweensOf(selector);

        const baseTransform = transformStyles[i] || 'none';

        if (i === hoveredIdx) {
          const noRotation = getNoRotationTransform(baseTransform);
          gsap.to(selector, {
            transform: noRotation,
            duration: 0.4,
            ease: 'back.out(1.4)',
            overwrite: 'auto'
          });
        } else {
          const offsetX = i < hoveredIdx ? -160 : 160;
          const pushedTransform = getPushedTransform(baseTransform, offsetX);

          const distance = Math.abs(hoveredIdx - i);
          const delay = distance * 0.05;

          gsap.to(selector, {
            transform: pushedTransform,
            duration: 0.4,
            ease: 'back.out(1.4)',
            delay,
            overwrite: 'auto'
          });
        }
      });
    },
    [enableHover, images, transformStyles]
  );

  // Handler for resetting card positions on hover out
  const resetSiblings = useCallback(() => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || 'none';
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    });
  }, [enableHover, images, transformStyles]);

  return { pushSiblings, resetSiblings };
};
