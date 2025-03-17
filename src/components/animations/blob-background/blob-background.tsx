'use client';

import { memo } from 'react';
import { Blob } from './blob';
import { DEFAULT_BLOBS } from './blob-background.constants';
import { BlobBackgroundProps } from './blob-background.types';

/**
 * BlobBackground creates a visually engaging animated background with
 * colorful, pulsing blobs that move organically.
 *
 * @param props - Component properties
 * @returns Memoized React component with animated blob elements
 */
export const BlobBackground = memo(function BlobBackground({
  blobs = DEFAULT_BLOBS,
  className = '',
  children
}: BlobBackgroundProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: 'transparent'
      }}
    >
      {blobs.map(blob => (
        <Blob key={blob.id} {...blob} />
      ))}

      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
});

// Add displayName to help with debugging
BlobBackground.displayName = 'BlobBackground';

export default BlobBackground;
