/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import { HyperspeedApp } from './hyperspeed-app.class';
import { CAR_LIGHTS_FRAGMENT, CAR_LIGHTS_VERTEX } from './hyperspeed.constants';
import { HyperspeedOptions } from './hyperspeed.types';
import { pickRandom, random } from './hyperspeed.utils';

/**
 * Class representing the car lights in the hyperspeed animation.
 * Creates and manages instanced meshes for car lights using custom shaders.
 */
export class CarLights {
  webgl: HyperspeedApp;
  options: HyperspeedOptions;
  colors: number[] | THREE.Color;
  speed: [number, number];
  fade: THREE.Vector2;
  mesh!: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;

  /**
   * Creates a new CarLights instance.
   *
   * @param {HyperspeedApp} webgl - The parent HyperspeedApp instance
   * @param {HyperspeedOptions} options - Configuration options for the car lights
   * @param {number[] | THREE.Color} colors - Colors for the car lights
   * @param {[number, number]} speed - Speed range for the car lights movement
   * @param {THREE.Vector2} fade - Fade parameters for the car lights
   */
  constructor(
    webgl: HyperspeedApp,
    options: HyperspeedOptions,
    colors: number[] | THREE.Color,
    speed: [number, number],
    fade: THREE.Vector2
  ) {
    this.webgl = webgl;
    this.options = options;
    this.colors = colors;
    this.speed = speed;
    this.fade = fade;
  }

  /**
   * Initializes the car lights by creating an instanced buffer geometry
   * with randomized properties for each light and applying custom shaders.
   */
  init() {
    const options = this.options;
    const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
    const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);

    const instanced = new THREE.InstancedBufferGeometry().copy(
      geometry as any
    ) as THREE.InstancedBufferGeometry;
    instanced.instanceCount = options.lightPairsPerRoadWay * 2;

    const laneWidth = options.roadWidth / options.lanesPerRoad;

    const aOffset: number[] = [];
    const aMetrics: number[] = [];
    const aColor: number[] = [];

    let colorArray: THREE.Color[];
    if (Array.isArray(this.colors)) {
      colorArray = this.colors.map(c => new THREE.Color(c));
    } else {
      colorArray = [new THREE.Color(this.colors)];
    }

    for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
      const radius = random(options.carLightsRadius);
      const length = random(options.carLightsLength);
      const spd = random(this.speed);

      const carLane = i % options.lanesPerRoad;
      let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;

      const carWidth = random(options.carWidthPercentage) * laneWidth;
      const carShiftX = random(options.carShiftX) * laneWidth;
      laneX += carShiftX;

      const offsetY = random(options.carFloorSeparation) + radius * 1.3;
      const offsetZ = -random(options.length);

      // left side
      aOffset.push(laneX - carWidth / 2);
      aOffset.push(offsetY);
      aOffset.push(offsetZ);

      // right side
      aOffset.push(laneX + carWidth / 2);
      aOffset.push(offsetY);
      aOffset.push(offsetZ);

      aMetrics.push(radius);
      aMetrics.push(length);
      aMetrics.push(spd);

      aMetrics.push(radius);
      aMetrics.push(length);
      aMetrics.push(spd);

      const color = pickRandom<THREE.Color>(colorArray);
      aColor.push(color.r);
      aColor.push(color.g);
      aColor.push(color.b);

      aColor.push(color.r);
      aColor.push(color.g);
      aColor.push(color.b);
    }

    instanced.setAttribute(
      'aOffset',
      new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false)
    );
    instanced.setAttribute(
      'aMetrics',
      new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false)
    );
    instanced.setAttribute(
      'aColor',
      new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false)
    );

    const material = new THREE.ShaderMaterial({
      fragmentShader: CAR_LIGHTS_FRAGMENT,
      vertexShader: CAR_LIGHTS_VERTEX,
      transparent: true,
      uniforms: Object.assign(
        {
          uTime: { value: 0 },
          uTravelLength: { value: options.length },
          uFade: { value: this.fade }
        },
        this.webgl.fogUniforms,
        (typeof this.options.distortion === 'object' ? this.options.distortion.uniforms : {}) || {}
      )
    });

    material.onBeforeCompile = shader => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <getDistortion_vertex>',
        typeof this.options.distortion === 'object' ? this.options.distortion.getDistortion : ''
      );
    };

    const mesh = new THREE.Mesh(instanced, material);
    mesh.frustumCulled = false;
    this.webgl.scene.add(mesh);
    this.mesh = mesh;
  }

  /**
   * Updates the car lights animation based on the elapsed time.
   *
   * @param {number} time - Current animation time
   */
  update(time: number) {
    if (this.mesh.material.uniforms.uTime) {
      this.mesh.material.uniforms.uTime.value = time;
    }
  }
}

export default CarLights;
