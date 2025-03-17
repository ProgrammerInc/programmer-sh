/**
 * Custom hooks for the ASCII Text component
 */

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { DEFAULT_ANIMATION_CONFIG, DEFAULT_ASCII_TEXT_CONFIG } from './ascii-text.constants';
import { ASCIITextAnimationConfig, ASCIITextProps } from './ascii-text.types';
import { CanvasAscii } from './canvas-ascii.class';

/**
 * Hook to manage the lifecycle and state of the ASCII text animation
 *
 * @param props - Props for the ASCII text component
 * @returns Object containing refs and utility functions
 */
export function useAsciiTextAnimation({
  text = DEFAULT_ASCII_TEXT_CONFIG.text,
  asciiFontSize = DEFAULT_ASCII_TEXT_CONFIG.asciiFontSize,
  textFontSize = DEFAULT_ASCII_TEXT_CONFIG.textFontSize,
  textColor = DEFAULT_ASCII_TEXT_CONFIG.textColor,
  planeBaseHeight = DEFAULT_ASCII_TEXT_CONFIG.planeBaseHeight,
  enableWaves = DEFAULT_ASCII_TEXT_CONFIG.enableWaves
}: ASCIITextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<CanvasAscii | null>(null);

  // Memoize the animation configuration to prevent recreating it on each render
  const animationConfig = useMemo<ASCIITextAnimationConfig>(
    () => ({
      ...DEFAULT_ANIMATION_CONFIG,
      // Calculate wave amplitude based on enableWaves setting
      waveAmplitude: enableWaves ? DEFAULT_ANIMATION_CONFIG.waveAmplitude : 0.0
    }),
    [enableWaves]
  );

  /**
   * Initialize the ASCII animation
   */
  const initializeAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    // Create the ASCII effect instance with our configuration
    asciiRef.current = new CanvasAscii(
      { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },
      containerRef.current,
      width,
      height
    );
    // Note: The new CanvasAscii class automatically loads the font and starts animation in constructor
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);

  /**
   * Handle responsive resizing of the ASCII animation
   */
  const setupResizeObserver = useCallback(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver(entries => {
      if (!entries[0]) return;
      const { width, height } = entries[0].contentRect;
      if (asciiRef.current) {
        asciiRef.current.resize(width, height);
      }
    });

    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /**
   * Initialize the animation and set up cleanup
   */
  useEffect(() => {
    initializeAnimation();
    const cleanupResizeObserver = setupResizeObserver();

    // Clean up on unmount
    return () => {
      if (cleanupResizeObserver) cleanupResizeObserver();
      if (asciiRef.current) {
        asciiRef.current.dispose();
        asciiRef.current = null;
      }
    };
  }, [initializeAnimation, setupResizeObserver]);

  // Memoize container styles to prevent unnecessary re-renders
  const containerStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      width: '100%',
      height: '100%'
    }),
    []
  );

  return {
    containerRef,
    containerStyle,
    asciiInstance: asciiRef.current
  };
}
