import {
  BlobCursor,
  BlobCursorProps,
  BubbleCursor,
  BubbleCursorProps,
  CanvasCursor,
  CharacterCursor,
  CharacterCursorProps,
  Crosshair,
  CrosshairProps,
  FairyDustCursor,
  FairyDustCursorProps,
  GradientCursor,
  NeonCursor,
  RainbowCursor,
  RainbowCursorProps,
  Ribbons,
  RibbonsProps,
  RippleCursor,
  RippleCursorProps,
  SnowflakeCursor,
  SplashCursor,
  SpotlightCursor,
  SpotlightCursorProps,
  SpringyCursor,
  SpringyCursorProps,
  TrailingCursor,
  TrailingCursorProps
} from '@/components/cursors';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { cursors } from './cursor.presets';
import { Cursor, CursorProps } from './cursor.types';

export const CursorProvider = forwardRef<HTMLDivElement, CursorProps>(
  (
    {
      id = 'cursorContainer',
      className = 'cursor-container',
      style,
      color = '#64ffda',
      containerRef = null,
      cursor = 'default',
      theme = 'dark'
    },
    ref
  ) => {
    const currentCursor: Cursor = cursors[cursor] || cursors.default;
    const currentTheme: 'light' | 'dark' = theme;
    const currentColor = color || (currentTheme === 'dark' ? '#64ffda' : '#f1f1f1');

    // Cursor debugging - only log once
    const isInitialMount = useRef(true);
    const blobContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const bubbleContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const canvasContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const characterContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const crosshairContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const cursorContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const fairydustContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const gradientContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const neonContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const rainbowContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const ribbonsContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const rippleContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const snowflakeContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const splashContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const spotlightContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const springyContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const trailingContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);

    // Connect the forwarded ref to our inner ref
    useImperativeHandle(ref, () => cursorContainerRef.current!);

    useEffect(() => {
      if (isInitialMount.current) {
        console.log('Current cursor:', currentCursor);
        isInitialMount.current = false;
      }
    }, [currentCursor, cursor]);
    return (
      <div
        id={id}
        className={className}
        ref={cursorContainerRef}
        style={{
          ...style
        }}
      >
        {currentCursor.type === 'animation' && currentCursor.animation === 'blob' && (
          <div className="blob-cursor-container" ref={blobContainerRef}>
            <BlobCursor {...(currentCursor.animationProps as BlobCursorProps)} />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'bubble' && (
          <div className="bubble-cursor-container" ref={bubbleContainerRef}>
            <BubbleCursor
              fillStyle={currentColor}
              strokeStyle={currentColor}
              wrapperElement={bubbleContainerRef.current}
              {...(currentCursor.animationProps as BubbleCursorProps)}
            />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'canvas' && (
          <div className="canvas-cursor-container" ref={canvasContainerRef}>
            <CanvasCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'character' && (
          <div className="character-cursor-container" ref={characterContainerRef}>
            <CharacterCursor
              colors={[currentColor]}
              {...(currentCursor.animationProps as CharacterCursorProps)}
            />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'crosshair' && (
          <Crosshair
            containerRef={crosshairContainerRef}
            color={currentColor}
            {...(currentCursor.animationProps as CrosshairProps)}
          />
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'fairydust' && (
          <div className="fairydust-cursor-container" ref={fairydustContainerRef}>
            <FairyDustCursor
              colors={['#FF0000', '#00FF00', '#0000FF']}
              characterSet={['✨', '⭐', '🌟']}
              particleSize={24}
              particleCount={2}
              gravity={0.015}
              fadeSpeed={0.97}
              initialVelocity={{ min: 0.7, max: 2.0 }}
              {...(currentCursor.animationProps as FairyDustCursorProps)}
            />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'gradient' && (
          <div className="gradient-cursor-container" ref={gradientContainerRef}>
            <GradientCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'neon' && (
          <div className="neon-cursor-container" ref={neonContainerRef}>
            <NeonCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'rainbow' && (
          <div className="rainbow-cursor-container" ref={rainbowContainerRef}>
            <RainbowCursor {...(currentCursor.animationProps as RainbowCursorProps)} />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'ribbons' && (
          <div className="ribbons-cursor-container" ref={ribbonsContainerRef}>
            <Ribbons
              baseThickness={30}
              colors={[currentColor]}
              speedMultiplier={0.5}
              maxAge={500}
              enableFade={false}
              enableShaderEffect={true}
              {...(currentCursor.animationProps as RibbonsProps)}
            />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'ripple' && (
          <div className="ripple-cursor-container" ref={rippleContainerRef}>
            <RippleCursor {...(currentCursor.animationProps as RippleCursorProps)} />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'snowflake' && (
          <div className="snowflake-cursor-container" ref={snowflakeContainerRef}>
            <SnowflakeCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'splash' && (
          <div className="splash-cursor-container" ref={splashContainerRef}>
            <SplashCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'spotlight' && (
          <div className="spotlight-cursor-container" ref={spotlightContainerRef}>
            <SpotlightCursor {...(currentCursor.animationProps as SpotlightCursorProps)} />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'springy' && (
          <div className="springy-cursor-container" ref={springyContainerRef}>
            <SpringyCursor {...(currentCursor.animationProps as SpringyCursorProps)} />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'trailing' && (
          <div className="trailing-cursor-container" ref={trailingContainerRef}>
            <TrailingCursor {...(currentCursor.animationProps as TrailingCursorProps)} />
          </div>
        )}
      </div>
    );
  }
);

export default CursorProvider;
