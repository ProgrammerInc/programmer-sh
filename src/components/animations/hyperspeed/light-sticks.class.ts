/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import { HyperspeedApp } from './hyperspeed-app.class';
import { SIDE_STICKS_FRAGMENT, SIDE_STICKS_VERTEX } from './hyperspeed.constants';
import { HyperspeedOptions } from './hyperspeed.types';
import { pickRandom, random } from './hyperspeed.utils';

/**
 * Class representing the light sticks along the sides of the road in the hyperspeed animation.
 * Creates and manages instanced meshes for the light sticks using custom shaders.
 */
export class LightsSticks {
  webgl: HyperspeedApp;
  options: HyperspeedOptions;
  mesh!: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;

  /**
   * Creates a new LightsSticks instance.
   *
   * @param {HyperspeedApp} webgl - The parent HyperspeedApp instance
   * @param {HyperspeedOptions} options - Configuration options for the light sticks
   */
  constructor(webgl: HyperspeedApp, options: HyperspeedOptions) {
    this.webgl = webgl;
    this.options = options;
  }

  /**
   * Initializes the light sticks by creating an instanced buffer geometry
   * with randomized properties for each stick and applying custom shaders.
   */
  init() {
    const options = this.options;
    const geometry = new THREE.PlaneGeometry(1, 1);
    const instanced = new THREE.InstancedBufferGeometry().copy(
      geometry as any
    ) as THREE.InstancedBufferGeometry;
    const totalSticks = options.totalSideLightSticks;
    instanced.instanceCount = totalSticks;

    const stickoffset = options.length / (totalSticks - 1);
    const aOffset: number[] = [];
    const aColor: number[] = [];
    const aMetrics: number[] = [];

    let colorArray: THREE.Color[];
    if (Array.isArray(options.colors.sticks)) {
      colorArray = options.colors.sticks.map(c => new THREE.Color(c));
    } else {
      colorArray = [new THREE.Color(options.colors.sticks)];
    }

    for (let i = 0; i < totalSticks; i++) {
      const width = random(options.lightStickWidth);
      const height = random(options.lightStickHeight);
      aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());

      const color = pickRandom<THREE.Color>(colorArray);
      aColor.push(color.r);
      aColor.push(color.g);
      aColor.push(color.b);

      aMetrics.push(width);
      aMetrics.push(height);
    }

    instanced.setAttribute(
      'aOffset',
      new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false)
    );
    instanced.setAttribute(
      'aColor',
      new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false)
    );
    instanced.setAttribute(
      'aMetrics',
      new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false)
    );

    const material = new THREE.ShaderMaterial({
      fragmentShader: SIDE_STICKS_FRAGMENT,
      vertexShader: SIDE_STICKS_VERTEX,
      side: THREE.DoubleSide,
      uniforms: Object.assign(
        {
          uTravelLength: { value: options.length },
          uTime: { value: 0 }
        },
        this.webgl.fogUniforms,
        (typeof options.distortion === 'object' ? options.distortion.uniforms : {}) || {}
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
   * Updates the light sticks animation based on the elapsed time.
   *
   * @param {number} time - Current animation time
   */
  update(time: number) {
    if (this.mesh.material.uniforms.uTime) {
      this.mesh.material.uniforms.uTime.value = time;
    }
  }
}

export default LightsSticks;
