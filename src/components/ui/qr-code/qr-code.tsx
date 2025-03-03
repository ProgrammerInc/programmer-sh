import programmerIcon from '@/lib/qrcode-logos';
import { cn } from '@/lib/utils';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';

// Define the ImageSettings interface locally instead of importing it
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
  marginSize?: number;
  minVersion?: number;
  qrStyle?: 'squares' | 'dots' | 'fluid';
  quietZone?: number;
  size?: number;
  style?: React.CSSProperties;
  boostLevel?: boolean;
  enableCORS?: boolean;
  includeMargin?: boolean;
  imageSettings?: ImageSettings;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({
  value,
  bgColor = '#31373F',
  fgColor = '#f1f1f1',
  eyeColor = '#1a1f2c',
  eyeRadius = 7,
  level = 'M',
  marginSize = 0,
  minVersion = 1,
  quietZone = 0,
  qrStyle = 'dots',
  size = 300,
  style = {
    backgroundColor: bgColor,
    color: fgColor
  },
  boostLevel = false,
  enableCORS = false,
  includeMargin = false,
  imageSettings,
  className,
  title = 'Scan QR Code to Save My Contact Information'
}) => {
  return (
    <div className={cn('flex flex-col items-center my-4', className)}>
      <div className="p-2 rounded">
        <QRCode
          value={value}
          bgColor={bgColor}
          fgColor={fgColor}
          ecLevel={level}
          enableCORS={enableCORS}
          eyeColor={eyeColor}
          eyeRadius={eyeRadius}
          logoImage={programmerIcon.src}
          logoWidth={programmerIcon.width}
          logoHeight={programmerIcon.height}
          logoPadding={programmerIcon.logoPadding}
          logoPaddingStyle={programmerIcon.logoPaddingStyle}
          qrStyle={qrStyle}
          quietZone={quietZone}
          removeQrCodeBehindLogo={programmerIcon.removeQrCodeBehindLogo}
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
