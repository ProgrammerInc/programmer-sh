'use client';

import { SpringValue, animated, to, useSpring } from '@react-spring/web';
import { memo, useRef } from 'react';
import {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CARD_WIDTH,
  DEFAULT_ENABLE_DRAG,
  DEFAULT_ENABLE_TILT,
  DEFAULT_ENABLE_ZOOM,
  DEFAULT_HOVER_SCALE,
  DEFAULT_OFFSET_X,
  DEFAULT_PERSPECTIVE,
  DEFAULT_ROTATION_FACTOR,
  DEFAULT_WHEEL_CONFIG,
  DEFAULT_ZOOM_SENSITIVITY
} from './follow-cursor.constants';
import {
  SpringApi,
  useMouseMoveHandler,
  useMouseMoveListener,
  useTouchInteraction,
  useWheelHandler,
  useWheelTransform
} from './follow-cursor.hooks';
import { FollowCursorProps, TouchState } from './follow-cursor.types';

/**
 * FollowCursor component creates interactive elements that follow cursor movement
 * with optional tilt, zoom, and drag effects.
 *
 * @param props Component properties
 * @returns Memoized React component that follows cursor movement
 */
export const FollowCursor = memo(function FollowCursor({
  children,
  className = '',
  animationConfig = DEFAULT_ANIMATION_CONFIG,
  hoverScale = DEFAULT_HOVER_SCALE,
  offsetX = DEFAULT_OFFSET_X,
  cardWidth = DEFAULT_CARD_WIDTH,
  rotationFactor = DEFAULT_ROTATION_FACTOR,
  perspective = DEFAULT_PERSPECTIVE,
  zoomSensitivity = DEFAULT_ZOOM_SENSITIVITY,
  wheelConfig = DEFAULT_WHEEL_CONFIG,
  enableTilt = DEFAULT_ENABLE_TILT,
  enableZoom = DEFAULT_ENABLE_ZOOM,
  enableDrag = DEFAULT_ENABLE_DRAG
}: FollowCursorProps) {
  // Refs for DOM elements and touch state
  const domTarget = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchState = useRef<TouchState>({});

  // Initialize animation springs
  const [springValues, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    x: 0,
    y: 0,
    config: animationConfig
  }));

  const { x, y, rotateX, rotateY, rotateZ, zoom, scale } = springValues;

  // Initialize wheel springs
  const [wheelSpringValues, wheelApi] = useSpring(() => ({
    wheelY: 0,
    config: wheelConfig
  }));

  const { wheelY } = wheelSpringValues;

  // Set up event handlers using custom hooks
  const handleWheel = useWheelHandler(wheelY, wheelApi as SpringApi);
  const handleMouseMove = useMouseMoveHandler({
    api: api as SpringApi,
    y,
    x,
    cardWidth,
    offsetX,
    hoverScale,
    enableTilt,
    rotationFactor,
    containerRef
  });

  // Set up touch interactions
  useTouchInteraction({
    domTarget,
    api: api as SpringApi,
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
  });

  // Set up mouse movement listener
  useMouseMoveListener(handleMouseMove, enableTilt);

  // Create wheel transform function
  const wheelTransform = useWheelTransform(cardWidth, containerRef);

  return (
    <div className={`container ${className}`} ref={containerRef}>
      <animated.div
        ref={domTarget}
        // eslint-disable-next-line no-secrets/no-secrets
        className="absolute w-[180px] h-[150px] bg-cover bg-[url('https://res.cloudinary.com/practicaldev/image/fetch/s--8mUhEkXE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/km2w1ppw3yw9pd9na7mu.gif')] rounded-[15px] shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.3)] transition duration-500 [transition-property:shadow,opacity] [will-change:transform] touch-none"
        style={{
          width: cardWidth,
          transform: `perspective(${perspective})`,
          x: x as SpringValue<number>,
          y: y as SpringValue<number>,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX: enableTilt ? (rotateX as SpringValue<number>) : 0,
          rotateY: enableTilt ? (rotateY as SpringValue<number>) : 0,
          rotateZ: enableZoom ? (rotateZ as SpringValue<number>) : 0
        }}
      >
        <animated.div style={{ transform: wheelY.to(wheelTransform) }}>{children}</animated.div>
      </animated.div>
    </div>
  );
});

export default FollowCursor;
