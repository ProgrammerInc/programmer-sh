'use client';

import { cn } from '@/utils/app.utils';
import { memo, useMemo } from 'react';
import { QRCode } from 'react-qrcode-logo';

import { logger } from '@/services';
import { useQRCodePreset } from './qr-code.hooks';
import styles from './qr-code.module.css';
import { QRCodeProps } from './qr-code.types';

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
 *   imagePreset="programmerIcon"
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
  imagePreset,
  className,
  title = 'Scan QR Code to Save My Contact Information'
}) {
  // Load presets from database if an image preset is specified
  const { preset, isLoading: isPresetLoading } = useQRCodePreset(imagePreset || '');

  // Determine which image settings to use
  const finalImageSettings = useMemo(() => {
    // If loading or no preset specified, use provided image settings
    if (isPresetLoading || !imagePreset) {
      return imageSettings;
    }

    // If preset loaded, use it
    if (preset) {
      logger.debug(`Using QR code preset: ${imagePreset}`);
      return preset;
    }

    // Fallback
    logger.debug('No QR code preset found, using provided image settings');
    return imageSettings;
  }, [imageSettings, imagePreset, preset, isPresetLoading]);

  // Show loading state
  if (imagePreset && isPresetLoading) {
    return (
      <div className={cn(styles.container, styles.loading, className)}>
        <div className={styles['qr-wrapper']}>
          <div className={styles.loadingIndicator} />
        </div>
        {title && (
          <p className={styles.title}>
            <span className={styles['title-link']}>{title}</span>
          </p>
        )}
      </div>
    );
  }

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
          logoImage={finalImageSettings?.src}
          logoWidth={finalImageSettings?.width}
          logoHeight={finalImageSettings?.height}
          logoPadding={finalImageSettings?.logoPadding}
          logoPaddingStyle={finalImageSettings?.logoPaddingStyle}
          qrStyle={qrStyle}
          quietZone={quietZone}
          removeQrCodeBehindLogo={finalImageSettings?.removeQrCodeBehindLogo}
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
