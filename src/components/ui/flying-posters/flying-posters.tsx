/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { memo, useEffect, useRef } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './flying-posters.module.css';
import {
  AutoBindOptions,
  CanvasParams,
  FlyingPostersProps,
  GL,
  MediaParams,
  OGLMesh,
  OGLPlane,
  OGLProgram,
  OGLTransform,
  ScreenSize,
  ScrollState,
  ViewportSize
} from './flying-posters.types';

/**
 * Vertex shader for the flying posters effect
 */
const vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;

varying vec2 vUv;
varying vec3 vNormal;

float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                              0.0,                                0.0,                                1.0
    );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float qinticInOut(float t) {
  return t < 0.5
    ? 16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}

void main() {
  vUv = uv;
  
  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
  float localprogress = clamp(
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),
    0.,
    2.
  );
  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

/**
 * Fragment shader for the flying posters effect
 */
const fragmentShader = `
precision highp float;

uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;

  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;
  vec2 scale = vec2(1.0, 1.0);

  if (planeAspect > imageAspect) {
      scale.x = imageAspect / planeAspect;
  } else {
      scale.y = planeAspect / imageAspect;
  }

  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;

  gl_FragColor = texture2D(tMap, uv);
}
`;

/**
 * AutoBind utility
 *
 * Automatically binds methods to the instance of a class
 *
 * @param self - The instance to bind methods to
 * @param options - Optional configuration for method binding
 * @returns The instance with bound methods
 */
function AutoBind(self: any, { include, exclude }: AutoBindOptions = {}) {
  const getAllProperties = (object: any): Set<[any, string | symbol]> => {
    const properties = new Set<[any, string | symbol]>();
    do {
      for (const key of Reflect.ownKeys(object)) {
        properties.add([object, key]);
      }
    } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
    return properties;
  };

  const filter = (key: string | symbol) => {
    const match = (pattern: string | RegExp) =>
      typeof pattern === 'string' ? key === pattern : (pattern as RegExp).test(key.toString());

    if (include) return include.some(match);
    if (exclude) return !exclude.some(match);
    return true;
  };

  for (const [object, key] of getAllProperties(self.constructor.prototype)) {
    if (key === 'constructor' || !filter(key)) continue;
    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
    if (descriptor && typeof descriptor.value === 'function') {
      self[key] = self[key].bind(self);
    }
  }
  return self;
}

/**
 * Linear interpolation utility
 *
 * @param p1 - Start value
 * @param p2 - End value
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated value
 */
function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

/**
 * Map a value from one range to another
 *
 * @param num - Value to map
 * @param min1 - Source range minimum
 * @param max1 - Source range maximum
 * @param min2 - Target range minimum
 * @param max2 - Target range maximum
 * @param round - Whether to round the result
 * @returns Mapped value
 */
function map(
  num: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number,
  round = false
): number {
  const num1 = (num - min1) / (max1 - min1);
  const num2 = num1 * (max2 - min2) + min2;
  return round ? Math.round(num2) : num2;
}

/**
 * Media class
 *
 * Manages an individual poster in the flying posters effect,
 * handling its rendering and animation.
 */
class Media {
  gl: GL;
  geometry: OGLPlane;
  scene: OGLTransform;
  screen: ScreenSize;
  viewport: ViewportSize;
  image: string;
  length: number;
  index: number;
  planeWidth: number;
  planeHeight: number;
  distortion: number;

  program!: OGLProgram;
  plane!: OGLMesh;
  extra = 0;
  padding = 0;
  height = 0;
  heightTotal = 0;
  y = 0;

  constructor({
    gl,
    geometry,
    scene,
    screen,
    viewport,
    image,
    length,
    index,
    planeWidth,
    planeHeight,
    distortion
  }: MediaParams) {
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.image = image;
    this.length = length;
    this.index = index;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;

    this.createShader();
    this.createMesh();
    this.onResize();
  }

  /**
   * Creates the shader program for this media item
   */
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      fragment: fragmentShader,
      vertex: vertexShader,
      uniforms: {
        tMap: { value: texture },
        uPosition: { value: 0 },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uSpeed: { value: 0 },
        rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] },
        uDistortion: { value: this.distortion },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
        uTime: { value: 0 }
      },
      cullFace: false
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  /**
   * Creates the mesh for this media item
   */
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  /**
   * Sets the scale of the plane based on viewport and screen dimensions
   */
  setScale() {
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;
    this.plane.position.x = 0;
    this.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
  }

  /**
   * Handles resize events
   */
  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: ViewportSize } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      this.program.uniforms.uViewportSize.value = [viewport.width, viewport.height];
    }
    this.setScale();

    this.padding = 5;
    this.height = this.plane.scale.y + this.padding;
    this.heightTotal = this.height * this.length;
    this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;
  }

  /**
   * Updates the media item's position and animation
   */
  update(scroll: ScrollState) {
    this.plane.position.y = this.y - scroll.current - this.extra;
    const position = map(this.plane.position.y, -this.viewport.height, this.viewport.height, 5, 15);

    this.program.uniforms.uPosition.value = position;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current;

    const planeHeight = this.plane.scale.y;
    const viewportHeight = this.viewport.height;
    const topEdge = this.plane.position.y + planeHeight / 2;
    const bottomEdge = this.plane.position.y - planeHeight / 2;

    if (topEdge < -viewportHeight / 2) {
      this.extra -= this.heightTotal;
    } else if (bottomEdge > viewportHeight / 2) {
      this.extra += this.heightTotal;
    }
  }
}

