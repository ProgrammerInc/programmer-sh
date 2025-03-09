import {
  BlobCursor,
  BlobCursorProps,
  BubbleCursor,
  BubbleCursorProps,
  Crosshair,
  CrosshairProps,
  Ribbons,
  RibbonsProps,
  SplashCursor
} from '@/components/cursors';
import React, { useEffect, useRef } from 'react';
import { cursors } from './cursor.presets';
import { Cursor, CursorProps } from './cursor.types';

export const CursorProvider: React.FC<CursorProps> = ({
  id = 'cursorContainer',
  className = 'cursor-container',
  style,
  color = '#64ffda',
  containerRef = null,
  cursor = 'default',
  theme = 'dark'
}) => {
  const currentContainerRef = useRef<HTMLDivElement | null>(null);
  const currentCursor: Cursor = cursors[cursor] || cursors.default;
  const currentTheme: 'light' | 'dark' = theme;
  const currentColor = color || (currentTheme === 'dark' ? '#64ffda' : '#f1f1f1');
  // Cursor debugging - only log once
  const isInitialMount = useRef(true);

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
      ref={currentContainerRef}
      style={{
        ...style
      }}
    >
      {currentCursor.type === 'animation' && currentCursor.animation === 'blob' && (
        <BlobCursor {...(currentCursor.animationProps as BlobCursorProps)} />
      )}
      {currentCursor.type === 'animation' && currentCursor.animation === 'bubble' && (
        <BubbleCursor
          fillStyle={currentColor}
          strokeStyle={currentColor}
          {...(currentCursor.animationProps as BubbleCursorProps)}
        />
      )}
      {currentCursor.type === 'animation' && currentCursor.animation === 'crosshair' && (
        <Crosshair
          containerRef={containerRef}
          color={currentColor}
          {...(currentCursor.animationProps as CrosshairProps)}
        />
      )}
      {currentCursor.type === 'animation' && currentCursor.animation === 'ribbons' && (
        <Ribbons
          baseThickness={30}
          colors={[currentColor]}
          speedMultiplier={0.5}
          maxAge={500}
          enableFade={false}
          enableShaderEffect={true}
          {...(currentCursor.animationProps as RibbonsProps)}
        />
      )}
      {currentCursor.type === 'animation' && currentCursor.animation === 'splash' && (
        <SplashCursor />
      )}
    </div>
  );
};

export default CursorProvider;
