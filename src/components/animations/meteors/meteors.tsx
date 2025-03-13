import { cn } from '@/lib/utils';
import { StarsBackground } from '..';
import React from 'react';

export interface MeteorsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  number?: number;
  className?: string;
  withStars?: boolean;
}

export const Meteors = ({ color, number, className, withStars = true }: MeteorsProps) => {
  const meteors = new Array(number || 50).fill(true);
  
  // Default Tailwind class when no custom color is provided
  const defaultMeteorClass = 'before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-transparent';
  
  // Create a style object for custom colors
  const customColorStyle = color ? {
    '--meteor-from-color': color,
  } as React.CSSProperties : {};
  
  // Add a global style for the custom color if needed
  const globalStyles = color ? (
    <style dangerouslySetInnerHTML={{
      __html: `
        .meteor-custom-gradient::before {
          background-image: linear-gradient(to right, var(--meteor-from-color), transparent) !important;
        }
      `
    }} />
  ) : null;
  
  const meteorsHtml = meteors.map((el, idx) => (
    <span
      key={'meteor' + idx}
      className={cn(
        'animate-meteor-effect absolute top-1/2 left-1/2 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
        "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px]",
        // Use default class only if no custom color is provided, otherwise use our custom class
        color ? 'before:bg-gradient-to-r before:to-transparent meteor-custom-gradient' : defaultMeteorClass,
        className
      )}
      style={{
        top: 0,
        left: Math.floor(Math.random() * (1920 - -1920) + -1920) + 'px',
        animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
        animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
        ...customColorStyle,
      }}
    />
  ));

  if (withStars) {
    return (
      <div className="meteors-container">
        {globalStyles}
        {meteorsHtml}
        <StarsBackground className="stars-background" />
      </div>
    );
  }

  return (
    <div className="meteors-container">
      {globalStyles}
      {meteorsHtml}
    </div>
  );
};

export default Meteors;
