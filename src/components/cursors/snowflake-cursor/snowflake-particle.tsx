'use client';

/**
 * SnowflakeParticle Class
 */
export class SnowflakeParticle {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  lifeSpan: number;
  initialLifeSpan: number;
  canv: HTMLCanvasElement;

  constructor(x: number, y: number, canvasItem: HTMLCanvasElement) {
    this.position = { x, y };
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
      y: 1 + Math.random()
    };
    this.lifeSpan = Math.floor(Math.random() * 60 + 80);
    this.initialLifeSpan = this.lifeSpan;
    this.canv = canvasItem;
  }

  update(context: CanvasRenderingContext2D) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.lifeSpan--;

    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
    this.velocity.y -= Math.random() / 300;

    const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

    context.save();
    context.translate(this.position.x, this.position.y);
    context.scale(scale, scale);
    context.drawImage(this.canv, -this.canv.width / 2, -this.canv.height / 2);
    context.restore();
  }
}

export default SnowflakeParticle;
