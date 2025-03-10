'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export interface ParticleNetworkProps {
  particleCount?: number;
  particleSize?: number;
  particleColor?: string;
  lineColor?: string;
  maxDistance?: number;
  speed?: number;
  className?: string;
  interactive?: boolean;
}

export function ParticleNetwork({
  particleCount = 50,
  particleSize = 2,
  particleColor = '#4a90e2',
  lineColor = 'rgba(74, 144, 226, 0.2)',
  maxDistance = 100,
  speed = 1,
  className = '',
  interactive = true
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isMouseInCanvasRef = useRef(false);
  const animationFrameId = useRef<number | undefined>(undefined);

  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: particleSize
      });
    }
    particlesRef.current = particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initParticles(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseEnter = () => {
      isMouseInCanvasRef.current = true;
    };

    const handleMouseLeave = () => {
      isMouseInCanvasRef.current = false;
    };

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      particlesRef.current = particlesRef.current.map(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        return particle;
      });

      ctx.beginPath();
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle1 = particlesRef.current[i];

        if (interactive && isMouseInCanvasRef.current) {
          const mouseDistance = Math.hypot(
            mousePositionRef.current.x - particle1.x,
            mousePositionRef.current.y - particle1.y
          );
          if (mouseDistance < maxDistance) {
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(mousePositionRef.current.x, mousePositionRef.current.y);
          }
        }

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particle2 = particlesRef.current[j];
          const distance = Math.hypot(particle2.x - particle1.x, particle2.y - particle1.y);

          if (distance < maxDistance) {
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
          }
        }
      }
      ctx.strokeStyle = lineColor;
      ctx.stroke();

      animationFrameId.current = requestAnimationFrame(animate);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleColor, lineColor, maxDistance, particleCount, particleSize, speed, interactive]);

  return (
    <canvas
      ref={node => {
        canvasRef.current = node;
      }}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}

export default ParticleNetwork;
