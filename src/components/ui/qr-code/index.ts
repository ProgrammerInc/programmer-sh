/**
 * QR Code Component
 *
 * A customizable QR code generator component that supports various styles,
 * colors, and logo insertion. Built on top of react-qrcode-logo, it provides
 * an easy-to-use interface for creating QR codes in your application.
 *
 * Features:
 * - Customizable colors for background, foreground, and positioning markers
 * - Multiple visual styles (dots, squares, fluid)
 * - Optional logo or image in the center
 * - Configurable error correction level
 * - Optional title text below the QR code
 *
 * @example Basic usage
 * ```tsx
 * <QRCodeComponent
 *   id="contact-info"
 *   value="https://example.com"
 * />
 * ```
 *
 * @example Custom styling
 * ```tsx
 * <QRCodeComponent
 *   id="custom-qr"
 *   value="Hello World"
 *   bgColor="#ffffff"
 *   fgColor="#000000"
 *   eyeColor="#ff0000"
 *   qrStyle="dots"
 *   size={200}
 *   title="Scan to view message"
 * />
 * ```
 *
 * @example With logo
 * ```tsx
 * <QRCodeComponent
 *   id="logo-qr"
 *   value="https://example.com"
 *   imageSettings={{
 *     src: "/logo.png",
 *     height: 24,
 *     width: 24,
 *     excavate: true
 *   }}
 * />
 * ```
 */

'use client';

// Export all components and types
export * from './qr-code';
export { default } from './qr-code';
export * from './qr-code.types';
