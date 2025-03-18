'use client';

/**
 * Pixel class for animated pixel effects
 * 
 * Handles individual pixel rendering and animation in the PixelCard component.
 */
export class Pixel {
  /** Canvas width */
  width: number;
  /** Canvas height */
  height: number;
  /** Canvas rendering context */
  ctx: CanvasRenderingContext2D;
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Pixel color (hex) */
  color: string;
  /** Animation speed */
  speed: number;
  /** Current size */
  size: number;
  /** Size increment step */
  sizeStep: number;
  /** Minimum size */
  minSize: number;
  /** Maximum size as integer */
  maxSizeInteger: number;
  /** Calculated maximum size */
  maxSize: number;
  /** Animation delay */
  delay: number;
  /** Counter for delay */
  counter: number;
  /** Counter increment step */
  counterStep: number;
  /** Whether pixel is idle */
  isIdle: boolean;
  /** Whether animation is in reverse */
  isReverse: boolean;
  /** Whether pixel is in shimmer state */
  isShimmer: boolean;

  /**
   * Create a new animated pixel
   */
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  /**
   * Generate a random value between min and max
   */
  getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Draw the pixel on the canvas
   */
  draw(): void {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  /**
   * Handle pixel appearance animation
   */
  appear(): void {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  /**
   * Handle pixel disappearance animation
   */
  disappear(): void {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  /**
   * Handle pixel shimmer animation
   */
  shimmer(): void {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}
