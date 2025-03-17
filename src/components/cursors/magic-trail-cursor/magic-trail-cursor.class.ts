/**
 * MagicTrailCursor
 *
 * Class implementation for the MagicTrailCursor component
 *
 * @module MagicTrailCursor
 */

import { Particle, Position, TrailPoint } from './magic-trail-cursor.types';
import {
  colorWithOpacity,
  createParticle,
  getDistance,
  getRelativeMousePosition,
  isPointInBounds,
  smoothPosition
} from './magic-trail-cursor.utils';

/**
 * Main class for handling the magic trail cursor rendering and animation
 */
export class MagicTrailCursorBase {
  /** Canvas element */
  protected canvas: HTMLCanvasElement;
  /** Canvas rendering context */
  protected ctx: CanvasRenderingContext2D;
  /** Container element */
  protected container: HTMLElement;
  /** Trail points */
  protected points: TrailPoint[] = [];
  /** Particles */
  protected particles: Particle[] = [];
  /** Current mouse position */
  protected mousePos: Position = { x: 0, y: 0 };
  /** Target position for smooth movement */
  protected targetPos: Position = { x: 0, y: 0 };
  /** Color array */
  protected colors: string[];
  /** Index in the color array */
  protected colorIndex: number = 0;
  /** Timestamp of last point addition */
  protected lastAddTime: number = 0;
  /** Flag indicating if pointer is in container bounds */
  protected isPointerInBounds: boolean = true;
  /** Maximum trail length */
  protected trailLength: number;
  /** Decay rate */
  protected decay: number;
  /** Smoothing factor */
  protected smoothing: number;
  /** Maximum particle count */
  protected particleCount: number;
  /** Animation frame ID for cleanup */
  protected animationFrameId: number | null = null;
  /** Flag to track if the component is mounted */
  protected mounted: boolean = true;
  /** Flag to track if animation is running */
  protected isAnimating: boolean = false;

  /**
   * Creates a new MagicTrailCursorBase instance
   * @param canvas - Canvas element for rendering
   * @param container - Container element for event handling
   * @param options - Configuration options
   */
  constructor(
    canvas: HTMLCanvasElement,
    container: HTMLElement = document.body,
    options: {
      colors?: string[];
      trailLength?: number;
      decay?: number;
      smoothing?: number;
      particleCount?: number;
    } = {}
  ) {
    // Set default options if not provided
    const {
      colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'],
      trailLength = 35,
      decay = 0.03,
      smoothing = 0.65,
      particleCount = 50
    } = options;

    this.canvas = canvas;
    this.container = container;
    this.colors = colors;
    this.trailLength = trailLength;
    this.decay = decay;
    this.smoothing = smoothing;
    this.particleCount = particleCount;

    // Initialize context
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) throw new Error('Could not get 2D context from canvas');
    this.ctx = context;

