
import React, { useEffect } from 'react';
import './screensaver.css';

interface ScreensaverProps {
  isActive: boolean;
  onActivity: () => void;
}

const Screensaver: React.FC<ScreensaverProps> = ({ isActive, onActivity }) => {
  // Handle user activity to dismiss the screensaver
  useEffect(() => {
    if (!isActive) return;
    
    const handleActivity = () => {
      onActivity();
    };
    
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    
    return () => {
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [isActive, onActivity]);

  if (!isActive) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={onActivity}
    >
      <div className="matrix-rain" aria-label="Matrix-style screensaver">
        <canvas id="matrix-canvas"></canvas>
      </div>
      <div className="absolute text-terminal-foreground text-center opacity-70 pointer-events-none">
        <p className="text-lg mb-2">Screensaver Active</p>
        <p className="text-sm">Click or press any key to continue</p>
      </div>
    </div>
  );
};

export default Screensaver;
