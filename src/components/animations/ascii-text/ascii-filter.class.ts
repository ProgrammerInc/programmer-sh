/**
 * Class for converting rendered 3D content to ASCII text
 */

import * as THREE from 'three';
import { DEFAULT_ASCII_FILTER_OPTIONS } from './ascii-text.constants';
import { AsciiFilterOptions } from './ascii-text.types';

/**
 * Filter that converts rendered 3D content to ASCII text
 */
export class AsciiFilter {
  renderer: THREE.WebGLRenderer;
  domElement: HTMLDivElement;
  pre: HTMLPreElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  deg: number;
  invert: boolean;
  fontSize: number;
  fontFamily: string;
  charset: string;
  width: number = 0;
  height: number = 0;
  center: { x: number; y: number } = { x: 0, y: 0 };
  mouse: { x: number; y: number } = { x: 0, y: 0 };
  cols: number = 0;
  rows: number = 0;

  /**
   * Creates a new ASCII filter
   *
   * @param renderer - Three.js WebGL renderer
   * @param options - Configuration options for the ASCII filter
   */
  constructor(
    renderer: THREE.WebGLRenderer,
    { fontSize, fontFamily, charset, invert }: AsciiFilterOptions = {}
  ) {
    this.renderer = renderer;
    this.domElement = document.createElement('div');
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = '0';
    this.domElement.style.left = '0';
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';

    this.pre = document.createElement('pre');
    this.domElement.appendChild(this.pre);

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.domElement.appendChild(this.canvas);

    this.deg = 0;
    this.invert = invert ?? DEFAULT_ASCII_FILTER_OPTIONS.invert;
    this.fontSize = fontSize ?? DEFAULT_ASCII_FILTER_OPTIONS.fontSize!;
    this.fontFamily = fontFamily ?? DEFAULT_ASCII_FILTER_OPTIONS.fontFamily!;
    this.charset = charset ?? DEFAULT_ASCII_FILTER_OPTIONS.charset!;

    if (this.context) {
      this.context.imageSmoothingEnabled = false;
    }

    this.onMouseMove = this.onMouseMove.bind(this);
    document.addEventListener('mousemove', this.onMouseMove);
  }

  /**
   * Sets the size of the renderer and recalculates dimensions
   *
   * @param width - Width in pixels
   * @param height - Height in pixels
   */
  setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.center = {
      x: width / 2,
      y: height / 2
    };
    this.reset();
  }

  /**
   * Resets the canvas dimensions and styles based on current settings
   */
  reset(): void {
    this.cols = Math.floor(this.width / this.fontSize);
    this.rows = Math.floor(this.height / this.fontSize);

    this.canvas.width = this.cols;
    this.canvas.height = this.rows;
    this.canvas.style.width = this.cols + 'px';
    this.canvas.style.height = this.rows + 'px';
    this.canvas.style.imageRendering = 'pixelated';
    this.canvas.style.transform = `scale(${this.fontSize})`;
    this.canvas.style.transformOrigin = '0 0';

    this.pre.style.display = 'block';
    this.pre.style.position = 'absolute';
    this.pre.style.width = '100%';
    this.pre.style.height = '100%';
    this.pre.style.fontFamily = this.fontFamily;
    this.pre.style.fontSize = this.fontSize + 'px';
    this.pre.style.lineHeight = '1';
    this.pre.style.letterSpacing = '0';
    this.pre.style.whiteSpace = 'pre';
  }

  /**
   * Renders the scene through the ASCII filter
   *
   * @param scene - Three.js scene to render
   * @param camera - Three.js camera to use for rendering
   */
  render(scene: THREE.Scene, camera: THREE.Camera): void {
    this.renderer.render(scene, camera);
    if (!this.context) return;

    // Get renderer canvas content
    const gl = this.renderer.getContext();
    const pixels = new Uint8Array(4 * this.cols * this.rows);
    gl.readPixels(0, 0, this.cols, this.rows, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    // Create ImageData and draw to 2D canvas
    const imageData = new ImageData(this.cols, this.rows);
    for (let i = 0; i < pixels.length; i += 4) {
      // Flip upside down, Three.js uses WebGL with bottom-row first
      const row = this.rows - Math.floor(i / 4 / this.cols) - 1;
      const col = (i / 4) % this.cols;
      const idx = (row * this.cols + col) * 4;

      imageData.data[idx] = pixels[i];
      imageData.data[idx + 1] = pixels[i + 1];
      imageData.data[idx + 2] = pixels[i + 2];
      imageData.data[idx + 3] = pixels[i + 3];
    }

    this.context.putImageData(imageData, 0, 0);
    this.hue();
    this.asciify(this.context, this.cols, this.rows);
  }

  /**
   * Updates mouse position for interactive effects
   *
   * @param e - Mouse event with position data
   */
  onMouseMove(e: MouseEvent): void {
    this.mouse = {
      x: e.clientX,
      y: e.clientY
    };
  }

  /**
   * Calculates the horizontal distance from mouse to center
   */
  dx(): number {
    return this.mouse.x - this.center.x;
  }

  /**
   * Calculates the vertical distance from mouse to center
   */
  dy(): number {
    return this.mouse.y - this.center.y;
  }

  /**
   * Updates the hue rotation based on mouse position
   */
  hue(): void {
    const hue = (this.deg += 0.5);
    this.pre.style.filter = `hue-rotate(${hue}deg)`;
  }

  /**
   * Converts pixel data to ASCII characters based on brightness
   *
   * @param ctx - Canvas context with image data
   * @param w - Width of the canvas
   * @param h - Height of the canvas
   */
  asciify(ctx: CanvasRenderingContext2D, w: number, h: number): void {
    const data = ctx.getImageData(0, 0, w, h);
    const pixels = data.data;
    const len = this.charset.length - 1;
    let str = '';

    // loop over pixels, collect averaged brightness values
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        const idx = (i * w + j) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const avg = (r + g + b) / 3;
        const scaled = this.invert ? (255 - avg) / 255 : avg / 255;
        const index = Math.floor(scaled * len);
        str += this.charset[index];
      }
      str += '\n';
    }
    this.pre.textContent = str;
  }

  /**
   * Disposes of the filter and cleans up event listeners
   */
  dispose(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    this.domElement.remove();
  }
}
