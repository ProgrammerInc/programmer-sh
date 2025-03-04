
import React from 'react';

export interface WallpaperProps {
  name?: string;
  className?: string;
}

export const Wallpaper: React.FC<WallpaperProps> = ({ name = 'default', className = '' }) => {
  return (
    <div 
      className={`fixed inset-0 -z-10 transition-opacity duration-500 ${className}`}
      data-wallpaper={name}
    />
  );
};

export default Wallpaper;
