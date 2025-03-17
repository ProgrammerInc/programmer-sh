/**
 * MagicTrailCursor
 *
 * Index file for the MagicTrailCursor component
 *
 * @module MagicTrailCursor
 */

'use client';

import { cn } from '@/utils/app.utils';
import { useMagicTrailCursor } from './magic-trail-cursor.hooks';
import { MagicTrailCursorProps } from './magic-trail-cursor.types';

/**
 * MagicTrailCursor component that creates a magical trail of particles following the cursor
 * @param props - Component props
 * @returns React component
 */
export function MagicTrailCursor(props: MagicTrailCursorProps) {
  const { className } = props;
  const { canvasRef } = useMagicTrailCursor(props);

  return (
    <div
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{ width: '100%', height: '100%' }}
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}

export default MagicTrailCursor;
