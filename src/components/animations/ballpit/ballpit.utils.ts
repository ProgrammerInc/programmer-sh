/**
 * Utility functions for the Ballpit animation component
 *
 * @module BallpitUtils
 */

import { ACESFilmicToneMapping, Plane, Raycaster, Vector2, Vector3 } from 'three';
import { DEFAULT_X_CONFIG } from './ballpit.constants';
import { CreateBallpitReturn, PointerData } from './ballpit.types';
import { X } from './x.class';
import { Z } from './z.class';

/** Global flag to track if pointer events are already set up */
let globalPointerActive = false;
/** Global pointer position vector */
const pointerPosition = new Vector2();
/** Map to store pointer data for each element */
const pointerMap = new Map<HTMLElement, PointerData>();

/**
 * Creates a new Ballpit animation instance
 *
 * This function sets up the Three.js environment, initializes the spheres,
 * and configures pointer events for interactivity.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to render to
 * @param {Partial<typeof DEFAULT_X_CONFIG>} config - Configuration options
 * @returns {CreateBallpitReturn} Interface to control the animation
 */
export function createBallpit(
  canvas: HTMLCanvasElement,
  config: Partial<typeof DEFAULT_X_CONFIG> = {}
): CreateBallpitReturn {
  const threeInstance = new X({
    canvas,
    size: 'parent',
    rendererOptions: { antialias: true, alpha: true }
  });

  let spheres: Z;

  threeInstance.renderer.toneMapping = ACESFilmicToneMapping;
  threeInstance.camera.position.set(0, 0, 20);
  threeInstance.camera.lookAt(0, 0, 0);
  threeInstance.cameraMaxAspect = 1.5;
  threeInstance.resize();

  initialize(config);

  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const intersectionPoint = new Vector3();

  let isPaused = false;

  const pointerData = createPointerData({
    domElement: canvas,
    onMove() {
      raycaster.setFromCamera(pointerData.nPosition, threeInstance.camera);
      threeInstance.camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, intersectionPoint);
      spheres.physics.center.copy(intersectionPoint);
      spheres.config.controlSphere0 = true;
    },
    onLeave() {
      spheres.config.controlSphere0 = false;
    }
  });

  /**
   * Initialize or reinitialize the spheres with new configuration
   *
   * @param {Partial<typeof DEFAULT_X_CONFIG>} cfg - Configuration options
   */
  function initialize(cfg: Partial<typeof DEFAULT_X_CONFIG>) {
    if (spheres) {
      threeInstance.clear();
      threeInstance.scene.remove(spheres);
    }

    spheres = new Z(threeInstance.renderer, cfg);
    threeInstance.scene.add(spheres);
  }

  threeInstance.onBeforeRender = deltaInfo => {
    if (!isPaused) spheres.update(deltaInfo);
  };

  threeInstance.onAfterResize = size => {
    spheres.config.maxX = size.wWidth / 2;
    spheres.config.maxY = size.wHeight / 2;
  };

  return {
    three: threeInstance,
    get spheres() {
      return spheres;
    },
    setCount(count: number) {
      initialize({ ...spheres.config, count });
    },
    togglePause() {
      isPaused = !isPaused;
    },
    dispose() {
      pointerData.dispose?.();
      threeInstance.dispose();
    }
  };
}

/**
 * Creates pointer data for tracking cursor interactions
 *
 * @param {Partial<PointerData> & { domElement: HTMLElement }} options - Pointer options and callbacks
 * @returns {PointerData} Pointer data instance with event handlers
 */
export function createPointerData(
  options: Partial<PointerData> & { domElement: HTMLElement }
): PointerData {
  const defaultData: PointerData = {
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    onEnter: () => {},
    onMove: () => {},
    onClick: () => {},
    onLeave: () => {},
    ...options
  };

  if (!pointerMap.has(options.domElement)) {
    pointerMap.set(options.domElement, defaultData);

    if (!globalPointerActive) {
      document.body.addEventListener('pointermove', onPointerMove as EventListener);
      document.body.addEventListener('pointerleave', onPointerLeave as EventListener);
      document.body.addEventListener('click', onPointerClick as EventListener);
      globalPointerActive = true;
    }
  }

  defaultData.dispose = () => {
    pointerMap.delete(options.domElement);

    if (pointerMap.size === 0) {
      document.body.removeEventListener('pointermove', onPointerMove as EventListener);
      document.body.removeEventListener('pointerleave', onPointerLeave as EventListener);
      document.body.removeEventListener('click', onPointerClick as EventListener);
      globalPointerActive = false;
    }
  };

  return defaultData;
}

/**
 * Handles pointer move events across all tracked elements
 *
 * @param {PointerEvent} e - Pointer event
 */
export function onPointerMove(e: PointerEvent) {
  pointerPosition.set(e.clientX, e.clientY);

  for (const [elem, data] of pointerMap) {
    const rect = elem.getBoundingClientRect();

    if (isInside(rect)) {
      updatePointerData(data, rect);

      if (!data.hover) {
        data.hover = true;
        data.onEnter(data);
      }

      data.onMove(data);
    } else if (data.hover) {
      data.hover = false;
      data.onLeave(data);
    }
  }
}

/**
 * Handles pointer click events across all tracked elements
 *
 * @param {PointerEvent} e - Pointer event
 */
export function onPointerClick(e: PointerEvent) {
  pointerPosition.set(e.clientX, e.clientY);

  for (const [elem, data] of pointerMap) {
    const rect = elem.getBoundingClientRect();

    updatePointerData(data, rect);

    if (isInside(rect)) data.onClick(data);
  }
}

/**
 * Handles pointer leave events across all tracked elements
 */
export function onPointerLeave() {
  for (const data of pointerMap.values()) {
    if (data.hover) {
      data.hover = false;
      data.onLeave(data);
    }
  }
}

/**
 * Updates pointer data based on current position and element dimensions
 *
 * @param {PointerData} data - Pointer data to update
 * @param {DOMRect} rect - Element's bounding rectangle
 */
export function updatePointerData(data: PointerData, rect: DOMRect) {
  data.position.set(pointerPosition.x - rect.left, pointerPosition.y - rect.top);
  data.nPosition.set(
    (data.position.x / rect.width) * 2 - 1,
    (-data.position.y / rect.height) * 2 + 1
  );
}

/**
 * Checks if pointer is inside an element's rectangle
 *
 * @param {DOMRect} rect - Element's bounding rectangle
 * @returns {boolean} True if pointer is inside the element
 */
export function isInside(rect: DOMRect) {
  return (
    pointerPosition.x >= rect.left &&
    pointerPosition.x <= rect.left + rect.width &&
    pointerPosition.y >= rect.top &&
    pointerPosition.y <= rect.top + rect.height
  );
}
