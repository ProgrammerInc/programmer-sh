import SplashCursor from '@/components/cursors/splash-cursor';
import React from 'react';
import { cursors } from './cursor.presets';
import { Cursor, CursorProps } from './cursor.types';

export const CursorProvider: React.FC<CursorProps> = ({
  id = 'cursorContainer',
  className = 'cursor-container',
  style,
  cursor = 'default'
}) => {
  const currentCursor: Cursor = cursors[cursor] || cursors.default;
  {
    // Cursor debugging
    console.log('Current cursor:', currentCursor);
  }
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
