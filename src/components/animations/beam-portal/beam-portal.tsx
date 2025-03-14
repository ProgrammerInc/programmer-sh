'use client';

import { cn } from '@/utils/app.utils';
import React from 'react';

export type PortalVariant =
  | 'matrix'
  | 'sunset'
  | 'aurora'
  | 'cosmic'
  | 'cyber'
  | 'frost'
  | 'fire'
  | 'void';

export type PortalPattern = 'linear' | 'radial' | 'wave' | 'pulse' | 'zigzag';

export interface BeamPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  /** Color scheme of the portal. Default is aurora */
  colorScheme?: PortalVariant;
  /** Animation pattern for beams. Default is radial */
  pattern?: PortalPattern;
  /** Animation intensity level. Default is active */
  intensity?: 'calm' | 'active' | 'intense';
  /** Whether to reverse the animation direction */
  reverse?: boolean;
  /** Whether to add a shimmer effect */
  shimmer?: boolean;
  /** Whether to add a pulse effect */
  pulse?: boolean;
  /** Whether to use random distribution for beams */
  randomize?: boolean;
  /** Blur amount for glow effects (px) */
  blurAmount?: number;
  /** Children to render in portal */
  children: React.ReactNode;
}

const colorSchemes = {
  matrix: {
    primary: '0, 255, 0',
    secondary: '0, 200, 0',
    tertiary: '0, 150, 0'
  },
  sunset: {
    primary: '255, 100, 0',
    secondary: '255, 50, 100',
    tertiary: '200, 0, 150'
  },
  aurora: {
    primary: '0, 255, 200',
    secondary: '100, 200, 255',
    tertiary: '150, 100, 255'
  },
  cosmic: {
    primary: '255, 0, 255',
    secondary: '150, 0, 255',
    tertiary: '50, 0, 200'
  },
  cyber: {
    primary: '0, 255, 255',
    secondary: '0, 150, 255',
    tertiary: '0, 100, 255'
  },
  frost: {
    primary: '200, 255, 255',
    secondary: '150, 200, 255',
    tertiary: '100, 150, 255'
  },
  fire: {
    primary: '255, 150, 0',
    secondary: '255, 100, 0',
    tertiary: '255, 50, 0'
  },
  void: {
    primary: '100, 0, 255',
    secondary: '50, 0, 200',
    tertiary: '25, 0, 150'
  }
};

const intensitySettings = {
  calm: { speed: 10, opacity: 0.2, count: 4, delay: 0.5 },
  active: { speed: 7, opacity: 0.3, count: 6, delay: 0.3 },
  intense: { speed: 5, opacity: 0.4, count: 8, delay: 0.2 }
};

const patternStyles = {
  linear: {
    transform: 'translateY(var(--offset))',
    animation: 'beam-drop'
  },
  radial: {
    transform: 'rotate(var(--beam-angle))',
    animation: 'beam-drop'
  },
  wave: {
    transform: 'rotate(var(--beam-angle)) translateX(var(--wave-offset))',
    animation: 'beam-wave'
  },
  pulse: {
    transform: 'scale(var(--pulse-scale))',
    animation: 'beam-pulse'
  },
  zigzag: {
    transform: 'rotate(var(--beam-angle)) translateX(var(--zigzag-offset))',
    animation: 'beam-zigzag'
  }
};

function BeamRing({
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
}: {
  colors: { base: string; glow: string };
  count: number;
  radius: string;
  settings: { speed: number; opacity: number; delay: number };
  pattern: PortalPattern;
  reverse?: boolean;
  shimmer?: boolean;
  pulse?: boolean;
  randomize?: boolean;
  blurAmount?: number;
  rotateSpeed?: number;
}) {
  const getPosition = React.useCallback(
    (index: number) => {
      if (!randomize) {
        return index * (360 / count);
      }
      const hash = (index * 1337) % 360;
      return hash;
    },
    [count, randomize]
  );

  const getBeamStyle = (index: number) => {
    const angle = getPosition(index);
    const delay = settings.delay * index;
    const patternStyle = patternStyles[pattern];
    const animations = [
      `${patternStyle.animation} ${settings.speed}s cubic-bezier(0.4, 0.26, 0, 0.97) ${delay}s infinite ${
        reverse ? 'reverse' : ''
      }`
    ];

    if (pulse) {
      animations.push(`beam-pulse ${settings.speed * 1.5}s ease-in-out ${delay}s infinite`);
    }
    if (shimmer) {
      animations.push(`beam-shimmer ${settings.speed}s linear ${delay}s infinite`);
    }

    return {
      '--beam-angle': `${angle}deg`,
      '--offset': '0px',
      '--wave-offset': '0px',
      '--pulse-scale': '1',
      '--zigzag-offset': '0px',
      transform: patternStyle.transform,
      animation: animations.join(', '),
      filter: `blur(${blurAmount || 6}px)`
    } as React.CSSProperties;
  };

  return (
    <div
      className="absolute inset-0 dark:opacity-80"
      style={{
        animation: rotateSpeed
          ? `spin ${rotateSpeed}s linear infinite${reverse ? ' reverse' : ''}`
          : undefined
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 h-full origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${getPosition(i)}deg)` }}
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
                background: `linear-gradient(to bottom, rgba(${colors.glow}, 0) 0%, rgba(${colors.glow}, 1) 75%, rgba(${colors.glow}, 1) 100%)`,
                ...getBeamStyle(i)
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BeamPortal({
  className,
  colorScheme = 'aurora',
  pattern = 'radial',
  intensity = 'active',
  reverse = false,
  shimmer = false,
  pulse = false,
  randomize = false,
  blurAmount = 6,
  children,
  ...props
}: BeamPortalProps) {
  const colors = colorSchemes[colorScheme];
  const settings = intensitySettings[intensity];

  return (
    <div
      className={cn('group relative min-h-full overflow-hidden rounded-xl', className)}
      {...props}
    >
      <BeamRing
        colors={{ base: colors.primary, glow: colors.primary }}
        count={12}
        radius="100%"
        settings={settings}
        pattern={pattern}
        reverse={reverse}
        shimmer={shimmer}
        pulse={pulse}
        randomize={randomize}
        blurAmount={blurAmount}
        rotateSpeed={20}
      />
      <div className="absolute inset-[15%]">
        <BeamRing
          colors={{ base: colors.secondary, glow: colors.secondary }}
          count={8}
          radius="85%"
          settings={{
            ...settings,
            speed: settings.speed * 0.8
          }}
          pattern={pattern}
          reverse={!reverse}
          shimmer={shimmer}
          pulse={pulse}
          randomize={randomize}
          blurAmount={blurAmount}
          rotateSpeed={15}
        />
      </div>

      <div className="absolute inset-[30%]">
        <BeamRing
          colors={{ base: colors.tertiary, glow: colors.tertiary }}
          count={6}
          radius="70%"
          settings={{
            ...settings,
            speed: settings.speed * 0.6
          }}
          pattern={pattern}
          reverse={reverse}
          shimmer={shimmer}
          pulse={pulse}
          randomize={randomize}
          blurAmount={blurAmount}
          rotateSpeed={10}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(${colors.tertiary}, 0.1) 0%, 
            rgba(${colors.secondary}, 0.05) 45%, 
            rgba(${colors.primary}, 0.02) 70%, 
            transparent 100%
          )`
        }}
      />

      <div className="relative z-10 flex h-full min-h-full items-center justify-center p-8">
        <div className="rounded-lg">{children}</div>
      </div>
    </div>
  );
}

export default BeamPortal;
