import programmerIcon from '@/lib/qrcode-logos';
import { cn } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

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
  value: string;
  size?: number;
  className?: string;
  title?: string;
  bgColor?: string;
  fgColor?: string;
  imageSettings?: ImageSettings;
  includeMargin?: boolean;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({
  value,
  size = 256,
  bgColor = '#1a1f2c',
  fgColor = '#f1f1f1',
  includeMargin = false,
  className,
  title = 'Scan QR Code to Save My Contact Information'
}) => {
  return (
    <div className={cn('flex flex-col items-center my-4', className)}>
      <div className="p-2 rounded">
        <QRCodeSVG
          value={value}
          size={size}
          imageSettings={programmerIcon}
          level="M"
          bgColor={bgColor}
          fgColor={fgColor}
          includeMargin={includeMargin}
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
