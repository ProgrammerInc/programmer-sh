/**
 * GooeyFilter component for creating a gooey effect.
 */
import { memo } from 'react';
import { CSS_CLASSES, DEFAULT_VALUES } from './pixel-trail.constants';
import type { GooeyFilterProps } from './pixel-trail.types';

/**
 * SVG filter component that creates a gooey effect for the pixel trail.
 * This effect makes pixels blend together in a liquid-like way.
 *
 * @param props - Component properties
 * @returns GooeyFilter React component
 */
export const GooeyFilter = memo(function GooeyFilter({
  id = DEFAULT_VALUES.gooeyFilterId,
  strength = DEFAULT_VALUES.gooeyFilterStrength
}: GooeyFilterProps) {
  return (
    <svg className={CSS_CLASSES.svg}>
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
});

export default GooeyFilter;
