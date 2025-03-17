'use client';

import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { memo, useEffect, useRef } from 'react';
import {
  DEFAULT_COLORS,
  DEFAULT_LIGHTING,
  DEFAULT_MATERIAL_PARAMS,
  DEFAULT_PHYSICS
} from './ballpit.constants';
import { useAccessibilityLabel, useContainerClassName } from './ballpit.hooks';
import styles from './ballpit.module.css';
import { BallpitProps, CreateBallpitReturn } from './ballpit.types';
import { cleanupResources } from './ballpit.utils';

// Register GSAP plugins
gsap.registerPlugin(Observer);

/* Import necessary physics, mesh, and rendering classes */
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Clock,
  Color,
  DirectionalLight,
  Euler,
  Mesh,
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  OrthographicCamera,
  // PMREMGenerator is part of the main Three.js export in newer versions
  PMREMGenerator,
  PerspectiveCamera,
  Quaternion,
  // sRGBEncoding was renamed in newer Three.js versions
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

/**
 * BallpitCore component - internal implementation for the Ballpit animation
 *
 * @param props - Component properties
 * @returns JSX Element
 */
export const BallpitCore = (props: BallpitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spheresInstanceRef = useRef<CreateBallpitReturn | null>(null);
  const containerClassName = useContainerClassName(props.className);
  const accessibilityLabel = useAccessibilityLabel();

  // Merge props with defaults
  const {
    followCursor = DEFAULT_PHYSICS.followCursor,
    count = DEFAULT_PHYSICS.count,
    colors = DEFAULT_COLORS,
    ambientColor = DEFAULT_LIGHTING.ambientColor,
    ambientIntensity = DEFAULT_LIGHTING.ambientIntensity,
    lightIntensity = DEFAULT_LIGHTING.lightIntensity,
    materialParams = DEFAULT_MATERIAL_PARAMS,
    minSize = DEFAULT_PHYSICS.minSize,
    maxSize = DEFAULT_PHYSICS.maxSize,
    size0 = DEFAULT_PHYSICS.size0,
    gravity = DEFAULT_PHYSICS.gravity,
    friction = DEFAULT_PHYSICS.friction,
    wallBounce = DEFAULT_PHYSICS.wallBounce,
    maxVelocity = DEFAULT_PHYSICS.maxVelocity,
    maxX = DEFAULT_PHYSICS.maxX,
    maxY = DEFAULT_PHYSICS.maxY,
    maxZ = DEFAULT_PHYSICS.maxZ,
    controlSphere0 = DEFAULT_PHYSICS.controlSphere0
  } = props;

  // Initialize and clean up the ballpit
  useEffect(() => {
    // Only initialize if we have a canvas
    if (!canvasRef.current) return;

    // Use the same config, just organized differently
    const config = {
      count,
      // Convert readonly array to mutable by spreading values into a new array
      colors: [...colors],
      ambientColor,
      ambientIntensity,
      lightIntensity,
      materialParams,
      minSize,
      maxSize,
      size0,
      gravity,
      friction,
      wallBounce,
      maxVelocity,
      maxX,
      maxY,
      maxZ,
      controlSphere0,
      followCursor
    };

    // Initialize ballpit (using original createBallpit function)
    if (typeof window !== 'undefined' && canvasRef.current) {
      // We're using this approach to preserve compatibility with the existing implementation
      spheresInstanceRef.current = createBallpit(canvasRef.current, config);
    }

    // Clean up when component unmounts
    return () => {
      if (spheresInstanceRef.current) {
        cleanupResources(spheresInstanceRef.current);
        spheresInstanceRef.current = null;
      }
    };
  }, [
    count,
    colors,
    ambientColor,
    ambientIntensity,
    lightIntensity,
    materialParams,
    minSize,
    maxSize,
    size0,
    gravity,
    friction,
    wallBounce,
    maxVelocity,
    maxX,
    maxY,
    maxZ,
    controlSphere0,
    followCursor
  ]);

  return (
    <div className={containerClassName} role="presentation" aria-label={accessibilityLabel}>
      <canvas ref={canvasRef} className={styles['ballpit-canvas']} />
      <span className={styles['sr-only']}>
        Decorative 3D ball pit animation with colorful bouncing spheres
      </span>
    </div>
  );
};

