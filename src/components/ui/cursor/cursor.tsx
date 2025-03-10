import {
  ArrowCursor,
  ArrowCursorProps,
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
  GlitchCursor,
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
  TextFlagCursor,
  TextFlagCursorProps,
  TrailingCursor,
  TrailingCursorProps
} from '@/components/cursors';
import { cursorPresets } from '@/presets/cursor.presets';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
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
    const currentCursor: Cursor = cursorPresets[cursor] || cursorPresets.default;
    const currentTheme: 'light' | 'dark' = theme;
    const currentColor = color || (currentTheme === 'dark' ? '#64ffda' : '#f1f1f1');

    // Cursor debugging - only log once
    const isInitialMount = useRef(true);
    const cursorContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const nestedContainerRef = useRef<HTMLDivElement>(null);

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
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10000 /* Ensure this is higher than any other element */,
          isolation: 'isolate' /* Creates a new stacking context */,
          transform: 'translateZ(0)' /* Force hardware acceleration and create stacking context */,
          willChange: 'transform' /* Hint to browser to optimize this element */,
          ...style
        }}
      >
        {currentCursor.type === 'animation' && currentCursor.animation === 'arrow' && (
          <div
            className="arrow-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <ArrowCursor
              fgColor={currentColor}
              {...(currentCursor.animationProps as ArrowCursorProps)}
            />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'blob' && (
          <div
            className="blob-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <BlobCursor {...(currentCursor.animationProps as BlobCursorProps)} />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'bubble' && (
          <div
            className="bubble-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <BubbleCursor
              fillStyle={currentColor}
              strokeStyle={currentColor}
              wrapperElement={cursorContainerRef.current}
              {...(currentCursor.animationProps as BubbleCursorProps)}
            />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'canvas' && (
          <div
            className="canvas-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <CanvasCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'character' && (
          <div
            className="character-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <CharacterCursor
              colors={[currentColor]}
              {...(currentCursor.animationProps as CharacterCursorProps)}
            />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'crosshair' && (
          <Crosshair
            containerRef={nestedContainerRef}
            color={currentColor}
            {...(currentCursor.animationProps as CrosshairProps)}
          />
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'fairydust' && (
          <div
            className="fairydust-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
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
        {currentCursor.type === 'animation' && currentCursor.animation === 'glitch' && (
          <div
            className="glitch-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <GlitchCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'gradient' && (
          <div
            className="gradient-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <GradientCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'neon' && (
          <div
            className="neon-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <NeonCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'rainbow' && (
          <div
            className="rainbow-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <RainbowCursor {...(currentCursor.animationProps as RainbowCursorProps)} />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'ribbons' && (
          <div
            className="ribbons-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
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
          <div
            className="ripple-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <RippleCursor
              color={currentColor}
              {...(currentCursor.animationProps as RippleCursorProps)}
            />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'snowflake' && (
          <div
            className="snowflake-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <SnowflakeCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'splash' && (
          <div
            className="splash-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <SplashCursor />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'spotlight' && (
          <div
            className="spotlight-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <SpotlightCursor {...(currentCursor.animationProps as SpotlightCursorProps)} />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'springy' && (
          <div
            className="springy-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <SpringyCursor {...(currentCursor.animationProps as SpringyCursorProps)} />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'textflag' && (
          <div
            className="textflag-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <TextFlagCursor
              color={currentColor}
              {...(currentCursor.animationProps as TextFlagCursorProps)}
            />
          </div>
        )}
        {currentCursor.type === 'animation' && currentCursor.animation === 'trailing' && (
          <div
            className="trailing-cursor-container"
            ref={nestedContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              transform: 'translateZ(9999px)' /* Force this to show on top with 3D transform */,
              isolation: 'isolate'
            }}
          >
            <TrailingCursor {...(currentCursor.animationProps as TrailingCursorProps)} />
          </div>
        )}
      </div>
    );
  }
);

export default CursorProvider;
