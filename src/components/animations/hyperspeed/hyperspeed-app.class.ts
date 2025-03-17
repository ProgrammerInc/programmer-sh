/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  SMAAPreset
} from 'postprocessing';
import * as THREE from 'three';
import { CarLights } from './car-lights.class';
import { DISTORTION_UNIFORMS, DISTORTION_VERTEX } from './hyperspeed.constants';
import { HyperspeedOptions } from './hyperspeed.types';
import { lerp, resizeRendererToDisplaySize } from './hyperspeed.utils';
import { LightsSticks } from './light-sticks.class';
import { Road } from './road.class';

/**
 * Main application class that handles the hyperspeed animation rendering
 * using three.js and various shader effects.
 */
export class HyperspeedApp {
  container: HTMLElement;
  options: HyperspeedOptions;
  renderer: THREE.WebGLRenderer;
  composer: EffectComposer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderPass!: RenderPass;
  bloomPass!: EffectPass;
  clock: THREE.Clock;
  assets: Record<string, any>;
  disposed: boolean;
  road: Road;
  leftCarLights: CarLights;
  rightCarLights: CarLights;
  leftSticks: LightsSticks;
  fogUniforms: Record<string, { value: any }>;
  fovTarget: number;
  speedUpTarget: number;
  speedUp: number;
  timeOffset: number;

  /**
   * Creates a new HyperspeedApp instance.
   *
   * @param {HTMLElement} container - The DOM element to render the animation into
   * @param {HyperspeedOptions} options - Configuration options for the animation
   */
  constructor(container: HTMLElement, options: HyperspeedOptions) {
    this.options = options;
    if (!this.options.distortion) {
      this.options.distortion = {
        uniforms: DISTORTION_UNIFORMS,
        getDistortion: DISTORTION_VERTEX
      };
    }
    this.container = container;

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.composer = new EffectComposer(this.renderer);
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      options.fov,
      container.offsetWidth / container.offsetHeight,
      0.1,
      10000
    );
    this.camera.position.z = -5;
    this.camera.position.y = 8;
    this.camera.position.x = 0;

    this.scene = new THREE.Scene();
    this.scene.background = null;

    const fog = new THREE.Fog(
      options.colors.background,
      options.length * 0.2,
      options.length * 500
    );
    this.scene.fog = fog;

