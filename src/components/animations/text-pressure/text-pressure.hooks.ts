/**
 * Text Pressure Animation Component Hooks
 */

import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_SETTINGS } from './text-pressure.constants';
import { CharPosition, MousePosition } from './text-pressure.types';
import { calculateAttributeValue, calculateDistance } from './text-pressure.utils';

/**
 * Hook to handle mouse and touch interactions
 *
 * @returns Reference to mouse position and cursor position
 */
export const useMouseTracking = () => {
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const cursorRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return { mouseRef, cursorRef };
};

/**
 * Hook to calculate and set the font size and scale
 *
 * @param containerRef - Reference to the container element
 * @param titleRef - Reference to the title element
 * @param chars - Array of characters
 * @param scale - Whether to enable scaling
 * @param minFontSize - Minimum font size
 * @returns Font size, scale Y, and line height
 */
export const useFontSizing = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  titleRef: MutableRefObject<HTMLHeadingElement | null>,
  chars: string[],
  scale: boolean,
  minFontSize: number
) => {
  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const calculateSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [scale, chars.length, minFontSize, containerRef, titleRef]);

  useEffect(() => {
    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, [calculateSize]);

  return { fontSize, scaleY, lineHeight };
};

/**
 * Hook to animate character variations based on mouse position
 *
 * @param titleRef - Reference to the title element
 * @param spansRef - Reference to span elements
 * @param mouseRef - Reference to mouse position
 * @param cursorRef - Reference to cursor position
 * @param options - Animation options
 * @returns Nothing
 */
export const useCharacterAnimation = (
  titleRef: MutableRefObject<HTMLHeadingElement | null>,
  spansRef: MutableRefObject<(HTMLSpanElement | null)[]>,
  mouseRef: MutableRefObject<MousePosition>,
  cursorRef: MutableRefObject<MousePosition>,
  options: {
    width: boolean;
    weight: boolean;
    italic: boolean;
    alpha: boolean;
    chars: string[];
  }
) => {
  const { width, weight, italic, alpha, chars } = options;

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      // Apply easing to mouse movement
      mouseRef.current.x +=
        (cursorRef.current.x - mouseRef.current.x) / DEFAULT_SETTINGS.MOUSE_EASING;
      mouseRef.current.y +=
        (cursorRef.current.y - mouseRef.current.y) / DEFAULT_SETTINGS.MOUSE_EASING;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter: CharPosition = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = calculateDistance(mouseRef.current, charCenter);

          // Calculate font variation values based on distance
          const wdth = width
            ? Math.floor(
                calculateAttributeValue(
                  d,
                  DEFAULT_SETTINGS.FONT_VARIATION_MIN.WIDTH,
                  DEFAULT_SETTINGS.FONT_VARIATION_MAX.WIDTH,
                  maxDist
                )
              )
            : 100;

          const wght = weight
            ? Math.floor(
                calculateAttributeValue(
                  d,
                  DEFAULT_SETTINGS.FONT_VARIATION_MIN.WEIGHT,
                  DEFAULT_SETTINGS.FONT_VARIATION_MAX.WEIGHT,
                  maxDist
                )
              )
            : 400;

          const italVal = italic
            ? calculateAttributeValue(
                d,
                DEFAULT_SETTINGS.FONT_VARIATION_MIN.ITALIC,
                DEFAULT_SETTINGS.FONT_VARIATION_MAX.ITALIC,
                maxDist
              ).toFixed(2)
            : '0';

          const alphaVal = alpha ? calculateAttributeValue(d, 0, 1, maxDist).toFixed(2) : '1';

          // Apply the calculated values to the span element
          span.style.opacity = alphaVal;
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, weight, italic, alpha, chars.length]);
};
