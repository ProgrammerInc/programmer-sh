/**
 * Props for the Balatro component - creates a colorful abstract shader animation
 *
 * @interface BalatroProps
 */
export interface BalatroProps {
  /** Rotation value for the spinning effect (default: -2.0) */
  spinRotation?: number;

  /** Speed of the spinning animation (default: 7.0) */
  spinSpeed?: number;

  /** Offset for the animation pattern [x, y] (default: [0.0, 0.0]) */
  offset?: [number, number];

  /** Primary color in HEX format (default: "#DE443B") */
  color1?: string;

  /** Secondary color in HEX format (default: "#006BB4") */
  color2?: string;

  /** Tertiary/background color in HEX format (default: "#162325") */
  color3?: string;

  /** Contrast level for the effect (default: 3.5) */
  contrast?: number;

  /** Lighting intensity level (default: 0.4) */
  lighting?: number;

  /** Amount of spinning effect (default: 0.25) */
  spinAmount?: number;

  /** Pixel filtering amount for the shader (default: 745.0) */
  pixelFilter?: number;

  /** Easing value for the spin effect (default: 1.0) */
  spinEase?: number;

  /** Whether the animation should rotate automatically (default: false) */
  isRotate?: boolean;

  /** Whether mouse movement should affect the animation (default: true) */
  mouseInteraction?: boolean;
}

/**
 * Shader uniform types for the Balatro component
 */
export interface BalatroUniforms {
  iTime: { value: number };
  iResolution: { value: [number, number, number] };
  uSpinRotation: { value: number };
  uSpinSpeed: { value: number };
  uOffset: { value: [number, number] };
  uColor1: { value: [number, number, number, number] };
  uColor2: { value: [number, number, number, number] };
  uColor3: { value: [number, number, number, number] };
  uContrast: { value: number };
  uLighting: { value: number };
  uSpinAmount: { value: number };
  uPixelFilter: { value: number };
  uSpinEase: { value: number };
  uIsRotate: { value: boolean };
  uMouse: { value: [number, number] };
}
