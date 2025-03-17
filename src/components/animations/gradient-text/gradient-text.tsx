'use client';

import { memo } from 'react';
import {
  DEFAULT_ANIMATION_SPEED,
  DEFAULT_GRADIENT_COLORS,
  DEFAULT_SHOW_BORDER
} from './gradient-text.constants';
import {
  useBorderGradientStyle,
  useGradientStyle,
  useInnerBorderStyle,
  useTextGradientStyle
} from './gradient-text.hooks';
import { GradientTextProps } from './gradient-text.types';

/**
 * GradientText component that applies an animated gradient to text
 * and optionally adds a matching gradient border
 */
const GradientText = memo(function GradientText({
  children,
  className = '',
  colors = DEFAULT_GRADIENT_COLORS,
  animationSpeed = DEFAULT_ANIMATION_SPEED,
  showBorder = DEFAULT_SHOW_BORDER
}: GradientTextProps) {
  // Use custom hooks to generate the different styles
  const gradientStyle = useGradientStyle(colors, animationSpeed);
  const textGradientStyle = useTextGradientStyle(gradientStyle);
  const borderGradientStyle = useBorderGradientStyle(gradientStyle);
  const innerBorderStyle = useInnerBorderStyle();

  return (
    <div
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
          style={borderGradientStyle}
        >
          <div
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
            style={innerBorderStyle}
          ></div>
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
        style={textGradientStyle}
      >
        {children}
      </div>
    </div>
  );
});

// Add named export for index.ts compatibility
export { GradientText };

export default GradientText;
