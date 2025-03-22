'use client';

/**
 * Cursor Provider Component
 *
 * A customizable cursor provider that renders different cursor animations
 * based on the selected preset.
 */

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
  MagicTrailCursor,
  MagicTrailCursorProps,
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
import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react';

import styles from './cursor.module.css';
import { Cursor, CursorProps } from './cursor.types';

/**
 * Cursor Provider component
 *
 * Renders a custom cursor based on the selected preset
 *
 * @example
 * ```tsx
 * <CursorProvider cursor="rainbow" theme="dark" />
 * ```
 */
export const CursorProvider = memo(
  forwardRef<HTMLDivElement, CursorProps>(
    (
      {
        id = 'cursorContainer',
        className = '',
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
      const hasMounted = useRef(false);
      const cursorContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
      const magicTrailCursorRef = useRef<HTMLDivElement>(null);
      const nestedContainerRef = useRef<HTMLDivElement>(null);
      const previousCursorContainer = useRef<HTMLDivElement | null>(null);

      // Track when component is mounted to prevent cleanup errors
      useEffect(() => {
        hasMounted.current = true;
        return () => {
          hasMounted.current = false;
        };
      }, []);

      // Connect the forwarded ref to our inner ref
      useImperativeHandle(ref, () => cursorContainerRef.current!);

      useEffect(() => {
        if (isInitialMount.current) {
          console.log('[Cursor] Initial render with cursor:', currentCursor);
          isInitialMount.current = false;
        } else {
          console.log('[Cursor] Cursor changed to:', currentCursor.animation || 'default');
        }
      }, [currentCursor]);

      // When changing cursor, perform extra cleanup
      useEffect(() => {
        // This will clean up all event listeners and animations
        // when switching between cursor types
        return () => {
          // Clean up any global event listeners here if needed
          if (hasMounted.current) {
            console.log('[CursorProvider] Cleaning up cursor effect');
          }
        };
      }, [cursor]);

      return (
        <div
          id={id}
          className={`${styles['cursor-container']} ${className}`}
          ref={cursorContainerRef}
          style={style}
        >
          <div className={styles['nested-container']} ref={nestedContainerRef}>
            {currentCursor.type === 'animation' && currentCursor.animation === 'arrow' && (
              <ArrowCursor
                key={`arrow-cursor-${cursor}`}
                fgColor={currentColor}
                {...(currentCursor.animationProps as ArrowCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'blob' && (
              <BlobCursor
                key={`blob-cursor-${cursor}`}
                {...(currentCursor.animationProps as BlobCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'bubble' && (
              <BubbleCursor
                key={`bubble-cursor-${cursor}`}
                fillStyle={currentColor}
                strokeStyle={currentColor}
                wrapperElement={nestedContainerRef.current}
                {...(currentCursor.animationProps as BubbleCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'canvas' && (
              <CanvasCursor key={`canvas-cursor-${cursor}`} />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'character' && (
              <CharacterCursor
                key={`character-cursor-${cursor}`}
                characters={['p', 'r', 'o', 'g', 'r', 'a', 'm', 'm', 'e', 'r']}
                colors={[currentColor]}
                wrapperElement={nestedContainerRef.current}
                {...(currentCursor.animationProps as CharacterCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'crosshair' && (
              <Crosshair
                key={`crosshair-cursor-${cursor}`}
                containerRef={nestedContainerRef}
                color={currentColor}
                {...(currentCursor.animationProps as CrosshairProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'fairydust' && (
              <FairyDustCursor
                key={`fairydust-cursor-${cursor}`}
                colors={['#FF0000', '#00FF00', '#0000FF']}
                characterSet={['✨', '⭐', '🌟']}
                particleSize={24}
                particleCount={2}
                gravity={0.015}
                fadeSpeed={0.97}
                initialVelocity={{ min: 0.7, max: 2.0 }}
                {...(currentCursor.animationProps as FairyDustCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'glitch' && (
              <GlitchCursor key={`glitch-cursor-${cursor}`} />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'gradient' && (
              <GradientCursor key={`gradient-cursor-${cursor}`} />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'magic-trail' && (
              <MagicTrailCursor
                key={`magic-trail-cursor-${cursor}`}
                containerRef={cursorContainerRef}
                particleCount={50}
                trailLength={35}
                smoothing={0.8}
                {...(currentCursor.animationProps as MagicTrailCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'neon' && (
              <NeonCursor key={`neon-cursor-${cursor}`} />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'rainbow' && (
              <RainbowCursor
                key={`rainbow-cursor-${cursor}`}
                {...(currentCursor.animationProps as RainbowCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'ribbons' && (
              <Ribbons
                key={`ribbons-cursor-${cursor}`}
                baseThickness={30}
                colors={[currentColor]}
                speedMultiplier={0.5}
                maxAge={500}
                enableFade={false}
                enableShaderEffect={true}
                {...(currentCursor.animationProps as RibbonsProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'ripple' && (
              <RippleCursor
                key={`ripple-cursor-${cursor}`}
                color={currentColor}
                {...(currentCursor.animationProps as RippleCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'snowflake' && (
              <SnowflakeCursor key={`snowflake-cursor-${cursor}`} />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'splash' && (
              <SplashCursor key={`splash-cursor-${cursor}`} />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'spotlight' && (
              <SpotlightCursor
                key={`spotlight-cursor-${cursor}`}
                {...(currentCursor.animationProps as SpotlightCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'springy' && (
              <SpringyCursor
                key={`springy-cursor-${cursor}`}
                {...(currentCursor.animationProps as SpringyCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'textflag' && (
              <TextFlagCursor
                key={`textflag-cursor-${cursor}`}
                // Fixed the TypeScript error by removing the text prop
                // and letting it come from animationProps
                color={currentColor}
                {...(currentCursor.animationProps as TextFlagCursorProps)}
              />
            )}
            {currentCursor.type === 'animation' && currentCursor.animation === 'trailing' && (
              <TrailingCursor
                key={`trailing-cursor-${cursor}`}
                {...(currentCursor.animationProps as TrailingCursorProps)}
              />
            )}
          </div>
        </div>
      );
    }
  )
);

CursorProvider.displayName = 'CursorProvider';

export default CursorProvider;
