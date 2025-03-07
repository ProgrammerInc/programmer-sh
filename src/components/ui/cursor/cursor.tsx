import BlobCursor from '@/components/cursors/blob-cursor';
import Crosshair, { CrosshairProps } from '@/components/cursors/crosshair';
import Ribbons, { RibbonsProps } from '@/components/cursors/ribbons';
import SplashCursor from '@/components/cursors/splash-cursor';
import React, { useEffect, useRef } from 'react';
import { cursors } from './cursor.presets';
import { Cursor, CursorProps } from './cursor.types';

export const CursorProvider: React.FC<CursorProps> = ({
  id = 'cursorContainer',
  className = 'cursor-container',
  style,
  cursor = 'default'
}) => {
  const containerRef = useRef(null);
  const currentCursor: Cursor = cursors[cursor] || cursors.default;
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
      ref={containerRef}
      style={{
        ...style
      }}
    >
      {currentCursor.type === 'animation' && currentCursor.animation === 'blob' && <BlobCursor />}
      {currentCursor.type === 'animation' && currentCursor.animation === 'crosshair' && (
        <Crosshair color="#f1f1f1" {...(currentCursor.animationProps as CrosshairProps)} />
      )}
      {currentCursor.type === 'animation' && currentCursor.animation === 'ribbons' && (
        <Ribbons
          baseThickness={30}
          colors={['#f1f1f1']}
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
