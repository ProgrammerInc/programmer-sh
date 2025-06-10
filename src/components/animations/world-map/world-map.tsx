'use client';

import { cn } from '@/utils/app.utils';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { CSS_CLASSES, DEFAULT_VALUES, GRADIENT_STOPS, SVG_DIMENSIONS } from './world-map.constants';
import { useDottedMapSVG } from './world-map.hooks';
import type { MapConnection, WorldMapProps } from './world-map.types';
import { createCurvedPath, projectMapPoint } from './world-map.utils';

/**
 * WorldMap component displays an interactive world map with animated connection lines
 * between different geographic points.
 *
 * @component
 */
export function WorldMap({
  dots = [],
  draggable = DEFAULT_VALUES.DRAGGABLE,
  lineColor = DEFAULT_VALUES.LINE_COLOR,
  theme = DEFAULT_VALUES.THEME,
  className
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const svgMap = useDottedMapSVG(theme);

  return (
    <div className={cn(CSS_CLASSES.CONTAINER, className)}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className={CSS_CLASSES.MAP_IMAGE}
        alt="world map"
        height="100vh"
        width="100vw"
        draggable={draggable}
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_DIMENSIONS.WIDTH} ${SVG_DIMENSIONS.HEIGHT}`}
        className={CSS_CLASSES.SVG_OVERLAY}
      >
        {dots.map((dot: MapConnection, i: number) => {
          const startPoint = projectMapPoint(dot.start);
          const endPoint = projectMapPoint(dot.end);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{
                  pathLength: 0
                }}
                animate={{
                  pathLength: 1
                }}
                transition={{
                  duration: DEFAULT_VALUES.ANIMATION.PATH_DURATION,
                  delay: DEFAULT_VALUES.ANIMATION.PATH_DELAY_MULTIPLIER * i,
                  ease: DEFAULT_VALUES.ANIMATION.PATH_EASE
                }}
                key={`start-upper-${i}`}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={GRADIENT_STOPS.START} stopColor="white" stopOpacity="0" />
            <stop offset={GRADIENT_STOPS.FADE_IN} stopColor={lineColor} stopOpacity="1" />
            <stop offset={GRADIENT_STOPS.FADE_OUT} stopColor={lineColor} stopOpacity="1" />
            <stop offset={GRADIENT_STOPS.END} stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot: MapConnection, i: number) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectMapPoint(dot.start).x}
                cy={projectMapPoint(dot.start).y}
                r={DEFAULT_VALUES.ANIMATION.PULSE_RADIUS_FROM}
                fill={lineColor}
              />
              <circle
                cx={projectMapPoint(dot.start).x}
                cy={projectMapPoint(dot.start).y}
                r={DEFAULT_VALUES.ANIMATION.PULSE_RADIUS_FROM}
                fill={lineColor}
                opacity={DEFAULT_VALUES.ANIMATION.PULSE_OPACITY_FROM}
              >
                <animate
                  attributeName="r"
                  from={DEFAULT_VALUES.ANIMATION.PULSE_RADIUS_FROM.toString()}
                  to={DEFAULT_VALUES.ANIMATION.PULSE_RADIUS_TO.toString()}
                  dur={`${DEFAULT_VALUES.ANIMATION.PULSE_DURATION}s`}
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from={DEFAULT_VALUES.ANIMATION.PULSE_OPACITY_FROM.toString()}
                  to={DEFAULT_VALUES.ANIMATION.PULSE_OPACITY_TO.toString()}
                  dur={`${DEFAULT_VALUES.ANIMATION.PULSE_DURATION}s`}
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectMapPoint(dot.end).x}
                cy={projectMapPoint(dot.end).y}
                r={DEFAULT_VALUES.ANIMATION.PULSE_RADIUS_FROM}
                fill={lineColor}
              />
              <circle
                cx={projectMapPoint(dot.end).x}
                cy={projectMapPoint(dot.end).y}
                r={DEFAULT_VALUES.ANIMATION.PULSE_RADIUS_FROM}
                fill={lineColor}
                opacity={DEFAULT_VALUES.ANIMATION.PULSE_OPACITY_FROM}
              >
                <animate
                  attributeName="r"
                  from={DEFAULT_VALUES.ANIMATION.PULSE_RADIUS_FROM.toString()}
                  to={DEFAULT_VALUES.ANIMATION.PULSE_RADIUS_TO.toString()}
                  dur={`${DEFAULT_VALUES.ANIMATION.PULSE_DURATION}s`}
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from={DEFAULT_VALUES.ANIMATION.PULSE_OPACITY_FROM.toString()}
                  to={DEFAULT_VALUES.ANIMATION.PULSE_OPACITY_TO.toString()}
                  dur={`${DEFAULT_VALUES.ANIMATION.PULSE_DURATION}s`}
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default WorldMap;
