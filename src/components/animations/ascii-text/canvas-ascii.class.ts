/**
 * Class for rendering and animating 3D text with ASCII effect
 */

import * as THREE from 'three';
// Import Three.js extensions directly
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

import { AsciiFilter } from './ascii-filter.class';
import { FRAGMENT_SHADER, PX_RATIO, VERTEX_SHADER } from './ascii-text.constants';
import { CanvasAsciiOptions } from './ascii-text.types';
import { map } from './ascii-text.utils';

/**
 * Class that combines 3D text rendering with ASCII art effects using Three.js
 */
export class CanvasAscii {
  containerElem: HTMLElement;
  width: number;
  height: number;
  rendererGL: THREE.WebGLRenderer;
  rendererCSS: CSS3DRenderer;
  sceneGL: THREE.Scene;
  sceneCSS: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  text: string;
  textMesh?: THREE.Mesh;
  asciiFontSize: number;
  textFontSize: number;
  textColor: string;
  planeBaseHeight: number;
  enableWaves: boolean;
  fontPath: string;
  fontName: string;
  asciiFilter: AsciiFilter;
  uniforms: { [key: string]: THREE.IUniform };
  time: number;
  active: boolean;
  animationFrameId?: number;

  /**
   * Creates a new CanvasAscii instance
   *
   * @param options - Configuration options for the ASCII rendering
   * @param containerElem - HTML element to contain the canvas
   * @param width - Width of the canvas
   * @param height - Height of the canvas
   */
  constructor(
    options: CanvasAsciiOptions,
    containerElem: HTMLElement,
    width: number,
    height: number
  ) {
    this.containerElem = containerElem;
    this.width = width;
    this.height = height;

    // Text configuration
    this.text = options.text || 'DEFAULT';
    this.asciiFontSize = options.asciiFontSize || 10;
    this.textFontSize = options.textFontSize || 250;
    this.textColor = options.textColor || '#ffffff';
    this.planeBaseHeight = options.planeBaseHeight || 10;
    this.enableWaves = options.enableWaves !== undefined ? options.enableWaves : true;
    this.fontPath = options.fontPath || '/fonts/helvetiker_regular.typeface.json';
    this.fontName = 'helvetiker_regular';

    // Initialize Three.js components
    this.rendererGL = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      preserveDrawingBuffer: true
    });
    this.rendererGL.setPixelRatio(PX_RATIO);
    this.rendererGL.setSize(width, height);
    this.rendererGL.domElement.style.position = 'absolute';
    this.rendererGL.domElement.style.top = '0px';
    this.rendererGL.domElement.style.left = '0px';
    this.rendererGL.domElement.style.zIndex = '0';

    this.rendererCSS = new CSS3DRenderer();
    this.rendererCSS.setSize(width, height);
    this.rendererCSS.domElement.style.position = 'absolute';
    this.rendererCSS.domElement.style.top = '0px';
    this.rendererCSS.domElement.style.left = '0px';
    this.rendererCSS.domElement.style.zIndex = '1';

    this.sceneGL = new THREE.Scene();
    this.sceneCSS = new THREE.Scene();

    // Camera setup
    const fov = 75;
    const aspect = width / height;
    const near = 0.1;
    const far = 10000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 500;

    // ASCII filtering
    this.asciiFilter = new AsciiFilter(this.rendererGL, {
      fontSize: this.asciiFontSize
    });
    this.asciiFilter.setSize(width, height);

    // Set up shader uniforms
    this.uniforms = {
      time: { value: 0.0 },
      color: { value: new THREE.Color(this.textColor) }
    };

    // Initialize time and active state
    this.time = 0;
    this.active = true;

    // Add renderers to the container
    containerElem.appendChild(this.rendererCSS.domElement);
    containerElem.appendChild(this.asciiFilter.domElement);

    // Load font and create text mesh
    this.loadFont(this.fontPath, this.fontName).then(() => {
      this.createTextMesh();
      this.animate();
    });
  }

  /**
   * Define a type for font cache
   */
  private fontCache: Record<string, Font> = {};

  /**
   * Loads a font for use with text geometry
   *
   * @param path - Path to the font file
   * @param name - Name to assign to the loaded font
   * @returns Promise that resolves when the font is loaded
   */
  loadFont(path: string, name: string): Promise<void> {
    return new Promise(resolve => {
      new FontLoader().load(path, (font: Font) => {
        this.fontCache[name] = font;
        resolve();
      });
    });
  }

  /**
   * Creates a 3D text mesh with the configured settings
   */
  createTextMesh(): void {
    if (!this.text) return;

    // Get the loaded font
    const font = this.fontCache[this.fontName];
    if (!font) return;

    // Create text geometry
    const textGeometry = new TextGeometry(this.text, {
      font: font,
      size: this.textFontSize,
      depth: 50, // Changed from 'height' to 'depth' to match TextGeometryParameters
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 3
    });

    // Center the text geometry
    textGeometry.computeBoundingBox();
    const box = textGeometry.boundingBox;
    if (box) {
      const centerX = -0.5 * (box.max.x - box.min.x);
      const centerY = -0.5 * (box.max.y - box.min.y);
      textGeometry.translate(centerX, centerY, 0);
    }

    // Create material with shader
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER
    });

    // Create and add the text mesh to the scene
    this.textMesh = new THREE.Mesh(textGeometry, material);
    this.sceneGL.add(this.textMesh);
  }

  /**
   * Updates the text and recreates the text mesh
   *
   * @param text - New text to display
   */
  updateText(text: string): void {
    this.text = text;
    if (this.textMesh) {
      this.sceneGL.remove(this.textMesh);
      this.textMesh.geometry.dispose();
      (this.textMesh.material as THREE.Material).dispose();
    }
    this.createTextMesh();
  }

  /**
   * Resizes the canvas and updates camera and renderer dimensions
   *
   * @param width - New width
   * @param height - New height
   */
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.rendererGL.setSize(width, height);
    this.rendererCSS.setSize(width, height);
    this.asciiFilter.setSize(width, height);
  }

  /**
   * Animation loop that updates the scene and renders frames
   */
  animate(): void {
    if (!this.active) return;

    this.animationFrameId = requestAnimationFrame(() => this.animate());
    this.time += 0.01;

    if (this.uniforms.time) {
      this.uniforms.time.value = this.time;
    }

    if (this.textMesh && this.enableWaves) {
      // Apply wave animation to text mesh vertices
      const geometry = this.textMesh.geometry;
      const positions = geometry.attributes.position;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        // Apply sine wave distortion
        const freq = 0.002;
        const amp = this.planeBaseHeight;
        const time = this.time * 5;

        const noise = map(
          Math.sin(x * freq * 3 + time) + Math.sin(y * freq * 2 + time),
          -2,
          2,
          -amp,
          amp
        );

        positions.setZ(i, noise);
      }

      // Notify Three.js that positions have been updated
      positions.needsUpdate = true;
    }

    this.rendererGL.render(this.sceneGL, this.camera);
    this.asciiFilter.render(this.sceneGL, this.camera);
    this.rendererCSS.render(this.sceneCSS, this.camera);
  }

  /**
   * Stops the animation and cleans up resources
   */
  dispose(): void {
    this.active = false;

    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.textMesh) {
      this.sceneGL.remove(this.textMesh);
      this.textMesh.geometry.dispose();
      (this.textMesh.material as THREE.Material).dispose();
    }

    this.asciiFilter.dispose();
    this.rendererGL.dispose();

    // Remove DOM elements
    while (this.containerElem.firstChild) {
      this.containerElem.removeChild(this.containerElem.firstChild);
    }
  }
}
