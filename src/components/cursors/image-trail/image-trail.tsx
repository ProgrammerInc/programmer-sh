/**
 * @file image-trail.tsx
 * @description ImageTrail cursor component that creates an interactive trail of images following the cursor
 */
'use client';

import { useImageTrail } from './image-trail.hooks';
import { ImageTrailProps } from './image-trail.types';

/**
 * ImageTrail component that creates a trail of images following the cursor
 * @param props - Component properties
 * @returns JSX element
 */
export function ImageTrail({ items = [], variant = 1 }: ImageTrailProps): JSX.Element {
  // Use the custom hook to manage state and behavior
  const { containerRef } = useImageTrail({ items, variant });

  return (
    <div
      className="w-full h-full relative z-[100] rounded-lg bg-transparent overflow-visible"
      ref={containerRef}
    >
      {items.map((url, i) => (
        <div
          className="w-[190px] aspect-[1.1] rounded-[15px] absolute top-0 left-0 opacity-0 overflow-hidden [will-change:transform,filter] content__img"
          key={i}
        >
          <div
            className="bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px] content__img-inner"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageTrail;
