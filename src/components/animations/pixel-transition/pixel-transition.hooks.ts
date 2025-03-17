/**
 * Custom hooks for the Pixel Transition animation component
 */

import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { CSS_CLASSES } from './pixel-transition.constants';
import { generatePixelGrid } from './pixel-transition.utils';

/**
 * Hook to manage the pixel transition animation
 *
 * @param gridSize - Size of the pixel grid (NxN)
 * @param pixelColor - Color of the pixels
 * @param animationStepDuration - Duration of the animation in seconds
 * @returns Animation state and handler functions
 */
export const usePixelTransition = (
  gridSize: number,
  pixelColor: string,
  animationStepDuration: number
) => {
  // Track animation state
  const [isActive, setIsActive] = useState<boolean>(false);

  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pixelGridRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);

  // Ref for GSAP tween to properly clean up
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);

  // Initialize pixel grid
  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    generatePixelGrid(pixelGridEl, gridSize, pixelColor);
  }, [gridSize, pixelColor]);

  /**
   * Animate the pixel transition
   *
   * @param activate - Whether to show the second content (true) or revert to first content (false)
   */
  const animatePixels = (activate: boolean): void => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>(`.${CSS_CLASSES.PIXEL}`);
    if (!pixels.length) return;

    // Stop any ongoing animations
    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    // Hide all pixels initially
    gsap.set(pixels, { display: 'none' });

    // Calculate stagger timing
    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    // First wave: Show pixels in random order
    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });

    // We don't need this anymore since we're using CSS classes for active state
    // But we'll keep the delayed call for proper timing of the animation
    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      setIsActive(activate);
    });

    // Second wave: Hide pixels in random order
    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });
  };

  /**
   * Handle mouse enter event
   */
  const handleMouseEnter = (): void => {
    if (!isActive) animatePixels(true);
  };

  /**
   * Handle mouse leave event
   */
  const handleMouseLeave = (): void => {
    if (isActive) animatePixels(false);
  };

  /**
   * Handle click event (for touch devices)
   */
  const handleClick = (): void => {
    animatePixels(!isActive);
  };

  return {
    isActive,
    containerRef,
    pixelGridRef,
    activeRef,
    handleMouseEnter,
    handleMouseLeave,
    handleClick
  };
};
