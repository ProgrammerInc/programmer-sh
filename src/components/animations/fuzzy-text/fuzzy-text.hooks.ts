/**
 * Custom hooks for the FuzzyText component
 */

import React, { Children, RefObject, useCallback, useEffect } from 'react';
import {
  DEFAULT_BASE_INTENSITY,
  DEFAULT_FUZZ_RANGE,
  DEFAULT_HORIZONTAL_MARGIN,
  DEFAULT_VERTICAL_MARGIN,
  DEFAULT_WIDTH_BUFFER
} from './fuzzy-text.constants';

/**
 * Calculate numeric font size from various possible inputs
 *
 * @returns A function that calculates numeric font size
 */
export const useCalculateNumericFontSize = () => {
  return useCallback((size: number | string): number => {
    if (typeof size === 'number') return size;

    const temp = document.createElement('span');
    temp.style.fontSize = size;
    document.body.appendChild(temp);
    const computedSize = window.getComputedStyle(temp).fontSize;
    const numericSize = parseFloat(computedSize);
    document.body.removeChild(temp);
    return numericSize;
  }, []);
};

/**
 * Check if a point is inside the text area
 *
 * @returns A function that determines if coordinates are inside a bounding box
 */
export const useIsInsideTextArea = () => {
  return useCallback(
    (x: number, y: number, left: number, right: number, top: number, bottom: number): boolean => {
      return x >= left && x <= right && y >= top && y <= bottom;
    },
    []
  );
};

/**
 * Setup fuzzy text animation with canvas
 *
 * @param params Configuration parameters
 */
export const useFuzzyTextEffect = ({
  canvasRef,
  children,
  fontSize,
  fontWeight,
  fontFamily,
  color,
  enableHover,
  baseIntensity = DEFAULT_BASE_INTENSITY,
  hoverIntensity,
  calculateNumericFontSize,
  isInsideTextArea
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  children: React.ReactNode;
  fontSize: number | string;
  fontWeight: string | number;
  fontFamily: string;
  color: string;
  enableHover: boolean;
  baseIntensity: number;
  hoverIntensity: number;
  calculateNumericFontSize: (size: number | string) => number;
  isInsideTextArea: (
    x: number,
    y: number,
    left: number,
    right: number,
    top: number,
    bottom: number
  ) => boolean;
}) => {
  useEffect(() => {
    let animationFrameId: number;
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      // Wait for fonts to load to ensure accurate text measurements
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Determine the actual font family
      const computedFontFamily =
        fontFamily === 'inherit'
          ? window.getComputedStyle(canvas).fontFamily || 'sans-serif'
          : fontFamily;

      // Convert fontSize to string format for canvas
      const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
      const numericFontSize = calculateNumericFontSize(fontSize);

      // Get the text from children
      const text = Children.toArray(children).join('');

      // Create offscreen canvas for rendering text
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      // Set font and measure text dimensions
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      const metrics = offCtx.measureText(text);

      // Calculate text boundaries
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      // Set up offscreen canvas dimensions
      const extraWidthBuffer = DEFAULT_WIDTH_BUFFER;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      // Render text to offscreen canvas
      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = color;
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);

      // Set up main canvas dimensions
      const horizontalMargin = DEFAULT_HORIZONTAL_MARGIN;
      const verticalMargin = DEFAULT_VERTICAL_MARGIN;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin);

      // Calculate interactive area boundaries
      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      const fuzzRange = DEFAULT_FUZZ_RANGE;

      // Animation loop function
      const run = () => {
        if (isCancelled) return;

        // Clear canvas with appropriate boundaries
        ctx.clearRect(
          -fuzzRange,
          -fuzzRange,
          offscreenWidth + 2 * fuzzRange,
          tightHeight + 2 * fuzzRange
        );

        // Apply fuzzy effect with current intensity
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
        }

        animationFrameId = window.requestAnimationFrame(run);
      };

      run();

      // Event handlers for interactivity
      const handleMouseMove = (e: MouseEvent) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHovering = isInsideTextArea(
          x,
          y,
          interactiveLeft,
          interactiveRight,
          interactiveTop,
          interactiveBottom
        );
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!enableHover) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isHovering = isInsideTextArea(
          x,
          y,
          interactiveLeft,
          interactiveRight,
          interactiveTop,
          interactiveBottom
        );
      };

      const handleTouchEnd = () => {
        isHovering = false;
      };

      // Add event listeners if hover is enabled
      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, {
          passive: false
        });
        canvas.addEventListener('touchend', handleTouchEnd);
      }

      // Create cleanup function
      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseleave', handleMouseLeave);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
        }
      };

      // Store cleanup function for future use
      return cleanup;
    };

    let cleanupFunction: (() => void) | undefined;

    init().then(cleanup => {
      cleanupFunction = cleanup;
    });

    // Main cleanup effect
    return () => {
      isCancelled = true;
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      if (cleanupFunction) {
        cleanupFunction();
      }
    };
  }, [
    canvasRef,
    children,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    enableHover,
    baseIntensity,
    hoverIntensity,
    calculateNumericFontSize,
    isInsideTextArea
  ]);
};
