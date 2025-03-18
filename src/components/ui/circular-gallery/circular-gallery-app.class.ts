/**
 * App class for Circular Gallery
 * Manages the entire gallery including rendering, events, and state
 */

import { Camera, Mesh, Plane, Renderer, Transform } from 'ogl';
import { 
  AppConfig, 
  GalleryItem, 
  GL, 
  ScrollState, 
  ScreenSize, 
  Viewport 
} from './circular-gallery.types';
import { autoBind, debounce, lerp } from './circular-gallery.utils';
import { Media } from './circular-gallery-media.class';

/**
 * Interface for normalized wheel event return value
 */
interface NormalizedWheel {
  pixelX: number;
  pixelY: number;
}

/**
 * Extended wheel event with additional browser-specific properties
 */
interface ExtendedWheelEvent extends WheelEvent {
  wheelDelta?: number;
  wheelDeltaY?: number;
  wheelDeltaX?: number;
  axis?: number;
  HORIZONTAL_AXIS?: number;
}

export class GalleryApp {
  private container: HTMLElement;
  private scroll: ScrollState;
  private renderer!: Renderer;
  private gl!: GL;
  private camera!: Camera;
  private scene!: Transform;
  private planeGeometry!: Plane;
  private medias: Media[] = [];
  private mediasImages: GalleryItem[] = [];
  private screen!: ScreenSize;
  private viewport!: Viewport;
  private raf: number = 0;
  private boundOnResize!: () => void;
  private boundOnWheel!: (event: WheelEvent) => void;
  private boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  private boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  private boundOnTouchUp!: () => void;
  private isDown: boolean = false;
  private start: number = 0;
  private onCheckDebounce: ReturnType<typeof debounce>;

