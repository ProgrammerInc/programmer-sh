import { cn } from '@/lib/utils';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';

export interface ImageSettings {
  src: string;
  size?: number;
  height: number;
  width: number;
  crossOrigin?: string;
  excavate: boolean;
  logoPadding?: number;
  logoPaddingStyle?: 'circle' | 'square';
  logoWidth?: number;
  logoHeight?: number;
  opacity?: number;
  quietZone?: number;
  removeQrCodeBehindLogo?: boolean;
  x?: number;
  y?: number;
}

export interface QRCodeProps {
  id: string;
  value: string;
  title?: string;
  className?: string;
  bgColor?: string;
  fgColor?: string;
  eyeColor?: string;
  eyeRadius?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  qrStyle?: 'squares' | 'dots' | 'fluid';
  quietZone?: number;
  size?: number;
  style?: React.CSSProperties;
  enableCORS?: boolean;
  imageSettings?: ImageSettings;
}

export const QRCodeComponent: React.FC<QRCodeProps> = ({
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
}) => {
  return (
    <div className={cn('flex flex-col items-center my-4', className)}>
      <div className="p-2 rounded">
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
        <p className="text-xs text-terminal-foreground mt-2">
          <span className="text-terminal-link hover:underline">{title}</span>
        </p>
      )}
    </div>
  );
};

export default QRCodeComponent;
