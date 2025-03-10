import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

export interface ParticleVeilProps extends React.HTMLAttributes<HTMLCanvasElement> {
  /**
   * Number of particles to render
   * @default 100
   */
  particleCount?: number;
  /**
   * Colors for the particles. If multiple colors are provided, they will be distributed among particles
   * @default ["#ffffff"]
   */
  particleColors?: string[];
  /**
   * Mouse interaction radius in pixels
   * @default 100
   */
  interactionRadius?: number;
  /**
   * Particle movement speed
   * @default 1
   */
  speed?: number;
  /**
   * Particle size range [min, max]
   * @default [1, 3]
   */
  sizeRange?: [number, number];
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  life: number;
  color: string;
}

export function ParticleVeil({
  className,
  particleCount = 100,
  particleColors = ['#ffffff'],
  interactionRadius = 100,
  speed = 1,
  sizeRange = [1, 3],
  ...props
}: ParticleVeilProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | undefined>(undefined);
  const dprRef = useRef(1);

  const createParticles = (width: number, height: number) => {
    return Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const baseSpeed = speed * (0.5 + Math.random() * 0.5);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
        vx: Math.cos(angle) * baseSpeed,
        vy: Math.sin(angle) * baseSpeed,
        baseVx: Math.cos(angle) * baseSpeed,
        baseVy: Math.sin(angle) * baseSpeed,
        life: Math.random() * 0.3 + 0.7,
        color: particleColors[Math.floor(Math.random() * particleColors.length)]
      };
    });
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach(p => {
      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width / dprRef.current;
      if (p.x > canvas.width / dprRef.current) p.x = 0;
      if (p.y < 0) p.y = canvas.height / dprRef.current;
      if (p.y > canvas.height / dprRef.current) p.y = 0;

      // Mouse interaction
      const dx = mouseRef.current.x - p.x;
      const dy = mouseRef.current.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < interactionRadius) {
        // Repel from mouse
        const force = (1 - dist / interactionRadius) * 0.15;
        p.vx = p.vx * (1 - force) - dx * force;
        p.vy = p.vy * (1 - force) - dy * force;
        p.life = Math.min(1, p.life + 0.1);
      } else {
        // Return to natural movement
        p.vx += (p.baseVx - p.vx) * 0.1;
        p.vy += (p.baseVy - p.vy) * 0.1;
        p.life = Math.max(0.7, p.life - 0.02);
      }

      // Draw particle
      ctx.beginPath();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.arc(p.x * dprRef.current, p.y * dprRef.current, p.size * dprRef.current, 0, Math.PI * 2);
      ctx.fill();
    });

    rafRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup canvas context
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    contextRef.current = ctx;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      dprRef.current = window.devicePixelRatio || 1;

      canvas.width = rect.width * dprRef.current;
      canvas.height = rect.height * dprRef.current;

      // Create particles at logical (pre-scaled) coordinates
      particlesRef.current = createParticles(rect.width, rect.height);
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Initialize
    resizeCanvas();
    draw();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount, particleColors, interactionRadius, speed, sizeRange]);

  return <canvas ref={canvasRef} className={cn('h-full w-full', className)} {...props} />;
}

export default ParticleVeil;
