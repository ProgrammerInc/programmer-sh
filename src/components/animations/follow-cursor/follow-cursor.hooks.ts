/**
 * Custom hooks for the FollowCursor component
 */

import { SpringValue, useSpring } from '@react-spring/web';
import { RefObject, useCallback, useEffect } from 'react';
import { AnimationConfig, TouchState } from './follow-cursor.types';

/**
 * Type for spring API with generic support
 * This is a safe type that ensures compatibility with all spring refs
 */
export type SpringApi = { start: (props: Record<string, unknown>) => void };

/**
 * Helper function to calculate X rotation based on mouse position
 *
 * @param y Current mouse Y position
 * @param ly Last recorded Y position
 * @param containerCenterY Y coordinate of container center
 * @param rotationFactor Factor that controls rotation intensity
 * @returns Calculated X rotation value
 */
export const calcX = (
  y: number,
  ly: number,
  containerCenterY: number,
  rotationFactor: number
): number => -(y - ly - containerCenterY) / rotationFactor;

/**
 * Helper function to calculate Y rotation based on mouse position
 *
 * @param x Current mouse X position
 * @param lx Last recorded X position
 * @param containerCenterX X coordinate of container center
 * @param rotationFactor Factor that controls rotation intensity
 * @returns Calculated Y rotation value
 */
export const calcY = (
  x: number,
  lx: number,
  containerCenterX: number,
  rotationFactor: number
): number => (x - lx - containerCenterX) / rotationFactor;

/**
 * Helper function to detect mobile devices
 *
 * @returns Boolean indicating if the device is mobile
 */
export const isMobile = (): boolean => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

/**
 * Hook for managing card animation springs
 *
 * @param animationConfig Spring animation configuration
 * @returns Animation springs and API
 */
export const useCardAnimation = (animationConfig: AnimationConfig) => {
  return useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    x: 0,
    y: 0,
    config: animationConfig
  }));
};

/**
 * Hook for managing wheel animation springs
 *
 * @param wheelConfig Wheel animation configuration
 * @returns Wheel animation springs and API
 */
export const useWheelAnimation = (wheelConfig: AnimationConfig) => {
  return useSpring(() => ({
    wheelY: 0,
    config: wheelConfig
  }));
};

/**
 * Hook for handling wheel events for zooming
 *
 * @param wheelY Current wheel Y value
 * @param wheelApi Wheel animation API
 * @returns Event handler for wheel events
 */
export const useWheelHandler = (wheelY: SpringValue<number>, wheelApi: SpringApi) => {
  return useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      wheelApi.start({
        wheelY: wheelY.get() + e.deltaY,
        immediate: true
      });
    },
    [wheelY, wheelApi]
  );
};

/**
 * Hook for handling mouse movement
 *
 * @param params Parameters for mouse movement handling
 * @returns Event handler for mouse movement
 */
export const useMouseMoveHandler = ({
  api,
  y,
  x,
  cardWidth,
  offsetX,
  hoverScale,
  enableTilt,
  rotationFactor,
  containerRef
}: {
  api: SpringApi;
  y: SpringValue<number>;
  x: SpringValue<number>;
  cardWidth: string;
  offsetX: number;
  hoverScale: number;
  enableTilt: boolean;
  rotationFactor: number;
  containerRef: RefObject<HTMLDivElement>;
}) => {
  return useCallback(
    (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerCenterX = rect.left + rect.width / 2;
      const containerCenterY = rect.top + rect.height / 2;

      const px = event.clientX;
      const py = event.clientY;

      const xPos = px - containerCenterX;
      const yPos = py - containerCenterY;

      const parsedCardWidth = parseFloat(cardWidth);
      const calculatedWidth = container.offsetWidth * (parsedCardWidth / 100);
      const calculatedOffset = calculatedWidth / 2 + offsetX;

      api.start({
        x: xPos + calculatedOffset,
        y: yPos,
        rotateX: enableTilt ? calcX(py, y.get(), containerCenterY, rotationFactor) : 0,
        rotateY: enableTilt ? calcY(px, x.get(), containerCenterX, rotationFactor) : 0,
        scale: hoverScale
      });
    },
    [api, y, x, cardWidth, offsetX, hoverScale, enableTilt, rotationFactor, containerRef]
  );
};

