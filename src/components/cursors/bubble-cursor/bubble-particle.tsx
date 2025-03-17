'use client';

import { BubbleParticleData } from './bubble-particle.types';

/**
 * BubbleParticle class
 *
 * Creates and manages individual bubble particles that
 * animate according to physics rules.
 */
export class BubbleParticle implements BubbleParticleData {
  lifeSpan: number;
  initialLifeSpan: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  baseDimension: number;
  fillStyle: string;
  strokeStyle: string;

  /**
   * Create a new bubble particle.
   *
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param fillStyle - Fill color for bubble
   * @param strokeStyle - Stroke color for bubble
   */
  constructor(x: number, y: number, fillStyle: string, strokeStyle: string) {
    this.initialLifeSpan = Math.floor(Math.random() * 60 + 60);
    this.lifeSpan = this.initialLifeSpan;
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
      y: -0.4 + Math.random() * -1
    };
    this.position = { x, y };
    this.baseDimension = 4;
    this.fillStyle = fillStyle || '#e6f1f7';
    this.strokeStyle = strokeStyle || '#3a92c5';
  }

  /**
   * Update the particle's position and render it to the canvas.
   *
   * @param context - Canvas rendering context
   */
  update(context: CanvasRenderingContext2D) {
    // Turned off excessive logging
    // console.log('[BubbleParticle] Updating particle with lifespan:', this.lifeSpan);

    // Update position based on velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Apply small random changes to velocity
    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
    this.velocity.y -= Math.random() / 600;

    // Decrease lifespan
    this.lifeSpan--;

    // Calculate bubble scale based on remaining lifespan
    const scale = 0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;

    // Draw the bubble
    context.fillStyle = this.fillStyle;
    context.strokeStyle = this.strokeStyle;
    context.beginPath();
    context.arc(
      this.position.x - (this.baseDimension / 2) * scale,
      this.position.y - this.baseDimension / 2,
      this.baseDimension * scale,
      0,
      2 * Math.PI
    );

    context.stroke();
    context.fill();
    context.closePath();
  }
}

export default BubbleParticle;
