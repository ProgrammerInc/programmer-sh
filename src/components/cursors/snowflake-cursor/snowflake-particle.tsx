'use client';

import { PARTICLE_PHYSICS } from './snowflake-cursor.constants';
import type { Position, SnowflakeParticleState, Velocity } from './snowflake-cursor.types';

/**
 * SnowflakeParticle Class
 * Represents a single snowflake particle that follows the cursor
 */
export class SnowflakeParticle implements SnowflakeParticleState {
  /**
   * Current position of the particle
   */
  position: Position;

  /**
   * Current velocity of the particle
   */
  velocity: Velocity;

  /**
   * Remaining life span in frames
   */
  lifeSpan: number;

  /**
   * Initial life span in frames
   */
  initialLifeSpan: number;

  /**
   * Canvas element containing the emoji
   */
  canv: HTMLCanvasElement;

  /**
   * Creates a new snowflake particle
   *
   * @param x - Initial x position
   * @param y - Initial y position
   * @param canvasItem - Canvas element containing the emoji
   */
  constructor(x: number, y: number, canvasItem: HTMLCanvasElement) {
    // Set initial position
    this.position = { x, y };

    // Set initial velocity with random direction and magnitude
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * PARTICLE_PHYSICS.baseHorizontalVelocity),
      y: PARTICLE_PHYSICS.baseVerticalVelocity + Math.random()
    };

    // Set random lifespan
    this.lifeSpan = Math.floor(
      Math.random() * PARTICLE_PHYSICS.additionalLifeSpan + PARTICLE_PHYSICS.minLifeSpan
    );
    this.initialLifeSpan = this.lifeSpan;

    // Store canvas element
    this.canv = canvasItem;
  }

  /**
   * Updates the particle state and renders it to the canvas
   *
   * @param context - Canvas rendering context
   */
  update(context: CanvasRenderingContext2D): void {
    // Update position based on velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Decrement lifespan
    this.lifeSpan--;

    // Add some randomness to velocity for natural movement
    this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * PARTICLE_PHYSICS.horizontalVariationFactor;
    this.velocity.y -= Math.random() * PARTICLE_PHYSICS.verticalReductionFactor;

    // Calculate scale based on remaining lifespan
    const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

    // Draw the particle with proper scaling
    context.save();
    context.translate(this.position.x, this.position.y);
    context.scale(scale, scale);
    context.drawImage(this.canv, -this.canv.width / 2, -this.canv.height / 2);
    context.restore();
  }
}

export default SnowflakeParticle;