/**
 * Ballpit component - creates a colorful 3D animation of bouncing spheres
 * with physics simulation
 *
 * Features:
 * - Realistic physics with gravity, friction, and collisions
 * - Interactive with mouse movement
 * - Customizable colors, sizes, and physics parameters
 * - Hardware-accelerated WebGL rendering for smooth performance
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Ballpit />
 *
 * // Custom configuration
 * <Ballpit
 *   count={50}
 *   colors={[0xff0000, 0x00ff00, 0x0000ff]}
 *   gravity={0.2}
 *   followCursor={true}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns A memoized React component
 */
export const Ballpit = memo(BallpitCore);

// Add displayName to help with debugging
Ballpit.displayName = 'Ballpit';

// Export both as default and named export for different import patterns
export default Ballpit;

// ====================================================================
// IMPLEMENTATION NOTE:
// The "createBallpit" function and related implementations are maintained
// in their original format below to ensure backward compatibility.
// A future refactoring should separate this into an implementation file.
// ====================================================================

// Type definitions for internal implementation
interface XConfig {
  canvas: HTMLCanvasElement;
}

// Extended type for WebGLRenderer with render targets
type RendererWithTarget = WebGLRenderer & {
  renderTarget1?: { dispose: () => void };
  renderTarget2?: { dispose: () => void };
};

// The X class - handles the Three.js scene setup
class X {
  camera: PerspectiveCamera;
  perspectiveCamera!: PerspectiveCamera;
  orthographicCamera!: OrthographicCamera;
  renderer!: WebGLRenderer;
  scene!: Scene;
  canvas!: HTMLCanvasElement;
  width!: number;
  height!: number;
  composer!: EffectComposer & {
    renderTarget1: { dispose: () => void };
    renderTarget2: { dispose: () => void };
  };
  clock = new Clock();
  time = 0;
  delta = 0;
  frameId?: number;

  constructor({ canvas }: XConfig) {
    this.canvas = canvas;
    this.camera = new PerspectiveCamera(45, 1, 0.01, 100);

    // Set up scene
    this.scene = new Scene();

    // Set up renderer
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });

    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    // Update for compatibility with newer Three.js versions
    this.renderer.outputColorSpace = SRGBColorSpace;

    // Set up camera
    this.perspectiveCamera = this.camera;
    this.perspectiveCamera.position.set(0, 0, 8);
    this.orthographicCamera = new OrthographicCamera(-1, 1, 1, -1, 0.01, 100);
    this.orthographicCamera.position.set(0, 0, 8);

    // Create post-processing composer
    this.composer = new EffectComposer(this.renderer) as EffectComposer & {
      renderTarget1: { dispose: () => void };
      renderTarget2: { dispose: () => void };
    };

    // Handle resize
    this.onResize();
  }

  onResize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const { width, height } = parent.getBoundingClientRect();
    this.width = width;
    this.height = height;

    // Update camera
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // Update orthographic camera
    this.orthographicCamera.left = -width / 2;
    this.orthographicCamera.right = width / 2;
    this.orthographicCamera.top = height / 2;
    this.orthographicCamera.bottom = -height / 2;
    this.orthographicCamera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  update() {
    this.delta = this.clock.getDelta();
    this.time += this.delta;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    // Implement cleanup logic to prevent memory leaks
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
    this.renderer.dispose();
    this.composer.renderTarget1.dispose();
    this.composer.renderTarget2.dispose();
  }
}

// The W class - handles the physics simulation
class W extends X {
  // Physics properties
  count!: number;
  colors!: number[];
  minSize!: number;
  maxSize!: number;
  size0!: number;
  gravity!: number;
  friction!: number;
  wallBounce!: number;
  maxVelocity!: number;
  maxX!: number;
  maxY!: number;
  maxZ!: number;
  controlSphere0!: boolean;
  followCursor!: boolean;
  materialParams!: MeshPhysicalMaterialParameters;
  // We don't need to redeclare frameId as it's already declared in parent class X

  // Physics object references
  spheres: Mesh[] = [];
  balls: {
    sphere: Mesh;
    velocity: Vector3;
    angularVelocity: Vector3;
    position: Vector3;
    size: number;
  }[] = [];
  pointer = { x: 0, y: 0 };