/**
 * Canvas class
 *
 * Manages the WebGL canvas and all media items within the flying posters effect.
 * Handles rendering, animation, and user interactions.
 */
class Canvas {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  items: string[];
  planeWidth: number;
  planeHeight: number;
  distortion: number;
  scroll: ScrollState;
  cameraFov: number;
  cameraZ: number;

  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: OGLTransform;
  planeGeometry!: OGLPlane;
  medias!: Media[];
  screen!: ScreenSize;
  viewport!: ViewportSize;
  isDown = false;
  start = 0;
  loaded = 0;

  constructor({
    container,
    canvas,
    items,
    planeWidth,
    planeHeight,
    distortion,
    scrollEase,
    cameraFov,
    cameraZ
  }: CanvasParams) {
    this.container = container;
    this.canvas = canvas;
    this.items = items;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;
    this.scroll = {
      ease: scrollEase,
      current: 0,
      target: 0,
      last: 0
    };
    this.cameraFov = cameraFov;
    this.cameraZ = cameraZ;

    AutoBind(this);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
    this.createPreloader();
  }

  /**
   * Creates the WebGL renderer
   */
  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      canvas: this.canvas,
      dpr: Math.min(window.devicePixelRatio, 2)
    });
    this.gl = this.renderer.gl;
  }

  /**
   * Creates the camera for the scene
   */
  createCamera() {
    const fov = this.cameraFov * (Math.PI / 180);
    this.camera = new Camera(this.gl, {
      fov
    });
    this.camera.position.z = this.cameraZ;
  }

  /**
   * Creates the scene
   */
  createScene() {
    this.scene = new Transform();
  }

  /**
   * Creates the plane geometry for media items
   */
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 10,
      widthSegments: 10
    });
  }

  /**
   * Creates media items for each image
   */
  createMedias() {
    this.medias = this.items.map((image, index) => {
      return new Media({
        gl: this.gl,
        geometry: this.planeGeometry,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        image,
        length: this.items.length,
        index,
        planeWidth: this.planeWidth,
        planeHeight: this.planeHeight,
        distortion: this.distortion
      });
    });
  }

  /**
   * Creates a preloader for the component
   */
  createPreloader() {
    if (this.items.length > 0) {
      const images = this.items.map(src => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = 'anonymous';
        img.onload = this.onload;
        return img;
      });
    }
  }

  /**
   * Handles image load events
   */
  onload() {
    this.loaded++;
    if (this.loaded === this.items.length) {
      // All images loaded
    }
  }

  /**
   * Handles resize events
   */
  onResize() {
    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.renderer.setSize(this.screen.width, this.screen.height);

    const fov = this.camera.fov * (180 / Math.PI);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = {
      width,
      height
    };

    this.medias?.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  /**
   * Handles touch/mouse down events
   */
  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.start = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
  }

  /**
   * Handles touch/mouse move events
   */
  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    const distance = this.start - y;
    this.scroll.target += distance * 0.01;
    this.start = y;
  }

  /**
   * Handles touch/mouse up events
   */
  onTouchUp() {
    this.isDown = false;
  }

  /**
   * Handles wheel events
   */
  onWheel(e: WheelEvent) {
    this.scroll.target += e.deltaY * 0.005;
  }

  /**
   * Main update loop
   */
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    this.medias?.forEach(media => media.update(this.scroll));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    requestAnimationFrame(this.update);
  }

  /**
   * Sets up event listeners
   */
  addEventListeners() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('wheel', this.onWheel);
    window.addEventListener('mousedown', this.onTouchDown);
    window.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);
    window.addEventListener('touchstart', this.onTouchDown as EventListener);
    window.addEventListener('touchmove', this.onTouchMove as EventListener);
    window.addEventListener('touchend', this.onTouchUp as EventListener);
  }

  /**
   * Cleans up event listeners and resources
   */
  destroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousedown', this.onTouchDown);
    window.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);
    window.removeEventListener('touchstart', this.onTouchDown as EventListener);
    window.removeEventListener('touchmove', this.onTouchMove as EventListener);
    window.removeEventListener('touchend', this.onTouchUp as EventListener);
  }
}

/**
 * FlyingPosters Component
 *
 * A WebGL-based component that displays images as 3D flying posters with
 * scroll-based navigation and animations.
 *
 * @example
 * ```tsx
 * <FlyingPosters
 *   items={[
 *     '/images/poster1.jpg',
 *     '/images/poster2.jpg',
 *     '/images/poster3.jpg',
 *   ]}
 *   planeWidth={320}
 *   planeHeight={320}
 *   distortion={3}
 * />
 * ```
 */
const FlyingPosters = memo(function FlyingPosters({
  items = [],
  planeWidth = 320,
  planeHeight = 320,
  distortion = 3,
  scrollEase = 0.01,
  cameraFov = 45,
  cameraZ = 20,
  className,
  ...props
}: FlyingPostersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    instanceRef.current = new Canvas({
      container: containerRef.current,
      canvas: canvasRef.current,
      items,
      planeWidth,
      planeHeight,
      distortion,
      scrollEase,
      cameraFov,
      cameraZ
    });

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasEl = canvasRef.current;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (instanceRef.current) {
        instanceRef.current.onWheel(e);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevents touch-based scrolling
    };

    canvasEl.addEventListener('wheel', handleWheel, { passive: false });
    canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvasEl.removeEventListener('wheel', handleWheel);
      canvasEl.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn(styles.container, className)} {...props}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
});

FlyingPosters.displayName = 'FlyingPosters';

export default FlyingPosters;
