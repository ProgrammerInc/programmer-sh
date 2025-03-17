/**
 * Utility functions for the Ballpit component
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Material, MathUtils, Object3D, Vector2 } from 'three';
import { PointerData, ThreeJSInstance } from './ballpit.types';

/**
 * Utility for merging class names with Tailwind support
 *
 * @param inputs - Class name inputs to merge
 * @returns Merged class name string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Pointer data map to track pointers across elements
 */
export const pointerMap = new Map<HTMLElement, PointerData>();

/**
 * Creates and initializes pointer tracking data for a DOM element
 *
 * @param options - Configuration with DOM element and optional callbacks
 * @returns Initialized pointer data
 */
export function createPointerData(
  options: Partial<PointerData> & { domElement: HTMLElement }
): PointerData {
  const { domElement, ...rest } = options;
  const data: PointerData = {
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    onEnter: () => {},
    onMove: () => {},
    onClick: () => {},
    onLeave: () => {},
    ...rest
  };

  pointerMap.set(domElement, data);

  // Set up event handlers
  domElement.addEventListener('pointermove', onPointerMove);
  domElement.addEventListener('pointerleave', onPointerLeave);
  domElement.addEventListener('click', onPointerClick);

  // Add dispose function
  data.dispose = () => {
    domElement.removeEventListener('pointermove', onPointerMove);
    domElement.removeEventListener('pointerleave', onPointerLeave);
    domElement.removeEventListener('click', onPointerClick);
    pointerMap.delete(domElement);
  };

  return data;
}

/**
 * Handle pointer move events
 *
 * @param e - Pointer event
 */
export function onPointerMove(e: PointerEvent) {
  const element = e.currentTarget as HTMLElement;
  const data = pointerMap.get(element);
  if (!data) return;

  const rect = element.getBoundingClientRect();
  updatePointerData(data, rect);

  const wasInside = data.hover;
  data.hover = isInside(e, rect);

  if (data.hover !== wasInside) {
    if (data.hover) data.onEnter(data);
    else data.onLeave(data);
  }

  if (data.hover) data.onMove(data);
}

/**
 * Handle pointer click events
 *
 * @param e - Pointer event
 */
export function onPointerClick(e: PointerEvent) {
  const element = e.currentTarget as HTMLElement;
  const data = pointerMap.get(element);
  if (!data || !data.hover) return;
  data.onClick(data);
}

/**
 * Handle pointer leave events
 */
export function onPointerLeave() {
  // This is handled in onPointerMove through the hover state
}

/**
 * Update pointer position data based on current bounds
 *
 * @param data - Pointer data to update
 * @param rect - Current element rectangle
 * @param event - Pointer event with position information
 */
export function updatePointerData(data: PointerData, rect: DOMRect, event?: PointerEvent) {
  if (event) {
    data.position.x = event.clientX - rect.left;
    data.position.y = event.clientY - rect.top;
  }
  data.nPosition.x = (data.position.x / rect.width) * 2 - 1;
  data.nPosition.y = -(data.position.y / rect.height) * 2 + 1;
}

/**
 * Check if pointer is inside element bounds
 *
 * @param event - Pointer event
 * @param rect - Element rectangle
 * @returns True if pointer is inside
 */
export function isInside(event: PointerEvent, rect: DOMRect) {
  return (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
}

/**
 * Random float helper (re-exported from Three.js)
 */
export const randFloat = MathUtils.randFloat;

/**
 * Random float spread helper (re-exported from Three.js)
 */
export const randFloatSpread = MathUtils.randFloatSpread;

/**
 * Sets up WebGL canvas accessibility attributes
 *
 * @param canvas - The canvas element to configure
 */
export function setupCanvasAccessibility(canvas: HTMLCanvasElement) {
  canvas.setAttribute('aria-hidden', 'true');
  canvas.setAttribute('tabindex', '-1');
}

/**
 * Type for objects with a dispose method
 */
interface Disposable {
  dispose: () => void;
}

/**
 * Type guard to check if an object has a dispose method
 *
 * @param obj - Object to check
 * @returns True if object has a dispose method
 */
function isDisposable(obj: unknown): obj is Disposable {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'dispose' in obj &&
    typeof (obj as Disposable).dispose === 'function'
  );
}

/**
 * Cleans up and disposes WebGL resources
 *
 * @param instance - The instance containing Three.js resources
 */
export function cleanupResources(instance: ThreeJSInstance) {
  if (!instance?.three) return;

  // Cleanup Three.js resources
  if (instance.three.scene) {
    instance.three.scene.traverse((object: Object3D) => {
      // Handle geometry disposal
      if ('geometry' in object && object.geometry && isDisposable(object.geometry)) {
        object.geometry.dispose();
      }

      // Handle material disposal
      if ('material' in object) {
        const material = object.material as Material | Material[];
        if (Array.isArray(material)) {
          material.forEach(m => m.dispose());
        } else if (material) {
          material.dispose();
        }
      }
    });
  }

  // Dispose renderer
  if (instance.three.renderer) {
    instance.three.renderer.dispose();

    // Handle render targets
    if (
      'renderTarget' in instance.three.renderer &&
      instance.three.renderer.renderTarget &&
      isDisposable(instance.three.renderer.renderTarget)
    ) {
      instance.three.renderer.renderTarget.dispose();
    }
  }

  // Execute custom dispose function if available
  if (isDisposable(instance)) {
    instance.dispose();
  }
}
