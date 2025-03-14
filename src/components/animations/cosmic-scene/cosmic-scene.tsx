'use client';

import { cn } from '@/utils/app.utils';
import React, { useEffect, useRef, useState } from 'react';

export interface CosmicSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: string;
  colorScheme?:
    | 'default'
    | 'neon'
    | 'sunset'
    | 'ocean'
    | 'aurora'
    | 'cosmic'
    | 'forest'
    | 'desert'
    | 'twilight'
    | 'volcano'
    | 'arctic'
    | 'nebula'
    | 'rainbow'
    | 'midnight';
  interactive?: boolean;
  children?: React.ReactNode;
  overlayOpacity?: number;
}

export function CosmicScene({
  className,
  size = '20px',
  colorScheme = 'default',
  interactive = true,
  children,
  overlayOpacity = 0,
  ...props
}: CosmicSceneProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const colorSchemes = {
    default:
      'from 180deg at 50% 70%, hsla(0,0%,98%,1) 0deg, #eec32d 72deg, #ec4b4b 144deg, #709ab9 216deg, #4dffbf 288deg, hsla(0,0%,98%,1) 1turn',
    neon: 'from 180deg at 50% 70%, #ff00ff 0deg, #00ffff 120deg, #ffff00 240deg, #ff00ff 360deg',
    sunset: 'from 180deg at 50% 70%, #ff7b00 0deg, #ff0055 120deg, #8900ff 240deg, #ff7b00 360deg',
    ocean: 'from 180deg at 50% 70%, #00fff2 0deg, #0066ff 120deg, #002bff 240deg, #00fff2 360deg',
    aurora:
      'from 180deg at 50% 70%, #00ff87 0deg, #60efff 90deg, #0061ff 180deg, #60efff 270deg, #00ff87 360deg',
    cosmic:
      'from 180deg at 50% 70%, #6600ff 0deg, #ff00cc 90deg, #ff0066 180deg, #ff00cc 270deg, #6600ff 360deg',
    forest:
      'from 180deg at 50% 70%, #2ecc71 0deg, #27ae60 90deg, #145a32 180deg, #27ae60 270deg, #2ecc71 360deg',
    desert:
      'from 180deg at 50% 70%, #ff9500 0deg, #ff5e3a 90deg, #ff2d55 180deg, #ff5e3a 270deg, #ff9500 360deg',
    twilight:
      'from 180deg at 50% 70%, #141e30 0deg, #243b55 90deg, #2c5364 180deg, #243b55 270deg, #141e30 360deg',
    volcano:
      'from 180deg at 50% 70%, #dd1818 0deg, #ff4e00 90deg, #ff8700 180deg, #ff4e00 270deg, #dd1818 360deg',
    arctic:
      'from 180deg at 50% 70%, #74ebd5 0deg, #acb6e5 90deg, #9face6 180deg, #acb6e5 270deg, #74ebd5 360deg',
    nebula:
      'from 180deg at 50% 70%, #5f2c82 0deg, #49a09d 90deg, #24243e 180deg, #49a09d 270deg, #5f2c82 360deg',
    rainbow:
      'from 180deg at 50% 70%, #ff0000 0deg, #ff8000 60deg, #ffff00 120deg, #00ff00 180deg, #0000ff 240deg, #8000ff 300deg, #ff0000 360deg',
    midnight:
      'from 180deg at 50% 70%, #020024 0deg, #090979 90deg, #00d4ff 180deg, #090979 270deg, #020024 360deg'
  };

  useEffect(() => {
    if (!interactive || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-full min-h-[400px] w-full overflow-hidden bg-[hsl(0_0%_6%)]',
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 h-full w-full animate-flicker transition-transform duration-300 ease-out"
        style={{
          background: `conic-gradient(${colorSchemes[colorScheme]})`,
          transform: interactive
            ? `perspective(1000px) rotateX(${
                (mousePosition.y - 50) * 0.02
              }deg) rotateY(${(mousePosition.x - 50) * 0.02}deg)`
            : undefined,
          WebkitMaskImage: `radial-gradient(circle at ${
            interactive ? `${mousePosition.x}% ${mousePosition.y}%` : '50% 50%'
          }, white 2px, transparent 2.5px), url("https://assets.codepen.io/605876/noise-mask.png")`,
          WebkitMaskSize: `${size} ${size}, 256px 256px`,
          WebkitMaskPosition: '50% 50%, 4px 50%',
          WebkitMaskComposite: 'intersect',
          maskImage: `radial-gradient(circle at ${
            interactive ? `${mousePosition.x}% ${mousePosition.y}%` : '50% 50%'
          }, white 2px, transparent 2.5px), url("https://assets.codepen.io/605876/noise-mask.png")`,
          maskSize: `${size} ${size}, 256px 256px`,
          maskPosition: '50% 50%, 4px 50%',
          maskComposite: 'intersect'
        }}
      />
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children}
    </div>
  );
}

export default CosmicScene;
