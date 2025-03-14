'use client';

import { cn } from '@/utils/app.utils';
import React from 'react';
import { StarsBackground } from '..';
import './meteors.css';

export interface MeteorsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  number?: number;
  className?: string;
  withStars?: boolean;
}

export const Meteors = ({ color, number, className, withStars = true }: MeteorsProps) => {
  const meteors = new Array(number || 50).fill(true);

  // Default Tailwind class when no custom color is provided
  const defaultMeteorClass =
    'before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-transparent';

  // Set CSS variable for the custom color if needed
  React.useEffect(() => {
    if (color) {
      document.documentElement.style.setProperty('--meteor-from-color', color);
    }

    return () => {
      // Cleanup
      if (color) {
        document.documentElement.style.removeProperty('--meteor-from-color');
      }
    };
  }, [color]);

  const meteorsHtml = meteors.map((el, idx) => (
    <span
      key={'meteor' + idx}
      className={cn(
        'animate-meteor-effect absolute top-1/2 left-1/2 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
        "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px]",
        color ? 'meteor-custom-gradient' : defaultMeteorClass,
        className
      )}
      style={{
        top: 0,
        left: Math.floor(Math.random() * (1920 - -1920) + -1920) + 'px',
        animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
        animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's'
      }}
    />
  ));

  if (withStars) {
    return (
      <div className="meteors-container">
        {meteorsHtml}
        <StarsBackground className="stars-background" />
      </div>
    );
  }

  return <div className="meteors-container">{meteorsHtml}</div>;
};

export default Meteors;
