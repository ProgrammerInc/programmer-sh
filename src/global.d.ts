/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

declare global {
  interface Intl {
    Segmenter: {
      new (
        locale: string,
        options?: { granularity: 'grapheme' | 'word' | 'sentence' }
      ): {
        segment(input: string): Iterable<{ segment: string; index: number; input: string }>;
      };
    };
  }
}