  /**
   * Create a new Gallery App instance
   * @param container - DOM element to render the gallery into
   * @param config - Gallery configuration options
   */
  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = '#ffffff',
      borderRadius = 0,
      font = 'bold 30px DM Sans'
    }: AppConfig
  ) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    
    // Initialize the gallery
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }

  /**
   * Create and setup WebGL renderer
   */
  private createRenderer(): void {
    this.renderer = new Renderer({
      alpha: true
    });
    this.gl = this.renderer.gl;
    this.container.appendChild(this.gl.canvas);
  }

  /**
   * Create and setup the camera
   */
  private createCamera(): void {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 5;
  }

  /**
   * Create the scene graph
   */
  private createScene(): void {
    this.scene = new Transform();
  }

  /**
   * Create the plane geometry used for gallery items
   */
  private createGeometry(): void {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }

  /**
   * Create media items for the gallery
   * @param items - Array of gallery items
   * @param bend - Bend factor for curved layout
   * @param textColor - Color for text labels
   * @param borderRadius - Border radius for items
   * @param font - Font for text labels
   */
  private createMedias(
    items: GalleryItem[] | undefined,
    bend: number = 1,
    textColor: string,
    borderRadius: number,
    font: string
  ): void {
    // Sample gallery items if none provided
    this.mediasImages = items || [
      {
        image: 'https://images.unsplash.com/photo-1548191194-b3e1dc6497f7',
        text: 'Photo 1'
      },
      {
        image: 'https://images.unsplash.com/photo-1548191194-b3e1dc6497f7',
        text: 'Photo 2'
      },
      {
        image: 'https://images.unsplash.com/photo-1548191194-b3e1dc6497f7',
        text: 'Photo 3'
      },
      {
        image: 'https://images.unsplash.com/photo-1548191194-b3e1dc6497f7',
        text: 'Photo 4'
      },
      {
        image: 'https://images.unsplash.com/photo-1548191194-b3e1dc6497f7',
        text: 'Photo 5'
      }
    ];

    // Create a media item for each image
    this.mediasImages.forEach((media, index) => {
      const { image, text } = media;
      
      const mediaItem = new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
      
      this.medias.push(mediaItem);
    });
  }

  /**
   * Handle touch start events
   * @param e - Touch or mouse event
   */
  private onTouchDown(e: MouseEvent | TouchEvent): void {
    this.isDown = true;
    
    // Get the starting position
    if ('touches' in e) {
      this.start = e.touches[0].clientX;
    } else {
      this.start = e.clientX;
    }
  }

  /**
   * Handle touch move events
   * @param e - Touch or mouse event
   */
  private onTouchMove(e: MouseEvent | TouchEvent): void {
    if (!this.isDown) return;
    
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * 0.01;
    
    this.scroll.target += distance;
    this.start = x;
  }

  /**
   * Handle touch end events
   */
  private onTouchUp(): void {
    this.isDown = false;
  }

  /**
   * Handle mouse wheel events
   */
  private onWheel(event: WheelEvent): void {
    // We're using the 'wheel' event which is standardized
    const normalized = normalizeWheel(event);
    const speed = normalized.pixelY * 0.01;
    
    this.scroll.target += speed;
    this.onCheckDebounce();
  }

  /**
   * Check if scroll reached the end and should loop
   */
  private onCheck(): void {
    const width = this.medias[0].width;
    const total = width * this.medias.length;
    const average = total / 2;
    const bounds = Math.round(this.scroll.target / total);
    
    if (bounds !== 0) {
      this.scroll.target -= bounds * total;
      this.scroll.current -= bounds * total;
    }
  }

  /**
   * Handle window resize events
   */
  private onResize(): void {
    // Get screen size
    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // Set renderer size
    this.renderer.setSize(this.screen.width, this.screen.height);
    
    // Calculate pixel ratio
    const scale = this.screen.width < 768 ? 1 : 1.5;
    this.renderer.dpr = Math.min(window.devicePixelRatio, scale);
    
    // Update camera
    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    
    this.viewport = { width, height };
    
    // Update media items
    if (this.medias) {
      this.medias.forEach(media =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      );
    }
  }

  /**
   * Animation update loop
   */
  private update(): void {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    
    // Update media items
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    
    // Render the scene
    this.renderer.render({ scene: this.scene, camera: this.camera });
    
    // Store current scroll position for next frame
    this.scroll.last = this.scroll.current;
    
    // Request next frame
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  /**
   * Set up event listeners
   */
  private addEventListeners(): void {
    // Bind methods to instance
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    
    // Add event listeners
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('mousewheel', this.boundOnWheel);
    window.addEventListener('wheel', this.boundOnWheel);
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove', this.boundOnTouchMove);
    window.addEventListener('touchend', this.boundOnTouchUp);
  }

  /**
   * Clean up resources and event listeners
   */
  public destroy(): void {
    // Cancel animation frame
    window.cancelAnimationFrame(this.raf);
    
    // Remove event listeners
    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('mousewheel', this.boundOnWheel);
    window.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    
    // Remove canvas from DOM
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }
  }
}

/**
 * Normalize wheel event across browsers
 * @param event - Wheel event
 * @returns Normalized values
 */
function normalizeWheel(event: WheelEvent): NormalizedWheel {
  let sX = 0;
  let sY = 0;
  let pX = 0;
  let pY = 0;

  // Legacy
  if ('detail' in event) sY = event.detail;
  
  // Cast to extended wheel event for browser-specific properties
  const extEvent = event as ExtendedWheelEvent;
  
  if ('wheelDelta' in extEvent && extEvent.wheelDelta !== undefined) {
    sY = -extEvent.wheelDelta / 120;
  }
  
  if ('wheelDeltaY' in extEvent && extEvent.wheelDeltaY !== undefined) {
    sY = -extEvent.wheelDeltaY / 120;
  }
  
  if ('wheelDeltaX' in extEvent && extEvent.wheelDeltaX !== undefined) {
    sX = -extEvent.wheelDeltaX / 120;
  }

  // Side scrolling on FF with DOMMouseScroll
  if ('axis' in extEvent && 
      extEvent.axis !== undefined && 
      extEvent.HORIZONTAL_AXIS !== undefined && 
      extEvent.axis === extEvent.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * 10;
  pY = sY * 10;

  if ('deltaY' in event) pY = event.deltaY;
  if ('deltaX' in event) pX = event.deltaX;

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode === 1) {
      // Delta in LINE units
      pX *= 40;
      pY *= 40;
    } else {
      // Delta in PAGE units
      pX *= 800;
      pY *= 800;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) sX = pX < 1 ? -1 : 1;
  if (pY && !sY) sY = pY < 1 ? -1 : 1;

  return { pixelX: pX, pixelY: pY };
}
