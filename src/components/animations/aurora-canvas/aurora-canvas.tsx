'use client';

import { cn } from '@/utils/app.utils';
import React, { useEffect, useRef } from 'react';

export interface AuroraCanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  colors?: string[];
  speed?: number;
  layers?: number;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  layer: number;
}

export function AuroraCanvas({
  colors = ['#00ff87', '#60efff', '#0061ff', '#ff0099'],
  speed = 0.2,
  layers = 3,
  interactive = true,
  className,
  ...props
}: AuroraCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setCanvasSize();

    // Initialize particles
    const particleCount = Math.floor(25 * layers);
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 80 + 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      layer: Math.floor(Math.random() * layers)
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < -particle.size) particle.x = width + particle.size;
        if (particle.x > width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = height + particle.size;
        if (particle.y > height + particle.size) particle.y = -particle.size;

        // Interactive movement
        if (interactive && mousePosRef.current.x && mousePosRef.current.y) {
          const dx = mousePosRef.current.x - particle.x;
          const dy = mousePosRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.01;
            particle.vx += dx * force;
            particle.vy += dy * force;
          }
        }

        // Apply velocity limits
        const maxVelocity = speed * 2;
        particle.vx = Math.max(Math.min(particle.vx, maxVelocity), -maxVelocity);
        particle.vy = Math.max(Math.min(particle.vy, maxVelocity), -maxVelocity);

        // Draw particle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );
        gradient.addColorStop(0, `${particle.color}30`);
        gradient.addColorStop(1, `${particle.color}00`);
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse move handler with throttling
    let lastMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMove < 16) return;
      lastMove = now;

      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleResize = () => {
      setCanvasSize();
      // Reset particle positions on resize
      particlesRef.current.forEach(particle => {
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
      });
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [colors, speed, layers, interactive]);

  return <canvas ref={canvasRef} className={cn('block h-full w-full', className)} {...props} />;
}

export default AuroraCanvas;