    this.fogUniforms = {
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far }
    };

    this.clock = new THREE.Clock();
    this.assets = {};
    this.disposed = false;

    this.road = new Road(this, options);
    this.leftCarLights = new CarLights(
      this,
      options,
      options.colors.leftCars,
      options.movingAwaySpeed,
      new THREE.Vector2(0, 1 - options.carLightsFade)
    );
    this.rightCarLights = new CarLights(
      this,
      options,
      options.colors.rightCars,
      options.movingCloserSpeed,
      new THREE.Vector2(1, 0 + options.carLightsFade)
    );
    this.leftSticks = new LightsSticks(this, options);

    this.fovTarget = options.fov;
    this.speedUpTarget = 0;
    this.speedUp = 0;
    this.timeOffset = 0;

    this.tick = this.tick.bind(this);
    this.init = this.init.bind(this);
    this.setSize = this.setSize.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  /**
   * Initializes the render passes for post-processing effects.
   */
  initPasses() {
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new EffectPass(
      this.camera,
      new BloomEffect({
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0,
        resolutionScale: 1
      })
    );

    const smaaPass = new EffectPass(
      this.camera,
      new SMAAEffect({
        preset: SMAAPreset.MEDIUM
      })
    );
    this.renderPass.renderToScreen = false;
    this.bloomPass.renderToScreen = false;
    smaaPass.renderToScreen = true;

    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(smaaPass);
  }

  /**
   * Loads necessary assets for the animation.
   *
   * @returns {Promise<void>} A promise that resolves when all assets are loaded
   */
  loadAssets(): Promise<void> {
    const assets = this.assets;
    return new Promise(resolve => {
      const manager = new THREE.LoadingManager(resolve);

      const searchImage = new Image();
      const areaImage = new Image();
      assets.smaa = {};

      searchImage.addEventListener('load', function () {
        assets.smaa.search = this;
        manager.itemEnd('smaa-search');
      });

      areaImage.addEventListener('load', function () {
        assets.smaa.area = this;
        manager.itemEnd('smaa-area');
      });

      manager.itemStart('smaa-search');
      manager.itemStart('smaa-area');

      searchImage.src = SMAAEffect.searchImageDataURL;
      areaImage.src = SMAAEffect.areaImageDataURL;
    });
  }

  /**
   * Initializes the animation scene with all components and event listeners.
   */
  init() {
    this.initPasses();
    const options = this.options;
    this.road.init();
    this.leftCarLights.init();
    this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);

    this.rightCarLights.init();
    this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);

    this.leftSticks.init();
    this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));

    this.container.addEventListener('mousedown', this.onMouseDown);
    this.container.addEventListener('mouseup', this.onMouseUp);
    this.container.addEventListener('mouseout', this.onMouseUp);

    this.tick();
  }

  /**
   * Handles the mouse down event to increase animation speed.
   *
   * @param {MouseEvent} ev - The mouse event
   */
  onMouseDown(ev: MouseEvent) {
    if (this.options.onSpeedUp) this.options.onSpeedUp(ev);
    this.fovTarget = this.options.fovSpeedUp;
    this.speedUpTarget = this.options.speedUp;
  }

  /**
   * Handles the mouse up event to decrease animation speed.
   *
   * @param {MouseEvent} ev - The mouse event
   */
  onMouseUp(ev: MouseEvent) {
    if (this.options.onSlowDown) this.options.onSlowDown(ev);
    this.fovTarget = this.options.fov;
    this.speedUpTarget = 0;
  }

  /**
   * Updates the animation state based on the elapsed time.
   *
   * @param {number} delta - Time elapsed since the last update
   */
  update(delta: number) {
    const lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
    this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);
    this.timeOffset += this.speedUp * delta;
    const time = this.clock.elapsedTime + this.timeOffset;

    this.rightCarLights.update(time);
    this.leftCarLights.update(time);
    this.leftSticks.update(time);
    this.road.update(time);

    let updateCamera = false;
    const fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage);
    if (fovChange !== 0) {
      this.camera.fov += fovChange * delta * 6;
      updateCamera = true;
    }

    if (typeof this.options.distortion === 'object' && this.options.distortion.getJS) {
      const distortion = this.options.distortion.getJS(0.025, time);
      this.camera.lookAt(
        new THREE.Vector3(
          this.camera.position.x + distortion.x,
          this.camera.position.y + distortion.y,
          this.camera.position.z + distortion.z
        )
      );
      updateCamera = true;
    }

    if (updateCamera) {
      this.camera.updateProjectionMatrix();
    }

    if (this.options.isHyper) {
      // Just to show it works:
      console.log(this.options.isHyper);
    }
  }

  /**
   * Renders the current frame.
   *
   * @param {number} delta - Time elapsed since the last render
   */
  render(delta: number) {
    this.composer.render(delta);
  }

  /**
   * Disposes the animation resources.
   */
  dispose() {
    this.disposed = true;
  }

  /**
   * Handles resizing of the renderer.
   *
   * @param {number} width - New width
   * @param {number} height - New height
   * @param {boolean} updateStyles - Whether to update the DOM element styles
   */
  setSize(width: number, height: number, updateStyles: boolean) {
    this.composer.setSize(width, height, updateStyles);
  }

  /**
   * Animation loop function that gets called on each frame.
   */
  tick() {
    if (this.disposed || !this) return;
    if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    const delta = this.clock.getDelta();
    this.render(delta);
    this.update(delta);
    requestAnimationFrame(this.tick);
  }
}
