'use client';

import React from 'react';
import {
  DEFAULT_BASE_ANGLE,
  DEFAULT_CLASS_NAME,
  DEFAULT_COLUMNS,
  DEFAULT_CONTAINER_SIZE,
  DEFAULT_LINE_COLOR,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_LINE_WIDTH,
  DEFAULT_ROWS,
  DEFAULT_STYLE
} from './magnet-lines.constants';
import { useMagnetLinesEffect } from './magnet-lines.hooks';
import { MagnetLinesProps } from './magnet-lines.types';
import { createGridSpans } from './magnet-lines.utils';

/**
 * MagnetLines Component
 *
 * A grid of lines that orient themselves toward the mouse pointer,
 * creating a magnetic field-like effect.
 *
 * @param props Component props
 * @returns A grid of lines that respond to mouse movement
 */
const MagnetLinesComponent: React.FC<MagnetLinesProps> = ({
  rows = DEFAULT_ROWS,
  columns = DEFAULT_COLUMNS,
  containerSize = DEFAULT_CONTAINER_SIZE,
  lineColor = DEFAULT_LINE_COLOR,
  lineWidth = DEFAULT_LINE_WIDTH,
  lineHeight = DEFAULT_LINE_HEIGHT,
  baseAngle = DEFAULT_BASE_ANGLE,
  className = DEFAULT_CLASS_NAME,
  style = DEFAULT_STYLE
}) => {
  // Use our custom hook to manage the magnetic effect
  const containerRef = useMagnetLinesEffect();

  // Calculate total number of grid items
  const total = rows * columns;

  // Create grid spans using the utility function
  const spans = createGridSpans(total, lineColor, lineWidth, lineHeight, baseAngle);

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
};

// Create memoized version of the component
export const MagnetLines = React.memo(MagnetLinesComponent);

// Add display name for better debugging
MagnetLines.displayName = 'MagnetLines';

export default MagnetLines;
