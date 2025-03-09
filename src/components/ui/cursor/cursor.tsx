import {
  BlobCursor,
  BlobCursorProps,
  BubbleCursor,
  BubbleCursorProps,
  Crosshair,
  CrosshairProps,
  RainbowCursor,
  RainbowCursorProps,
  Ribbons,
  RibbonsProps,
  SnowflakeCursor,
  SplashCursor
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
    const crosshairContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const cursorContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const rainbowContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const ribbonsContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const splashContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const snowflakeContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);

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
        {currentCursor.type === 'animation' && currentCursor.animation === 'crosshair' && (
          <Crosshair
            containerRef={crosshairContainerRef}
            color={currentColor}
            {...(currentCursor.animationProps as CrosshairProps)}
          />
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
      </div>
    );
  }
);

export default CursorProvider;
