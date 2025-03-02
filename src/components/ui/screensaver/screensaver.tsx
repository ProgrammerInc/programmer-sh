
import React, { useEffect, useRef } from 'react';
import './screensaver.css';

interface ScreensaverProps {
  isActive: boolean;
  onActivity: () => void;
}

const Screensaver: React.FC<ScreensaverProps> = ({ isActive, onActivity }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix rain effect
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = "01010101010";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const rainDrops = Array(columns).fill(1).map(() => -Math.floor(Math.random() * canvas.height));
    
    // Matrix colors
    const greenColor = "#64ffda";
    
    // Animation loop
    let animationId: number;
    
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = greenColor;
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < rainDrops.length; i++) {
        // Draw a random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        // Move rain drops down
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isActive]);

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
        <canvas ref={canvasRef} id="matrix-canvas"></canvas>
      </div>
      <div className="absolute text-terminal-foreground text-center opacity-70 pointer-events-none">
        <p className="text-lg mb-2">Screensaver Active</p>
        <p className="text-sm">Click or press any key to continue</p>
      </div>
    </div>
  );
};

export default Screensaver;
