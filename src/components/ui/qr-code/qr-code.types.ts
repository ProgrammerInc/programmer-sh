'use client';

import React from 'react';

/**
 * QR Code Image Settings
 * 
 * Configuration options for the logo or image to display in the center of the QR code.
 */
export interface ImageSettings {
  /**
   * URL of the image to display in the center of the QR code
   */
  src: string;
  
  /**
   * Size of the image (optional)
   */
  size?: number;
  
  /**
   * Height of the image in pixels
   */
  height: number;
  
  /**
   * Width of the image in pixels
   */
  width: number;
  
  /**
   * Cross-origin setting for the image
   */
  crossOrigin?: string;
  
  /**
   * Whether to excavate (clear) the area behind the logo
   */
  excavate: boolean;
  
  /**
   * Padding around the logo in pixels
   */
  logoPadding?: number;
  
  /**
   * Style of the padding around the logo
   */
  logoPaddingStyle?: 'circle' | 'square';
  
  /**
   * Width of the logo in pixels (overrides the width property when specified)
   */
  logoWidth?: number;
  
  /**
   * Height of the logo in pixels (overrides the height property when specified)
   */
  logoHeight?: number;
  
  /**
   * Opacity of the logo (0-1)
   */
  opacity?: number;
  
  /**
   * Size of the quiet zone around the logo
   */
  quietZone?: number;
  
  /**
   * Whether to remove the QR code blocks behind the logo
   */
  removeQrCodeBehindLogo?: boolean;
  
  /**
   * X position of the logo
   */
  x?: number;
  
  /**
   * Y position of the logo
   */
  y?: number;
}

/**
 * QR Code Component Props
 * 
 * Props for the QRCode component that renders a customizable QR code.
 */
export interface QRCodeProps {
  /**
   * Unique identifier for the QR code
   */
  id: string;
  
  /**
   * The data to encode in the QR code (URL, text, etc.)
   */
  value: string;
  
  /**
   * Optional title text to display below the QR code
   * @default 'Scan QR Code to Save My Contact Information'
   */
  title?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Background color of the QR code
   * @default '#31373F'
   */
  bgColor?: string;
  
  /**
   * Foreground color of the QR code (the color of the QR code blocks)
   * @default '#f1f1f1'
   */
  fgColor?: string;
  
  /**
   * Color of the position detection patterns (the big squares in the corners)
   * @default '#1a1f2c'
   */
  eyeColor?: string;
  
  /**
   * Radius of the position detection patterns' corners
   * @default 7
   */
  eyeRadius?: number;
  
  /**
   * Error correction level of the QR code
   * - L: Low (7% of data can be restored)
   * - M: Medium (15% of data can be restored)
   * - Q: Quartile (25% of data can be restored)
   * - H: High (30% of data can be restored)
   * @default 'M'
   */
  level?: 'L' | 'M' | 'Q' | 'H';
  
  /**
   * Visual style of the QR code blocks
   * @default 'dots'
   */
  qrStyle?: 'squares' | 'dots' | 'fluid';
  
  /**
   * Size of the quiet zone (margin) around the QR code
   * @default 0
   */
  quietZone?: number;
  
  /**
   * Size of the QR code in pixels
   * @default 300
   */
  size?: number;
  
  /**
   * Additional inline CSS styles
   * @default { backgroundColor: bgColor, color: fgColor }
   */
  style?: React.CSSProperties;
  
  /**
   * Whether to enable CORS for image loading
   * @default false
   */
  enableCORS?: boolean;
  
  /**
   * Configuration for the logo/image to display in the center of the QR code
   */
  imageSettings?: ImageSettings;

  /**
   * Identifier of a preset to use from the database
   * If provided, will load the preset from the database and use its settings
   * This will override any imageSettings provided directly
   */
  imagePreset?: string;
}
