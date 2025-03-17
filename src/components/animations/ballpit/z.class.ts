import {
  AmbientLight,
  Color,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  Object3D,
  PMREMGenerator,
  PointLight,
  SphereGeometry,
  WebGLRenderer
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DEFAULT_X_CONFIG } from './ballpit.constants';
import { W } from './w.class';
import { Y } from './y.class';

const U = new Object3D();

export class Z extends InstancedMesh {
  config: typeof DEFAULT_X_CONFIG;
  physics: W;
  ambientLight?: AmbientLight;
  light?: PointLight;

  declare setColorAt: (index: number, color: Color) => void;
  declare instanceColor: InstancedBufferAttribute | null;
  declare setMatrixAt: (index: number, matrix: Matrix4) => void;
  declare instanceMatrix: InstancedBufferAttribute;

  constructor(renderer: WebGLRenderer, params: Partial<typeof DEFAULT_X_CONFIG> = {}) {
    const config = { ...DEFAULT_X_CONFIG, ...params };
    const roomEnv = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(roomEnv).texture;
    const geometry = new SphereGeometry();
    const material = new Y({ envMap: envTexture, ...config.materialParams });
    material.envMapRotation.x = -Math.PI / 2;
    super(geometry, material, config.count);
    this.config = config;
    this.physics = new W(config);
    this.#setupLights();
    this.setColors(config.colors);
  }

  #setupLights() {
    this.ambientLight = new AmbientLight(this.config.ambientColor, this.config.ambientIntensity);
    this.add(this.ambientLight);
    this.light = new PointLight(this.config.colors[0], this.config.lightIntensity);
    this.add(this.light);
  }

  setColors(colors: number[]) {
    if (Array.isArray(colors) && colors.length > 1) {
      const colorUtils = (function (colorsArr: number[]) {
        let baseColors: number[] = colorsArr;
        let colorObjects: Color[] = [];

        baseColors.forEach(col => {
          colorObjects.push(new Color(col));
        });

        return {
          setColors: (cols: number[]) => {
            baseColors = cols;
            colorObjects = [];
            baseColors.forEach(col => {
              colorObjects.push(new Color(col));
            });
          },
          getColorAt: (ratio: number, out: Color = new Color()) => {
            const clamped = Math.max(0, Math.min(1, ratio));
            const scaled = clamped * (baseColors.length - 1);
            const idx = Math.floor(scaled);
            const start = colorObjects[idx];

            if (idx >= baseColors.length - 1) return start.clone();

            const alpha = scaled - idx;
            const end = colorObjects[idx + 1];

            out.r = start.r + alpha * (end.r - start.r);
            out.g = start.g + alpha * (end.g - start.g);
            out.b = start.b + alpha * (end.b - start.b);

            return out;
          }
        };
      })(colors);

      for (let idx = 0; idx < this.count; idx++) {
        this.setColorAt(idx, colorUtils.getColorAt(idx / this.count));

        if (idx === 0) {
          this.light!.color.copy(colorUtils.getColorAt(idx / this.count));
        }
      }

      if (!this.instanceColor) return;

      this.instanceColor.needsUpdate = true;
    }
  }

  update(deltaInfo: { delta: number }) {
    this.physics.update(deltaInfo);

    for (let idx = 0; idx < this.count; idx++) {
      U.position.fromArray(this.physics.positionData, 3 * idx);

      if (idx === 0 && this.config.followCursor === false) {
        U.scale.setScalar(0);
      } else {
        U.scale.setScalar(this.physics.sizeData[idx]);
      }

      U.updateMatrix();
      this.setMatrixAt(idx, U.matrix);

      if (idx === 0) this.light!.position.copy(U.position);
    }

    this.instanceMatrix.needsUpdate = true;
  }
}