    // Initialize position
    this.targetPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    this.init();
  }

  /**
   * Initialize the canvas and event listeners
   */
  protected init(): void {
    this.updateCanvasSize();
    this.addEventListeners();
    this.startAnimation();
  }

  /**
   * Update canvas size based on container dimensions
   */
  protected updateCanvasSize(): void {
    const dpr = window.devicePixelRatio || 1;
    const width = this.container === document.body ? window.innerWidth : this.container.clientWidth;
    const height =
      this.container === document.body ? window.innerHeight : this.container.clientHeight;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.scale(dpr, dpr);
  }

  /**
   * Add necessary event listeners
   */
  protected addEventListeners(): void {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('mousemove', this.handleMouseMove);
    this.container.addEventListener('mousemove', this.handleMouseMove);
    this.container.addEventListener('mouseleave', this.handleMouseLeave);
  }

  /**
   * Handle window resize event
   */
  protected handleResize = (): void => {
    if (!this.mounted) return;
    this.updateCanvasSize();
  };

  /**
   * Handle mouse movement
   */
  protected handleMouseMove = (e: MouseEvent): void => {
    if (!this.mounted) return;

    const pos = getRelativeMousePosition(e, this.container);
    this.targetPos = pos;

    // Update bounds check
    this.isPointerInBounds = isPointInBounds(pos, this.container);
  };

  /**
   * Handle mouse leave event
   */
  protected handleMouseLeave = (): void => {
    if (!this.mounted) return;
    // Only set to false if not using document.body as container
    if (this.container !== document.body) {
      this.isPointerInBounds = false;
    }
  };

  /**
   * Add a point to the trail
   */
  protected addPoint(): void {
    if (!this.isPointerInBounds) return;

    const now = performance.now();
    const timeDiff = now - this.lastAddTime;

    // Smooth movement
    this.mousePos = smoothPosition(this.mousePos, this.targetPos, this.smoothing);

    const lastPoint = this.points[this.points.length - 1];
    const distance = lastPoint ? getDistance(this.mousePos, lastPoint) : Infinity;

    if (distance > 2 || timeDiff > 16) {
      const currentColor = this.colors[this.colorIndex];

      this.points.push({
        x: this.mousePos.x,
        y: this.mousePos.y,
        age: 0,
        color: currentColor
      });

      // Add particles at the current point
      for (let i = 0; i < 3; i++) {
        this.particles.push(createParticle(this.mousePos.x, this.mousePos.y, currentColor));
      }

      if (distance > 10) {
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      }

      this.lastAddTime = now;

      // Limit trail length
      if (this.points.length > this.trailLength) {
        this.points.shift();
      }

      // Limit total particles
      if (this.particles.length > this.particleCount) {
        this.particles = this.particles.slice(-this.particleCount);
      }
    }
  }

  /**
   * Draw a sparkle effect
   */
  protected drawSparkle(x: number, y: number, size: number, color: string): void {
    const opacity = Math.random() * 0.5 + 0.5;
    this.ctx.strokeStyle = colorWithOpacity(color, opacity);
    this.ctx.lineWidth = size * 0.5;

    // Draw a star shape
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      this.ctx.beginPath();
      this.ctx.moveTo(x - Math.cos(angle) * size, y - Math.sin(angle) * size);
      this.ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
      this.ctx.stroke();
    }
  }

  /**
   * Main animation loop
   */
  protected animate = (): void => {
    if (!this.mounted || !this.isAnimating) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = 'lighter';

    this.addPoint();

    // Draw main trail with glow
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.shadowBlur = 15;

    // Draw trail lines
    for (let i = 1; i < this.points.length; i++) {
      const point = this.points[i];
      const prevPoint = this.points[i - 1];
      const opacity = Math.max(1 - point.age, 0);
      const size = Math.max(4 * (1 - point.age), 0);

      this.ctx.shadowColor = point.color;
      const gradient = this.ctx.createLinearGradient(prevPoint.x, prevPoint.y, point.x, point.y);

      const prevOpacity = Math.max(1 - prevPoint.age, 0);
      gradient.addColorStop(0, colorWithOpacity(prevPoint.color, prevOpacity));
      gradient.addColorStop(1, colorWithOpacity(point.color, opacity));

      this.ctx.beginPath();
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = size;
      this.ctx.moveTo(prevPoint.x, prevPoint.y);
      this.ctx.lineTo(point.x, point.y);
      this.ctx.stroke();
    }

    // Update and draw particles
    this.ctx.shadowBlur = 0;
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.05; // Gravity effect
      particle.life -= 0.02;

      if (particle.life > 0) {
        const opacity = particle.life;
        this.drawSparkle(particle.x, particle.y, particle.size * opacity, particle.color);
      }
    });

    // Remove dead particles
    this.particles = this.particles.filter(p => p.life > 0);

    // Age points
    this.points.forEach(point => {
      point.age += this.decay;
    });
    this.points = this.points.filter(point => point.age < 1);

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  /**
   * Start the animation loop
   */
  public startAnimation(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  /**
   * Stop the animation loop
   */
  public stopAnimation(): void {
    this.isAnimating = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Clean up resources
   */
  public destroy(): void {
    this.mounted = false;
    this.stopAnimation();

    // Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.container.removeEventListener('mousemove', this.handleMouseMove);
    this.container.removeEventListener('mouseleave', this.handleMouseLeave);

    // Clear data
    this.points = [];
    this.particles = [];
  }
}
