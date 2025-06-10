/**
 * Media class for Circular Gallery
 * Handles rendering and updating individual gallery items
 */

import { Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { Title } from './circular-gallery-title.class';
import { GL, MediaProps, ScreenSize, Viewport } from './circular-gallery.types';
import { lerp } from './circular-gallery.utils';

export class Media {
  private extra: number = 0;
  private geometry: Plane;
  private gl: GL;
  private image: string;
  private index: number;
  private length: number;
  private renderer: Renderer;
  private scene: Transform;
  private screen: ScreenSize;
  private text: string;
  private viewport: Viewport;
  private bend: number;
  private textColor: string;
  private borderRadius: number;
  private font?: string;
  private program!: Program;
  private plane!: Mesh;
  private title!: Title;
  private scale!: number;
  private padding!: number;
  public width!: number;
  private widthTotal!: number;
  private x!: number;
  private speed: number = 0;
  private isBefore: boolean = false;
  private isAfter: boolean = false;

  /**
   * Create a new Media instance
   * @param props - Media properties
   */
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  /**
   * Create shader for the media item
   */
  private createShader(): void {
    const texture = new Texture(this.gl);
    this.program = new Program(this.gl, {
      vertex: /* glsl */ `
        attribute vec3 position;
        attribute vec2 uv;

        uniform float uStrength;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;

        varying vec2 vUv;
        varying float vBend;

        void main() {
          vec3 pos = position;
          pos.y *= 1.0;
          pos.z += pow(abs(pos.x) * uStrength, 2.0);

          vUv = uv;
          vBend = pos.z;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragment: /* glsl */ `
        precision highp float;

        uniform vec2 uImageSizes;
        uniform sampler2D tMap;
        uniform float uRadius;
        uniform vec2 uRes;

        varying vec2 vUv;
        varying float vBend;

        void main() {
          vec2 s = uImageSizes;
          vec2 r = uRes;

          // Aspect ratios
          float ra = r.x / r.y;
          float sa = s.x / s.y;

          // Coordinates
          vec2 coord = vUv;

          // Adjust aspect ratio
          if (ra > sa) {
            coord.y *= r.y / (r.x / sa);
            coord.y -= (r.y - r.x / sa) / (2.0 * r.y);
          } else {
            coord.x *= r.x / (r.y * sa);
            coord.x -= (r.x - r.y * sa) / (2.0 * r.x);
          }

          // Border radius
          float radius = uRadius;
          vec2 halfRes = 0.5 * r / min(r.x, r.y);
          float d = length(max(abs(coord - 0.5) - halfRes + radius, 0.0)) - radius;
          float outer = 1.0 - smoothstep(-0.01, 0.0, d);

          // Final texture
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color * outer;
          if (gl_FragColor.a < 0.01) discard;
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uStrength: { value: this.bend },
        uImageSizes: { value: [1, 1] },
        uRadius: { value: this.borderRadius },
        uRes: { value: [1, 1] }
      },
      transparent: true
    });

    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  /**
   * Create mesh for the media item
   */
  private createMesh(): void {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  /**
   * Create title for the media item
   */
  private createTitle(): void {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    });
  }

  /**
   * Update the media item position and state
   * @param scroll - Current scroll position
   * @param direction - Scroll direction
   */
  update(scroll: { current: number; last: number }, direction: 'right' | 'left'): void {
    if (!this.plane || !this.program) return;

    const y = window.innerHeight / 2;
    this.isBefore =
      direction === 'right' ? this.x < -this.widthTotal / 2 : this.x < -this.widthTotal;
    this.isAfter = direction === 'right' ? this.x > this.widthTotal : this.x > this.widthTotal / 2;

    if (direction === 'right' && this.isBefore) {
      this.x += this.widthTotal;
    }

    if (direction === 'left' && this.isAfter) {
      this.x -= this.widthTotal;
    }

    this.plane.position.x = this.x - scroll.current;
    this.plane.position.y = Math.cos((this.x - scroll.current) * 0.3) * 0.4 - 0.2;

    const scaleMap =
      {
        '-1': 0.5,
        '0': 0.8,
        '1': 0.5
      }[Math.sign(Math.round(this.x - scroll.current))] || 0.8;

    this.speed = lerp(this.speed, Math.abs((scroll.current - scroll.last) * 5), 0.1);

    this.plane.scale.set(this.scale * scaleMap, this.scale * scaleMap, this.scale * scaleMap);

    this.program.uniforms.uRes.value = [
      this.plane.scale.x * this.viewport.width,
      this.plane.scale.y * this.viewport.height
    ];
  }

  /**
   * Handle resize events
   * @param params - Screen and viewport dimensions
   */
  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}): void {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    this.scale = this.screen.height / 1500;
    this.padding = 1;
    this.width = this.viewport.width * this.scale;
    this.widthTotal = this.width * this.length + this.padding * (this.length - 1);

    // Reset position
    this.x = this.width * this.index + this.padding * this.index;
  }
}
