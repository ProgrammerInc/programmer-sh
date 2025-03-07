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
      style={{
        ...style
      }}
    >
      {currentCursor.type === 'animation' && currentCursor.animation === 'splash' && (
        <SplashCursor />
      )}
    </div>
  );
};

export default CursorProvider;