  constructor(options: XConfig) {
    super(options);

    // Add ambient light
    const ambientLight = new AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    // Add directional light
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
  }

  setCount(count: number): void {
    // Re-initialize with new count
    this.count = count;
    this.initBalls();
  }

  initBalls(): void {
    // Clear existing spheres
    this.spheres.forEach(sphere => {
      this.scene.remove(sphere);
      if (sphere.geometry) sphere.geometry.dispose();
      if (sphere.material) {
        if (Array.isArray(sphere.material)) {
          sphere.material.forEach(m => m.dispose());
        } else {
          sphere.material.dispose();
        }
      }
    });

    this.spheres = [];
    this.balls = [];

    // Create new spheres
    for (let i = 0; i < this.count; i++) {
      // Create the physics ball
      const size =
        i === 0 && this.controlSphere0
          ? this.size0
          : this.minSize + Math.random() * (this.maxSize - this.minSize);

      // Select a random color from the colors array
      const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];

      // Create a sphere geometry and material
      const geometry = new SphereGeometry(size, 32, 32);
      const material = new MeshPhysicalMaterial({
        color: new Color(randomColor),
        ...(this.materialParams || DEFAULT_MATERIAL_PARAMS)
      });

      // Create the mesh and add to the scene
      const sphere = new Mesh(geometry, material);

      // Random position within bounds
      const position = new Vector3(
        (Math.random() - 0.5) * this.maxX,
        (Math.random() - 0.5) * this.maxY,
        (Math.random() - 0.5) * this.maxZ
      );

      // Initial velocity
      const velocity = new Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );

      // Initial angular velocity for rotation
      const angularVelocity = new Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );

      // Set position
      sphere.position.copy(position);

      // Add to scene and track in arrays
      this.scene.add(sphere);
      this.spheres.push(sphere);
      this.balls.push({ sphere, velocity, angularVelocity, position, size });
    }
  }

  update() {
    // Call parent update method using the prototype
    X.prototype.update.call(this);

    // Update physics for each ball
    this.balls.forEach((ball, i) => {
      // Apply gravity
      ball.velocity.y -= this.gravity;

      // Apply friction
      ball.velocity.multiplyScalar(1 - this.friction);
      ball.angularVelocity.multiplyScalar(1 - this.friction * 0.2);

      // Follow cursor for the first ball if enabled
      if (i === 0 && this.controlSphere0 && this.followCursor) {
        const target = new Vector3(
          this.pointer.x * this.maxX * 0.5,
          this.pointer.y * this.maxY * 0.5,
          0
        );
        const direction = target.clone().sub(ball.position);
        ball.velocity.add(direction.clone().multiplyScalar(0.01));
      }

      // Apply velocity limits
      if (ball.velocity.length() > this.maxVelocity) {
        ball.velocity.normalize().multiplyScalar(this.maxVelocity);
      }

      // Update position
      ball.position.add(ball.velocity);

      // Boundary collisions
      if (ball.position.x < -this.maxX / 2 + ball.size) {
        ball.position.x = -this.maxX / 2 + ball.size;
        ball.velocity.x *= -this.wallBounce;
      }
      if (ball.position.x > this.maxX / 2 - ball.size) {
        ball.position.x = this.maxX / 2 - ball.size;
        ball.velocity.x *= -this.wallBounce;
      }
      if (ball.position.y < -this.maxY / 2 + ball.size) {
        ball.position.y = -this.maxY / 2 + ball.size;
        ball.velocity.y *= -this.wallBounce;
      }
      if (ball.position.y > this.maxY / 2 - ball.size) {
        ball.position.y = this.maxY / 2 - ball.size;
        ball.velocity.y *= -this.wallBounce;
      }
      if (ball.position.z < -this.maxZ / 2 + ball.size) {
        ball.position.z = -this.maxZ / 2 + ball.size;
        ball.velocity.z *= -this.wallBounce;
      }
      if (ball.position.z > this.maxZ / 2 - ball.size) {
        ball.position.z = this.maxZ / 2 - ball.size;
        ball.velocity.z *= -this.wallBounce;
      }

      // Apply rotation
      const rotation = new Quaternion();
      rotation.setFromEuler(
        new Euler(ball.angularVelocity.x, ball.angularVelocity.y, ball.angularVelocity.z)
      );
      ball.sphere.quaternion.multiply(rotation);

      // Update sphere position
      ball.sphere.position.copy(ball.position);
    });

    // Handle sphere-to-sphere collisions
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        const ballA = this.balls[i];
        const ballB = this.balls[j];
        const diff = ballA.position.clone().sub(ballB.position);
        const dist = diff.length();
        const minDist = ballA.size + ballB.size;

        if (dist < minDist) {
          // Calculate collision response
          const penetration = minDist - dist;
          const direction = diff.normalize();

          // Move balls apart
          ballA.position.add(direction.clone().multiplyScalar(penetration * 0.5));
          ballB.position.sub(direction.clone().multiplyScalar(penetration * 0.5));

          // Calculate velocity changes
          const v1 = ballA.velocity.clone();
          const v2 = ballB.velocity.clone();
          const m1 = ballA.size * ballA.size * ballA.size;
          const m2 = ballB.size * ballB.size * ballB.size;

          // Calculate new velocities
          const newV1 = v1
            .clone()
            .sub(direction.clone().multiplyScalar(((2 * m2) / (m1 + m2)) * v1.dot(direction)));
          const newV2 = v2
            .clone()
            .sub(direction.clone().multiplyScalar(((2 * m1) / (m1 + m2)) * v2.dot(direction)));

          // Apply new velocities with bounce factor
          ballA.velocity.copy(newV1).multiplyScalar(this.wallBounce);
          ballB.velocity.copy(newV2).multiplyScalar(this.wallBounce);

          // Update sphere positions
          ballA.sphere.position.copy(ballA.position);
          ballB.sphere.position.copy(ballB.position);

          // Transfer some angular momentum
          const avgAngular = ballA.angularVelocity
            .clone()
            .add(ballB.angularVelocity)
            .multiplyScalar(0.5);
          ballA.angularVelocity.lerp(avgAngular, 0.2);
          ballB.angularVelocity.lerp(avgAngular, 0.2);
        }
      }
    }
  }

  togglePause() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = undefined;
    } else {
      // Restart animation if paused
      const animate = () => {
        this.update();
        this.render();
        this.frameId = requestAnimationFrame(animate);
      };
      animate();
    }
  }
}

