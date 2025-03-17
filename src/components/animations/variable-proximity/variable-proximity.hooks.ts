/**
 * Variable Proximity Animation Component Hooks
 */

import { MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { ANIMATION_SETTINGS } from './variable-proximity.constants';
import { AxisSetting, FalloffType, MousePosition } from './variable-proximity.types';

/**
 * Hook to manage animation frame updates
 *
 * @param callback - Function to call on each animation frame
 */
export const useAnimationFrame = (callback: () => void) => {
  // Store the callback in a ref to avoid re-creating the effect
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let frameId: number;
    let lastTime = 0;

    const loop = (time: number) => {
      if (time - lastTime >= ANIMATION_SETTINGS.FRAME_THROTTLE) {
        callbackRef.current();
        lastTime = time;
      }
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);
};

/**
 * Hook to track mouse position relative to a container
 *
 * @param containerRef - Reference to the container element
 * @returns Reference to the current mouse position
 */
export const useMousePositionRef = (containerRef: MutableRefObject<HTMLElement | null>) => {
  const positionRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
};

/**
 * Hook to parse font variation settings strings into structured data
 *
 * @param fromFontVariationSettings - Font variation settings for the furthest distance
 * @param toFontVariationSettings - Font variation settings for the closest distance
 * @returns Array of parsed axis settings
 */
export const useParsedFontSettings = (
  fromFontVariationSettings: string,
  toFontVariationSettings: string
) => {
  return useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/["']/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);
};

/**
 * Hook to calculate letter proximity effects
 *
 * @param containerRef - Reference to the container element
 * @param letterRefs - References to letter elements
 * @param mousePositionRef - Reference to current mouse position
 * @param parsedSettings - Parsed font variation settings
 * @param radius - Effect radius in pixels
 * @param falloff - Falloff type for the effect
 * @param fromFontVariationSettings - Default font variation settings
 * @returns Reference to the interpolated settings
 */
export const useProximityEffect = (
  containerRef: MutableRefObject<HTMLElement | null>,
  letterRefs: MutableRefObject<(HTMLSpanElement | null)[]>,
  mousePositionRef: MutableRefObject<MousePosition>,
  parsedSettings: AxisSetting[],
  radius: number,
  falloff: FalloffType,
  fromFontVariationSettings: string
) => {
  const interpolatedSettingsRef = useRef<string[]>([]);

  // Calculate distance between two points
  const calculateDistance = useCallback(
    (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
    []
  );

  // Calculate falloff based on distance and type
  const calculateFalloff = useCallback(
    (distance: number) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      switch (falloff) {
        case 'exponential':
          return norm ** 2;
        case 'gaussian':
          return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
        case 'linear':
        default:
          return norm;
      }
    },
    [falloff, radius]
  );

  // Update letter settings on each animation frame
  const updateLetterSettings = useCallback(() => {
    if (!containerRef?.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;

      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

      const distance = calculateDistance(
        mousePositionRef.current.x,
        mousePositionRef.current.y,
        letterCenterX,
        letterCenterY
      );

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `"${axis}" ${interpolatedValue}`;
        })
        .join(', ');

      interpolatedSettingsRef.current[index] = newSettings;
      letterRef.style.fontVariationSettings = newSettings;
    });
  }, [
    calculateDistance,
    calculateFalloff,
    containerRef,
    fromFontVariationSettings,
    letterRefs,
    mousePositionRef,
    parsedSettings,
    radius
  ]);

  return { interpolatedSettingsRef, updateLetterSettings };
};
