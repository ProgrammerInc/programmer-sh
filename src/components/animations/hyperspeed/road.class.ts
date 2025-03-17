/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import { HyperspeedApp } from './hyperspeed-app.class';
import { ISLAND_FRAGMENT, ROAD_FRAGMENT, ROAD_VERTEX } from './hyperspeed.constants';
import { HyperspeedOptions } from './hyperspeed.types';

/**
 * Class representing the road in the hyperspeed animation.
 * Creates and manages the road meshes including the roadways and center island.
 */
export class Road {
  webgl: HyperspeedApp;
  options: HyperspeedOptions;
  uTime: { value: number };
  leftRoadWay!: THREE.Mesh;
  rightRoadWay!: THREE.Mesh;
  island!: THREE.Mesh;

  /**
   * Creates a new Road instance.
   *
   * @param {HyperspeedApp} webgl - The parent HyperspeedApp instance
   * @param {HyperspeedOptions} options - Configuration options for the road
   */
  constructor(webgl: HyperspeedApp, options: HyperspeedOptions) {
    this.webgl = webgl;
    this.options = options;
    this.uTime = { value: 0 };
  }

  /**
   * Creates a plane mesh for either a roadway or the center island.
   *
   * @param {number} side - Position modifier for the plane (-1 for left, 0 for center, 1 for right)
   * @param {number} width - Width of the plane
   * @param {boolean} isRoad - Whether this plane is a road (true) or an island (false)
   * @returns {THREE.Mesh} The created mesh
   */
  createPlane(side: number, width: number, isRoad: boolean) {
    const options = this.options;
    const segments = 100;
    const geometry = new THREE.PlaneGeometry(
      isRoad ? options.roadWidth : options.islandWidth,
      options.length,
      20,
      segments
    );

    let uniforms: Record<string, { value: any }> = {
      uTravelLength: { value: options.length },
      uColor: {
        value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor)
      },
      uTime: this.uTime
    };

    if (isRoad) {
      uniforms = Object.assign(uniforms, {
        uLanes: { value: options.lanesPerRoad },
        uBrokenLinesColor: {
          value: new THREE.Color(options.colors.brokenLines)
        },
        uShoulderLinesColor: {
          value: new THREE.Color(options.colors.shoulderLines)
        },
        uShoulderLinesWidthPercentage: {
          value: options.shoulderLinesWidthPercentage
        },
        uBrokenLinesLengthPercentage: {
          value: options.brokenLinesLengthPercentage
        },
        uBrokenLinesWidthPercentage: {
          value: options.brokenLinesWidthPercentage
        }
      });
    }

    const material = new THREE.ShaderMaterial({
      fragmentShader: isRoad ? ROAD_FRAGMENT : ISLAND_FRAGMENT,
      vertexShader: ROAD_VERTEX,
      side: THREE.DoubleSide,
      uniforms: Object.assign(
        uniforms,
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

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.z = -options.length / 2;
    mesh.position.x += (this.options.islandWidth / 2 + options.roadWidth / 2) * side;

    this.webgl.scene.add(mesh);
    return mesh;
  }

  /**
   * Initializes the road by creating the left and right roadways and center island.
   */
  init() {
    this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true);
    this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true);
    this.island = this.createPlane(0, this.options.islandWidth, false);
  }

  /**
   * Updates the road animation based on the elapsed time.
   *
   * @param {number} time - Current animation time
   */
  update(time: number) {
    this.uTime.value = time;
  }
}

export default Road;
