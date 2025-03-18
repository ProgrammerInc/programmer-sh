'use client';

import { cn } from '@/utils/app.utils';
import React, { memo } from 'react';
import { QRCode } from 'react-qrcode-logo';

import styles from './qr-code.module.css';
import { QRCodeProps, ImageSettings } from './qr-code.types';

/**
 * QR Code Component
 * 
 * A customizable QR code component that can include logos, custom colors,
 * and different visual styles.
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
export const QRCodeComponent = memo<QRCodeProps>(function QRCodeComponent({
  value,
  bgColor = '#31373F',
  fgColor = '#f1f1f1',
  eyeColor = '#1a1f2c',
  eyeRadius = 7,
  level = 'M',
  quietZone = 0,
  qrStyle = 'dots',
  size = 300,
  style = {
    backgroundColor: bgColor,
    color: fgColor
  },
  enableCORS = false,
  imageSettings,
  className,
  title = 'Scan QR Code to Save My Contact Information'
}) {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles['qr-wrapper']}>
        <QRCode
          id={value}
          value={value}
          bgColor={bgColor}
          fgColor={fgColor}
          ecLevel={level}
          enableCORS={enableCORS}
          eyeColor={eyeColor}
          eyeRadius={eyeRadius}
          logoImage={imageSettings?.src}
          logoWidth={imageSettings?.width}
          logoHeight={imageSettings?.height}
          logoPadding={imageSettings?.logoPadding}
          logoPaddingStyle={imageSettings?.logoPaddingStyle}
          qrStyle={qrStyle}
          quietZone={quietZone}
          removeQrCodeBehindLogo={imageSettings?.removeQrCodeBehindLogo}
          size={size}
          style={style}
        />
      </div>
      {title && (
        <p className={styles.title}>
          <span className={styles['title-link']}>{title}</span>
        </p>
      )}
    </div>
  );
});

QRCodeComponent.displayName = 'QRCodeComponent';

export default QRCodeComponent;