/**
 * Creates a Ballpit instance with physics simulation
 *
 * @param canvas - The canvas element to render on
 * @param config - Configuration options for the ballpit
 * @returns Interface to control the ballpit
 */
function createBallpit(
  canvas: HTMLCanvasElement,
  config: Record<string, unknown>
): CreateBallpitReturn {
  // Create spheres instance
  const spheres = new W({ canvas });

  // Set up environment map
  const pmremGenerator = new PMREMGenerator(spheres.renderer);
  const environment = new RoomEnvironment();
  const envMap = pmremGenerator.fromScene(environment).texture;

  spheres.scene.environment = envMap;
  environment.dispose();
  pmremGenerator.dispose();

  // Apply configuration
  Object.assign(spheres, config);

  // Initialize balls
  spheres.initBalls();

  // Update mouse position for interactive control
  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } = canvas.getBoundingClientRect();
    const x = ((clientX - left) / width) * 2 - 1;
    const y = -((clientY - top) / height) * 2 + 1;
    spheres.pointer = { x, y };
  };

  document.addEventListener('mousemove', onMouseMove);

  // Start animation loop
  const animate = () => {
    spheres.update();
    spheres.render();
    spheres.frameId = requestAnimationFrame(animate);
  };

  animate();

  // Handle window resize
  const onWindowResize = () => spheres.onResize();
  window.addEventListener('resize', onWindowResize);

  // Return methods to control the animation
  return {
    three: {
      scene: spheres.scene,
      renderer: spheres.renderer
    },
    dispose: () => {
      if (spheres.frameId) {
        cancelAnimationFrame(spheres.frameId);
      }
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onMouseMove);
      spheres.dispose();
    },
    setCount: (count: number) => {
      spheres.setCount(count);
    },
    togglePause: () => {
      if (typeof spheres.togglePause === 'function') {
        spheres.togglePause();
      }
    }
  };
}
