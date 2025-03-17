import { Color, Mesh, Program, Renderer, Triangle } from 'ogl';
import { FRAGMENT_SHADER, VERTEX_SHADER } from './iridescence.constants';

/**
 * Mouse position interface for tracking interaction coordinates.
 */
interface MousePosition {
  x: number;
  y: number;
}

/**
 * Type for the OGL renderer's WebGL context
 */
type OGLRenderingContext = WebGLRenderingContext & {
  renderer: Renderer;
  canvas: HTMLCanvasElement;
};

/**
 * Class to manage the iridescence WebGL animation.
 * Handles initialization, rendering, and cleanup of the WebGL context.
 */
export class IridescenceApp {
  private renderer: Renderer;
  private gl: OGLRenderingContext;
  private program: Program;
  private mesh: Mesh;
  private animateId: number | null = null;
  private container: HTMLElement;
  private mousePos: MousePosition = { x: 0.5, y: 0.5 };
  private mouseReact: boolean;

  /**
   * Creates a new IridescenceApp instance.
   *
   * @param {HTMLElement} container - The DOM element to attach the canvas to
   * @param {[number, number, number]} color - RGB color values for the effect
   * @param {number} speed - Animation speed multiplier
   * @param {number} amplitude - Strength of mouse interaction
   * @param {boolean} mouseReact - Whether the animation reacts to mouse movement
   */
  constructor(
    container: HTMLElement,
    color: [number, number, number] = [1, 1, 1],
    speed: number = 1.0,
    amplitude: number = 0.1,
    mouseReact: boolean = true
  ) {
    this.container = container;
    this.mouseReact = mouseReact;

    // Initialize renderer
    this.renderer = new Renderer();
    this.gl = this.renderer.gl as OGLRenderingContext;
    this.gl.clearColor(1, 1, 1, 1);

    // Create geometry and program
    const geometry = new Triangle(this.gl);
    this.program = new Program(this.gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...color) },
        uResolution: {
          value: new Color(
            this.gl.canvas.width,
            this.gl.canvas.height,
            this.gl.canvas.width / this.gl.canvas.height
          )
        },
        uMouse: { value: new Float32Array([this.mousePos.x, this.mousePos.y]) },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed }
      }
    });

    this.mesh = new Mesh(this.gl, { geometry, program: this.program });

    // Add canvas to DOM
    this.container.appendChild(this.gl.canvas);

    // Set up event listeners
    window.addEventListener('resize', this.handleResize);
    if (this.mouseReact) {
      this.container.addEventListener('mousemove', this.handleMouseMove);
    }

    // Initial resize
    this.handleResize();
  }

  /**
   * Starts the animation loop.
   */
  public start(): void {
    if (!this.animateId) {
      this.animateId = requestAnimationFrame(this.update);
    }
  }

  /**
   * Stops the animation loop.
   */
  public stop(): void {
    if (this.animateId) {
      cancelAnimationFrame(this.animateId);
      this.animateId = null;
    }
  }

  /**
   * Updates color parameter for the shader.
   *
   * @param {[number, number, number]} color - New RGB color values
   */
  public updateColor(color: [number, number, number]): void {
    if (this.program) {
      this.program.uniforms.uColor.value = new Color(...color);
    }
  }

  /**
   * Updates speed parameter for the shader.
   *
   * @param {number} speed - New animation speed value
   */
  public updateSpeed(speed: number): void {
    if (this.program) {
      this.program.uniforms.uSpeed.value = speed;
    }
  }

  /**
   * Updates amplitude parameter for the shader.
   *
   * @param {number} amplitude - New amplitude value for mouse interaction
   */
  public updateAmplitude(amplitude: number): void {
    if (this.program) {
      this.program.uniforms.uAmplitude.value = amplitude;
    }
  }

  /**
   * Cleanup method to remove event listeners and WebGL context.
   */
  public destroy(): void {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    if (this.mouseReact) {
      this.container.removeEventListener('mousemove', this.handleMouseMove);
    }
    if (this.gl.canvas && this.container.contains(this.gl.canvas)) {
      this.container.removeChild(this.gl.canvas);
    }
    // Properly lose WebGL context to free resources
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }

  /**
   * Handles window resize events to maintain proper canvas dimensions.
   */
  private handleResize = (): void => {
    const scale = 1;
    this.renderer.setSize(this.container.offsetWidth * scale, this.container.offsetHeight * scale);
    if (this.program) {
      this.program.uniforms.uResolution.value = new Color(
        this.gl.canvas.width,
        this.gl.canvas.height,
        this.gl.canvas.width / this.gl.canvas.height
      );
    }
  };

  /**
   * Handles mouse movement to update shader uniforms for interactive effects.
   *
   * @param {MouseEvent} e - The mouse event
   */
  private handleMouseMove = (e: MouseEvent): void => {
    const rect = this.container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    this.mousePos = { x, y };
    if (this.program) {
      this.program.uniforms.uMouse.value[0] = x;
      this.program.uniforms.uMouse.value[1] = y;
    }
  };

  /**
   * Animation update function that runs each frame.
   *
   * @param {number} time - Current timestamp from requestAnimationFrame
   */
  private update = (time: number): void => {
    this.animateId = requestAnimationFrame(this.update);
    if (this.program) {
      this.program.uniforms.uTime.value = time * 0.001; // Convert to seconds
    }
    this.renderer.render({ scene: this.mesh });
  };
}
