'use client';

import { memo, useRef } from 'react';
import {
  DEFAULT_BASE_INTENSITY,
  DEFAULT_COLOR,
  DEFAULT_ENABLE_HOVER,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_HOVER_INTENSITY
} from './fuzzy-text.constants';
import {
  useCalculateNumericFontSize,
  useFuzzyTextEffect,
  useIsInsideTextArea
} from './fuzzy-text.hooks';
import { FuzzyTextProps } from './fuzzy-text.types';

/**
 * FuzzyText component renders text with a fuzzy/glitchy effect
 * that can intensify on hover for an interactive experience.
 *
 * @param props Component properties
 * @returns Memoized React component with fuzzy text effect
 */
export const FuzzyText = memo(function FuzzyText({
  children,
  fontSize = DEFAULT_FONT_SIZE,
  fontWeight = DEFAULT_FONT_WEIGHT,
  fontFamily = DEFAULT_FONT_FAMILY,
  color = DEFAULT_COLOR,
  enableHover = DEFAULT_ENABLE_HOVER,
  baseIntensity = DEFAULT_BASE_INTENSITY,
  hoverIntensity = DEFAULT_HOVER_INTENSITY
}: FuzzyTextProps) {
  // Reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Custom hooks for calculations and effects
  const calculateNumericFontSize = useCalculateNumericFontSize();
  const isInsideTextArea = useIsInsideTextArea();

  // Setup and run the fuzzy text animation effect
  useFuzzyTextEffect({
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
  });

  return <canvas ref={canvasRef} />;
});

export default FuzzyText;
