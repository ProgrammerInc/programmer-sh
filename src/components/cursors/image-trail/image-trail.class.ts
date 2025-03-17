/**
 * @file image-trail.class.ts
 * @description Class definitions for the ImageTrail cursor component
 */

import { gsap } from 'gsap';
import { ImageItemDOM, PointerPosition } from './image-trail.types';
import { getLocalPointerPos, getMouseDistance, getNewPosition, lerp } from './image-trail.utils';

/**
 * Represents an image item in the trail
 */
export class ImageItem<T extends HTMLDivElement> {
  /** DOM elements */
  public DOM: ImageItemDOM<T> = {
    el: null as unknown as T,
    inner: null
  };
  /** Default style for the image */
  public defaultStyle: gsap.TweenVars = { scale: 1, x: 0, y: 0, opacity: 0 };
  /** Element rectangle */
  public rect: DOMRect | null = null;
  /** Resize callback */
  private resize!: () => void;

  /**
   * Create a new ImageItem
   * @param DOM_el - DOM element for the image
   */
  constructor(DOM_el: T) {
    this.DOM.el = DOM_el;
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');
    this.getRect();
    this.initEvents();
  }

  /**
   * Initialize event listeners
   */
  private initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    window.addEventListener('resize', this.resize);
  }

  /**
   * Get the element's rectangle
   */
  private getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }

  /**
   * Clean up event listeners
   */
  public destroy() {
    window.removeEventListener('resize', this.resize);
  }
}

/**
 * Base class for all image trail variants
 */
export class ImageTrailBase<T extends HTMLDivElement> {
  /** Container element */
  protected container: T;
  /** DOM references */
  protected DOM: { el: T };
  /** Array of image items */
  protected images: ImageItem<T>[];
  /** Total number of images */
  protected imagesTotal: number;
  /** Current image position */
  protected imgPosition: number;
  /** Z-index value for stacking */
  protected zIndexVal: number;
  /** Number of active images */
  protected activeImagesCount: number;
  /** Flag for idle state */
  protected isIdle: boolean;
  /** Threshold for movement detection */
  protected threshold: number;
  /** Current mouse position */
  protected mousePos: PointerPosition;
  /** Last recorded mouse position */
  protected lastMousePos: PointerPosition;
  /** Cached mouse position */
  protected cacheMousePos: PointerPosition;
  /** Animation frame ID */
  protected animationFrameId: number | null = null;
  /** Flag to check if component is mounted */
  protected mounted: boolean = true;

  /**
   * Create a new image trail
   * @param container - Container element
   */
  constructor(container: T) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(
      img => new ImageItem(img as T)
    );
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.initEvents();
  }

  /**
   * Initialize event listeners
   */
  protected initEvents() {
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      if (!this.mounted) return;
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);

    const initRender = (ev: MouseEvent | TouchEvent) => {
      if (!this.mounted) return;
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.render();
      this.container.removeEventListener('mousemove', initRender as EventListener);
      this.container.removeEventListener('touchmove', initRender as EventListener);
    };
    this.container.addEventListener('mousemove', initRender as EventListener);
    this.container.addEventListener('touchmove', initRender as EventListener);
  }

  /**
   * Render loop
   */
  protected render() {
    if (!this.mounted) return;

    // Calculate mouse distance
    const mouseDistance = getMouseDistance(this.cacheMousePos, this.mousePos);

    // Update cache mouse position with lerp
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    // If mouse has moved more than threshold and we're idle
    if (mouseDistance > this.threshold && this.isIdle) {
      this.showNextImage();
    }

    // Continue the render loop
    this.animationFrameId = requestAnimationFrame(() => this.render());
  }

  /**
   * Show the next image in the trail
   */
  protected showNextImage() {
    // This is a base implementation to be overridden by variants
    this.isIdle = false;

    this.imgPosition = getNewPosition(this.imgPosition, 1, this.images);
    const img = this.images[this.imgPosition];

    gsap
      .timeline({
        onStart: () => this.onStart(),
        onComplete: () => this.onComplete()
      })
      .set(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal++,
          x: this.mousePos.x,
          y: this.mousePos.y
        },
        0
      );
  }

  /**
   * Called when an image animation starts
   */
  protected onStart() {
    this.activeImagesCount++;
    this.onImageActivated();
  }

  /**
   * Called when an image animation completes
   */
  protected onComplete() {
    this.activeImagesCount--;
    this.onImageDeactivated();
  }

  /**
   * Called when an image is activated
   */
  protected onImageActivated() {
    // Can be overridden by variants
  }

  /**
   * Called when an image is deactivated
   */
  protected onImageDeactivated() {
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }

  /**
   * Clean up resources
   */
  public destroy() {
    this.mounted = false;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Clean up images
    this.images.forEach(img => img.destroy());

    // Remove all listeners (a more comprehensive approach would remove specific listeners)
    this.container.replaceWith(this.container.cloneNode(true));
  }
}

/**
 * Variant 1: Basic trail effect
 */
export class ImageTrailVariant1<T extends HTMLDivElement> extends ImageTrailBase<T> {
  /**
   * Show the next image with a basic effect
   */
  protected showNextImage() {
    this.isIdle = false;

    this.imgPosition = getNewPosition(this.imgPosition, 1, this.images);
    const img = this.images[this.imgPosition];

    gsap
      .timeline({
        onStart: () => this.onStart(),
        onComplete: () => this.onComplete()
      })
      .set(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal++,
          x: this.mousePos.x - img.rect!.width / 2,
          y: this.mousePos.y - img.rect!.height / 2
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.9,
          ease: 'expo.out',
          x: this.mousePos.x - img.rect!.width / 2,
          y: this.mousePos.y - img.rect!.height / 2
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 1,
          ease: 'power4.out',
          opacity: 0
        },
        0.4
      );
  }
}

/**
 * Factory function to create the appropriate image trail variant
 * @param variant - Variant number (1-8)
 * @param container - Container element
 * @returns Instance of the specified variant
 */
export function createImageTrailVariant<T extends HTMLDivElement>(
  variant: number,
  container: T
): ImageTrailBase<T> {
  // For now, we're only implementing Variant1. More variants can be added as needed.
  return new ImageTrailVariant1(container);
}
