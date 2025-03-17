/**
 * Character particle implementation for the CharacterCursor component
 *
 * @module CharacterCursor/Particle
 */

import { CharacterCursorProps } from './character-cursor.types';

/**
 * Particle class that represents a single character in the cursor trail.
 * Handles the movement, animation, and rendering of characters.
 */
export class Particle {
  /** Sign of rotation (1 or -1) */
  rotationSign: number;
  /** Current age of the particle in frames */
  age: number;
  /** Initial lifespan of the particle in frames */
  initialLifeSpan: number;
  /** Current remaining lifespan of the particle in frames */
  lifeSpan: number;
  /** Velocity vector of the particle */
  velocity: { x: number; y: number };
  /** Current position of the particle */
  position: { x: number; y: number };
  /** Canvas element containing the rendered character */
  canv: HTMLCanvasElement;

  /**
   * Create a new character particle
   *
   * @param x - X position to create the particle at
   * @param y - Y position to create the particle at
   * @param canvasItem - Pre-rendered canvas element with the character
   * @param props - Reference to the component props
   */
  constructor(
    x: number,
    y: number,
    canvasItem: HTMLCanvasElement,
    private props: CharacterCursorProps
  ) {
    const lifeSpan = props.characterLifeSpanFunction?.() || 100;
    this.rotationSign = Math.random() < 0.5 ? -1 : 1;
    this.age = 0;
    this.initialLifeSpan = lifeSpan;
    this.lifeSpan = lifeSpan;
    this.velocity = props.initialCharacterVelocityFunction?.() || { x: 0, y: 0 };
    this.position = {
      x: x + (props.cursorOffset?.x || 0),
      y: y + (props.cursorOffset?.y || 0)
    };
    this.canv = canvasItem;
  }

  /**
   * Update the particle state and render it to the given context
   *
   * @param ctx - Canvas rendering context to draw to
   */
  update(ctx: CanvasRenderingContext2D): void {
    // Update position based on velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Update lifespan and age
    this.lifeSpan--;
    this.age++;

    // Apply velocity changes if functions exist
    if (this.props.characterVelocityChangeFunctions) {
      this.velocity.x += this.props.characterVelocityChangeFunctions.x_func(
        this.age,
        this.initialLifeSpan
      );
      this.velocity.y += this.props.characterVelocityChangeFunctions.y_func(
        this.age,
        this.initialLifeSpan
      );
    }

    // Calculate scale based on age
    const scale = this.props.characterScalingFunction
      ? this.props.characterScalingFunction(this.age, this.initialLifeSpan)
      : 1;

    // Calculate rotation based on age
    const degrees = this.props.characterNewRotationDegreesFunction
      ? this.rotationSign *
        this.props.characterNewRotationDegreesFunction(this.age, this.initialLifeSpan)
      : 0;
    const radians = degrees * 0.0174533; // Convert degrees to radians

    // Apply transformations and draw the character
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(radians);

    ctx.drawImage(
      this.canv,
      (-this.canv.width / 2) * scale,
      -this.canv.height / 2,
      this.canv.width * scale,
      this.canv.height * scale
    );

    // Restore transformations
    ctx.rotate(-radians);
    ctx.translate(-this.position.x, -this.position.y);
  }
}
