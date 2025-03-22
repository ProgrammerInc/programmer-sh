/**
 * QR Code component types
 */

'use client';

import { CSSProperties, HTMLAttributes } from 'react';

/**
 * Type of QR code to display
 * 
 * @typedef {string} QRCodeType
 */
export type QRCodeType = 'standard' | 'rounded' | 'circular' | 'animated' | 'custom';

/**
 * QR Code definition interface
 * 
 * This describes a QR code with all its properties
 * 
 * @interface QRCode
 */
export interface QRCode {
  /** Unique identifier for the QR code */
  id: string;
  /** Display name of the QR code */
  name: string;
  /** Description of the QR code */
  description: string;
  /** Type of QR code (standard, rounded, circular, animated, custom) */
  type: QRCodeType;
  /** Content to be encoded in the QR code */
  content: string;
  /** Optional color for the QR code foreground */
  color?: string;
  /** Optional background color for the QR code */
  backgroundColor?: string;
  /** Optional URL for a logo to be placed in the center of the QR code */
  logoUrl?: string;
  /** Optional additional configuration options for the QR code */
  options?: Record<string, unknown>;
}

/**
 * Props for the QR Code component
 * 
 * @interface QRCodeProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 * @example
 * ```tsx
 * <QRCode 
 *   content="https://example.com"
 *   type="rounded"
 *   color="#000000"
 *   backgroundColor="#ffffff"
 * />
 * ```
 */
export interface QRCodeProps extends HTMLAttributes<HTMLDivElement> {
  /** Content to be encoded in the QR code (required) */
  content: string;
  /** Size of the QR code in pixels (default: 200) */
  size?: number;
  /** Type of QR code (default: 'standard') */
  type?: QRCodeType;
  /** Color for the QR code foreground (default: '#000000') */
  color?: string;
  /** Background color for the QR code (default: '#ffffff') */
  backgroundColor?: string;
  /** URL for a logo to be placed in the center of the QR code */
  logoUrl?: string;
  /** Size of the logo in pixels (default: 50) */
  logoSize?: number;
  /** Border radius for rounded QR codes in pixels (default: 8) */
  borderRadius?: number;
  /** Level of error correction (L: 7%, M: 15%, Q: 25%, H: 30%) (default: 'M') */
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  /** Additional inline styles */
  style?: CSSProperties;
  /** Additional configuration options for the QR code */
  options?: Record<string, unknown>;
}
