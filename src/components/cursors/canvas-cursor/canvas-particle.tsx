import { CanvasCursorConfig, LineOptions, NodeType } from './canvas-cursor.types';

export class Node implements NodeType {
  x: number = 0;
  y: number = 0;
  vy: number = 0;
  vx: number = 0;

  constructor() {
    // Initialize with default values
  }
}

export class Line {
  spring: number;
  friction: number;
  nodes: NodeType[] = [];

  constructor(
    options: LineOptions,
    private config: CanvasCursorConfig,
    private getPos: () => { x: number; y: number }
  ) {
    this.init(options);
  }

  init(options: LineOptions): void {
    this.spring = options.spring + 0.1 * Math.random() - 0.02;
    this.friction = this.config.friction + 0.01 * Math.random() - 0.002;
    this.nodes = [];

    for (let i = 0; i < this.config.size; i++) {
      const node = new Node();
      const pos = this.getPos();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update(): void {
    const pos = this.getPos();
    let springFactor = this.spring;
    let node = this.nodes[0];

    node.vx += (pos.x - node.x) * springFactor;
    node.vy += (pos.y - node.y) * springFactor;

    for (let i = 0, len = this.nodes.length; i < len; i++) {
      node = this.nodes[i];

      if (i > 0) {
        const prevNode = this.nodes[i - 1];
        node.vx += (prevNode.x - node.x) * springFactor;
        node.vy += (prevNode.y - node.y) * springFactor;
        node.vx += prevNode.vx * this.config.dampening;
        node.vy += prevNode.vy * this.config.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      springFactor *= this.config.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!ctx) return;

    let node: NodeType;
    let nextNode: NodeType;
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 1, len = this.nodes.length - 2; i < len; i++) {
      node = this.nodes[i];
      nextNode = this.nodes[i + 1];
      x = 0.5 * (node.x + nextNode.x);
      y = 0.5 * (node.y + nextNode.y);
      ctx.quadraticCurveTo(node.x, node.y, x, y);
    }

    const lastIndex = this.nodes.length - 2;
    node = this.nodes[lastIndex];
    nextNode = this.nodes[lastIndex + 1];
    ctx.quadraticCurveTo(node.x, node.y, nextNode.x, nextNode.y);
    ctx.stroke();
    ctx.closePath();
  }
}
