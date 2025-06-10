/**
 * Title class for Circular Gallery
 * Responsible for rendering text labels on gallery items
 */

import { Geometry, Mesh, Program, Renderer } from 'ogl';
import { GL, TitleProps } from './circular-gallery.types';
import { autoBind, createTextTexture } from './circular-gallery.utils';

export class Title {
  private gl: GL;
  private plane: Mesh;
  private renderer: Renderer;
  private text: string;
  private textColor: string;
  private font: string;
  private mesh!: Mesh;

  /**
   * Create a new Title instance
   * @param props - Title properties
   */
  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = '#545050',
    font = '30px sans-serif'
  }: TitleProps) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  /**
   * Create the text mesh
   */
  private createMesh(): void {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    );

    const aspect = width / height;
    const scaleY = 0.06;

    // Create a plane for the text
    const geometry = new Geometry(this.gl, {
      position: { size: 3, data: new Float32Array([0, 0, 0]) },
      uv: { size: 2, data: new Float32Array([0, 0]) }
    });

    const program = new Program(this.gl, {
      vertex: /* glsl */ `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: /* glsl */ `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color;
        }
      `,
      transparent: true,
      uniforms: {
        tMap: { value: texture }
      }
    });

    // Create mesh
    this.mesh = new Mesh(this.gl, { geometry, program });
    this.mesh.position.set(0, -0.7, 0.01);
    this.mesh.scale.set(scaleY * aspect, scaleY, 1);
    this.mesh.setParent(this.plane);
  }
}
