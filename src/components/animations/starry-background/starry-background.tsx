'use client';

import React from 'react';

export interface StarryBackgroundProps {
  backgroundColor?: string;
  className?: string;
  children?: React.ReactNode;
  noiseOpacity?: number;
  enableParallax?: boolean;
}

export function StarryBackground({
  backgroundColor = '#050510',
  className = '',
  children,
  noiseOpacity = 0.06,
  enableParallax = false
}: StarryBackgroundProps) {
  const starCount = 180;

  const starProperties = React.useMemo(
    () =>
      Array.from({ length: starCount }, () => ({
        isGlowing: Math.random() < 0.15,
        baseOpacity: Math.random() * 0.2 + 0.1,
        size: Math.random() < 0.05 ? 4 : Math.random() < 0.15 ? 3 : 2,
        glowIntensity: Math.random() * 0.2 + 0.1,
        animationDelay: `${Math.random() * -20}s`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        parallaxLayer: Math.floor(Math.random() * 3)
      })),
    []
  );

  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const parallaxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!enableParallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;

      const rect = parallaxRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setMousePosition({ x, y });
    };

    const element = parallaxRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, [enableParallax]);

  return (
    <div
      ref={parallaxRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          opacity: noiseOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(400%) brightness(100%)'
        }}
      />

      <div className="absolute inset-0 grid grid-cols-[repeat(18,1fr)] grid-rows-[repeat(10,1fr)] p-4">
        {starProperties.map((props, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center"
            style={
              enableParallax
                ? {
                    transform: `translate(${mousePosition.x * (props.parallaxLayer + 1) * -3}px, ${mousePosition.y * (props.parallaxLayer + 1) * -3}px)`,
                    transition: 'transform 0.1s ease-out'
                  }
                : undefined
            }
          >
            <div
              className={`rounded-full bg-white`}
              style={{
                width: `${props.size}px`,
                height: `${props.size}px`,
                opacity: props.baseOpacity,
                ...(props.isGlowing && {
                  animation: `glow ${props.animationDuration} ease-in-out infinite`,
                  animationDelay: props.animationDelay,
                  boxShadow: `0 0 ${props.glowIntensity * 3}px rgba(255,255,255,${
                    props.glowIntensity * 0.8
                  })`
                })
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}

export default StarryBackground;
