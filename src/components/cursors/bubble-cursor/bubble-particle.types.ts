/**
 * BubbleParticle Types
 *
 * Types used by the BubbleParticle class.
 */

/**
 * Interface for BubbleParticle properties.
 */
export interface BubbleParticleData {
  /**
   * Current lifespan of the particle.
   */
  lifeSpan: number;

  /**
   * Initial lifespan of the particle.
   */
  initialLifeSpan: number;

  /**
   * Velocity vector of the particle.
   */
  velocity: {
    x: number;
    y: number;
  };

  /**
   * Position coordinates of the particle.
   */
  position: {
    x: number;
    y: number;
  };

  /**
   * Base dimension of the particle in pixels.
   */
  baseDimension: number;

  /**
   * Fill style for the particle.
   */
  fillStyle: string;

  /**
   * Stroke style for the particle.
   */
  strokeStyle: string;
}

/**
 * Interface for constructing a bubble particle.
 */
export interface BubbleParticleConstructor {
  /**
   * Create a new bubble particle.
   *
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param fillStyle - Fill color
   * @param strokeStyle - Stroke color
   */
  new (
    x: number,
    y: number,
    fillStyle: string,
    strokeStyle: string
  ): BubbleParticleData & {
    /**
     * Update the particle and render to the context.
     *
     * @param context - Canvas rendering context
     */
    update(context: CanvasRenderingContext2D): void;
  };
}
