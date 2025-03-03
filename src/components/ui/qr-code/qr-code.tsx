import { cn } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  title?: string;
  bgColor?: string;
  fgColor?: string;
  includeMargin?: boolean;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({
  value,
  size = 256,
  bgColor = '#1a1f2c',
  fgColor = '#ffffff',
  includeMargin = true,
  className,
  title = 'Scan this QR code'
}) => {
  return (
    <div className={cn('flex flex-col items-center my-4', className)}>
      <div className="p-2 rounded">
        <QRCodeSVG
          value={value}
          size={size}
          level="M"
          bgColor={bgColor}
          fgColor={fgColor}
          includeMargin={includeMargin}
        />
      </div>
      {title && <p className="text-xs text-terminal-foreground mt-2">{title}</p>}
    </div>
  );
};

export default QRCodeComponent;