/**
 * Hook for managing wheel transform calculation
 *
 * @param cardWidth Width of the card
 * @param containerRef Reference to the container element
 * @returns Function to calculate wheel transform
 */
export const useWheelTransform = (cardWidth: string, containerRef: RefObject<HTMLDivElement>) => {
  return useCallback(
    (yValue: number): string => {
      const imgHeight = containerRef.current
        ? containerRef.current.offsetWidth * (parseFloat(cardWidth) / 100) - 20
        : window.innerWidth * 0.3 - 20;
      return `translateY(${-imgHeight * (yValue < 0 ? 6 : 1) - (yValue % (imgHeight * 5))}px)`;
    },
    [cardWidth, containerRef]
  );
};

/**
 * Hook for setting up touch event listeners
 *
 * @param params Parameters for touch events
 */
export const useTouchInteraction = ({
  domTarget,
  api,
  x,
  y,
  zoom,
  rotateZ,
  enableDrag,
  enableZoom,
  zoomSensitivity,
  hoverScale,
  handleWheel,
  touchState
}: {
  domTarget: RefObject<HTMLDivElement>;
  api: SpringApi;
  x: SpringValue<number>;
  y: SpringValue<number>;
  zoom: SpringValue<number>;
  rotateZ: SpringValue<number>;
  enableDrag: boolean;
  enableZoom: boolean;
  zoomSensitivity: number;
  hoverScale: number;
  handleWheel: (e: WheelEvent) => void;
  touchState: React.MutableRefObject<TouchState>;
}) => {
  useEffect(() => {
    if (!isMobile() || !domTarget.current || !enableDrag) return;

    const card = domTarget.current;
    let isDragging = false;
    let pinchStartDistance = 0;
    let pinchStartAngle = 0;
    let initialZoom = 0;
    let initialRotateZ = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        touchState.current = {
          startX: touch.clientX,
          startY: touch.clientY,
          offsetX: x.get(),
          offsetY: y.get()
        };
        isDragging = true;
      } else if (e.touches.length === 2 && enableZoom) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        pinchStartDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        pinchStartAngle = Math.atan2(
          touch2.clientY - touch1.clientY,
          touch2.clientX - touch1.clientX
        );
        initialZoom = zoom.get();
        initialRotateZ = rotateZ.get();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging && e.touches.length !== 2) return;

      if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - (touchState.current.startX || 0);
        const deltaY = touch.clientY - (touchState.current.startY || 0);

        api.start({
          x: (touchState.current.offsetX || 0) + deltaX,
          y: (touchState.current.offsetY || 0) + deltaY,
          rotateX: 0,
          rotateY: 0,
          scale: 1
        });
      } else if (e.touches.length === 2 && enableZoom) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const currentAngle = Math.atan2(
          touch2.clientY - touch1.clientY,
          touch2.clientX - touch1.clientX
        );

        const zoomDelta = (currentDistance - pinchStartDistance) / zoomSensitivity;
        const rotateDelta = currentAngle - pinchStartAngle;

        api.start({
          zoom: initialZoom + zoomDelta,
          rotateZ: initialRotateZ + rotateDelta
        });
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      api.start({ scale: hoverScale });
    };

    // Add event listeners for touch interactions
    card.addEventListener('touchstart', handleTouchStart, { passive: false });
    card.addEventListener('touchmove', handleTouchMove, { passive: false });
    card.addEventListener('touchend', handleTouchEnd);
    if (enableZoom) card.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up event listeners
    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
      if (enableZoom) card.removeEventListener('wheel', handleWheel);
    };
  }, [
    api,
    x,
    y,
    zoom,
    rotateZ,
    enableDrag,
    enableZoom,
    zoomSensitivity,
    hoverScale,
    handleWheel,
    domTarget,
    touchState
  ]);
};

/**
 * Hook for setting up mouse move event listeners
 *
 * @param handleMouseMove Mouse move handler function
 * @param enableTilt Whether tilt effect is enabled
 */
export const useMouseMoveListener = (
  handleMouseMove: (e: MouseEvent) => void,
  enableTilt: boolean
) => {
  useEffect(() => {
    if (isMobile() || !enableTilt) return;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, enableTilt]);
};
