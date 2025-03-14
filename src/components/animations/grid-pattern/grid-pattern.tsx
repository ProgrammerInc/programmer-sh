'use client';

import { cn } from '@/utils/app.utils';
import React from 'react';

export interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  gridType?: 'dots' | 'lines' | 'squares' | 'crosshatch' | 'diamonds';
  gridSize?: number;
  opacity?: number;
  color?: string;
  animate?: boolean;
  className?: string;
}

export function GridPattern({
  gridType = 'dots',
  gridSize = 20,
  opacity = 0.2,
  color = 'currentColor',
  animate = false,
  className,
  ...props
}: GridPatternProps) {
  const patternId = React.useId();

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)} {...props}>
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width={gridSize}
            height={gridSize}
            className={cn(
              animate && [
                gridType === 'dots'
                  ? 'animate-[dots-shift_20s_linear_infinite]'
                  : gridType === 'lines'
                    ? 'animate-[lines-shift_20s_linear_infinite]'
                    : gridType === 'squares'
                      ? 'animate-[squares-shift_20s_linear_infinite]'
                      : gridType === 'crosshatch'
                        ? 'animate-[crosshatch-shift_20s_linear_infinite]'
                        : 'animate-[diamonds-shift_20s_linear_infinite]',
                'origin-center'
              ]
            )}
          >
            {gridType === 'dots' ? (
              <circle cx={gridSize / 2} cy={gridSize / 2} r={1} fill={color} style={{ opacity }} />
            ) : gridType === 'lines' ? (
              <path
                d={`M ${gridSize} 0 L 0 0 L 0 ${gridSize}`}
                fill="none"
                stroke={color}
                strokeWidth="0.5"
                style={{ opacity }}
              />
            ) : gridType === 'squares' ? (
              <rect
                x={gridSize / 4}
                y={gridSize / 4}
                width={gridSize / 2}
                height={gridSize / 2}
                fill={color}
                style={{ opacity }}
              />
            ) : gridType === 'crosshatch' ? (
              <>
                <path
                  d={`M ${gridSize} 0 L 0 ${gridSize}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="0.5"
                  style={{ opacity }}
                />
                <path
                  d={`M 0 0 L ${gridSize} ${gridSize}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="0.5"
                  style={{ opacity }}
                />
              </>
            ) : (
              // diamonds
              <path
                d={`M ${gridSize / 2} ${gridSize / 4} L ${(gridSize * 3) / 4} ${gridSize / 2} L ${gridSize / 2} ${(gridSize * 3) / 4} L ${gridSize / 4} ${gridSize / 2} Z`}
                fill={color}
                style={{ opacity }}
              />
            )}
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center'
          }}
        />
      </svg>
    </div>
  );
}

export default GridPattern;
