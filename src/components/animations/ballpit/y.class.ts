'use client';

import {
  Color,
  Euler,
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  ShaderChunk,
  Texture,
  Vector2,
  Vector3,
  Vector4
} from 'three';

export class Y extends MeshPhysicalMaterial {
  uniforms: {
    [key: string]: { value: number | boolean | Color | Vector2 | Vector3 | Vector4 | Texture };
  } = {
    thicknessDistortion: { value: 0.1 },
    thicknessAmbient: { value: 0 },
    thicknessAttenuation: { value: 0.1 },
    thicknessPower: { value: 2 },
    thicknessScale: { value: 10 }
  };

  defines: { [key: string]: string | number | boolean } = {};

  envMapRotation: Euler = new Euler();

  onBeforeCompile: (shader: {
    uniforms: Record<
      string,
      {
        value: number | boolean | Color | Vector2 | Vector3 | Vector4 | Texture;
      }
    >;
    fragmentShader: string;
    vertexShader: string;
  }) => void = () => {};

  constructor(params: Partial<MeshPhysicalMaterialParameters & { envMap?: Texture }>) {
    super(params);
    this.defines = { USE_UV: '' };

    this.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, this.uniforms);
      shader.fragmentShader =
        `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
        ` + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }

        void main() {
        `
      );

      const lightsChunk = ShaderChunk.lights_fragment_begin.replace(
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
        `
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <lights_fragment_begin>',
        lightsChunk
      );

      if (this.onBeforeCompile2) this.onBeforeCompile2(shader);
    };
  }

  onBeforeCompile2?: (shader: {
    uniforms: Record<
      string,
      {
        value: number | boolean | Color | Vector2 | Vector3 | Vector4 | Texture;
      }
    >;
    fragmentShader: string;
    vertexShader: string;
  }) => void;
}
