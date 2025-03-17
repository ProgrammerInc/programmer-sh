'use client';

import { animated } from '@react-spring/web';
import { memo } from 'react';
import { CSS_CLASSES, DEFAULT_VALUES, SVG_FILTER } from './blob-cursor.constants';
import { createTransform, useBlobTrail, useCursorPositionTracking } from './blob-cursor.hooks';
import type { BlobCursorProps } from './blob-cursor.types';

/**
 * BlobCursor Component
 *
 * Displays an animated blob cursor that follows the mouse or touch movements.
 * The cursor consists of multiple animated blobs with trailing effects.
 *
 * @component
 */
export const BlobCursor = memo<BlobCursorProps>(
  ({ blobType = DEFAULT_VALUES.BLOB_TYPE, fillColor = DEFAULT_VALUES.FILL_COLOR }) => {
    const [trail, api] = useBlobTrail();
    const { containerRef, handleCursorMove } = useCursorPositionTracking();

    return (
      <div className={CSS_CLASSES.CONTAINER}>
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={SVG_FILTER.FILTER_ID}>
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation={SVG_FILTER.STD_DEVIATION}
            />
            <feColorMatrix in="blur" values={SVG_FILTER.COLOR_MATRIX} />
          </filter>
        </svg>
        <div
          ref={containerRef}
          className={CSS_CLASSES.CANVAS}
          style={{
            filter: `url("#${SVG_FILTER.FILTER_ID}")`,
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
          onMouseMove={e => handleCursorMove(e as unknown as MouseEvent, api.start)}
          onTouchMove={e => handleCursorMove(e as unknown as TouchEvent, api.start)}
        >
          {trail.map((props, index) => (
            <animated.div
              key={index}
              className={CSS_CLASSES.BLOB_ELEMENT}
              style={{
                transform: props.xy.to(createTransform),
                width: `${DEFAULT_VALUES.BLOB_SIZES[index].width}px`,
                height: `${DEFAULT_VALUES.BLOB_SIZES[index].height}px`,
                borderRadius: blobType === 'circle' ? '50%' : '0%',
                backgroundColor: fillColor
              }}
            >
              {/* Highlight element */}
              <div
                className={CSS_CLASSES.BLOB_HIGHLIGHT}
                style={{
                  position: 'absolute',
                  top: `${DEFAULT_VALUES.HIGHLIGHT_STYLES[index].top}px`,
                  left: `${DEFAULT_VALUES.HIGHLIGHT_STYLES[index].left}px`,
                  width: `${DEFAULT_VALUES.HIGHLIGHT_STYLES[index].width}px`,
                  height: `${DEFAULT_VALUES.HIGHLIGHT_STYLES[index].height}px`,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.8)'
                }}
              />
            </animated.div>
          ))}
        </div>
      </div>
    );
  }
);

BlobCursor.displayName = 'BlobCursor';

export default BlobCursor;
