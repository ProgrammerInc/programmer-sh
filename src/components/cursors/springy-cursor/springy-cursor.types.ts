/**
 * SpringyCursor Types
 *
 * Type definitions for the SpringyCursor component
 *
 * @module SpringyCursor/Types
 */

/**
 * Props for the SpringyCursor component.
 */
export interface SpringyCursorProps {
  /**
   * Emoji character to use for the cursor particles.
   */
  emoji?: string;

  /**
   * Element to contain the cursor within.
   * If not provided, the cursor will be fixed to the viewport.
   */
  wrapperElement?: HTMLElement;
}

/**
 * Vector representation for physics calculations.
 */
export class Vec {
  /**
   * X component of the vector.
   */
  X: number;

  /**
   * Y component of the vector.
   */
  Y: number;

  /**
   * Creates a new vector.
   *
   * @param X - X component
   * @param Y - Y component
   */
  constructor(X: number, Y: number) {
    this.X = X;
    this.Y = Y;
  }
}

/**
 * Interface for a point in 2D space.
 */
export interface Point {
  /**
   * X coordinate.
   */
  x: number;

  /**
   * Y coordinate.
   */
  y: number;
}

/**
 * Particle class for the springy cursor effect.
 */
export class Particle {
  /**
   * Current position of the particle.
   */
  position: Point;

  /**
   * Current velocity of the particle.
   */
  velocity: Point;

  /**
   * Canvas element to draw.
   */
  canv: HTMLCanvasElement;

  /**
   * Creates a new particle.
   *
   * @param canvasItem - Canvas element to draw
   */
  constructor(canvasItem: HTMLCanvasElement) {
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.canv = canvasItem;
  }

  /**
   * Draws the particle to the context.
   *
   * @param ctx - Canvas rendering context
   */
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.canv,
      this.position.x - this.canv.width / 2,
      this.position.y - this.canv.height / 2,
      this.canv.width,
      this.canv.height
    );
  }
}

/**
 * State object used in the SpringyCursor component.
 */
export interface SpringyCursorState {
  /**
   * Whether the component is mounted.
   */
  mounted: boolean;

  /**
   * Whether the component is initialized.
   */
  initialized: boolean;

  /**
   * Array of particles.
   */
  particles: Particle[];

  /**
   * Current cursor position.
   */
  cursorPosition: Point;

  /**
   * Animation frame ID for cancelation.
   */
  animationFrame: number | null;

  /**
   * Canvas element for the emoji.
   */
  emojiCanvas: HTMLCanvasElement | null;

  /**
   * Width of the canvas.
   */
  width: number;

  /**
   * Height of the canvas.
   */
  height: number;

  /**
   * Canvas rendering context.
   */
  context: CanvasRenderingContext2D | null;
}
