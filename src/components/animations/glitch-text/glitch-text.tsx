'use client';

import { FC, memo, useMemo } from 'react';
import { GlitchCSSProperties, GlitchTextProps } from './glitch-text.types';

/**
 * A component that applies a glitch text effect to its children
 *
 * @example
 * <GlitchText speed={0.8} enableShadows={true}>
 *   Glitched Text
 * </GlitchText>
 */
export const GlitchText: FC<GlitchTextProps> = memo(function GlitchText({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) {
  // Define CSS custom properties for animation speeds and shadow colors
  const inlineStyles: GlitchCSSProperties = useMemo(
    () => ({
      '--after-duration': `${speed * 3}s`,
      '--before-duration': `${speed * 2}s`,
      '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
      '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'
    }),
    [speed, enableShadows]
  );

  // Base styles for the glitch text container
  const baseClasses =
    'text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer';

  // Conditional classes for normal or hover-activated glitch effect
  const pseudoClasses = useMemo(
    () =>
      !enableOnHover
        ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060606] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after ' +
          'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060606] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before'
        : "after:content-[''] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060606] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
          "before:content-[''] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060606] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
          'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after ' +
          'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before',
    [enableOnHover]
  );

  const combinedClasses = `${baseClasses} ${pseudoClasses} ${className}`;

  return (
    <div style={inlineStyles} data-text={children} className={combinedClasses}>
      {children}
    </div>
  );
});

export default GlitchText;
