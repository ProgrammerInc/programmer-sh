'use client';

import { memo, useMemo } from 'react';
import { useBeamPositions, useBeamStyles, useRotationStyle } from './beam-portal.hooks';
import { BeamRingProps } from './beam-portal.types';

/**
 * BeamRing component creates a circular arrangement of animated beams
 *
 * @param props - Component properties
 * @returns Memoized React component
 */
const BeamRing = memo(function BeamRing({
  colors,
  count,
  radius,
  settings,
  pattern,
  reverse,
  shimmer,
  pulse,
  randomize,
  blurAmount,
  rotateSpeed
}: BeamRingProps) {
  // Get beam position function based on count and randomization
  const getPosition = useBeamPositions(count, randomize);

  // Get beam style generator based on animation settings
  const getBeamStyle = useBeamStyles(getPosition, pattern, settings, {
    reverse,
    shimmer,
    pulse,
    blurAmount
  });

  // Get rotation style for the container
  const rotationStyle = useRotationStyle(rotateSpeed, reverse);

  // Memoize the beam elements to prevent unnecessary re-renders
  const beams = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const position = getPosition(i);
      return (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 h-full origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${position}deg)` }}
        >
          <div
            className="absolute left-0 top-0 h-full w-[1px] overflow-hidden"
            style={{
              backgroundColor: `rgba(${colors.base}, ${settings.opacity})`
            }}
          >
            <div
              className="absolute left-0 top-[-50%] h-[15vh] w-full"
              style={{
                background: `linear-gradient(to bottom, rgba(${colors.glow}, 0) 0%, rgba(${colors.glow}, 1) 75%, rgba(${colors.glow}, 1) 100%)`
              }}
            >
              <div className="absolute inset-0" style={getBeamStyle(i)} />
            </div>
          </div>
        </div>
      );
    });
  }, [count, colors, settings, getPosition, getBeamStyle]);

  return (
    <div className="absolute inset-0 dark:opacity-80" style={rotationStyle}>
      {beams}
    </div>
  );
});

// Add displayName to help with debugging
BeamRing.displayName = 'BeamRing';

export { BeamRing };
export default BeamRing;
